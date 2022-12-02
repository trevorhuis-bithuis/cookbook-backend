import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, findUserById } from '../user/users.services'
import { addRefreshTokenToWhitelist, revokeTokens, deleteRefreshToken, findRefreshTokenById } from "./auth.services";
import { generateTokens } from './utils/jwt';
import bcrypt from 'bcrypt';
import Config from '../config';
import hashToken from './utils/hashToken';

const registerHandler = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const { name, username, password } = req.body
        if (!username || !password || !name) {
            res.status(400).send('You must provide an email, name, and a password.');
        }

        const existingUser = await findUserByUsername(username);

        if (existingUser) {
            res.status(400).send('User already exists.');
        }
        const user = await createUser(name, username, password);
        console.log(user);
        const jti = uuidv4();
        console.log(jti)
        const { accessToken, refreshToken } = generateTokens(user, jti);
        console.log(accessToken, refreshToken);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
        res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const loginHandler = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400);
            throw new Error('You must provide an username and a password.');
        }

        const existingUser = await findUserByUsername(username);

        if (!existingUser) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.json({ error });
    }
}

const logoutHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        await revokeTokens(id);
        res.status(200).json({ message: `Logged out user with id #${id}` });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const refreshTokenHandler = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }
        const payload: jwt.JwtPayload = jwt.verify(refreshToken, Config.jwtRefreshSecret) as jwt.JwtPayload;
        const savedRefreshToken = await findRefreshTokenById(payload.jti!);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await findUserById(payload.id!);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

        res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        res.json({ error });
    }
}

export { registerHandler, loginHandler, logoutHandler, refreshTokenHandler }
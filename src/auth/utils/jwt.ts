import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '../../config';

const generateAccessToken = (user: User) => {
    return jwt.sign(user, config.jwtAccessSecret, { expiresIn: '15m' });
}

const generateRefreshToken = (user: User, jti: any) => {
    return jwt.sign({
        id: user.id,
        jti
    }, config.jwtRefreshSecret!, {
        expiresIn: '7d',
    });
}

const generateTokens = (user: User, jti: any) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}

export { generateAccessToken, generateRefreshToken, generateTokens };
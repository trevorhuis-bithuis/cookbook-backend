import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '../../config';

const generateAccessToken = (user: User) => {
    console.log(config)
    try {
        const jwtToken: any = jwt.sign(user, config.jwtAccessSecret, { expiresIn: '15m' });
        return jwtToken;
    } catch (error) {
        console.error(error);
    }
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
    console.log(accessToken);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}

export { generateAccessToken, generateRefreshToken, generateTokens };
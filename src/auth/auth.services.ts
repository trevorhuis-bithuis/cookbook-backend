import { prisma } from '../app';
import hashToken from './utils/hashToken';

const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }: any) => {
    return prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId
        },
    });
}

const findRefreshTokenById = (id: string) => {
    return prisma.refreshToken.findUnique({
        where: {
            id,
        },
    });
}

const deleteRefreshToken = (id: string) => {
    return prisma.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true
        }
    });
}

const revokeTokens = (userId: string) => {
    return prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}

export { addRefreshTokenToWhitelist, findRefreshTokenById, deleteRefreshToken, revokeTokens }
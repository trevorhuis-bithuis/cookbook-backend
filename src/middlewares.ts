import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from "./config";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, config.jwtAccessSecret);
        req.body.jwt = payload;
    } catch (error: any) {
        res.status(401);
        if (error.name === 'TokenExpiredError') {
            throw new Error(error.name);
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }

    return next();
}

export { isAuthenticated };
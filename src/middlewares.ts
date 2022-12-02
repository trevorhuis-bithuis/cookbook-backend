import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from "./config";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, config.jwtAccessSecret);
        req.body.jwt = payload;
    } catch (error: any) {
        return res.status(401).send('🚫 Un-Authorized 🚫');
    }

    return next();
}

export { isAuthenticated };
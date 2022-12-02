import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'
import users from './user';
import auth from './auth';
import config from './config';

const prisma = new PrismaClient()
const app = express();

app.use(bodyParser.json())

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
}));

app.get('/ping', (req, res) => {
    res.json({
        message: 'pong'
    })
});
app.use('/users', users)
app.use('/auth', auth)

//setup server to listen on port 8080
app.listen(config.port, () => {
    console.log("Server is live on port 8080");
})

export { prisma }
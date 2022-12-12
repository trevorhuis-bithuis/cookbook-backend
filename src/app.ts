import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'
import users from './user';
import auth from './auth';
import recipes from './recipes';
import config from './config';

const prisma = new PrismaClient()
const app = express();

app.use(bodyParser.json())

app.use(morgan('tiny'));

app.get('/ping', (req, res) => {
    res.json({
        message: 'pong'
    })
});
app.use('/user', users)
app.use('/auth', auth)
app.use('/recipes', recipes)

//setup server to listen on port 8080
app.listen(config.port, () => {
    console.log("Server is live on port 8080");
})

export { prisma }
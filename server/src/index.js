import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from "koa-bodyparser";
import {timingLogger, exceptionHandler, jwtConfig} from './utils';
import {router as productRouter} from './products';
import {router as authRouter} from './auth';
import {router as userRouter} from './user';
import jwt from 'koa-jwt';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors())
app.use(exceptionHandler);
app.use(timingLogger);
app.use(bodyParser());

const prefix = '/api';

// public
const publicApiRouter = new Router({prefix});
publicApiRouter
    .use('/auth', authRouter.routes());
app
    .use(publicApiRouter.routes())
    .use(publicApiRouter.allowedMethods());

app.use(jwt(jwtConfig));

// protected
const protectedApiRouter = new Router({ prefix });
protectedApiRouter
    .use('/products', productRouter.routes())
    .use('/users', userRouter.routes());

app
    .use(protectedApiRouter.routes())
    .use(protectedApiRouter.allowedMethods());

app.listen(8008);
console.log('koa-server started on port 8008');

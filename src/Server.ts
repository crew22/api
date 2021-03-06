import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import BaseRouter from './routes';
import logger from './shared/Logger';

const app = express();
const { BAD_REQUEST } = StatusCodes;



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser("API_SECRET"));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction): Response => {
    logger.error(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

export default app;

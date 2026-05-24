import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsConfig from './config/cors.config.js';
import { apiLimiter } from './middleware/rate-limit.middleware.js';
import apiRoutes from './routes/api.routes.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();
app.set('trust proxy', 1);

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('combined'));
app.use(apiLimiter);

app.use('/api', apiRoutes);
app.use(errorMiddleware);

export default app;

import express from 'express';
import authRoutes from "./routes/authRoutes";
import financialRoutes from "./routes/financialRoutes";
import authenticateToken from "./utils/middlewares";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: express.Application = express();

app.use(express.json());

app.use(cors());
app.use(authenticateToken);
app.use(authRoutes, financialRoutes);

export default app;

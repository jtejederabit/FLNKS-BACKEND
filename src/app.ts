import express from 'express';
import authRoutes from "./routes/authRoutes";
import financialRoutes from "./routes/financialRoutes";
import authenticateToken from "./utils/middlewares";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();

app.use(express.json());

app.use(cors());
app.use(authenticateToken);
app.use(authRoutes, financialRoutes);

const PORT: number = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});

export default app;

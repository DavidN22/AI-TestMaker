import express, { Request, Response } from 'express';
import "./db/db.ts"
import {testDbConnection} from "./db/db.ts"
import cors from 'cors'; 
import aiRoutes from './routes/aiRoutes.ts'; 
import dbRoutes from './routes/dbRoutes.ts';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.ts';
dotenv.config();

//import authRoutes from './routes/authRoutes';
//import dbRoutes from './routes/dbRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

testDbConnection();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/db', dbRoutes);
  
app.get('/api', (req: Request, res: Response) => {
    res.json({ server: 'Hello, this is your Express server!' });
});

//global error handler
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err.stack || "An error occurred");
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});    
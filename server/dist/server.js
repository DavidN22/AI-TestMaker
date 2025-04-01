import express from 'express';
import "./db/db.js";
import cors from 'cors';
import aiRoutes from './routes/aiRoutes.js';
import dbRoutes from './routes/dbRoutes.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
//import authRoutes from './routes/authRoutes';
//import dbRoutes from './routes/dbRoutes';
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors({
    origin: ['https://teskro.com', 'https://www.teskro.com'],
    credentials: true
}));
app.use(express.json());
// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/db', dbRoutes);
app.get('/api', (req, res) => {
    res.json({ server: 'Hello, this is your Express server!' });
});
//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack || "An error occurred");
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

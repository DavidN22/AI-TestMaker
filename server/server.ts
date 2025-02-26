import express, { Request, Response } from 'express';
import "./db/db.js"
import {testDbConnection} from "./db/db.js"
import cors from 'cors'; 


const app = express();
const PORT = process.env.PORT || 3000;
testDbConnection();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
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
import { Request, Response, NextFunction } from "express";
import { pool } from "../db/db.ts";

export const getWeakPointsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { testName, weakPointMode } = req.body;
   
    if (!weakPointMode) return next();

    if (!testName || typeof testName !== "string") {
        res.status(400).json({ error: "Test name is required to fetch weak points" });
        return;
    }
    let user = res.locals.user;
    if (!user) {
        res.status(400).json({ error: "User information is required to fetch weak points" });
        return;
    }

    try {
        const query = `
            SELECT weak_points
            FROM devtests
            WHERE title = $1 AND "user" = $2 AND weak_points IS NOT NULL
            ORDER BY date DESC
            LIMIT 3;
        `;
        
        const { rows } = await pool.query(query, [testName, user]);
       
        if (rows.length === 0) {
            return next(new Error("No weak points found for the specified test"));
        }

      
        const weakPoints = rows.map((row) => row.weak_points);
        res.locals.weakPoints = weakPoints;

        next();
    } catch (error) {
        console.error("Error fetching weak points:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
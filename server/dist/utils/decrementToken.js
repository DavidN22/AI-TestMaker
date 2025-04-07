import { pool } from "../db/db.js";
export const decrementUserToken = async (email) => {
    await pool.query("UPDATE users SET tokens = tokens - 1 WHERE email = $1", [email]);
};

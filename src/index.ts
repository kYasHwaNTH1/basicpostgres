import { Client } from "pg";
import express from "express";

const app = express();
app.use(express.json());

// Update the connection string with valid credentials
const client = new Client("postgresql://neondb_owner:Az2FvG7PUpXf@ep-late-block-a5umhtj8.us-east-2.aws.neon.tech/neondb?sslmode=require");

async function main() {
    await client.connect().then(() => console.log("DB connected"));
    app.listen(3000, () => console.log("Server running on port 3000"));
}

main();

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Use parameterized query to avoid SQL injection
        const sqlQuery = `INSERT INTO "User" (username, email, password) VALUES ($1, $2, $3)`;
        const values = [username, email, password];

        await client.query(sqlQuery, values);
        res.json({ msg: "User signed up successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error signing up user" });
    }
});

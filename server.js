import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import connectDB from "./connection.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

connectDB();

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 8080;

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/Docs/index.html"));
// });
app.use("/api", usersRoutes);

app.listen(
  PORT,
  console.log(`Server is configured and running on port ${PORT}`)
);

import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./src/config/viewEngine.js";
import initWebRoute from "./src/route/web.js";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";
import cors from "cors";
dotenv.config();
console.log("PORT in env = ", process.env.PORT);


let app = express();
app.use(cors({
    origin: "http://localhost:3000",   // React app
    credentials: true,                 // cho phép gửi cookie/token
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoute(app);

connectDB();

let port = process.env.PORT || 8069;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
});
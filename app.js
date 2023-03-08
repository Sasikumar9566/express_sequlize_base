import "dotenv/config";
import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import routers from "./routes/index.js";
const app = express();
import { join } from 'path';
import morgan from "morgan";
import path from 'path';
const __dirname = path.resolve();

// middle wares section
import appLogger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import sequelize from "./configs/database.js";
app.use(appLogger.requestDetails(appLogger));
app.use(helmet());
app.use(cors());
app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
});
app.use(morgan('dev', {
	skip: function (req, res) { return res.statusCode < 400 }
}));
app.use("/public", express.static(join(__dirname, 'public')));

routers(app)
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});
app.use(errorHandler)
// create the connection to database

const port = process.env.PORT || 3000;

app.listen(port, async () => {
	console.log(`App listening at http://localhost:${port}`)
	try {
		await sequelize.authenticate();
		console.log('Database Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error.message);
	}
});

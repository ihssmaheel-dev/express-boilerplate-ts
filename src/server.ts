import app from "./app";
import { appConfig } from "./config/config";
import connectDB from "./db/dbConnection";
import logger from "./logger/logger";

(async () : Promise<void> => {
    try {
        // Establishing the database connection
        await connectDB();

        // starting the server
        app.listen(appConfig.port, () => {
            console.log(`Server started listening on ${appConfig.host}:${appConfig.port}`);
            logger.info("server started running");
        });
    } catch(error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
})();
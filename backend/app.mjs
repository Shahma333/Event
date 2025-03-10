import env from "dotenv";
import express from "express";
import cors from "cors";
import dbConnect from "./Config/db.config.mjs";
import userRouter from "./Routes/User.route.mjs";
import eventRouter from "./Routes/Event.route.mjs";
import taskRouter from "./Routes/TaskRoute.mjs";
import scheduleRouter from "./Routes/ScheduleRoute.mjs";
import budgetRouter from "./Routes/BudgetRoute.mjs";
import guestRouter from "./Routes/GuestRoute.mjs";
import vendorRouter from "./Routes/vendorRoute.mjs";
import messageRouter from "./Routes/MessageRoute.mjs";



env.config();
await dbConnect();

const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.use("/api/users", userRouter); 
app.use("/api/events",eventRouter);
app.use("/api/tasks",taskRouter);
app.use("/api/schedules",scheduleRouter);
app.use("/api/budget",budgetRouter);
app.use("/api/guests",guestRouter);
app.use("/api/vendors",vendorRouter);
app.use("/api/message",messageRouter);



app.listen(process.env.PORT || 2030, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});

require("dotenv").config();
const express = require("express");
const http = require("http"); // Import http module
const socketIo = require("socket.io");
const morgan = require("morgan");
const requestIp = require("request-ip");
const cors = require("cors");
const corsOption = require("./config/corsOption");
//const credentials = require("./middleware/credentials");
const { errorHandler } = require("./middileware/errormiddleware");
//const { Server } = require("socket.io");
const connectDB = require("./config/db");
const logger = require("./utils/logger");

const app = express();

const port = process.env.PORT || 1234;

// Logger
app.use(morgan("tiny", { stream: logger.stream }));
app.use(
    morgan(
        ":date[iso] - :method :url :status :res[content-length] - :response-time ms"
    )
);
app.use(requestIp.mw());

// Database connection
connectDB();

// Middleware
//app.use(credentials);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//authorizations endpoint
app.set("trust proxy", true);
app.use((req, res, next) => {
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    // Add the 'Authorization' header to the list of exposed headers
    res.append("Access-Control-Expose-Headers", "Authorization");
    next();
});
// Your routes go here
app.get("/", (req, res) => {
    res.send("welcome to the default route, if you get this message then it means you have probably set it u, doesnt mean you wont further experience challenge");
});
// Routes
app.use("/api/v1/staff", require("./routes/Staff/Staff"));
// app.use("/api/v1/shops", require("./routes/shops.route"));
// app.use("/api/v1/threads", require("./routes/threads"));
// app.use("/api/v1/blogs", require("./routes/blog"));
// app.use("/api/v1/subscription", require("./routes/subscription"));
// app.use("/api/v1/booking", require("./routes/booking"));
// app.use("/api/v1/cart", require("./routes/cart"));
// app.use("/api/v1/payment", require("./routes/payment"));
// app.use("/api/v1/campaign", require("./routes/campaign"));
// app.use("/api/v1/stripe", require("./routes/stripe.route"));
// app.use("/api/v1/customerservice", require("./routes/customerservice.route"));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    logger.info(`Server running on port ${port}`);
});
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Router
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");
const organizerRouter = require("./app/api/v1/organizer/router");
const authCMSRouter = require("./app/api/v1/auth/router");
const ordersRouter = require("./app/api/v1/orders/router");
const participantRouter = require("./app/api/v1/participants/router");
const paymentsRouter = require("./app/api/v1/payments/router");

// middlewares
const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

const v1 = "/api/v1";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API ",
  });
});

app.use(`${v1}/cms`, categoriesRouter);
// Images
app.use(`${v1}/cms`, imagesRouter);

// talents
app.use(`${v1}/cms`, talentsRouter);

// Events
app.use(`${v1}/cms`, eventsRouter);

// Organizer
app.use(`${v1}/cms`, organizerRouter);

// Token
app.use(`${v1}/cms`, authCMSRouter);

// Orders
app.use(`${v1}/cms`, ordersRouter);

// Payments
app.use(`${v1}/cms`, paymentsRouter);

// Participant
app.use(`${v1}`, participantRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;

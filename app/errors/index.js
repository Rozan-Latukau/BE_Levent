const CustomAPIError = require("./custom-api-error");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");
const Unauthorized = require("./unauthorized");

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  Unauthorized,
};

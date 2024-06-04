const express = require("express");
const router = express();
const { SignInCms } = require("./controller");

router.post("/auth/signin", SignInCms);

module.exports = router;

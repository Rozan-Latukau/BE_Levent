const express = require("express");

const router = express();

const { createCMS, createCMSUser, getCMSUsers } = require("./controller");
const { authenticatedUser, authorizeRoles } = require("../../../middlewares/auth");

router.post("/organizers", authenticatedUser, authorizeRoles("owner"), createCMS);
router.post("/users", authenticatedUser, authorizeRoles("organizer"), createCMSUser);
router.get("/users", authenticatedUser, authorizeRoles("owner"), getCMSUsers);

module.exports = router;

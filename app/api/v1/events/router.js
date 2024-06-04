const express = require("express");

const router = express();

const { create, destroy, findOne, index, update, changeStatus } = require("./controller");
const { authenticatedUser, authorizeRoles } = require("../../../middlewares/auth");

router.post("/events", authenticatedUser, authorizeRoles("organizer"), create);
router.get("/events", authenticatedUser, authorizeRoles("organizer"), index);
router.get("/events/:id", authenticatedUser, authorizeRoles("organizer"), findOne);
router.put("/events/:id", authenticatedUser, authorizeRoles("organizer"), update);
router.delete("/events/:id", authenticatedUser, authorizeRoles("organizer"), destroy);
router.put("/events/:id/status", authenticatedUser, authorizeRoles("organizer"), changeStatus);

module.exports = router;

const express = require("express");

const router = express();

const { create, find, destroy, index, update } = require("./controller");
const { authenticatedUser, authorizeRoles } = require("../../../middlewares/auth");

router.post("/talents", authenticatedUser, authorizeRoles("organizer"), create);
router.get("/talents", authenticatedUser, authorizeRoles("organizer"), index);
router.get("/talents/:id", authenticatedUser, authorizeRoles("organizer"), find);
router.put("/talents/:id", authenticatedUser, authorizeRoles("organizer"), update);
router.delete("/talents/:id", authenticatedUser, authorizeRoles("organizer"), destroy);

module.exports = router;

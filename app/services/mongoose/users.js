const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizer/model");
const { BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const createOrganizer = async (req) => {
  const { name, email, password, confirmPassword, role, organizer } = req.body;

  if (password !== confirmPassword) throw new BadRequestError("Password dan ConfirmPassword tidak sama");

  const result = await Organizers.create({ organizer });

  if (!result) throw new BadRequestError("Organizer tidak ditemukan");

  const users = await Users.create({
    name,
    email,
    password,
    role,
    organizer: result._id,
  });
  delete users._doc.password;
  return users;
};
const createUsers = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) throw new BadRequestError("Password dan ConfirmPassword tidak sama");

  const result = await Users.create({
    name,
    email,
    password,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();
  return result;
};

module.exports = {
  createOrganizer,
  createUsers,
  getAllUsers,
};

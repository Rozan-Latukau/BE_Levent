const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthenticatedError } = require("../../errors/");
const { createTokenUser, createJwt } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Tolong Isi Email dan Password");
  }

  const result = await Users.findOne({ email: email });
  if (!result) {
    throw new UnauthenticatedError("Kredensial Gagal");
  }

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Kredensial Gagal");
  }

  const token = createJwt({ payload: createTokenUser(result) });

  return token;
};

module.exports = {
  signin,
};

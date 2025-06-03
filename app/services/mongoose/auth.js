const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthenticatedError } = require("../../errors/");
const { createTokenUser, createJwt, createRefreshJWT } = require("../../utils");
const { createUserRefreshToken } = require("./refreshToken");

const signin = async(req) => {
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

    const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
    await createUserRefreshToken({
        refreshToken,
        user: result._id,
    });

    return { token, refreshToken, role: result.role, email: result.email };
};

module.exports = {
    signin,
};
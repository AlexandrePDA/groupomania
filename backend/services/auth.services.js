const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt.utils");
const createHttpError = require("http-errors");

// create user
exports.signup = async (req) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const { email, name } = req.body;
  let user = await prisma.user.create({
    data: {
      email,
      password: hash,
      name,
      profile: {
        create: {
          bio: "Dites-nous en plus sur vous !",
          image: "http://localhost:3000/images/default/avatar-1577909_640.webp",
        },
      },
    },
  });
  const token = await jwt.signAccessToken(user);
  user = {
    ...user,
    token,
  };
  return user;
};

exports.login = async (req) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw createHttpError.NotFound("User not found !");
  }
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    throw createHttpError.Unauthorized("E-mail or password not correct");
  delete user.password;
  const token = await jwt.signAccessToken(user);
  return {
    ...user,
    token,
  };
};

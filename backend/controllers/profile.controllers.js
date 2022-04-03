const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET PROFILE

exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.user.id;
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "One profile",
      data: profile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// EDIT BIO

exports.editProfileBio = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { bio } = req.body;
    const profile = await prisma.profile.update({
      where: {
        userId: id,
      },
      data: { bio: bio },
    });
    res.status(201).json({
      status: true,
      message: "Profile updated !",
      data: profile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// EDIT PICTURE

exports.editProfilePicture = async (req, res, next) => {
  try {
    const id = req.user.id;
    const image = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const profile = await prisma.profile.update({
      where: {
        userId: id,
      },
      data: {
        image,
      },
    });
    res.status(201).json({
      status: true,
      message: "Profile updated !",
      data: profile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

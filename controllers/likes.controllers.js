const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createHttpError = require("http-errors");


// LIKE 

exports.addLike = async (req, res, next) => {
  try {
    const postId = req.body;
    const userId = req.user.payload.id;
    const addLike = await prisma.likes.create({
      data: {
        user: {
          connect: { id: userId },
        },
        post: {
          connect: postId,
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "post liked",
      data: addLike,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// IS LIKE

exports.isLike = async (req, res, nex) => {
  try {
    const id = req.user.payload.id;
    const postId = req.payload.id;
    const userLiked = await prisma.likes.findUnique({
      where: {
        userId: Number(id),
        postId: Number(postId),
      },
    });
    res.status(200).json({
      status: true,
      message: "User liked",
      data: userLiked,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// DELETE LIKE

exports.deleteLike = async (req, res, next) => {
  try {
    let id = req.params.id;
    const deleteLike = await prisma.likes.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Like deleted",
      data: deleteLike,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

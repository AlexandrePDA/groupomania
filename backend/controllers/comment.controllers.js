const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE COMMENT

exports.createComment = async (req, res, next) => {
  try {
    const { comment, postId } = req.body;
    const userId = req.user.id;
    const commentaire = await prisma.commentaire.create({
      data: {
        comment,
        user: {
          connect: { id: userId },
        },
        post: { connect: { id: postId } },
      },
    });
    req.status(200).json({
      status: true,
      message: "Comment created !",
      data: commentaire,
    });
  } catch (error) {
    console.log(error.message);
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// DELETE COMMENT

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const commentaire = await prisma.commentaire.delete({
      where: {
        id: Number(id),
      },
    });
    req.status(200).json({
      status: true,
      message: "Comment deleted !",
      data: commentaire,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

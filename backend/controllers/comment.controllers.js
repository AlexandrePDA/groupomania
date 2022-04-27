const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE COMMENT

exports.createComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const { postId  } = req.params; 
    const userId = req.user.id;
    const commentaire = await prisma.commentaire.create({
      data: {
        comment,
        user: {
          connect: { id: userId },
        },
        post: { connect: { id: Number(postId) } },
      },
      include: {user: true}
    });
    res.status(200).json({
      status: true,
      message: "Comment created !",
      data: commentaire,
    });
  } catch (error) {
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
    res.status(200).json({
      status: true,
      message: "Comment deleted !",
      data: commentaire,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};


// *************

// GET ALL COMMENTS BY POST

exports.allComm = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    console.log(userId);
    const allComm = await prisma.commentaire.findMany({
      where: {
        postId: Number(postId),
      },
      orderBy: {
        createAt: "desc",
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "All Comments",
      data: allComm,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
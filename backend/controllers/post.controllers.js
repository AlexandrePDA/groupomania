const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createHttpError = require("http-errors");
const fs = require("fs");

// CREATE POST

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, imageAltText } = req.body;
    const userId = req.user.id;
    const image = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        imageAltText,
        user: {
          connect: { id: userId },
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "Post created !",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// SHOW ALL POSTS

exports.allPost = async (req, res, next) => {
  try {
    const allPost = await prisma.post.findMany({
      orderBy: {
        createAt: "desc",
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        commentaire: true,
        likes: true,
      },
    });
    res.status(200).json({
      status: true,
      message: "All Posts",
      data: allPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// SHOW ONE POST

exports.onePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const onePost = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        commentaire: {
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
        },
        likes: true,
      },
    });
    if (!onePost) {
      return res.status(404).json({
        message: "not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "One post",
      data: onePost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// DELETE POST

exports.deletePost = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });
  if (!post) {
    return res.status(404).json({
      message: "not found",
    });
  }
  if (req.user.isAdmin === 1 || post.userId === req.user.id) {
    const image = req.body.image;
    const filename = String(image).split("/image/")[1];
    fs.unlink(`image/${filename}`, async () => {
      try {
        const post = await prisma.post.delete({
          where: {
            id: Number(req.params.id),
          },
        });
        res.status(200).json({
          status: true,
          message: "Post deleted !",
        });
      } catch (e) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
      }
    });
  }
};

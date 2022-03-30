const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createHttpError = require("http-errors");
const fs = require("fs");

// CREATE POST

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, imageAltText } = JSON.parse(req.body.formContent);
    const userId = req.user.payload.id;
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
        createdAt: "desc",
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        Commentaire: true,
        Likes: true,
      },
    });
    res.status(200).json({
      status: true,
      message: "All Posts",
      data: allPost,
    });
  } catch (e) {
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
        Commentaire: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
        Likes: true,
      },
    });
    res.status(200).json({
      status: true,
      message: "One post",
      data: onePost,
    });
  } catch (e) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// DELETE POST

exports.deletePost = async (req, res, next) => {
  if (
    req.user.payload.isAdmin === 1 ||
    req.body.post.userId === req.user.payload.id
  ) {
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
          data: post,
        });
      } catch (e) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
      }
    });
  }
};

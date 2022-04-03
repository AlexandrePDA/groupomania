require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

// appel des constantes des routes
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/likes.routes");

// éviter les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());


// routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);


app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

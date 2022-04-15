require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

// appel des constantes des routes
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const postRoutes = require("./routes/post.routes");


// éviter les erreurs de CORS
app.use(cors())


app.use(express.json());


// routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);


app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

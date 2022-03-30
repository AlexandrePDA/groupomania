const express = require('express')
const router = express.Router()

const post = require('../controllers/post.controllers')
const auth = require('../middleware/auth.middleware')
const multer = require('../middleware/multer-config.middleware')

// create / post
router.post('/createPost', auth, multer, post.createPost)

// read / get 
router.get('/post', auth, post.allPost)
router.get('/post/onePost/:id', auth, post.onePost)

// delete 
router.delete('/post/delete/:id', auth, post.deletePost)

module.exports = router;
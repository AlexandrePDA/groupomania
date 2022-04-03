const express = require('express')
const router = express.Router()

const post = require('../controllers/post.controllers')
const auth = require('../middleware/auth.middleware')
const multer = require('../middleware/multer-config.middleware')
const likesRoutes = require('./likes.routes')
const commentsRoutes = require('./comment.routes')

// create / post
router.post('/', auth, multer, post.createPost)

// read / get 
router.get('/', auth, post.allPost)
router.get('/:id', auth, post.onePost)

// delete 
router.delete('/:id', auth, post.deletePost)

router.use('/:postId/likes', likesRoutes)
router.use('/:postId/comments', commentsRoutes)

module.exports = router;
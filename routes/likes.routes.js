const express = require('express')
const router = express.Router()

const likes = require('../controllers/likes.controllers')
const auth = require('../middleware/auth.middleware')

// create / post 
router.post('/like', auth, likes.addLike)

// read / get 
router.get('like/isLike', auth, likes.isLike)

// delete 
router.delete('/like/deteleLike/:id', auth, likes.deleteLike)

module.exports = router;
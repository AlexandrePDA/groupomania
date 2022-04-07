const express = require('express')
const router = express.Router({mergeParams: true})

const likes = require('../controllers/likes.controllers')
const auth = require('../middleware/auth.middleware')

// create / post 
router.post('/', auth, likes.addLike)

// read / get 
router.get('/', auth, likes.isLike)

// delete 
router.delete('/:id', auth, likes.deleteLike)

module.exports = router;
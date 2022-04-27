const express = require('express')
const router = express.Router({mergeParams: true})

const comment = require('../controllers/comment.controllers')
const auth = require('../middleware/auth.middleware')

// create / post 
router.post('/', auth, comment.createComment)

// get
router.get('/', auth, comment.allComm)

// delete 
router.delete('/:id', auth, comment.deleteComment)

module.exports = router;
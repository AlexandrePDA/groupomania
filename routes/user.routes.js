const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controllers')
const auth = require('../middleware/auth.middleware')

// create / post
router.post('/signup', user.signup)
router.post('/login', user.login)

// read / get
router.get('/user', auth, user.all)
router.get('/user/profile', auth, user.oneUserProfile)
router.get('/user/likes', auth, user.oneUser)

// delete
router.delete('/user/delete/:id', auth, user.deleteUser)
router.delete('/user/delete', auth, user.deleteOwn)

module.exports = router;
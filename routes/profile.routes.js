const express = require('express')
const router = express.Router()

const profile = require('../controllers/profile.controllers')
const auth = require('../middleware/auth.middleware')
const multer = require('../middleware/multer-config.middleware')

// read / get
router.get('/profile/:id', auth, profile.getProfile)

// update / put
router.put('/editProfileBio', auth, profile.editProfileBio)
router.put('/editProfile/Picture', auth, multer, profile.editProfilePicture)

module.exports = router;
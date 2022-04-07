const express = require('express')
const router = express.Router()

const profile = require('../controllers/profile.controllers')
const auth = require('../middleware/auth.middleware')
const multer = require('../middleware/multer-config.middleware')

// read / get
router.get('/:id', auth, profile.getProfile)

// update / put
router.put('/:id', auth, multer, profile.editProfile)


module.exports = router;
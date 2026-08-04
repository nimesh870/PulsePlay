const {createMusic , createAlbum , getAllMusic , getAllAlbums , getAlbumById} = require('../controllers/music.controller')
const express = require('express')
const {protect , authUser} = require('../middlewares/auth.middleware')
const multer = require('multer')

const router = express.Router()
const upload = multer({storage : multer.memoryStorage()})

router.post('/create-music' , protect , upload.single('music') ,  createMusic)
router.post('/album' , protect , createAlbum)
router.get('/listen-music' , authUser , getAllMusic)
router.get('/view-albums' , authUser , getAllAlbums)
router.get('/view-albums/:albumId' , authUser , getAlbumById)

module.exports = router;
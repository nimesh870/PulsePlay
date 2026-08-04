const musicModel = require('../models/music.models')
const albumModel = require('../models/album.models')
require('dotenv').config()
const uploadFiles = require('../services/storage.service')

const createMusic = async (req , res) => {
    try {

        const file = req.file;
        const {uri , title , artist} = req.body;

        if (!title || !artist) {
            return res.status(400).json({
                error : "Fill the required fields."
            })
        }

        if (!file) {
            return res.status(400).json({
                error : "File is required."
            })
        }

        const response = await uploadFiles(file.buffer.toString('base64'))

        if (!response || !response.url) {
            return res.status(500).json({
                error : "File upload failed."
            })
        }

        const music = await musicModel.create({
                uri : response.url,
                title,
                artist : req.user._id
            })

        res.status(201).json({
                message : "Music created successfully.",
                music
            })

    } catch (error) {
        res.status(500).json({
            error : "Cannot create Music",
            details : error.message
        })
    }
}

const createAlbum = async (req , res) => {
    try {
        const {title , musics , artist} = req.body;

        if (!title) {
            return res.status(400).json({
                error : "Fill the required fields."
            })
        }

        const musicIds = musics && Array.isArray(musics) ? musics : [];

        if (musicIds.length > 0) {
            const existingMusics = await musicModel.find({
                _id : { $in: musicIds }
            });

            if (existingMusics.length !== musicIds.length) {
                return res.status(400).json({
                    error: "One or more music IDs are invalid"
                });
            }
        }

        const album = await albumModel.create({
            title,
            artist : req.user._id,
            musics : musicIds
        })

        res.status(201).json({
            message : "Album created successfully.",
            album
        })


    } catch (error) {
        res.status(500).json({
            error : "Cannot create album",
            details : error.message
        })
    }
}

const addMusicToAlbum = async (req , res) => {
    try {
        const { albumId } = req.params;
        const file = req.file;
        const { title } = req.body;

        if (!albumId) {
            return res.status(400).json({
                error : "Album id is required."
            })
        }

        if (!title) {
            return res.status(400).json({
                error : "Music title is required."
            })
        }

        if (!file) {
            return res.status(400).json({
                error : "File is required."
            })
        }

        const album = await albumModel.findById(albumId);

        if (!album) {
            return res.status(404).json({
                error : "No album found."
            })
        }

        const response = await uploadFiles(file.buffer.toString('base64'))

        if (!response || !response.url) {
            return res.status(500).json({
                error : "File upload failed."
            })
        }

        const music = await musicModel.create({
            uri : response.url,
            title,
            artist : req.user._id
        })

        album.musics.push(music._id)
        await album.save()

        const populated = await albumModel.findById(albumId)
            .populate('artist', 'username email')
            .populate('musics');

        res.status(201).json({
            message : "Music added to album successfully.",
            album : populated
        })

    } catch (error) {
        res.status(500).json({
            error : "Cannot add music to album",
            details : error.message
        })
    }
}

const getAllMusic = async (req , res) => {
    try {
        const fetchMusic = await musicModel.find()

        if (fetchMusic.length === 0) {
            return res.status(200).json({
                message : "No music found in database."
            })
        }

        res.status(200).json({
            message : "Music fetched successfully.",
            fetchMusic
        })
        
    } catch (error) {
        res.status(500).json({
            message : "Cannot get music",
            details : error.message
        })
    }
}

const getAllAlbums = async (req , res) => {
    try {
        const albums = await albumModel.find().select("title artist").populate("artist" , "username email")

        if (albums.length === 0) {
            return res.status(200).json({
                error : "No albums yet.",
                albums : []
            })
        }

        res.status(200).json({
            message : "Albums fetched.",
            albums
        })

    } catch (error) {
        res.status(500).json({
            error : "Cannot get albums.",
            details : error.message
        })
    }
}

const getAlbumById = async (req , res) => {
    try {
        const id = req.params.albumId

        if (!id) {
            return res.status(404).json({
                error : "Album id not found."
            })
        }

            const album = await albumModel.findById(id)
                .populate('artist', 'username email')
                .populate('musics');

        if (!album) {
            return res.status(404).json({
                error : "No album found."
            })
        }

        res.status(200).json({
            message : "Album fetched successfully.",
            album
        })

    } catch (error) {
        res.status(500).json({
            error : "No albums found with the specified id.",
            details : error.message
        })
    }
}


module.exports = {createMusic , createAlbum , getAllMusic , getAllAlbums , getAlbumById , addMusicToAlbum};
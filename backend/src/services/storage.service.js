const {ImageKit} = require('@imagekit/nodejs')
require('dotenv').config()

const client = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
})

const uploadFiles = async (file) => {
    const response = await client.files.upload({
        file,
        fileName : 'music',
        folder : 'Music'
    })

    return response;
}

module.exports = uploadFiles;
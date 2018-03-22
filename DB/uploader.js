const cloudinary = require('cloudinary').v2;
const util = require('util');
const config = {
    /*cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET*/
    cloud_name: 'dmhct74md',
    api_key: '573615981686539',
    api_secret: 'Ep5FhH0bJ6ZaSaHvCouqBUZYcIY'
};
cloudinary.config(config);
const Upload = util.promisify(cloudinary.uploader.upload);
const Resources = util.promisify(cloudinary.api.resources);
const Delete = util.promisify(cloudinary.api.delete_resources);
const Image = util.promisify(cloudinary.image);

module.exports = {Upload,Resources,Delete,Image};
import AWS from 'aws-sdk';

const doSpaces = new AWS.S3({
    endpoint: 'https://blr1.digitaloceanspaces.com',
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET
});

const deleteImageFromDigitalOceanSpaces = (key) => {
    const params = {
        Bucket: 'amritevents',
        Key: `twinupload/${key}`
    };

    return new Promise((resolve, reject) => {
        doSpaces.deleteObject(params, (err, data) => {
            if (err) {
                console.error("Error deleting object from DigitalOcean Spaces:", err);
                reject(err);
            } else {
                console.log("Deletion successful");
                resolve();
            }
        });
    });
};

export default deleteImageFromDigitalOceanSpaces ;

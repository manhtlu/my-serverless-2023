const AWS = require('aws-sdk')

const s3Client = new AWS.S3();

const S3 = {
    async write(data, fileName, bucket) {
        const params = {
            Bucket: bucket,
            Body: JSON.stringify(data),
            Key: fileName,
        };
        console.log("S3 client")
        console.log(params)
        const newData = await s3Client.putObject(params).promise();

        if (!newData) {
            throw Error('there was an error writing the file');
        }

        return newData;
    },

    async get(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName
        }

        let data = await s3Client.getObject(params).promise();

        if (!data) {
            throw Error('there was an error writing the file');
        }

        if (fileName.slice(fileName.length - 4, fileName.length) === 'json') {
            data = data.Body.toString();
        }

        return data;
    },
}

module.exports = S3;
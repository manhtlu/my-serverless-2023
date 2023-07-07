const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')
const bucket = process.env.bucket

exports.handler = async (event) => {
    console.log('event', event)

    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Responses._400({
            message: 'Missing the fileName from the path'
        })
    }

    const fileName = event.pathParameters.fileName;
    const data = JSON.parse(event.body);
    console.log(`Start upload file ${fileName} to ${bucket}`)
    const newData = await S3.write(data, fileName, bucket).catch(err => {
        console.log("S3 write failed")
        console.log(err)
    })

    if (!newData) {
        return Responses._400({
            message: `Create file failed: ${fileName}`
        })
    }

    return Responses._200({newData});
}

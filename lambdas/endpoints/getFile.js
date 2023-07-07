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

    console.log(`Get file ${fileName} to ${bucket}`)
    const file = await S3.get(fileName, bucket).catch(err => {
        console.log("S3 get failed")
        console.log(err)
    })

    if (!file) {
        return Responses._400({
            message: `Get file failed: ${fileName}`
        })
    }

    return Responses._200({file});
}

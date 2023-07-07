const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async (event) => {
    console.log('event', event)

    if (!event.pathParameters || !event.pathParameters.id) {
        return Responses._400({
            message: 'Missing the ID from the path'
        })
    }

    const id = event.pathParameters.id;
    const user = JSON.parse(event.body);
    user.ID = id;

    const newUser = await Dynamo.write(user, tableName)
        .catch(error => {
            console.log("Error write to dynamo")
            console.log(error)
            return null
        })

    if (!newUser) {
        return Responses._400({
            message: 'Create failed'
        })
    }

    return Responses._200({newUser});
}

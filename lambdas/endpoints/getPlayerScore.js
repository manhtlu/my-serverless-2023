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
  console.log("GET USER BY ID:" + id + " FROM TABLE: " + tableName);
  const user = await Dynamo.get(id, tableName).catch(error => {
    console.log(error);
    return null;
  });

  console.log("Result");
  console.log(user);
  if (!user) {
    return Responses._400({
      message: 'Not found'
    })
  }

  return Responses._200(user);
}

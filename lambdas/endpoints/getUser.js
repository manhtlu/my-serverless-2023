const Responses = require('../common/API_Responses')

exports.handler = async (event) => {
  console.log('event', event)

  if (!event.pathParameters || !event.pathParameters.id) {
    return Responses._400({
      message: 'Missing the ID from the path'
    })
  }

  const id = event.pathParameters.id;

  if (data[id]) {
    return Responses._200(data[id])
  }

  return Responses._400({
    message: 'Not found'
  })
}

const data = {
  1234: { name: 'ManhNT', age: 25, job: 'Developer'},
  1235: { name: 'LOL', age: 25, job: 'Journalist'},
}
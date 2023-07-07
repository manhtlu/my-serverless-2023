const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, TableName) {
    const parameters = {
      TableName,
      Key: {
        ID
      }
    };

    const data = await documentClient.get(parameters)
    .promise()
    .then(data => {
      console.log(data.Item)
      return data;
    })
    .catch(err => {
      console.log("Loi cmnr");
      console.log(err);
      throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
    })

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
    }
    return data.Item;
  },

  async write (data, TableName) {
    if (!data.ID) {
      throw Error("no ID on the data")
    }

    const params = {
      TableName,
      Item: data
    }

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error putting the data for ID of ${data.ID} to ${TableName}`);
    }

    return data;
  }
}

module.exports = Dynamo;
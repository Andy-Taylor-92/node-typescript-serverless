import AWS from 'aws-sdk';
import dotenv from 'dotenv';
// get environment variables from .env

dotenv.config();
let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

export const dynamoDB = {
  async get(id: string, TableName: string): Promise<any> {
    const params = {
      TableName,
      Key: {
        id,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for id ${id} from ${TableName}`);
    }

    return data.Item;
  },

  async write(data: any, TableName: string): Promise<any> {
    if (!data.id) {
      throw Error('missing id in data');
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting ${data} into table ${TableName}`);
    }

    return data;
  },
};

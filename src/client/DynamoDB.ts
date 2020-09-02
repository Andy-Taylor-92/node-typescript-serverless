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
  async get(id: string, tableName: string): Promise<Record<string, unknown>> {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for id ${id} from ${tableName}`);
    }

    return data.Item;
  },

  async write(data: Record<string, unknown>, tableName: string): Promise<Record<string, unknown>> {
    if (!data.id) {
      throw Error('id missing in data');
    }

    const params = {
      TableName: tableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting ${data} into table ${tableName}`);
    }

    return data;
  },

  async scan(tableName: string): Promise<Array<Record<string, unknown>>> {
    const params = {
      TableName: tableName,
    };

    const res = await documentClient.scan(params).promise();

    return res.Items;
  },
};

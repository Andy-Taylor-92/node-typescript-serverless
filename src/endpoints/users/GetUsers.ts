import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { dynamoDB } from '../../client/DynamoDB';
import 'source-map-support/register';

const tableName = 'users-table';

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const user = await dynamoDB.scan(tableName);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Unable to process request' }),
    };
  }
};

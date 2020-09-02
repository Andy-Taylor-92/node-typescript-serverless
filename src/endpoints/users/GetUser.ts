import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { dynamoDB } from '../../client/DynamoDB';
import 'source-map-support/register';

const tableName = 'users-table';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters.id;
  try {
    const user = await dynamoDB.get(id, tableName);
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

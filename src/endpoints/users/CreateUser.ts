import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { dynamoDB } from '../../client/DynamoDB';
import { v4 } from 'uuid';
import 'source-map-support/register';

const tableName = 'users-table';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const id = v4();
  const user = JSON.parse(event.body);
  user.id = id;

  try {
    const newUser = await dynamoDB.write(user, tableName);
    return {
      statusCode: 200,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Unable to process request' }),
    };
  }
};

import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { dynamoDB } from '../../client/DynamoDB';
import { v4 } from 'uuid';
import 'source-map-support/register';

const tableName = 'users-table';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const id = v4();
  const user = JSON.parse(event.body);
  user.id = id;

  const newUser = await dynamoDB.write(user, tableName).catch((err: any) => {
    console.log('error in dynamo write', err);
    return {
      statusCode: 400,
      body: { message: 'Unable to process request' },
    };
  });

  return {
    statusCode: 201,
    body: JSON.stringify(newUser),
  };
};

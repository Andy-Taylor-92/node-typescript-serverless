import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDB } from '../../client/DynamoDB';

import 'source-map-support/register';

const tableName = 'users-table';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters.id;

  const user = await DynamoDB.get(id, tableName).catch((err: any) => {
    console.log('error in Dynamo get', err);
    return {
      statusCode: 400,
      body: { message: 'Unable to process request' },
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};

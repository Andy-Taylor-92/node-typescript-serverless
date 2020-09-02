import { handler } from '../../../src/endpoints/users/GetUser';
import { dynamoDB } from '../../../src/client/DynamoDB';
import { v4 } from 'uuid';
import { APIGatewayProxyEvent } from 'aws-lambda';
import createEvent from '@serverless/event-mocks';

describe('Test GetUser', () => {
  test('should  200 with user details', async () => {
    const user: any = await dynamoDB.write(
      {
        id: v4(),
        name: 'Anna',
      },
      'users-table'
    );
    const params: any = {
      pathParametersObject: {
        id: user.id,
      },
    };
    const event: APIGatewayProxyEvent = createEvent('aws:apiGateway', params);

    const res: any = await handler(event, null, null);

    expect(res.statusCode).toBe(200);
  });
});

import { handler } from '../../../src/endpoints/users/CreateUser';
import createEvent from '@serverless/event-mocks';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Test CreateUser', () => {
  test('should return 201 with the user details', async () => {
    const params: any = {
      body: JSON.stringify({
        name: 'Anna',
      }),
    };
    const event: APIGatewayProxyEvent = createEvent('aws:apiGateway', params);

    const res: any = await handler(event, null, null);

    expect(res.statusCode).toBe(201);
  });
});

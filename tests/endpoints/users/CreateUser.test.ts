import { handler } from '../../../src/endpoints/users/CreateUser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

describe('Test CreateUser', () => {
  test('should return 201 with the users details', async () => {
    const params: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify({
        name: 'Anna',
      }),
    };
    const event: APIGatewayProxyEvent = <APIGatewayProxyEvent>params;

    const res: void | APIGatewayProxyResult = await handler(event, null, null);

    if (res) {
      expect(res.statusCode).toBe(201);
    } else {
      throw new Error('CreateUser failed to return with a response');
    }
  });
});

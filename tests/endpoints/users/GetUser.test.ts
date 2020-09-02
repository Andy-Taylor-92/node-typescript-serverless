import { handler } from '../../../src/endpoints/users/GetUser';
import { dynamoDB } from '../../../src/client/DynamoDB';
import { v4 } from 'uuid';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const tableName = 'users-table';

describe('Test GetUser', () => {
  test('should  200 with the users details', async () => {
    const user: Record<string, unknown> = await dynamoDB.write(
      {
        id: v4(),
        name: 'Anna',
      },
      tableName
    );
    const params: Partial<APIGatewayProxyEvent> = {
      pathParameters: {
        id: <string>user.id,
      },
    };
    const event: APIGatewayProxyEvent = <APIGatewayProxyEvent>params;

    const res: void | APIGatewayProxyResult = await handler(event, null, null);

    if (res) {
      expect(res.statusCode).toBe(200);
    } else {
      throw new Error('GetUser failed to return with a response');
    }
  });
});

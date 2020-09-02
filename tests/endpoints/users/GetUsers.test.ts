import { handler } from '../../../src/endpoints/users/GetUsers';
import { dynamoDB } from '../../../src/client/DynamoDB';
import { v4 } from 'uuid';
import { APIGatewayProxyResult } from 'aws-lambda';

const tableName = 'users-table';

describe('Test GetUsers', () => {
  test('should  200 with all user details', async () => {
    await dynamoDB.write(
      {
        id: v4(),
        name: 'Anna',
      },
      tableName
    );

    const res: void | APIGatewayProxyResult = await handler(null, null, null);

    if (res) {
      expect(res.statusCode).toBe(200);
    } else {
      throw new Error('GetUsers failed to return with a response');
    }
  });
});

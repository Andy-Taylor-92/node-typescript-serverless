module.exports = {
  tables: [
    {
        TableName: 'users-table',
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        BillingMode: 'PAY_PER_REQUEST',
    },
  ],
};
import path = require('path');
import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless',
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        dbPath: path.join(__dirname, 'offline/data/'),
        migrate: true,
      },
      migration: {
        dir: 'offline/migrations',
      },
    },
  },
  plugins: ['serverless-webpack', 'serverless-plugin-typescript', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    stage: 'dev',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    GreateUser: {
      handler: 'src/endpoints/users/CreateUser.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'users',
          },
        },
      ],
    },
    GetUser: {
      handler: 'src/endpoints/users/GetUser.handler',
      events: [
        {
          http: {
            method: 'GET',
            path: 'users/{id}',
          },
        },
      ],
    },
    GetUsers: {
      handler: 'src/endpoints/users/GetUsers.handler',
      events: [
        {
          http: {
            method: 'GET',
            path: 'users',
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      usersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'users-table',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;

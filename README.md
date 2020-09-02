This application was created to research how Node-TypeScript lambdas interacting with a DynamoDB could be written and tested locally.

**Requirements:**
- node v12.18.3

**Install & Build:**
- `npm i`
- `npm run build`

**Run:**
- `npm start`
- ```
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name": "Peter Griffin"}' \
  http://localhost:3000/dev/users
  ```
- `curl --request GET http://localhost:3000/dev/users/<ID-FROM-POST-RESPONSE>`
- a runtime debugger in VS code can be attached using the config in `.vscode/launch.json` (the application must first be running for this to work)

**Test:**
- `npm run test -- --coverage`
- a testing debugger can also be found in `.vscode/launch.json` (the application does not have to be running to debug tests)

**IDE (VSCode):**
- install `ESLint` and `Prettier - Code formatter` plugins in VSCode (an "allow Eslint to run" prompt will appear - click yes)

**Issues**
- To run and test locally, a schema must be defined in several places (this should be consolidated into one importable file for re-use [DRY]):
  - `serverless.ts` (for production)
  - `offline/migrations/*.json` (for local development)
  - `jest-dynamodb-config.js` (for local testing)
**Requirements:**
- node v12.18.3
- serverless (`npm install -g serverless`)

**Install:**
- `npm i`
- `sls dynamodb install`

**Run:**
- `sls offline start --location .`
- ```
  curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name": "Peter Griffin"}' \
  http://localhost:3000/dev/users
  ```
- `curl --request GET http://localhost:3000/dev/users/<ID-FROM-POST-RESPONSE>`

**Development:**
- install `ESLint` and `Prettier - Code formatter` plugins in VSCode (an "allow Eslint to run" prompt will appear - click yes)
- a debugger in VS code can be attached using the config in `.vscode/launch.json` (the application must first be running for this to work)

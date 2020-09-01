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
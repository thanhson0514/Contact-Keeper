# Contact Keeper

> Full stack MERN contact manager with React hooks, context & JWT authentication.

## Usage

Install dependencies

```bash
npm install
cd client
npm install
```

### Mongo connection setup and key access token

*Creat file ```.env```.
*Create key "MONGO_URI" and value get from <a href="https://cloud.mongodb.com/">https://cloud.mongodb.com/</a>
*Create key "ACCESS_TOKEN_SECRET" and get random value

### Run Server

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```

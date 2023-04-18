import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

// console.log('uri', uri)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let cachedClient = null

export async function connect() {
  if (cachedClient && cachedClient instanceof MongoClient && cachedClient.isConnected()) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, options);

  cachedClient = client;
  return client;
}
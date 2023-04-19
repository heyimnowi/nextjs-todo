import { MongoClient, MongoClientOptions } from 'mongodb'

const username = process.env.NEXT_PUBLIC_MONGODB_USERNAME
const password = process.env.NEXT_PUBLIC_MONGODB_PASSWORD
const cluster = process.env.NEXT_PUBLIC_MONGODB_CLUSTER

const connectionString = `mongodb+srv://${username}:${password}@${cluster}.0w2evi4.mongodb.net/?retryWrites=true&w=majority`

const mongoOptions = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

const options: MongoClientOptions = {
	...({} as MongoClientOptions),
	...mongoOptions
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!username || !password || !cluster) {
	throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(connectionString, options)
		global._mongoClientPromise = client.connect()
	}
	clientPromise = global._mongoClientPromise
} else {
	client = new MongoClient(connectionString, options)
	clientPromise = client.connect()
}

export default clientPromise
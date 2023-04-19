import { MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string

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

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
	throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options)
		global._mongoClientPromise = client.connect()
	}
	clientPromise = global._mongoClientPromise
} else {
	client = new MongoClient(uri, options)
	clientPromise = client.connect()
}

export default clientPromise
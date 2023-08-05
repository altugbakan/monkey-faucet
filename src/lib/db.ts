import { MongoClient } from 'mongodb';
import { DB_CONN_STRING, DB_NAME } from '$env/static/private';

const client = new MongoClient(DB_CONN_STRING);
await client.connect();

export default client.db(DB_NAME);

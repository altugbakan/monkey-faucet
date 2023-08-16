import { MongoClient } from 'mongodb';
import { DB_CONN_STRING, DB_NAME } from '$env/static/private';
import type { Chat } from './models/chat';
import { DAY_IN_MILLISECONDS } from './constants';

const client = new MongoClient(DB_CONN_STRING);
await client.connect();

const db = client.db(DB_NAME);
const chatCollection = db.collection<Chat>('chats');

export async function getLatestChat(address: string): Promise<Chat | null> {
	const document = await chatCollection.findOne<Chat>({ address }, { sort: { _id: -1 } });

	// If the chat is finished and the last message was sent more than 24 hours ago, return null
	if (document?.finished && document.lastUpdated.getTime() < Date.now() - DAY_IN_MILLISECONDS) {
		return null;
	}

	return document;
}

export async function addChat(chat: Chat): Promise<void> {
	await chatCollection.insertOne(chat);
}

export async function updateChat(chat: Chat): Promise<void> {
	await chatCollection.replaceOne({ _id: chat._id }, chat);
}

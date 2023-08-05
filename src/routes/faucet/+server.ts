import { getResponse } from '$lib/ai';
import { sendBanano } from '$lib/banano.js';
import { BANANO_REGEX, DEFAULT_BUBBLE, SYSTEM_MESSAGE } from '$lib/constants';
import db from '$lib/db';
import type { Chat, Message } from '$lib/models/chat';
import { json } from '@sveltejs/kit';
import type { Collection } from 'mongodb';

interface PostRequestBody {
	message: string;
	address: string;
}

function buildInitialMessages(): Message[] {
	return [
		{
			role: 'system',
			content: SYSTEM_MESSAGE
		},
		{
			role: 'assistant',
			content: DEFAULT_BUBBLE.message
		}
	];
}

export async function POST({ request }): Promise<Response> {
	const { message, address } = (await request.json()) as PostRequestBody;

	if (!BANANO_REGEX.test(address)) {
		return new Response('Invalid address', {
			status: 400
		});
	}

	const chatCollection: Collection<Chat> = db.collection('chats');
	const document = await chatCollection.findOne<Chat>({ address }, { sort: { _id: -1 } });
	let messages: Message[] = [];

	if (!document) {
		messages = buildInitialMessages();
		await chatCollection.insertOne({
			address,
			messages,
			lastUpdated: new Date(),
			finished: false
		});
	} else {
		messages = document.messages;
	}

	messages.push({
		role: 'user',
		content: message
	});

	const response = await getResponse(messages);
	messages.push(response.message);

	await chatCollection.updateOne(
		{ address },
		{ $set: { address, messages: messages, lastUpdated: new Date() } },
		{ upsert: true }
	);

	if (response.functionCall) {
		if (response.functionCall.name === 'supply') {
			sendBanano(address);
		}
		await chatCollection.updateOne({ address }, { $set: { finished: true } });
	}

	return json({ message: messages.at(-1) }, { status: 200 });
}

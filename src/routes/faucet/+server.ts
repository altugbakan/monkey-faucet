import { getResponse } from '$lib/ai';
import { sendBanano } from '$lib/banano.js';
import { BANANO_REGEX, DEFAULT_BUBBLE, SYSTEM_MESSAGE } from '$lib/constants';
import { addChat, getLatestChat, updateChat } from '$lib/db';
import type { Message } from '$lib/models/chat';
import { json } from '@sveltejs/kit';

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

	let chat = await getLatestChat(address);

	if (!chat) {
		chat = {
			address,
			messages: buildInitialMessages(),
			lastUpdated: new Date(),
			finished: false
		};
		await addChat(chat);
	}

	chat.messages.push({
		role: 'user',
		content: message
	});
	const response = await getResponse(chat.messages);
	chat.messages.push({
		role: 'assistant',
		content: response.message.content
	});

	await updateChat({
		...chat,
		lastUpdated: new Date(),
		finished: response.decision === undefined ? false : true
	});

	if (response.decision) {
		await sendBanano(address);
	}

	return json({ message: response.message, decision: response.decision }, { status: 200 });
}

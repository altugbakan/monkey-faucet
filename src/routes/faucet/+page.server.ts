import { BANANO_REGEX, FAUCET_ADDRESS } from '$lib/constants';
import { error, redirect } from '@sveltejs/kit';
import db from '$lib/db';
import type { Chat } from '$lib/models/chat';
import type { BubbleProps } from '$lib/components/chat/Bubble.svelte';
import type { Message } from '$lib/models/chat';

export interface FaucetDataResponse {
	address: string;
	bubbles?: BubbleProps[];
}

export async function load({ url }: { url: URL }): Promise<FaucetDataResponse> {
	const address = url.searchParams.get('address');
	if (!address || !BANANO_REGEX.test(address)) {
		throw error(400, 'Invalid address');
	}

	const chat = await db.collection('chats').findOne<Chat>({ address });
	const dayInSecs = 60 * 60 * 24;

	if (!chat) {
		return { address };
	} else if (!chat.finished) {
		const bubbles: BubbleProps[] = chat.messages
			.filter((m) => m.role !== 'system')
			.map((message: Message, index: number) => ({
				id: index,
				host: message.role === 'assistant' ? true : false,
				address: message.role === 'assistant' ? FAUCET_ADDRESS : address,
				name: message.role === 'assistant' ? 'Faucet MonKey' : 'You',
				message: message.content,
				color: message.role === 'assistant' ? 'variant-soft-primary' : 'variant-soft-secondary'
			}));
		return { address, bubbles };
	} else if (chat.finished && chat.lastUpdated.getTime() + dayInSecs * 1000 < Date.now()) {
		return { address };
	}

	throw redirect(303, '/faucet/already-claimed');
}

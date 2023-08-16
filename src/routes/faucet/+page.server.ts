import { BANANO_REGEX, CAPTCHA_VERIFY_URL } from '$lib/constants';
import { error, redirect } from '@sveltejs/kit';
import type { BubbleProps } from '$lib/components/chat/Bubble.svelte';
import type { Message } from '$lib/models/chat';
import { PUBLIC_FAUCET_ADDRESS } from '$env/static/public';
import { CAPTCHA_SECRET } from '$env/static/private';
import { getLatestChat } from '$lib/db';

export interface FaucetDataResponse {
	address: string;
	bubbles?: BubbleProps[];
}

export async function load({ url }: { url: URL }): Promise<FaucetDataResponse> {
	const address = url.searchParams.get('address');
	if (!address || !BANANO_REGEX.test(address)) {
		throw error(400, 'Invalid address');
	}

	const token = url.searchParams.get('token');
	if (!token) {
		throw error(400, 'Invalid token');
	}

	const response = await fetch(CAPTCHA_VERIFY_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `secret=${CAPTCHA_SECRET}&response=${token}`
	});

	const score: number = (await response.json()).score;

	if (!score || score < 0.7) {
		throw error(400, 'Invalid captcha');
	}

	const chat = await getLatestChat(address);

	if (!chat) {
		return { address };
	} else if (!chat.finished) {
		const bubbles: BubbleProps[] = chat.messages
			.filter((m) => m.role !== 'system')
			.map((message: Message, index: number) => ({
				id: index,
				host: message.role === 'assistant' ? true : false,
				address: message.role === 'assistant' ? PUBLIC_FAUCET_ADDRESS : address,
				name: message.role === 'assistant' ? 'Faucet MonKey' : 'You',
				message: message.content,
				color: message.role === 'assistant' ? 'variant-soft-primary' : 'variant-soft-secondary'
			}));
		return { address, bubbles };
	}

	throw redirect(303, '/faucet/already-claimed');
}

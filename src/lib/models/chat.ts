import type { ObjectId } from 'mongodb';

export interface Chat {
	id?: ObjectId;
	address: string;
	lastUpdated: Date;
	messages: Message[];
	finished: boolean;
}

export interface Message {
	role: 'user' | 'system' | 'assistant';
	content: string;
}

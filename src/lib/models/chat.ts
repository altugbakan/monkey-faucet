import type { ObjectId } from 'mongodb';

export interface Chat {
	_id?: ObjectId;
	address: string;
	lastUpdated: Date;
	messages: Message[];
	finished: boolean;
}

export interface Message {
	role: 'user' | 'system' | 'assistant';
	content: string;
}

import { Configuration, OpenAIApi, type ChatCompletionRequestMessageFunctionCall } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Message } from './models/chat';
import { FUNCTIONS } from './constants';
import { error } from '@sveltejs/kit';

interface GptResponse {
	message: Message;
	functionCall?: ChatCompletionRequestMessageFunctionCall;
}

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function getResponse(messages: Message[]): Promise<GptResponse> {
	const chatCompletion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages
	});

	const message = chatCompletion.data.choices[0].message;
	if (!message || !message.content) {
		throw error(500, 'No message content found in OpenAI response');
	}

	const functionCall = chatCompletion.data.choices[0].message?.function_call;

	return {
		message: {
			role: message.role as 'assistant',
			content: message.content
		},
		functionCall
	};
}

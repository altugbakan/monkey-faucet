import { Configuration, OpenAIApi, type ChatCompletionRequestMessageFunctionCall } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Message } from './models/chat';
import { FUNCTIONS } from './constants';
interface GptResponse {
	message: Message;
	decision?: boolean;
}

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

function shortenMessages(messages: Message[]): Message[] {
	// Return a maximum of 10 messages including the system message
	if (messages.length <= 10) {
		return messages;
	}

	const shortenedMessages = messages.slice(messages.length - 10);
	shortenedMessages[0] = messages[0];

	return shortenedMessages;
}

export async function getResponse(messages: Message[]): Promise<GptResponse> {
	messages = shortenMessages(messages);
	const chatCompletion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo-0613',
		functions: FUNCTIONS,
		messages
	});

	const message = chatCompletion.data.choices[0].message!;

	const functionCall = message.function_call;
	let decision;

	if (functionCall && functionCall.name === 'terminate' && functionCall.arguments) {
		decision = JSON.parse(functionCall.arguments).send === 'yes';
	}

	return {
		message: {
			role: 'assistant',
			content:
				message.content ??
				(decision
					? 'Thank you for being a good MonKey! I will send you some Bananos now.'
					: 'Bad MonKeys get no Banano.')
		},
		decision
	};
}

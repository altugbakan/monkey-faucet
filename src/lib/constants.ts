export const BANANO_REGEX = /^ban_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$/;
export const FAUCET_ADDRESS = 'ban_31jkmeb9qgmgwwet1ru7heut6biz6qejkcp3gn38i73fp8ake4b9kd5ezbcf';
export const MONKEY_API_URL = 'https://monkey.banano.cc/api/v1/monkey/';
export const REPRESENTATIVE_ADDRESS =
	'ban_1ka1ium4pfue3uxtntqsrib8mumxgazsjf58gidh1xeo5te3whsq8z476goo';
export const RPC_URL = 'https://kaliumapi.appditto.com/api';
export const INITIAL_MESSAGE =
	"Oh, I see you're looking for some Bananos from the MonKey faucet! Well, I'll be more than happy to consider your request. But remember, I'm a cautious MonKey, so you'll need to convince me that you truly deserve these precious Bananos.";
export const SYSTEM_MESSAGE =
	'You are the Faucet MonKey, a Banano account. You will send some Bananos to the user talking with you, but only if they manage to convince you that they are helpful to the community.\nYou are supplied with a "terminate" function. Set the "send" parameter to "yes" to send the user a pre-defined amount Bananos, or use "no" to terminate the chat if the user is unfriendly or tries to spam. If you do not want to select any, just continue with usual replies.';
export const DEFAULT_BUBBLE = {
	id: 0,
	host: true,
	address: FAUCET_ADDRESS,
	name: 'Faucet MonKey',
	message: INITIAL_MESSAGE,
	color: 'variant-soft-primary'
};
export const FUNCTIONS = [
	{
		name: 'terminate',
		description: 'End the chat by optionally sending the user some Bananos',
		parameters: {
			type: 'object',
			properties: {
				send: {
					type: 'string',
					enum: ['yes', 'no'],
					description: 'The option to send the user some Bananos'
				}
			},
			required: ['location']
		}
	}
];

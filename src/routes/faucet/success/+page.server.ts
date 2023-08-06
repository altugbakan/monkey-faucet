import { getCurrentReward, getFaucetBalance } from '$lib/banano';

interface FaucetSuccessData {
	balance: number;
	reward: number;
}

export async function load(): Promise<FaucetSuccessData> {
	return {
		balance: await getFaucetBalance(),
		reward: await getCurrentReward()
	};
}

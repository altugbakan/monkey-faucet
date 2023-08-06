export async function getFaucetBalance(): Promise<number> {
	//TODO
	return 10.0;
}

export async function getCurrentReward(): Promise<number> {
	const balance = await getFaucetBalance();
	return Math.min(1, balance / 10);
}

export async function sendBanano(address: string) {
	//TODO
}

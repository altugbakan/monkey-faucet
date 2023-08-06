import { BANANO_SEED } from '$env/static/private';
import bananojs from '@bananocoin/bananojs';
import { FAUCET_ADDRESS, REPRESENTATIVE_ADDRESS, RPC_URL } from './constants';

bananojs.setBananodeApiUrl(RPC_URL);

export async function getFaucetBalance() {
	await receiveDeposits();
	let balance = await bananojs.getAccountBalanceRaw(FAUCET_ADDRESS);
	let parts = bananojs.getBananoPartsFromRaw(balance);
	return Number(parts.banano);
}

export async function getCurrentReward() {
	const balance = await getFaucetBalance();
	return Math.min(5, balance / 10);
}

export async function sendBanano(address) {
	await bananojs.sendBananoWithdrawalFromSeed(
		BANANO_SEED,
		0,
		address,
		(await getCurrentReward()).toFixed(2)
	);
}

async function receiveDeposits() {
	await bananojs.receiveBananoDepositsForSeed(BANANO_SEED, 0, REPRESENTATIVE_ADDRESS);
}

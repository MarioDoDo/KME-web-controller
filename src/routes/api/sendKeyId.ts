import { writable } from 'svelte/store';

export const newKeyId = writable('');
export const post = async ({ request }) => {
	const data = await request.json();
	newKeyId.set(data.keyID);
	let countValue;

	newKeyId.subscribe(value => {
		countValue = value;
	});

	console.log(countValue);
	return {
		status: 200
	};
};
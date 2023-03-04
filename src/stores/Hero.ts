import { writable } from 'svelte/store';

const hero = writable({
	visibilityPercentage: 100
});

export default hero;

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title: string;
	export let lang: string[];
	export let content: string;
	export let github: string = '';
	export let maxWidth: number | null = null;

	let calculated = false;

	let titleRef: HTMLElement;
	let wholeRef: HTMLElement;
	let windowWidth: number;
	let windowHeight: number;

	const baseSpeed = 0.0005;

	$: {
		if (titleRef && wholeRef) {
			if (!calculated) {
				dispatch('message', {
					type: 'width',
					width: titleRef.offsetWidth
				});
				calculated = true;
			}
			wholeRef.style.maxHeight = `${titleRef.offsetHeight + 4}px`;
			wholeRef.style.maxWidth = `${(maxWidth ?? titleRef.offsetWidth) + 4}px`;
		}
	}

	$: {
		if (wholeRef)
			wholeRef.style.transitionDuration = `${baseSpeed * Math.max(windowWidth, windowHeight)}s`;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<section
	class="project hover:!max-w-[90vw] hover:md:!max-w-[70vw] hover:lg:!max-w-[50vw] hover:!max-h-[100vh] hover:!whitespace-normal"
	bind:this={wholeRef}
>
	<h1 bind:this={titleRef} class="inline-block p-4">{title}</h1>
	<code class="text-left w-full">
		<ul>
			<li class="text-center text-info pb-2">Written in {lang.join(', ')}</li>
			{#each content.split('\n') as line}
				<li class="mx-4 text-left text-accent">{line}</li>
			{/each}
		</ul>
	</code>

	{#if github.length > 0}
		<div class="flex justify-evenly gap-2 w-full my-2">
			<a href={github}>
				<img alt="GitHub" src="/github.png" height="32" width="32" />
			</a>
		</div>
	{/if}
</section>

<style lang="postcss">
	.project {
		@apply text-secondary;
		@apply border-2 rounded-lg;
		@apply overflow-hidden;
		@apply transition-all ease-out;
		@apply grid-cols-2;
		@apply whitespace-nowrap;
	}
</style>

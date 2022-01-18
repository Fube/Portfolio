<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title: string;
	export let lang: string;
	export let content: string;
	export let extra: string = '';
	export let github: string = '';

	let titleRef: HTMLElement;
	let wholeRef: HTMLElement;

	$: {
		if (titleRef && wholeRef) {
			wholeRef.style.height = `${titleRef.offsetHeight + 4}px`;
			wholeRef.style.maxWidth = `${titleRef.offsetWidth + 4}px`;
			wholeRef.style.width = `${titleRef.offsetWidth + 4}px`;
		}
	}

	function engage() {
		dispatch('message', {
			type: 'mouseenter'
		});
	}

	function disengage() {
		dispatch('message', {
			type: 'mouseleave'
		});
	}
</script>

<div
	class={'project hover:!h-full hover:!w-full hover:!max-w-full hover:scale-110 ' + extra}
	bind:this={wholeRef}
	on:mouseenter={engage}
	on:mouseleave={disengage}
>
	<h4 bind:this={titleRef} class="mx-auto">{title}</h4>
	<code class="float-left text-left w-full">
		<ul>
			<li class="text-center text-info">Written in {lang}</li>
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
</div>

<style lang="postcss">
	.project {
		@apply text-secondary;
		@apply border-2 rounded-lg;
		@apply overflow-hidden;
		@apply transition-all duration-500 ease-out;
		@apply grid-cols-2;
		/* transition: width 500ms, max-width 500ms, height 1s ease-in-out; */
	}
</style>

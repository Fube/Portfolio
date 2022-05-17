<script lang="ts">
	import Icon from '@iconify/svelte';

	export let entries: TimelineEntry[] = [];
	export let vertical = false;
	export let carousel = false;

	let timeline: HTMLElement;

	let scrollLen: number = 200;
	function handleLeft() {
		timeline.scrollBy({
			top: 0,
			left: -scrollLen,
			behavior: 'smooth'
		});
	}

	function handleRight() {
		timeline.scrollBy({
			top: 0,
			left: scrollLen,
			behavior: 'smooth'
		});
	}

	let items: HTMLElement[] = [];

	let timelineWidth: number = 0;
	$: {
		void timelineWidth;

		let avg = 0;
		for (let i = 0; i < items.length; i++) {
			avg += items[i].offsetWidth;
		}
		avg /= items.length;
		scrollLen = avg;
	}
</script>

{#if vertical}
	<div class={carousel ? 'max-w-full h-36 carousel carousel-vertical p-6' : ''}>
		<ol class="relative border-l border-secondary-focus text-left">
			{#each entries as entry}
				<li class="mb-10 ml-4">
					<div
						class="absolute w-3 h-3 rounded-full -left-1.5 border border-primary-focus bg-primary-focus"
					/>
					<time class="mb-1 font-normal leading-none text-primary-focus text-sm"
						>{entry.date.toLocaleString('default', { month: 'long', year: 'numeric' })}
					</time>
					<h4 class="text-lg font-semibold text-secondary-focus">
						{entry.title}
					</h4>
					<p class="mb-4 text-base font-normal">
						{entry.body}
					</p>
				</li>
			{/each}
		</ol>
	</div>
{:else}
	<button aria-label="timeline-previous" on:click={handleLeft}>
		<Icon icon="akar-icons:chevron-left" width="45" />
	</button>
	<div
		class={carousel ? 'w-full sm:w-2/3 carousel rounded-box p-4' : ''}
		bind:this={timeline}
		bind:offsetWidth={timelineWidth}
	>
		<ol class="items-center flex text-left">
			{#each entries as entry, index}
				<li
					class="relative h-full w-[90vw] md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
					bind:this={items[index]}
				>
					<div class="flex items-center">
						<div class="pink-dot" />
						<div class="green-line" />
						{#if index === entries.length - 1}
							<div class="pink-dot" />
						{/if}
					</div>
					<div class="mt-3 pr-8">
						<h4 class="text-lg font-semibold text-primary-focus">
							{entry.title}
						</h4>
						<time class="block mb-2 text-sm font-semibold text-secondary-focus"
							>{entry.date.toLocaleString('default', { month: 'long', year: 'numeric' })}</time
						>
						<p class="text-base font-normal">
							{entry.body}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
	<button aria-label="timeline-next" on:click={handleRight}>
		<Icon icon="akar-icons:chevron-right" width="45" />
	</button>
{/if}

<style lang="postcss">
	.pink-dot {
		@apply z-10 justify-center items-center w-4 h-4 bg-primary-focus rounded-full;
	}

	.green-line {
		@apply w-full bg-secondary-focus h-0.5;
	}
</style>

<script lang="ts">
	export let entries: TimelineEntry[] = [];
	export let vertical = false;
	export let carousel = false;
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
					<h3 class="text-lg font-semibold text-secondary-focus">
						{entry.title}
					</h3>
					<p class="mb-4 text-base font-normal">
						{entry.body}
					</p>
				</li>
			{/each}
		</ol>
	</div>
{:else}
	<div class={carousel ? 'w-full sm:w-2/3 carousel rounded-box p-4' : ''}>
		<ol class="items-center flex text-left">
			{#each entries as entry, index}
				<li class="relative h-full w-[50vw] sm:w-[10vw]">
					<div class="flex items-center">
						<div class="pink-dot" />
						<div class="green-line" />
						{#if index === entries.length - 1}
							<div class="pink-dot" />
						{/if}
					</div>
					<div class="mt-3 pr-8">
						<h3 class="text-lg font-semibold text-primary-focus">
							{entry.title}
						</h3>
						<time class="block mb-2 text-sm font-semibold text-secondary-focus"
							>{entry.date.toLocaleString('default', { month: 'long', year: 'numeric' })}</time
						>
						<p class="text-base font-normal">
							Get started with dozens of web components and interactive elements.
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
{/if}

<style lang="postcss">
	.pink-dot {
		@apply z-10 justify-center items-center w-4 h-4 bg-primary-focus rounded-full;
	}

	.green-line {
		@apply w-full bg-secondary-focus h-0.5;
	}
</style>

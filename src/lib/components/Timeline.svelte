<script lang="ts">
	export let entries: TimelineEntry[] = [];
	export const vertical = false;
</script>

{#if vertical}
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
{:else}
	<ol class="items-center flex text-left">
		{#each entries as entry}
			<li class="relative">
				<div class="flex items-center">
					<div
						class="flex z-10 justify-center items-center w-6 h-6 bg-primary-focus rounded-full"
					/>
					<div class="flex w-full bg-secondary-focus h-0.5" />
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
{/if}

<script lang="ts">
	export let entries: TimelineEntry[] = [];
</script>

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

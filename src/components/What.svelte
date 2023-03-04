<script lang="ts">
	import ProjectC from './Project.svelte';

	let maxWidth: number | null = 0;
	export let projects: Project[] = [];
</script>


<h1 class="text-primary text-3xl sm:text-4xl text-left pl-6 sm:text-center sm:p-0">
        What I've done
</h1>
<div class="flex justify-center mt-8">
        <div class="projects hover:max-h-[100vh] hover:max-w-[100vw] transition-all flex flex-col gap-[1.5em]">
                {#each projects as project}
                        <div class="flex justify-center hover:scale-105 transition-all">
                                <ProjectC
                                        on:message={({ detail: { width } }) => (maxWidth = Math.max(maxWidth ?? 0, width))}
                                        {maxWidth}
                                        {...project}
                                />
                        </div>
                {/each}
        </div>
</div>

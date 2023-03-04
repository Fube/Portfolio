<script lang="ts">
    import Timeline from './Timeline.svelte';

    export let timeline: unknown[] = [];
</script>


<h1 class="text-primary text-3xl sm:text-4xl text-left pl-6 sm:text-center sm:p-0">
    Where I've been
</h1>

<div class="flex justify-center">
    <Timeline carousel entries={timeline} />
</div>


<style scoped lang="postcss">
    .projects {
            @apply flex flex-col gap-6;
            transition-timing-function: cubic-bezier(0.71, 0.3, 0.35, 0.73);
    }
</style>

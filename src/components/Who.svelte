<script lang="ts">
	export let about = [''];
</script>


<h1 class="text-primary text-3xl sm:text-4xl text-left pl-6 sm:text-center sm:p-0">
        Who Am I
</h1>
<div class="flex justify-center">
        <div class="w-fit text-justify p-6 flex flex-col gap-2 max-w-full sm:max-w-[45%]">
                {#each about as value}
                        <p class="even:text-secondary odd:text-primary">{value}</p>
                {/each}
        </div>
</div>

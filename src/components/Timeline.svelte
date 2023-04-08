<script lang="ts">
	import Icon from '@iconify/svelte';
        import SvelteMarkdown from 'svelte-markdown';

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

        function handleUp() {
            timeline.scrollBy({
                top: -(scrollLen || 200),
                left: 0,
                behavior: 'smooth',
            });
        }

        function handleDown() {
            timeline.scrollBy({
                top: scrollLen || 200,
                left: 0,
                behavior: 'smooth',
            });
        }

	let items: HTMLElement[] = [];

	let timelineWidth: number = 0;
	let timelineHeight: number = 0;
	$: {
		void timelineWidth;
                void timelineHeight;

		let avg = 0;
		for (let i = 0; i < items.length; i++) {
                        if (vertical) {
                            avg += items[i].offsetHeight;
                            continue;
                        }
			avg += items[i].offsetWidth;
		}
		avg /= items.length;
		scrollLen = avg;
	}

        let windowWidth: number = 0;
        let windowHeight: number = 0;
        $: {
            vertical = windowWidth < windowHeight;
            console.log(windowWidth, windowHeight);
        }
</script>


<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if vertical}
        <div class="flex flex-col">
            {#if carousel}
                <button aria-label="timeline-previous" class="mx-auto" on:click={handleUp}>
                    <Icon icon="akar-icons:chevron-up" width="45" />
                </button>
            {/if}
            <div class={carousel ? 'max-w-full carousel carousel-vertical p-6 max-h-[42vh]' : ''} bind:this={timeline}
		bind:offsetHeight={timelineHeight}
            >
                    <ol class="relative border-l border-secondary-focus text-left">
                            {#each entries as entry, index}
                                    <li class="mb-10 ml-4" bind:this={items[index]}>
                                            <div
                                                    class="absolute w-3 h-3 rounded-full -left-1.5 border border-primary-focus bg-primary-focus"
                                            />
                                            <time class="mb-1 font-normal leading-none text-primary-focus text-sm"
                                                    >{entry.date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                            </time>
                                            <h4 class="text-lg font-semibold text-secondary-focus">
                                                    {entry.title}
                                            </h4>
                                            <p class="mb-4 text-base font-normal timeline-body">
                                                <SvelteMarkdown source={entry.body} />
                                            </p>
                                    </li>
                            {/each}
                    </ol>
            </div>
            {#if carousel}
                <button aria-label="timeline-previous" class="mx-auto" on:click={handleDown}>
                    <Icon icon="akar-icons:chevron-down" width="45" />
                </button>
            {/if}
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
					<section class="mt-3 pr-8">
						<h1 class="text-lg font-semibold text-primary-focus">
							{entry.title}
						</h1>
						<time class="block mb-2 text-sm font-semibold text-secondary-focus"
							>{entry.date.toLocaleString('default', { month: 'long', year: 'numeric' })}</time
						>
						<p class="text-base font-normal timeline-body">
                                                        <SvelteMarkdown source={entry.body} />
						</p>
					</section>
				</li>
			{/each}
		</ol>
	</div>
	<button aria-label="timeline-next" on:click={handleRight}>
		<Icon icon="akar-icons:chevron-right" width="45" />
	</button>
{/if}

<style scoped lang="postcss">
	.pink-dot {
		@apply z-10 justify-center items-center w-4 h-4 bg-primary-focus rounded-full;
	}

	.green-line {
		@apply w-full bg-secondary-focus h-0.5;
	}

        :global(.timeline-body ul) {
            list-style: disc;
            margin-left: 1vw;
        }
</style>

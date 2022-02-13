<script context="module">
	export const load = async ({ fetch }) => {
		const url = `/index.json`;
		const response = await fetch(url);

		if (response.ok) {
			const props = await response.json();

			props.timeline = props.timeline.map((item) => {
				item.date = new Date(item.date);
				return item;
			});
			return {
				props
			};
		}
	};
</script>

<script>
	import Project from '$lib/components/Project.svelte';
	import Visibility from '$lib/components/Visibility.svelte';
	import { onMount } from 'svelte';
	import { Parallax, ParallaxLayer } from 'svelte-parallax';
	import Typewriter from 'svelte-typewriter';
	import { slide } from 'svelte/transition';
	import * as animateScroll from 'svelte-scrollto';
	import Timeline from '$lib/components/Timeline.svelte';
	import wrap from '$lib/utils/wrap';
	import getFlatPropertyFromClass from '$lib/utils/getFlatPropertyFromClass';

	let maxWidth = null;
	export let projects = [];
	export let whoAmI = ['developer'];
	export let about = [''];
	export let timeline = [];

	let parallax;
	const idToSection = {
		me: '#fakeIdHere',
		who: { selector: '#who', offset: 350 },
		what: { selector: '#what', offset: 220 },
		when: { selector: '#when', offset: 220 }
	};

	const navigables = {
		About: 'who',
		Projects: 'what',
		Timeline: 'when'
	};

	let percent = 100;

	onMount(() => {
		const target = window.location.hash.slice(1);
		pScrollTo(target);
	});

	function pScrollTo(target) {
		const n = { ...idToSection[target] };
		n.element = document.querySelector(n.selector);

		animateScroll.scrollTo({
			duration: 500,
			...n
		});
	}

	let hamburger;
	let dropDownTop = 56;

	$: {
		if (hamburger && 'getBoundingClientRect' in hamburger) {
			const bounds = hamburger.getBoundingClientRect();
			dropDownTop = bounds.top + bounds.height;
		}
	}
</script>

<div class="flex flex-col h-screen">
	<div>
		{#if percent < 10}
			<div
				in:slide={{ duration: 750 }}
				out:slide={{ duration: 750 }}
				class="sticky top-0 bg-secondary-content z-[99999]"
			>
				<div class="">
					<div
						class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box sm:rounded-none"
					>
						<!-- Hamburger -->
						<div class="flex-none dropdown block sm:hidden">
							<button class="btn btn-square btn-ghost" bind:this={hamburger}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block w-6 h-6 stroke-current"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
							<ul
								tabindex="0"
								class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
								style="top: {dropDownTop}px;"
							>
								{#each Object.entries(navigables) as [name, to]}
									<button on:click={wrap(pScrollTo, to)}>
										<div class="px-2 mx-2 text-left">
											<span class="text-lg">{name}</span>
										</div>
									</button>
								{/each}
							</ul>
						</div>

						<button on:click={wrap(pScrollTo, 'me')}>
							<div class="flex-1 px-2 mx-2">
								<Typewriter
									cursor={getFlatPropertyFromClass('color', 'text-secondary')}
									loop={99999999999}
								>
									<span class="text-2xl font-bold">Fube</span>
								</Typewriter>
							</div>
						</button>

						{#each Object.entries(navigables) as [name, to]}
							<button on:click={wrap(pScrollTo, to)}>
								<div class="flex-1 px-2 mx-2 hidden sm:block">
									<span class="text-lg">{name}</span>
								</div>
							</button>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<div class="mt-12">
			<Parallax sections={2.33} disabled={false} bind:this={parallax}>
				<ParallaxLayer>
					<section class="hero h-full">
						<div class="w-full text-center">
							<h2 class="mb-5 text-secondary text-sm">Hello there, I'm</h2>
							<Visibility steps={100} bind:percent>
								<h1 class="mb-3 text-6xl font-bold ml-2">Fube</h1>
							</Visibility>
							<h3 class="text-secondary">
								<span class="text-left">I'm a</span>
								<Typewriter loop cursor={getFlatPropertyFromClass('color', 'text-primary')}>
									{#each whoAmI as value}
										<span class="text-primary text-lg block text-center pl-3">{value}</span>
									{/each}
								</Typewriter>
							</h3>
							[Arrow down here]
						</div>
					</section>
				</ParallaxLayer>

				<main class="flex flex-col gap-6">
					<ParallaxLayer offset={0.99}>
						<section id="who" class="text-center">
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
						</section>

						<section id="what" class="text-center">
							<h1 class="text-primary text-3xl sm:text-4xl text-left pl-6 sm:text-center sm:p-0">
								What I've done
							</h1>
							<div class="flex justify-center mt-8">
								<div class="projects hover:max-h-[100vh] hover:max-w-[100vw] transition-all">
									{#each projects as project}
										<div class="flex justify-center hover:scale-105 transition-all">
											<Project
												on:message={({ detail: { width } }) =>
													(maxWidth = Math.max(maxWidth, width))}
												{maxWidth}
												{...project}
											/>
										</div>
									{/each}
								</div>
							</div>
						</section>

						<section id="when" class="text-center">
							<h1 class="text-primary text-3xl sm:text-4xl text-left pl-6 sm:text-center sm:p-0">
								Where I've been
							</h1>

							<div class="flex justify-center">
								<Timeline carousel entries={timeline} />
							</div>
						</section>
					</ParallaxLayer>
				</main>
			</Parallax>
		</div>
	</div>
</div>

<style scoped lang="postcss">
	.projects {
		@apply flex flex-col gap-6;
		transition-timing-function: cubic-bezier(0.71, 0.3, 0.35, 0.73);
	}
	section {
		min-height: 75vh;
	}
</style>

<script context="module">
	export const load = async ({ fetch }) => {
		const url = `/index.json`;
		const response = await fetch(url);

		if (response.ok) {
			const props = await response.json();
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

	let maxWidth = null;
	export let projects = [];
	export let whoAmI = ['developer'];
	export let about = [''];

	let parallax;
	const idToSection = {
		me: '#fakeIdHere',
		who: { selector: '#who', offset: 310 },
		what: { selector: '#what', offset: 200 }
	};

	let percent = 100;

	onMount(() => {
		const target = window.location.hash.slice(1);
		pScrollTo(target);
	});

	function wrap(fn, ...args) {
		return () => fn(...args);
	}

	function pScrollTo(target) {
		const n = { ...idToSection[target] };
		n.element = document.querySelector(n.selector);

		animateScroll.scrollTo({
			duration: 500,
			...n
		});
	}

	function getFlatPropertyFromClass(prop, className, fallback = undefined) {
		try {
			if (!window) return;
			return window
				.getComputedStyle(document.querySelector('.' + className))
				.getPropertyValue(prop);
		} catch (e) {
			return fallback;
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
						<!-- <div class="flex-none">
							<button class="btn btn-square btn-ghost">
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
						</div> -->
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
						<button on:click={wrap(pScrollTo, 'who')}>
							<div class="flex-1 px-2 mx-2">
								<span class="text-lg">About</span>
							</div>
						</button>
						<button on:click={wrap(pScrollTo, 'what')}>
							<div class="flex-1 px-2 mx-2">
								<span class="text-lg">Projects</span>
							</div>
						</button>
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
									{@html about
										.map((str) => `<p class="even:text-secondary odd:text-primary">${str}</p>`)
										.join('')}
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

						<section id="time" class="text-center">
							<h1 class="text-primary text-3xl sm:text-4xl text-left pl-6 sm:text-center sm:p-0">
								Where I've been
							</h1>

							<div class="flex justify-center">
								<!-- TODO: Add content -->
								<Timeline
									carousel
									entries={[
										{
											title: 'Started',
											date: new Date('2021-02'),
											body: 'I started working on Fube'
										},
										{
											title: 'Started',
											date: new Date('2020-01'),
											body: 'I started working on Fube'
										},
										{
											title: 'Started',
											date: new Date('2021-02'),
											body: 'I started working on Fube'
										},
										{
											title: 'Started',
											date: new Date('2020-01'),
											body: 'I started working on Fube'
										},
										{
											title: 'Started',
											date: new Date('2021-02'),
											body: 'I started working on Fube'
										},
										{
											title: 'Started',
											date: new Date('2020-01'),
											body: 'I started working on Fube'
										},
										{
											title: 'Started',
											date: new Date('2021-02'),
											body: 'I started working on Fube'
										},
										{
											title: 'Started',
											date: new Date('2020-01'),
											body: 'I started working on Fube'
										}
									]}
								/>
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

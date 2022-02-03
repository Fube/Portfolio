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

	let maxWidth = null;
	export let projects = [];
	export let whoAmI = ['developer'];

	let parallax;
	const idToSection = {
		me: 1,
		projects: 1.5
	};

	let percent = 0;

	onMount(() => {
		const target = window.location.hash.substr(1);
		pScrollTo(target);
	});

	function wrap(fn, ...args) {
		return () => fn(...args);
	}

	function pScrollTo(target) {
		parallax.scrollTo(idToSection[target], { duration: 550 });
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
						<button on:click={wrap(pScrollTo, 'projects')}>
							<div class="flex-1 px-2 mx-2">
								<span class="text-lg">Projects</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		{/if}

		<div class="mt-12">
			<Parallax sections={2} disabled={false} bind:this={parallax}>
				<ParallaxLayer>
					<section class="hero h-full text-left">
						<div class="w-full text-center">
							<h2 class="mb-5 text-secondary text-sm">Hello there, I'm</h2>
							<Visibility steps={100} bind:percent>
								<h1 class="mb-3 text-6xl font-bold ml-2">Fube</h1>
							</Visibility>
							<h3 class="text-secondary">
								<span>I'm a</span>
								<Typewriter loop cursor={getFlatPropertyFromClass('color', 'text-primary')}>
									{#each whoAmI as value}
										<span class="text-primary text-lg">{value}</span>
									{/each}
								</Typewriter>
							</h3>
							[Arrow down here]
						</div>
					</section>
				</ParallaxLayer>

				<ParallaxLayer offset={0.99}>
					<section id="projects" class="text-center">
						<h1 class="text-primary text-4xl">Things I've done</h1>
						<div class="flex justify-center mt-8">
							<div class="projects hover:max-h-[100vh] hover:max-w-[100vw] transition-all">
								{#each projects as project}
									<div class="flex justify-center hover:scale-105 transition-all">
										<Project
											on:message={({ detail: { width } }) => (maxWidth = Math.max(maxWidth, width))}
											{maxWidth}
											{...project}
										/>
									</div>
								{/each}
							</div>
						</div>
					</section>
				</ParallaxLayer>

				<!--offset 2 sends him to another dimension-->
				<ParallaxLayer offset={1.25}>
					<section class="text-center">
						<h1 class="text-primary text-4xl">Things I've done</h1>
						<ul>
							<li>Stuff</li>
						</ul>
					</section>
				</ParallaxLayer>
			</Parallax>
		</div>
	</div>
</div>

<style lang="postcss">
	.projects {
		@apply flex flex-col gap-6;
		transition-timing-function: cubic-bezier(0.71, 0.3, 0.35, 0.73);
	}
</style>

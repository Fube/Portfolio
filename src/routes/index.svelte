<script context="module">
	export const load = async ({ fetch }) => {
		const url = `/index.json`;
		const response = await fetch(url);

		if (response.ok) {
			const projects = await response.json();
			return {
				props: {
					projects
				}
			};
		}
	};
</script>

<script>
	import Project from '$lib/components/Project.svelte';
	import { Parallax, ParallaxLayer } from 'svelte-parallax';

	let maxWidth = null;
	export let projects = [];
</script>

<div class="flex flex-col h-screen">
	<div class="mt-12">
		<Parallax sections={3} disabled={false}>
			<ParallaxLayer>
				<section class="hero h-full text-left">
					<div class="max-w-md">
						<h2 class="mb-5 text-secondary text-sm">Hello there, I'm</h2>
						<h1 class="mb-3 text-6xl font-bold ml-2">Fube</h1>
						<h3 class="text-secondary">I'm a developer</h3>
						[Arrow down here]
					</div>
				</section>
			</ParallaxLayer>

			<ParallaxLayer offset={1}>
				<section class="text-center">
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
			<ParallaxLayer offset={1.99}>
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

<style lang="postcss">
	.projects {
		@apply flex flex-col gap-6;
		transition-timing-function: cubic-bezier(0.71, 0.3, 0.35, 0.73);
	}
</style>

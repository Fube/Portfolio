<script>
	import Project from '$lib/components/Project.svelte';
	import { Parallax, ParallaxLayer } from 'svelte-parallax';

	let isHoveringProject = false;

	const projects = [
		{
			title: 'ESP8266 WOL',
			lang: 'C/C++',
			content: `Uses an ESP-8266 to wake up a computer from sleep.
			Can be configured to listen for a Discord message or an http request.`,
			github: 'https://github.com/Fube/ESP8266_WOL'
		},
		{
			title: 'Fake',
			lang: 'Lmao',
			content: `Lorem
			Ipsum`
		},
		{
			title: 'Fake',
			lang: 'Lmao',
			content: `Lorem
			Ipsum`
		},
		{
			title: 'Fake',
			lang: 'Lmao',
			content: `Lorem
			Ipsum`
		}
	];

	function* getNextAlignAndJustifyGen() {
		let current = 0;
		const toYield = [
			'self-end justify-self-end',
			'self-end justify-self-start',
			'self-start justify-self-end',
			'self-start justify-self-start'
		].map((n) => n + ' hover:self-auto hover:justify-auto');
		while (true) {
			yield toYield[current];
			current = (current + 1) % toYield.length;
		}
	}

	$: console.log(isHoveringProject);

	const getNextAlignAndJustify = getNextAlignAndJustifyGen();
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
						<div
							class={`projects max-h-3 w-1/3 transition-all duration-[750ms] ${
								isHoveringProject && 'max-h-[35vh] w-1/2'
							}`}
						>
							{#each projects as project}
								<Project
									on:message={({ detail: { type } }) => (isHoveringProject = type === 'mouseenter')}
									{...project}
									extra={getNextAlignAndJustify.next().value || ''}
								/>
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
		@apply grid grid-cols-2 gap-[1.75rem];
		transition-timing-function: cubic-bezier(0.71, 0.3, 0.35, 0.73);
	}
</style>

<script>
	import Project from '$lib/components/Project.svelte';
	import { Parallax, ParallaxLayer } from 'svelte-parallax';

	let maxWidth = null;
	const projects = [
		{
			title: 'ESP8266 WOL',
			lang: 'C/C++',
			content: `Uses an ESP-8266 and the WOL protocol to wake up a computer from sleep.
			Can be configured to listen for a Discord message or an http request.`,
			github: 'https://github.com/Fube/ESP8266_WOL'
		},
		{
			title: 'Buffoon',
			lang: 'Java, Kotlin, JS',
			content: `A micro-service based joke app.
			Uses a REST API to retrieve jokes from a database.
			Uses RabbitMQ & HTTP to communicate between services.`,
			github: 'https://github.com/Fube/Buffoon'
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
</script>

<div class="flex flex-col h-screen">
	<div class="mt-12">
		<Parallax sections={3} disabled={true}>
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

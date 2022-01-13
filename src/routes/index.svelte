<script lang="ts">
	import { Parallax, ParallaxLayer } from 'svelte-parallax';
</script>

<div class="flex flex-col h-screen">
	<div class="mt-12 h-full">
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
					<ul>
						<li>Stuff</li>
					</ul>
				</section>
			</ParallaxLayer>
		</Parallax>
	</div>
</div>

<style lang="postcss">
	@counter-style thumbs {
		system: cyclic;
		symbols: '>';
		suffix: ' ';
	}

	ul {
		list-style: thumbs;
	}

	li {
		@apply text-red-600;
	}
</style>

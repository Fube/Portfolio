<script lang="ts">
    import Hero from './Hero.svelte';
    import Who from './Who.svelte';
    import What from './What.svelte';
    import When from './When.svelte';
    // @ts-ignore
    import { Parallax, ParallaxLayer } from 'svelte-parallax';

    export let projects: Project[] = [];
    export let whoAmI = ['developer'];
    export let about = [''];
    export let timeline: TimelineEntry[] = [];
</script>

<Parallax sections={2.33} disabled={false}>
    <ParallaxLayer>
        <Hero {whoAmI} />
    </ParallaxLayer>

    <main class="flex flex-col gap-6">
        <ParallaxLayer offset={0.99}>
            <section id="who" class="text-center">
                <Who {about} />
            </section>

            <section id="what" class="text-center">
                <What {projects} />
            </section>

            <section id="when" class="text-center">
                <When timeline={timeline.map(x => (
                {...x, date: new Date(x.date)}
                ))} />
            </section>
        </ParallaxLayer>
    </main>
</Parallax>

<style scoped lang="postcss">
    section {
        min-height: 75vh;
    }
</style>

<script lang="ts">
	import LoopingTypewriter from './LoopingTypewriter.svelte';
	import Visibility from './Visibility.svelte';
        import heroStore from '../stores/Hero';
	import wrap from '../utils/wrap';
        import scoll from './scroll';
	import Icon from '@iconify/svelte';

	export let whoAmI = ['developer'];

        function onPercentChange(percent: number) {
            heroStore.set({visibilityPercentage: percent});
        }
</script>

<section class="hero h-full">
        <div class="w-full text-center">
                <p class="mb-5 text-secondary text-sm font-bold">Hello there, I'm</p>
                <Visibility steps={100} {onPercentChange}>
                        <h1 class="mb-3 text-6xl font-bold ml-2">Fube</h1>
                </Visibility>
                <h2 class="text-secondary">
                        <span class="text-left">I'm a</span>
                            <LoopingTypewriter>
                                    {#each whoAmI as value}
                                            <span class="text-primary text-lg block text-center pl-3">{value}</span>
                                    {/each}
                            </LoopingTypewriter>
                </h2>
                <div class="flex justify-center animate-bounce mt-2">
                        <button on:click={wrap(scoll, 'who')}>
                                <Icon class="cursor-pointer" icon="akar-icons:chevron-down" width="36" />
                        </button>
                </div>
        </div>
</section>

<style>
    :global(.typewriter-container) {
        min-height: 28px;
    }
</style>

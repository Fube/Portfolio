<script lang="ts">
import { onMount } from 'svelte';
import { slide } from 'svelte/transition';
import Icon from '@iconify/svelte';
import wrap from '../utils/wrap';
import scroll from './scroll';
import heroStore from '../stores/Hero';
import InfiniteTypewriter from './InfiniteTypewriter.svelte';

export let cv = '';

const navigables = {
        About: 'who',
        Projects: 'what',
        Timeline: 'when'
} as const;

onMount(() => {
        const target = window.location.hash.slice(1) as any;
        scroll(target);
});

let dropDownTop = 56;


let hamburger: HTMLElement;

$: {
        if (hamburger && 'getBoundingClientRect' in hamburger) {
                const bounds = hamburger.getBoundingClientRect();
                dropDownTop = bounds.top + bounds.height;
        }
}
</script>

{#if $heroStore.visibilityPercentage < 10}
        <div
                in:slide={{ duration: 750 }}
                out:slide={{ duration: 750 }}
                class="sticky top-0 bg-secondary-content z-[99999]"
        >
                <nav
                        class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box sm:rounded-none"
                >
                        <!-- Hamburger -->
                        <div class="flex-none dropdown block sm:hidden">
                                <button aria-label="hamburger menu" class="btn btn-square btn-ghost" bind:this={hamburger}>
                                        <Icon icon="charm:menu-hamburger" width="36" />
                                </button>
                                <ul
                                        class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                                        style="top: {dropDownTop}px;"
                                >
                                        {#each Object.entries(navigables) as [name, to]}
                                                <button aria-label={name} on:click={wrap(scroll, to)}>
                                                        <div class="px-2 mx-2 text-left">
                                                                <span class="text-lg">{name}</span>
                                                        </div>
                                                </button>
                                        {/each}
                                </ul>
                        </div>

                        <button on:click={wrap(scroll, 'me')}>
                                <div class="flex-1 px-2 mx-2">
                                        <InfiniteTypewriter>
                                                <span class="text-3xl md:text-4xl font-bold">Fube</span>
                                        </InfiniteTypewriter>
                                </div>
                        </button>

                        {#each Object.entries(navigables) as [name, to]}
                                <button on:click={wrap(scroll, to)}>
                                        <div class="flex-1 px-2 mx-2 hidden sm:block">
                                                <span class="text-lg">{name}</span>
                                        </div>
                                </button>
                        {/each}

                        <div class="flex-1 justify-end navbar-end">
                                <div class="flex justify-around gap-2">
                                        <a class="flex-1 self-center" href={cv}>
                                                <!-- <Icon icon="academicons:cv" width="38" /> -->
                                                <span class="text-4xl font-semibold h-full">CV</span>
                                        </a>
                                        <a class="flex-1" href="https://www.github.com/Fube">
                                                <Icon icon="jam:github" width="36" />
                                        </a>
                                        <a class="flex-1" href="https://linkedin.com/in/nariman-abrari">
                                                <Icon icon="jam:linkedin" width="36" />
                                        </a>
                                </div>
                        </div>
                </nav>
        </div>
{/if}

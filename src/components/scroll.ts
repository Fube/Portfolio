// @ts-ignore
import * as animateScroll from 'svelte-scrollto';

const idToSection = {
    me: { selector: '#fakeIdHere' },
    who: { selector: '#who', offset: 400 },
    what: { selector: '#what', offset: 220 },
    when: { selector: '#when', offset: 220 }
} as const;

export default function pScrollTo(target: keyof typeof idToSection) {
    if (!window) return;

    const n = { ...idToSection[target] };
    const element = document.querySelector(n.selector);

    animateScroll.scrollTo({
        duration: 500,
        element,
        ...n
    });
}

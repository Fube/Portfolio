<script>
    import Typewriter from "svelte-typewriter";
    import getFlatPropertyFromClass from "../utils/getFlatPropertyFromClass";
</script>

<Typewriter
        cursor={getFlatPropertyFromClass('color', 'text-secondary')}
        loop={99999999999}
>
        <slot />
</Typewriter>

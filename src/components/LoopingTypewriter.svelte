<script>
    import Typewriter from "svelte-typewriter";
    import getFlatPropertyFromClass from "../utils/getFlatPropertyFromClass";
</script>

<Typewriter 
        loop
        cursor={getFlatPropertyFromClass('color', 'text-primary')}

>
    <slot />
</Typewriter>

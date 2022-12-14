<script>
    let input
    export let type
    export let placeholder
    export let value = ''
    export let name
    export let required = false

    const handleInput = () => { value = input.value }
</script>

<input
    bind:this={input}
    type={type}
    name={name}
    placeholder={placeholder}
    id={name}
    on:input={handleInput}
    class="input w-full input-bordered max-w-sm"
    required={required}
/>
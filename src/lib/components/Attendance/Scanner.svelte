<script lang="ts">
     let {openScanner, value} = $props()
</script>

{#if openScanner}
    <section class="card">
        <h3>Scan Wristband</h3>
        <div>

        </div>
    </section>
{/if}

<style lang="scss">
    section {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
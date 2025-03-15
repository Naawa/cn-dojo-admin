<script lang="ts">
	import Delete from '$lib/components/Actions/Delete.svelte';

	let { data } = $props();

	let { product } = data;
</script>

<section>
	<div>
        <img src="{product?.imageUrl}" alt="Preview">
		<span>
            <h1>{product?.name}</h1>
		<h3>{product?.price} Pts</h3>
        </span>
		<p>{product?.description}</p>
	</div>
	<Delete action="delete" object="product"></Delete>
</section>

<style>
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;

        div {
            img {
                height: 20em;
                border-radius: 0.5em;
            }
            span {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
            }
        }

	}
</style>

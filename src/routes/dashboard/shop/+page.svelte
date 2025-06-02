<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import AddProductForm from './AddProductForm.svelte';

	let { form, data }: { form: ActionData; data: PageData } = $props();
	let { products, categories } = $derived(data)
	
	let showForm: boolean = $state(false);

</script>

<section>
	{#if showForm}
		<AddProductForm {categories} center={data.admin?.center} {form} bind:open={showForm}></AddProductForm>
	{/if}
	<h2>Shop</h2>
	<br />
	<span>
		<input class="shadowed" type="search" placeholder="Search" />
		<button
			onclick={() => {
				showForm = true;
			}}>Add Product</button
		>
	</span>
	<br />
	<span>
		{#if products}
			{#each products as product}
				<a class="card"  href="/dashboard/shop/{product.id}">
					<div>
						<h3>{product.name}</h3>
						<h4>{product.price} Pts</h4>
					</div>
				</a>
			{/each}
		{/if}
	</span>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100%;

		span {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1em;
			flex-wrap: wrap;
		}
		span:last-of-type {
			padding: 1em;
			overflow: scroll;
		}

		a,div {
			background-color: white;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-decoration: none;
		}

	}
</style>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { Product, ProductCategory } from '$lib/server/db/schema/product';
	import { invalidateAll } from '$app/navigation';

	let {
		open = $bindable(false),
		form,
		categories,
		location
	}: {
		open: boolean;
		form: ActionData;
		categories: ProductCategory[] | null;
		location: string
	} = $props();

	let category: string = $state('');
	let showImage: boolean = $state(false);
	let image: HTMLImageElement | null = $state(null);
	let input: HTMLInputElement | null = $state(null);

	function updatePreview() {
		if (input?.files) {
			const file = input.files[0];

			if (file) {
				const reader = new FileReader();
				reader.addEventListener('load', function () {
					if (image) {
						image.setAttribute('src', reader.result as string);
					}
				});
				reader.readAsDataURL(file);
				showImage = true;
				return;
			}
		}

		showImage = false;
	}
</script>

<section class="bordered" transition:scale>
	<form method="post" action="/dashboard/shop?/add" use:enhance>
		<span>
			<h2>New Product</h2>
			<button
				type="reset"
				class="danger-btn"
				onclick={() => {
					if (form) {
						form.error = '';
						form.success = '';
					}
					open = false;
				}}>Exit</button
			>
		</span>

		<span>
			<div class="input-container">
				<label for="productName"> Product Name </label>
				<input name="productName" placeholder="Example Product" />
			</div>
		</span>

		<span>
			<div class="input-container">
				<label for="price"> Price (pts) </label>
				<input type="text" name="price" />
			</div>
		</span>

		<div class="input-container">
			<label for="belt">Category</label>
			<select bind:value={category} name="belt">
				{#if categories}
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				{/if}
			</select>
		</div>
		<span>
			<div class="input-container">
				<label for="desccription"> Description </label>
				<textarea id="description" name="description">
			</textarea>
			</div>
		</span>
		<input
			type="hidden"
			style="display: none;"
			value={location}
			name="center"
			autocomplete="new-password"
		/>
		<label for="file-upload" class="custom-file-upload"> Upload Image </label>
		<input id="file-upload" name="image" type="file" bind:this={input} onchange={updatePreview} />
		<br />
		<b>Image upload guidelines.</b>
		<ul>
			<li>3D Print and Icons should have a 1:1 aspect ratio.</li>
			<li>Name tag banner should have a 21:9 aspect ratio.</li>
		</ul>
		<br />
		{#if showImage}
			<img bind:this={image} alt="Yuh" />
			{:else} 
			<div id="preview-placeholder" class="bordered">
				Preview Image
			</div>
		{/if}
		{#if form?.error || form?.success}
			<b class:error={form.error} class:success={form.success}>{form.success}{form.error}</b>
		{/if}

		<button
			type="submit"
			onclick={() => {
				invalidateAll();
			}}>Add to Shop</button
		>
	</form>
</section>

<style>
	section {
		justify-content: center;
		align-items: center;
		position: absolute;
		background-color: #fcfdff;
		z-index: 1;
		gap: 1em;
		height: 100%;
		width: 100%;
		min-width: fit-content;
		overflow: scroll;
		padding: 2em;

		form {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1em;
			max-width: 24em;
			padding-top: 18em;

			input,
			select {
				width: 100%;
			}
			span {
				display: flex;
				max-width: 100%;
				width: 100%;
				gap: 1em;
				justify-content: space-between;
				align-items: center;
			}
			button {
				min-width: none;
				top: 10%;
				right: 11.25%;
				width: 100%;
			}
			img, #preview-placeholder {
				min-height: 16em;
				text-align: center;
				display: flex;
				width: 100%;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>

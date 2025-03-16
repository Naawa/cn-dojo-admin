<script lang="ts">
	import Balance from '$lib/components/Kiosk/Balance.svelte';
	import Redeem from '$lib/components/Kiosk/Redeem.svelte';
	import Reward from '$lib/components/Kiosk/Reward.svelte';
	import { scale } from 'svelte/transition';

	let { data, form } = $props();

	let { students } = $derived(data);

	let showModal: boolean = $state(false);
	let modal: string | null = $state(null);
	let message: string | undefined = $derived(form?.message);

	function selectOption(option: string) {
		showModal = true;
		modal = option;
	}

	$effect(() => {
		if (message) {
			selectOption('Message');
		}
	});

    $inspect(modal, showModal, message)
</script>

<section>
	<h1>Kiosk</h1>

	<button type="button" class="modal" onclick={() => selectOption('Reward')}>Reward Points</button>
	<button type="button" class="modal" onclick={() => selectOption('Redeem')}>Redeem Points</button>
	<button type="button" class="modal" onclick={() => selectOption('Balance')}>View Points</button>
    
	{#if showModal && modal == 'Reward'}
		<Reward {students} bind:showModal></Reward>
	{:else if showModal && modal == 'Redeem'}
		<Redeem></Redeem>
	{:else if showModal && modal == 'Balance'}
		<Balance></Balance>
	{:else if showModal && modal == 'Message'}
		<button
            transition:scale
			type="button"
			onclick={() => {
				modal = null;
                showModal = false;
			}}
			class="modal message-box"
		>
			<b>{message}</b>
			<p>Click this message to dismiss.</p>
		</button>
	{/if}
</section>

<style>
	section {
		display: grid;
		height: 100%;
		place-items: center;
		position: relative;

        .message-box {
            position: absolute;
        }
	}
</style>

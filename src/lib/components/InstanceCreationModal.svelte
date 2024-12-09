<script lang="ts">
	import type { Image, KeyPair, SecurityGroup } from '@aws-sdk/client-ec2';
	import { onMount } from 'svelte';
	import {} from 'svelte/events';
	let { closeModal, reloadInstances } = $props();

	let images: Image[] = $state([]);
	let sgs: SecurityGroup[] = $state([]);
	let keyPairs: KeyPair[] = $state([]);

	let maxCount = $state(1);
	let imageId = $state();
	let sgId = $state();
	let keyPairId = $state();

	onMount(() => {
		loadImages();
		loadSgs();
		loadKeys();
	});

	function loadImages() {
		fetch('/api/images')
			.then((res) => res.json())
			.then((data) => {
				images = data;
			});
	}

	function loadSgs() {
		fetch('/api/sgs')
			.then((res) => res.json())
			.then((data) => {
				sgs = data;
			});
	}

	function loadKeys() {
		fetch('/api/keys')
			.then((res) => res.json())
			.then((data) => {
				keyPairs = data;
			});
	}

	function createInstance() {
		const form = {
			maxCount,
			imageId,
			sgId,
			keyPairId
		};

		console.log(form);

		fetch('/api/instances', {
			method: 'POST',
			body: JSON.stringify(form)
		})
			.then((res) => res.json())
			.then((data) => {
				closeModal();
				reloadInstances();
			});
	}
</script>

<div class="instance-creation-modal" onclick={closeModal}>
	<div class="creation" onclick={(e) => e.stopPropagation()}>
		<div class="header">
			<h3>create instance</h3>
		</div>
		<form>
			<div class="count">
				<h4>count</h4>
				<input bind:value={maxCount} type="number" name="maxCount" defaultValue="1" id="" />
			</div>
			<div class="image">
				<h4>image</h4>
				<select name="imageId" bind:value={imageId}>
					<option disabled hidden selected> select image </option>
					{#each images as image}
						<option value={image.ImageId}>{image.Name}</option>
					{/each}
				</select>
			</div>

			<div class="sg">
				<h4>security group</h4>
				<select name="sgId" bind:value={sgId}>
					<option disabled hidden selected> select security group </option>
					{#each sgs as sg}
						<option value={sg.GroupId}> {sg.GroupName}</option>
					{/each}
				</select>
			</div>

			<div class="key-pair">
				<h4>key pair</h4>
				<select name="keyPairId" bind:value={keyPairId}>
					<option disabled hidden selected> select key pair </option>
					{#each keyPairs as keyPair}
						<option value={keyPair.KeyName}> {keyPair.KeyName}</option>
					{/each}
				</select>
			</div>

			<div class="submit">
				<button onclick={createInstance}>create</button>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.instance-creation-modal {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);

		.creation {
			position: absolute;
			top: 50%;
			left: 50%;
			padding: 10px 20px;
			border-radius: 10px;
			transform: translate(-50%, -50%);
			background-color: var(--bg-bar);
			display: flex;
			flex-direction: column;
			gap: 20px;
			form {
				display: flex;
				flex-direction: column;
				gap: 10px;

				.count {
					input {
						margin-top: 10px;
					}
				}
				.image {
					select {
						margin-top: 10px;
					}
				}
				.sg {
					select {
						margin-top: 10px;
					}
				}

				.key-pair {
					select {
						margin-top: 10px;
					}
				}
				.submit {
					margin-top: 10px;
					display: flex;
					justify-content: end;
					button {
						background-color: var(--sig);
						color: var(--bg);
					}
				}
			}
		}
	}
</style>

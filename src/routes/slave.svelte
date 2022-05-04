<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let keyID = 'waiting';

	let wg = {
		status: 'disconnected'
	};
	let WGhost = '';
	const connectWG = () => {
		return 0;
	};

	let kme = {
		target_KME_ID: ''
	};
	const getKMEStatus = async () => {
		kme = await fetch(`${history.state.host}/status`, {
			method: 'GET'
		}).then(res => res.json());
	};
	onMount(() => {
		getKMEStatus();
	});

	const checkForHistory = () => {
		try {
			if (history.state.host) {
				return true;
			}
		} catch (err) {
			return false;
		}
	};
</script>
{#if checkForHistory()}
	<div class='grid justify-items-center items-center w-screen h-screen'>
		<div
			class='grid lg:grid-cols-3 grid-cols-1 grid-rows-4 justify-items-center items-center md:w-3/4 w-full md:h-3/4 h-full bg-white'>

			<button
				on:click={() => {goto('/', {state: {host: history.state.host, type: 'slave', slaveID: history.state.slaveID}})}}
				class='col-span-1 row-start-1 col-start-1 justify-self-start self-start bg-[#00a499] w-1/4 h-12 text-white'>
				Change host
			</button>

			<div class='row-start-1 lg:col-start-2 info text-center text-lg'>
				{#if (kme.target_KME_ID)}
					<p>KME status: <span class='text-green-500'>connected</span></p>
				{:else}
					<p>KME status: <span class='text-red-500'>disconnected</span></p>
				{/if}

				<p>KME type: <span class='text-[#00a499]'>SLAVE</span></p>
				<p>KME host: <span class='text-[#00a499]'>{history.state.host}</span></p>
				<p>SAE slave ID: <span class='text-[#00a499]'>{history.state.slaveID}</span></p>
			</div>

			<div class='row-start-2 col-start-1 lg:col-span-1 col-span-2 grid justify-items-center items-center w-full'>
				<button on:click={getKMEStatus}
								class='bg-[#00a499] w-3/4 h-12 text-white m-2'>Update
				</button>
				<p>Actual key ID: <span class='text-[#00a499]'>{keyID}</span></p>
			</div>
			<div class='row-start-3 row-span-2 col-start-1 self-start w-3/4 ml-2'>
				{#if (kme.target_KME_ID)}
					<table class='text-left border-separate text-md w-full'>
						{#each Object.keys(kme) as key, i}
							<tr>
								<td class='text-left'>{Object.keys(kme)[i]}</td>
								<td class='text-left'>{Object.values(kme)[i]}</td>
							</tr>
						{/each}
					</table>
				{/if}
			</div>

			<div class='lg:row-start-2 row-start-3 lg:col-start-3 grid justify-items-center items-center w-full'>
				<input bind:value={WGhost} class='col-span-2 bg-gray-200 w-10/12 h-12 m-2' id='WGHost' type='text'
							 placeholder='http://localhost:3002' on:keydown={(e) => {if(e.keyCode === 13){connectWG()}}}>
				<button on:click={connectWG}
								class='row-start-2 col-start-1 bg-[#00a499] w-8/12 h-12 text-white m-2'>Manual reconnect
				</button>
				<button on:click={() => {goto('/')}}
								class='row-start-2 col-start-2 bg-[#00a499] w-8/12 h-12 text-white m-2'>Manual keyID send
				</button>
				{#if wg.status === 'disconnected'}
					<p class='col-span-2'>Wireguard status: <span class='text-red-500'>{wg.status}</span></p>
				{:else}
					<p class='col-span-2'>Wireguard status: <span class='text-green-500'>{wg.status}</span></p>
				{/if}
			</div>

		</div>
	</div>
{:else}
	<div class='grid justify-items-center items-center'>
		<h1 class='text-6xl text-red-500 text-center mt-8'>no state - forbidden (403)</h1>
		<button on:click={()=>{goto('/')}} class='bg-[#00a499] text-center text-white w-1/4 h-12 mt-8'>BACK TO HOMEPAGE
		</button>
	</div>
{/if}
<script>
	import { goto } from '$app/navigation';

	let wg = {
		status: 'disconnected',
	}

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
		<div class='grid grid-cols-3 grid-rows-3 justify-items-center items-center md:w-3/4 w-full h-3/4 bg-white'>

			<div class='info'>
				<p>KME type: <span class='text-[#00a499]'>MASTER</span></p>
				<p>KME host: <span class='text-[#00a499]'>{history.state.host}</span></p>
			</div>
			<button on:click={() => {goto('/', {state: {host: history.state.host}})}}
							class='col-span-1 row-start-1 col-start-1 justify-self-start self-start bg-[#00a499] w-1/4 h-12 text-white'>CHANGE
				HOST
			</button>

			<button on:click={() => {goto('/')}}
							class='col-span-1 row-start-2 col-start-1 bg-[#00a499] w-1/4 h-12 text-white'>Get key with keyID
			</button>

			<div class='vpn w-full'>
				<button on:click={() => {goto('/')}}
								class='col-span-1 row-start-2 col-start-1 bg-[#00a499] w-1/4 h-12 text-white'>manual reconnect
				</button>
				<button on:click={() => {goto('/')}}
								class='col-span-1 row-start-2 col-start-1 bg-[#00a499] w-1/4 h-12 text-white'>manual keyID send
				</button>
				<p>Wireguard status: {wg.status}</p>
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
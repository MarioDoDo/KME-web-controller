<script>
	import { goto } from '$app/navigation';

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

			<p>KME type: SLAVE</p>
			<p>KME host: {history.state.host}</p>
			<button on:click={() => {goto('/', {state: {host: history.state.host}})}}
							class='col-span-1 row-start-1 col-start-1 justify-self-start self-start bg-[#00a499] w-1/4 h-12 text-white'>CHANGE
				HOST
			</button>

		</div>
	</div>
{:else}
	<div class='grid justify-items-center items-center'>
		<h1 class='text-6xl text-red-500 text-center mt-8'>No history - forbidden (403)</h1>
		<button on:click={()=>{goto('/')}} class='bg-[#00a499] text-center text-white w-1/4 h-12 mt-8'>BACK TO HOMEPAGE
		</button>
	</div>
{/if}
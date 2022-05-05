<script>
	import { goto } from '$app/navigation';

	let type = '';
	let host = '';
	let slaveID = '';
	let SAEhost = '';

	try {
		if (history.state.host) {
			host = history.state.host;
			type = history.state.type !== 'master';
			slaveID = history.state.slaveID;
			SAEhost = history.state.SAEhost;
		}
	} catch (err) {
		host = '';
	}

	const validateHTTP = (str) => {
		return str.match(/^((https?:\/\/)|(www.))(?:([a-zA-Z]+)|(\d+\.\d+.\d+.\d+)):\d+$/);
	};
	const validateWS = (str) => {
		return str.match(/^(wss?:\/\/)([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+):([0-9]{1,5})$/);
	};

	const connect = () => {
		if (validateHTTP(host) && validateWS(SAEhost) && slaveID.length > 0) {
			if (type) {
				goto('/slave', {
					state: { host: host, slaveID: slaveID, SAEhost: SAEhost }
				});
			} else {
				goto('/master', {
					state: { host: host, slaveID: slaveID, SAEhost: SAEhost }
				});
			}
		} else {
			alert('Please fill all inputs properly.');
		}
	};
</script>
<div class='grid justify-items-center items-center w-screen h-screen'>
	<div class='grid grid-cols-3 grid-rows-5 justify-items-center items-center md:w-3/4 w-full h-80 bg-white'>

		<p class='col-start-1 justify-self-end'>MASTER</p>
		<label class='switch col-start-2'>
			<input type='checkbox' bind:checked={type}>
			<span class='slider round'></span>
		</label>
		<p class='col-start-3 justify-self-start'>SLAVE</p>

		{#if !validateHTTP(host) && host.length !== 0}
			<label class='col-start-1 row-start-2 text-red-500 text-lg' for='KMEHost'>KME host</label>
		{:else if validateHTTP(host)}
			<label class='col-start-1 row-start-2 text-green-500 text-lg' for='KMEHost'>KME host</label>
		{:else}
			<label class='col-start-1 row-start-2 text-black text-lg' for='KMEHost'>KME host</label>
		{/if}
		<input bind:value={host} class='col-start-2 row-start-2 col-span-2 bg-gray-200 w-3/4 h-12 pl-2' id='KMEHost' type='text'
					 placeholder='http://localhost:3001'>

		{#if slaveID.length > 0}
			<label class='col-start-1 row-start-3 text-green-500 text-lg' for='slaveID'>Slave SAE ID</label>
			{:else}
			<label class='col-start-1 row-start-3 text-black text-lg' for='slaveID'>Slave SAE ID</label>
			{/if}
		<input bind:value={slaveID} class='col-start-2 row-start-3 col-span-2 bg-gray-200 w-3/4 h-12 pl-2' id='slaveID'
					 type='text'
					 placeholder='MMMMNNNNOOOOPPPP'>

		{#if !validateWS(SAEhost) && SAEhost.length !== 0}
			<label class='col-start-1 row-start-4 text-red-500 text-lg' for='SAEHost'>{type ? 'Master' : 'Slave'} SAE host</label>
		{:else if validateWS(SAEhost)}
			<label class='col-start-1 row-start-4 text-green-500 text-lg' for='SAEHost'>{type ? 'Master' : 'Slave'} SAE host</label>
		{:else}
			<label class='col-start-1 row-start-4 text-black text-lg' for='SAEHost'>{type ? 'Master' : 'Slave'} SAE host</label>
		{/if}
		<input bind:value={SAEhost} class='col-start-2 row-start-4 col-span-2 bg-gray-200 w-3/4 h-12 pl-2' id='SAEHost' type='text'
					 placeholder='ws://localhost:3005' on:keydown={(e) => {if(e.keyCode === 13){connect()}}}>

		<button on:click={connect} class='col-span-3 row-start-5 col-start-1 bg-[#00a499] w-5/6 h-12 text-white'>CONNECT
		</button>
	</div>
</div>

<style>
    /* switch from w3school */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #00a499;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #00a499;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #00a499;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>

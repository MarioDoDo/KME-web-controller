<script>
	import { goto } from '$app/navigation';

	let type = '';
	let host = '';

	try {
		if (history.state.host) {
			host = history.state.host;
		}
	} catch (err) {
		host = '';
	}

	const validate = (str) => {
		return str.match(/^((https?:\/\/)|(www.))(?:([a-zA-Z]+)|(\d+\.\d+.\d+.\d+)):\d+$/);
	};


	const connect = () => {
		if (validate(host)) {
			if (type) {
				goto('/slave', {
					state: { host: host }
				});
			} else {
				goto('/master', {
					state: { host: host }
				});
			}
		} else {
			alert('Invalid host');
		}
	};
</script>
<div class='grid justify-items-center items-center w-screen h-screen'>
	<div class='grid grid-cols-3 grid-rows-3 justify-items-center items-center md:w-3/4 w-full h-80 bg-white'>

		<p class='col-start-1 justify-self-end'>MASTER</p>
		<label class='switch col-start-2'>
			<input type='checkbox' bind:checked={type}>
			<span class='slider round'></span>
		</label>
		<p class='col-start-3 justify-self-start'>SLAVE</p>

		{#if !validate(host) && host.length !== 0}
			<label class='col-start-1 row-start-2 text-red-500' for='KMEHost'>KME host</label>
		{:else if validate(host)}
			<label class='col-start-1 row-start-2 text-green-500' for='KMEHost'>KME host</label>
		{:else}
			<label class='col-start-1 row-start-2 text-black' for='KMEHost'>KME host</label>
		{/if}
		<input bind:value={host} class='col-start-2 row-start-2 col-span-2 bg-gray-200 w-3/4 h-12' id='KMEHost' type='url'
					 placeholder='http://192.168.1.2:3001' on:keydown={(e) => {if(e.keyCode === 13){connect()}}}>

		<button on:click={connect} class='col-span-3 row-start-3 col-start-1 bg-[#00a499] w-5/6 h-12 text-white'>CONNECT
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

<script>
</script>

<div class="lds-ripple">
	<div></div>
	<div></div>
</div>

<style>
	.lds-ripple {
		/* change color here */
		color: #1c4c5b;
	}
	.lds-ripple,
	.lds-ripple div {
		box-sizing: border-box;
	}
	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.lds-ripple div {
		position: absolute;

		border: 4px solid currentColor;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 20px;
			left: 20px;
			width: 4px;
			height: 4px;
			opacity: 0;
		}
		4.9% {
			top: 20px;
			left: 20px;
			width: 8px;
			height: 8px;
			opacity: 0;
		}
		5% {
			top: 20px;
			left: 20px;
			width: 8px;
			height: 8px;
			opacity: 1;
		}
		100% {
			top: 0;
			left: 0;
			width: 48px;
			height: 48px;
			opacity: 0;
		}
	}
</style>

<template>
	<div>
		<Header />
		<div class="l-contents col1">
			<div class="gl-inner">
				<nuxt/>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '~/components/layouts/Header'
	export default {
		components: {
			Header,
		}
	}
</script>

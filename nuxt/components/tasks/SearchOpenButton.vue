<template>
	<div class="page-tasks-open-wrap gl-right">
		<a class="siimple-btn siimple-btn--primary" @click="openSearchBox">条件を絞り込む</a>
	</div>
</template>

<script>
	export default {
		computed: {
			search() {
				return this.$store.state.search
			}
		},
		methods: {
			openSearchBox() {
				this.$store.commit('search/openSearchBox');
			}
		}
	}
</script>

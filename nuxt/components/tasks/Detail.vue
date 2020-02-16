<template>
	<div class="page-tasks-detail">
		<div class="overlay">
			<div class="modal">
				<span class="modal-close-btn" @click="closeModal"></span>
				<h1>{{ task.name }}</h1>
				<p>{{ task.supplement }}</p>
				<div class="page-tasks-detail-comment">
					<h2>コメント</h2>
					<ul class="page-tasks-detail-comment-list">
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ClickOutside from 'vue-click-outside'
	export default {
		computed: {
			task() {
				return this.$store.state.task
			}
		},
		methods: {
			closeModal() {
				let query = Object.assign({}, this.$route.query);
				delete query['task_id'];
				this.$router.push({query: query});
			}
		},
		created() {
			this.$store.dispatch('task/getTaskAction', {
				task_id: this.$route.query.task_id
			});
		},
		directives: {
			ClickOutside
		}
	}
</script>

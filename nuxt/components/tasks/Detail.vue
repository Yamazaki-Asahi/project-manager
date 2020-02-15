<template>
	<div class="page-tasks-detail">
		<div class="overlay">
			<div class="modal">
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
	export default {
		computed: {
			task() {
				return this.$store.state.task.task
			}
		},
		created() {
			this.$store.dispatch('task/getTaskAction', {
				task_id: this.$route.query.task_id
			});
		}
	}
</script>

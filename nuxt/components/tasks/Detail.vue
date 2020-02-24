<template>
	<div class="page-tasks-detail">
		<div class="overlay">
			<div class="modal">
				<span class="modal-close-btn" @click="closeModal"></span>
				<h1>{{ task.name }}</h1>
				<div class="page-tasks-detail-member">
					<h2>メンバー</h2>
				</div>
				<div class="page-tasks-detail-desc">
					<h2>概要</h2>
					<p>{{ task.supplement }}</p>
				</div>
				<div class="page-tasks-detail-children">
					<h2>小タスク</h2>
					<ul>
						<li></li>
					</ul>
				</div>
				<div class="page-tasks-detail-comment">
					<h2>コメント</h2>
					<ul class="page-tasks-detail-comment-list">
						<li v-for="comment in task.comments">{{ comment }}</li>
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
				return this.$store.state.task;
			}
		},
		methods: {
			closeModal() {
				let query = Object.assign({}, this.$route.query);
				delete query['task_id'];
				this.$router.push({query: query});
				this.$store.commit('task/closeTask');
			}
		},
		directives: {
			ClickOutside
		}
	}
</script>

<template>
	<div class="page-tasks-detail">
		<div class="g-overlay">
			<div class="g-modal" v-click-outside="closeModal">
				<span class="g-modal-close-btn" @click="closeModal"></span>

				<div class="page-tasks-detail-ttl">
					<input v-model="task.name" class="siimple-input siimple-input--fluid">
				</div>

				<div class="page-tasks-detail-inner">
					<div class="page-tasks-detail-main">
						<div class="page-tasks-detail-desc">
							<h2>概要</h2>
							<textarea v-model="task.supplement"
									  class="siimple-textarea siimple-textarea--fluid">{{ task.supplement }}</textarea>
						</div>
						<div class="page-tasks-detail-children">
							<h2>子タスク</h2>
							<List :children="task.children" />
						</div>
						<div class="page-tasks-detail-checklist">
							<h2>チェックリスト</h2>
							<ul>

							</ul>
						</div>
						<div class="page-tasks-detail-comment">
							<h2>コメント</h2>
							<ul class="page-tasks-detail-comment-list">
								<li v-for="comment in task.comments">{{ comment }}</li>
							</ul>
						</div>
					</div>

					<aside class="page-tasks-detail-side">
						<div class="page-tasks-detail-member">
							<h3>メンバー</h3>
						</div>
						<div class="page-tasks-detail-status">
							<h3>ステータス</h3>
							<p :style="{ backgroundColor: statuses[task.status_id].color }">{{ statuses[task.status_id].name }}</p>
						</div>
						<div class="page-tasks-detail-tags">
							<h3>タグ</h3>
						</div>
					</aside>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ClickOutside from 'vue-click-outside'
	import List from './List'
	export default {
		computed: {
			task() {
				return this.$store.state.task;
			},
			statuses() {
				return this.$store.state.statuses.list;
			}
		},
		components: {
			List
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

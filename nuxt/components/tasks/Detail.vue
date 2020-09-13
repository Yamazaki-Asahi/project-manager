<template>
	<div class="page-tasks-detail">
		<div class="gl-overlay">
			<div class="gl-modal" v-click-outside="closeTask">
				<span class="gl-modal-close-btn" @click="closeTask"></span>
				<div class="page-tasks-detail-ttl">
					<input v-model="task.name" class="siimple-input siimple-input--fluid">
				</div>

				<div class="page-tasks-detail-inner">
					<div class="page-tasks-detail-main">
						<h2>概要</h2>
<!--						<textarea v-model="task.supplement"-->
<!--								  class="siimple-textarea siimple-textarea&#45;&#45;fluid">{{ task.supplement }}</textarea>-->
<!--						<p>{{ task.supplement }}</p>-->
						<div class="page-tasks-detail-supplement">
							<p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト<br>
								ダミーテキスト</p>
						</div>
						<h2>子タスク</h2>
						<ChildTask v-for="task in task.children"
								   :task="task"
								   importedfrom="detail"
								   :style="{ backgroundColor: statuses[task.status_id].color }"/>
						<h2>チェックポイント</h2>
						<CheckList/>
						<h2 id="comment">コメント</h2>
						<CommentList/>
					</div>

					<aside class="page-tasks-detail-side">
						<h3>メンバー</h3>
						<h3>ステータス</h3>
						<p :style="{ backgroundColor: statuses[task.status_id].color }">{{ statuses[task.status_id].name }}</p>
					</aside>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ClickOutside from 'vue-click-outside'
	import List from './List'
	import ChildTask from './ChildTask'
	import CommentList from './CommentList'
	import CheckList from './CheckList'
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
			List,
			ChildTask,
			CommentList,
			CheckList
		},
		methods: {
			closeTask() {
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

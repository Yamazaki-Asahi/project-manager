<template>
	<div class="page-tasks-detail">
		<div class="gl-overlay" @click="closeTask"></div>
		<div class="gl-modal">
			<div class="gl-modal-close-btn" @click="closeTask"></div>

			<div class="page-tasks-detail-ttl">
				<h1 @click="editName" v-if="!task.isNameEditing">{{ task.name }}</h1>
				<input @blur="updateName" :value="task.name" v-if="task.isNameEditing" class="siimple-input siimple-input--fluid">
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
					<table class="gl-task-table">
						<ChildTask v-for="task in task.children"
								   :task="task"
								   importedfrom="detail"
								   :style="{ backgroundColor: statuses[task.status_id].color }"/>
					</table>
					<h2 id="comment">コメント</h2>
					<div class="page-tasks-detail-comment">
						<CommentList/>
						<div class="add">
							<textarea type="text" class="siimple-textarea"></textarea>
							<input type="submit" class="siimple-btn siimple-btn--blue">
						</div>
					</div>
				</div>

				<aside class="page-tasks-detail-side">
					<h3>メンバー</h3>
					<h3>ステータス</h3>
					<div class="page-tasks-detail-status">
						<p :style="{ backgroundColor: statuses[task.status_id].color }">{{ statuses[task.status_id].name }}</p>
					</div>
				</aside>
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
			},
			editName() {
				this.$store.commit('task/editName');
			},
			updateName(e) {
				this.$store.dispatch('task/updateTaskAction', {
					key: 'name',
					value: e.target.value,
				});
			}
		},
		directives: {
			ClickOutside
		}
	}
</script>

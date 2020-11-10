<template>
	<div class="page-tasks-detail">
		<div class="gl-overlay" @click="closeTask"></div>
		<div class="gl-modal">
			<div class="gl-modal-close-btn" @click="closeTask"></div>

			<div class="gl-modal-body">
				<div class="page-tasks-detail-ttl">
					<h1 @click="editName" v-if="!task.isNameEditing">{{ task.name }}</h1>
					<input @blur="updateName"
						   @keyup.enter="updateName"
						   :value="task.name"
						   v-if="task.isNameEditing"
						   class="siimple-input siimple-input--fluid"
						   ref="nameInput">
				</div>

				<div class="page-tasks-detail-inner">
					<div class="page-tasks-detail-main">
						<h2>概要<i class="fas fa-edit" :class="{'is-editing': task.isSupplementEditing}" @click="editSupplement"></i></h2>
						<div class="page-tasks-detail-supplement">
							<div v-if="!task.isSupplementEditing"
								 v-html="task.supplementHTML"></div>
							<textarea v-if="task.isSupplementEditing"
									  :value="task.supplement"
									  ref="supplementTextarea"
									  @blur="updateSupplement"></textarea>
						</div>
						<h2 id="comment">コメント</h2>
						<div class="page-tasks-detail-comment">
							<CommentList :comments="task.comments"/>
							<div class="add">
								<textarea placeholder="新規コメントを追加" ref="newCommentBody"></textarea>
								<input type="submit" @click="addComment" class="siimple-btn siimple-btn--blue">
							</div>
						</div>
					</div>

					<aside class="page-tasks-detail-side">
						<h3>メンバー</h3>
						<div class="page-tasks-detail-member">山崎</div>
						<h3>ステータス</h3>
						<div class="page-tasks-detail-status">
							<span :style="{ backgroundColor: statuses[task.status_id].color }">{{ statuses[task.status_id].name }}</span>
						</div>
					</aside>
				</div>
			</div><!-- .gl-modal-body -->
		</div><!-- .gl-modal -->
	</div><!-- .page-tasks-detail -->
</template>

<script>
	import ClickOutside from 'vue-click-outside'
	import List from './List'
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
			},
			editSupplement() {
				this.$store.commit('task/editSupplement');
			},
			updateSupplement(e) {
				this.$store.dispatch('task/updateTaskAction', {
					key: 'supplement',
					value: e.target.value
				});
			},
			addComment() {
				this.$store.dispatch('task/addCommentAction', {
					key: 'body',
					value: this.$refs.newCommentBody.value
				});
			}
		},
		directives: {
			ClickOutside
		},
		updated() {
			if (this.task.isNameEditing) this.$refs.nameInput.focus();
			if (this.task.isSupplementEditing) this.$refs.supplementTextarea.focus();
		}
	}
</script>

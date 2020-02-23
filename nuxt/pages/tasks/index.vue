<template>
	<div class="page-tasks-wrapper">
		<Search/>
		<form @submit="registerNewTask">
			<input type="text"
				   class="g-input siimple-input siimple-input--fluid"
				   v-model="newTaskName"
				   placeholder="＋ 新しいタスクを追加">
		</form>
		<List/>
		<Detail v-if="$route.query.task_id"/>
	</div>

</template>

<script>
	import Search from '~/components/tasks/Search'
	import List from '~/components/tasks/List'
	import Detail from '~/components/tasks/Detail'

	export default {
		components: {
			List,
			Search,
			Detail,
		},
		watch: {
			$route(to, from) {

			}
		},
		computed: {
			newTaskName: {
				get() {
					return this.$store.state.tasks.newTask.name
				},
				set(v) {
					this.$store.commit('tasks/inputName', v)
				}
			},
			statuses() {
				return this.$store.state.statuses.list
			},
			task() {
				return this.$store.state.task
			},
		},
		methods: {
			registerNewTask(e) {
				e.preventDefault();
				this.$store.dispatch('tasks/registerNewTaskAction', this.newTaskName);
			},

		},
		created() {
			this.$store.dispatch('statuses/getStatusesAction');
		},
	}
</script>

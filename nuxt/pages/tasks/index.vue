<template>
	<div class="page-tasks-wrapper">
		<Search v-if="search.show" />
		<SearchOpenButton v-if="!search.show" />
		<form @submit="registerNewTask">
			<input type="text"
				   class="g-input siimple-input siimple-input--fluid"
				   v-model="newTaskName"
				   placeholder="＋ 新しいタスクを追加">
		</form>
		<List/>
		<Detail v-if="task.open"/>
	</div>

</template>

<script>
	import Search from '~/components/tasks/Search'
	import SearchOpenButton from '~/components/tasks/SearchOpenButton'
	import List from '~/components/tasks/List'
	import Detail from '~/components/tasks/Detail'

	export default {
		components: {
			Search,
			SearchOpenButton,
			List,
			Detail,
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
			search() {
				return this.$store.state.search
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
			if (this.$route.query.task_id) this.$store.dispatch('task/openTaskAction', this.$route.query.task_id);
		},
	}
</script>

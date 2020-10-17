<template>
	<table class="gl-task-table">
		<template v-for="task in tasks">
			<tr class="gl-task" :style="{ backgroundColor: statuses[task.status_id].color }">
				<td class="gl-task-checkbox" colspan="2">
					<label class="gl-checkbox">
						<input type="checkbox">
						<span></span>
					</label>
				</td>
				<td class="gl-task-name">
					<nuxt-link :to="setQuery(task)" @click.native="openTask(task)">{{ task.name }}</nuxt-link>
				</td>
				<td class="gl-task-status">
					<span @click="openStatusBox(task)">{{ statuses[task.status_id].name }}</span>
					<StatusBox :task="task" />
				</td>
				<td class="gl-task-archive tooltip">
					<div @click="archiveTask(task)"><i class="fas fa-trash-alt"></i></div>
				</td>
			</tr>
		</template>
	</table>
</template>

<script>
	import StatusBox from "./StatusBox";

	export default {
		name: 'List',
		computed: {
			tasks() {
				return this.$store.state.tasks.list
			},
			statuses() {
				return this.$store.state.statuses.list
			}
		},
		components: {
			StatusBox,
		},
		methods: {
			setQuery(task) {
				let query = Object.assign({}, this.$route.query);
				query.task_id = task.id;
				return {
					path: 'tasks',
					query: query
				};
			},
			openTask(task) {
				this.$store.commit('task/closeTask');
				this.$store.dispatch('task/openTaskAction', task.id);
			},
			archiveTask(task) {
				this.$store.dispatch('tasks/archiveTaskAction', task);
				this.$store.dispatch('task/archiveTaskAction', task);
			},
			openStatusBox(task) {
				this.$store.commit('tasks/openStatusBox', task);
			}
		},
		created() {
			this.$store.dispatch('tasks/getTasksAction', this.$route.params.id);
		},
	}
</script>

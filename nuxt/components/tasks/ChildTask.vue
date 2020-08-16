<template>
	<tr class="gl-task child">
		<td class="gl-task-checkbox">
			<label>
				<input type="checkbox">
				<span></span>
			</label>
		</td>
		<td class="gl-task-name">
			<nuxt-link :to="setQuery(task)" @click.native="openTask(task)">{{ task.name }}</nuxt-link>
		</td>
		<td class="gl-task-status">
			<div>
				<span @click="openStatusBox(task)">{{ statuses[task.status_id].name }}</span>
				<StatusBox :task="task" />
			</div>
		</td>
		<td class="gl-task-archive tooltip">
			<div @click="archiveTask(task)"><i class="fas fa-trash-alt"></i></div>
		</td>
		<td v-if="Importedfrom === 'list'"></td>
		<td v-if="Importedfrom === 'list'"></td>
	</tr>
</template>

<script>
	import StatusBox from "./StatusBox";

	export default {
		props: [
			'task',
			'Importedfrom'
		],
		computed: {
			statuses() {
				return this.$store.state.statuses.list
			}
		},
		components: {
			StatusBox
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
		}
	}
</script>

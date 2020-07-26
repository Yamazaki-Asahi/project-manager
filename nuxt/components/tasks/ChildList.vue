<template>
	<ul class="page-tasks-list g-task-list">
		<li class="g-task g-task-child" v-for="task in tasks">
			<div :style="{ backgroundColor: statuses[task.status_id].color }">
				<label class="g-task-checkbox">
					<input type="checkbox">
					<span></span>
				</label>
				<nuxt-link :to="setQuery(task)"
						   @click.native="openTask(task)"
						   class="g-task-name">{{ task.name }}</nuxt-link>
				<div class="g-task-status">
					<span @click="openStatusBox(task)">{{ statuses[task.status_id].name }}</span>
					<StatusBox :task="task" />
				</div>
				<div class="g-task-archive tooltip" @click="archiveTask(task)"><i class="fas fa-trash-alt"></i></div>
				<div class="g-task-empty"></div>
			</div>
		</li>
	</ul>
</template>

<script>
	import StatusBox from "./StatusBox";

	export default {
		props: [
			'tasks'
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

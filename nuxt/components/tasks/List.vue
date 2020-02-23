<template>
	<ul class="page-tasks-list">
		<li class="g-task" v-for="(task) in tasks" :style="{ backgroundColor: statuses[task.status_id].color }">
			<nuxt-link :to="getQuery(task.id)" class="g-task-name">{{ task.name }}</nuxt-link>
			<div class="g-task-status">{{ statuses[task.status_id].name }}</div>
			<div class="g-task-toggle"><i class="fas fa-chevron-down"
										  v-if="task.children.length"></i></div>
			<div class="g-task-archive"><i class="fas fa-trash-alt" @click="archiveTask(task)"></i></div>
		</li>
	</ul>
</template>

<script>
	export default {
		computed: {
			tasks() {
				return this.$store.state.tasks.list
			},
			statuses() {
				return this.$store.state.statuses.list
			}
		},
		methods: {
			getQuery(task_id) {
				let query = Object.assign({task_id : task_id}, this.$route.query);
				return {
					path: 'tasks',
					query: query
				};
			},
			archiveTask(task) {
				let c = confirm(`タスク「${task.name}」をアーカイブしますか？`);
				if (!c) return false;
				this.$store.dispatch('tasks/archiveTaskAction', task);
			}
		},
		created() {
			this.$store.dispatch('tasks/getTasksAction');
		},
	}
</script>

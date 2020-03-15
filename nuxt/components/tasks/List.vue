<template>
	<ul class="page-tasks-list" :class="{'g-task-children': children}">
		<li class="g-task" v-for="(task) in tasks">
			<div class="g-task-item" :style="{ backgroundColor: statuses[task.status_id].color }">
				<nuxt-link :to="getQuery(task.id)"
						   @click.native="openTask(task)"
						   class="g-task-name">{{ task.name }}</nuxt-link>
				<div class="g-task-status">{{ statuses[task.status_id].name }}</div>
				<div class="g-task-archive"><i class="fas fa-trash-alt" @click="archiveTask(task)"></i></div>
				<div class="g-task-toggle"
					 :class="{ active: task.hasChildren, rotate: task.showChildren }"
					 @click="toggleChildren(task)">
					<i class="fas fa-chevron-down"></i>
				</div>
			</div>
			<List :children="task.children"
				  v-if="task.showChildren" />
		</li>
	</ul>
</template>

<script>
	import List from "./List";

	export default {
		name: 'List',
		computed: {
			tasks() {
				if (this.$props.children) {
					return this.$props.children;
				} else {
					return this.$store.state.tasks.list
				}
			},
			statuses() {
				return this.$store.state.statuses.list
			}
		},
		components: {
			List
		},
		props: ['children'],
		methods: {
			getQuery(task_id) {
				let query = Object.assign({task_id : task_id}, this.$route.query);
				return {
					path: 'tasks',
					query: query
				};
			},
			openTask(task) {
				this.$store.dispatch('task/openTaskAction', task.id);
			},
			archiveTask(task) {
				let c = confirm(`タスク「${task.name}」をアーカイブしますか？`);
				if (!c) return false;
				this.$store.dispatch('tasks/archiveTaskAction', task);
			},
			toggleChildren(task) {
				this.$store.dispatch('tasks/toggleChildrenAction', task);
			}
		},
		created() {
			if (!this.$props.children) {
				this.$store.dispatch('tasks/getTasksAction', this.$route.params.id);
			}
		},
	}
</script>

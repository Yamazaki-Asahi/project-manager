<template>
	<ul class="page-tasks-list">
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
			<ul v-if="task.showChildren" class="g-task-children">
				<li class="g-task" v-for="(child) in task.children">
					<div class="g-task-item" :style="{ backgroundColor: statuses[child.status_id].color }">
						<div class="g-task-arrow">
							<i class="fas fa-long-arrow-alt-right"></i>
						</div>
						<nuxt-link :to="getQuery(child.id)"
								   @click.native="openTask(task)"
								   class="g-task-name">{{ child.name }}</nuxt-link>
						<div class="g-task-status">{{ statuses[child.status_id].name }}</div>
						<div class="g-task-archive"><i class="fas fa-trash-alt" @click="archiveTask(task)"></i></div>
						<div class="g-task-toggle"
							 :class="{ active: child.hasChildren, rotate: child.showChilren }"
							 @click="toggleChildren(child)">
							<i class="fas fa-chevron-down"></i>
						</div>
					</div>
				</li>
			</ul>
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
			this.$store.dispatch('tasks/getTasksAction', this.$route.params.id);
		},
	}
</script>

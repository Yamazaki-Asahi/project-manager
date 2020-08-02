<template>
	<ul class="page-tasks-list">
		<li class="gl-task" v-for="task in tasks">
			<div :style="{ backgroundColor: statuses[task.status_id].color }">
				<label class="gl-task-checkbox">
					<input type="checkbox">
					<span></span>
				</label>
				<nuxt-link :to="setQuery(task)"
						   @click.native="openTask(task)"
						   class="gl-task-name">{{ task.name }}</nuxt-link>
				<div class="gl-task-status">
					<span @click="openStatusBox(task)">{{ statuses[task.status_id].name }}</span>
					<StatusBox :task="task" />
				</div>
				<div class="gl-task-archive tooltip" @click="archiveTask(task)"><i class="fas fa-trash-alt"></i></div>
				<div class="gl-task-add tooltip"
					 @click="createNewChild(task)">
					<i class="fas fa-plus-circle"></i>
				</div>
				<div class="gl-task-toggle tooltip"
					 :class="{ active: task.children.length, rotate: task.show_children }"
					 @click="toggleChildren(task)"><i class="fas fa-chevron-down"></i></div>
			</div>
			<ChildList v-if="task.show_children" :tasks="task.children" />
		</li>
	</ul>
</template>

<script>
	import StatusBox from "./StatusBox";
	import ChildList from "./ChildList";

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
			ChildList
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
			toggleChildren(task) {
				if (task.show_children) {
					this.$store.commit('tasks/closeChildren', task);
				} else {
					this.$store.commit('tasks/showChildren', task);
				}
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

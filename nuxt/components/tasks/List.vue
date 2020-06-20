<template>
	<ul class="page-tasks-list" :class="{'g-task-children': children}">
		<li class="g-task" v-for="(task, i) in tasks">
			<div class="g-task-item" :style="{ backgroundColor: statuses[task.status_id].color }">
				<label class="g-task-checkbox">
					<input type="checkbox">
					<span></span>
				</label>
				<nuxt-link :to="getQuery(task.id)"
						   @click.native="openTask(task)"
						   class="g-task-name">{{ task.name }}</nuxt-link>
				<div class="g-task-status">
                    <span @click="openStatusBox(task)">{{ statuses[task.status_id].name }}</span>
					<StatusBox :task="task" />
                </div>
				<div class="g-task-add" @click="createNewChild(task)">
					<i class="fas fa-plus-circle"></i>
				</div>
				<div class="g-task-archive" @click="archiveTask(task)"><i class="fas fa-trash-alt"></i></div>
				<div class="g-task-toggle"
					 :class="{ active: task.has_children, rotate: task.children.length }"
					 @click="toggleChildren(task)"><i class="fas fa-chevron-down"></i></div>
			</div>
			<List :children="task.children"
				  v-if="task.children.length" />
		</li>
	</ul>
</template>

<script>
	import List from "./List";
	import StatusBox from "./StatusBox";

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
			List,
			StatusBox
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
				if (task.children.length) {
					this.$store.commit('tasks/closeChildren', task);
				} else {
					this.$store.dispatch('tasks/showChildrenAction', task);
				}
			},
			createNewChild(parent) {
				this.$store.commit('tasks/createNewChild', parent);
			},
			openStatusBox(task) {
				this.$store.commit('tasks/openStatusBox', task);
			}
		},
		created() {
			if (!this.$props.children) {
				this.$store.dispatch('tasks/getTasksAction', this.$route.params.id);
			}
		},
	}
</script>

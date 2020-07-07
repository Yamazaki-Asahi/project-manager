<template>
	<ul class="page-tasks-list" :class="{'g-task-children': children}">
		<li class="g-task" v-for="task in tasks">
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
				<div class="g-task-add" @click="createNewChild(task)">
					<i class="fas fa-plus-circle"></i>
				</div>
				<div class="g-task-archive" @click="archiveTask(task)"><i class="fas fa-trash-alt"></i></div>
				<div class="g-task-toggle"
					 :class="{ active: task.has_children, rotate: task.children.length }"
					 @click="toggleChildren(task)"><i class="fas fa-chevron-down"></i></div>
			</div>
			<List :children="task.children"
				  :type="type"
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
		props: [
			'type',
			'children',
		],
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
				if (task.children.length) {
					this.$store.commit('tasks/closeChildren', task);
				} else {
					this.$store.dispatch('tasks/showChildrenAction', task);
				}
			},
			// createNewChild(parent) {
			// 	this.$store.commit('tasks/createNewChild', parent);
			// },
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

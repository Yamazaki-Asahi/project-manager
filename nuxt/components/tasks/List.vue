<template>
	<ul class="page-tasks-list" :class="{'g-task-children': children}">
		<li class="g-task" v-for="(task, i) in tasks">
			<div class="g-task-item" :style="{ backgroundColor: statuses[task.status_id].color }">
				<nuxt-link :to="getQuery(task.id)"
						   @click.native="openTask(task)"
						   class="g-task-name">{{ task.name }}</nuxt-link>
				<div class="g-task-status" @click="openStatuses(task)">
                    <span>{{ statuses[task.status_id].name }}</span>
                    <div class="g-task-select-status" v-if="task.openStatuses">
                        <ul>
                            <li v-for="(status, key) in statuses">
                                <label class="siimple-label">
                                    <div class="siimple-radio">
                                        <input :name="'task'+task.id+'-status'"
                                               :checked="task.status_id == key"
                                               type="radio"
                                               :id="'radio'+task.id+'-'+key"
                                               @change="updateStatus(task, key)">
                                        <label :for="'radio'+task.id+'-'+key"></label>
                                    </div>{{ status.name }}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
				<div class="g-task-add" @click="createNewChild(task)"><i class="fas fa-plus-circle"></i></div>
				<div class="g-task-archive" @click="archiveTask(task)"><i class="fas fa-trash-alt"></i></div>
				<div class="g-task-toggle"
					 :class="{ active: task.hasChildren, rotate: task.showChildren }"
					 @click="toggleChildren(task)"><i class="fas fa-chevron-down"></i></div>
			</div>
			<form v-if="task.newChild !== false" class="g-task-new-child">
				<input type="text"
					   class="g-task siimple-input siimple-input--fluid"
					   placeholder="+ 子タスクを追加">

			</form>
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
			},
			createNewChild(parent) {
				this.$store.commit('tasks/createNewChild', parent);
			},
			openStatuses(task) {
				this.$store.commit('tasks/openStatuses', task);
			},
			updateStatus(task, statusId) {
				this.$store.dispatch('tasks/updateStatusAction', {
					task: task,
					statusId: statusId
                });
			}
		},
		created() {
			if (!this.$props.children) {
				this.$store.dispatch('tasks/getTasksAction', this.$route.params.id);
			}
		},
	}
</script>

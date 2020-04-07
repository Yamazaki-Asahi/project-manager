<template>
	<div class="g-task-select" v-if="task.open_status_box">
		<div class="g-task-select-close" @click="closeStatusBox(task)"><i class="fas fa-times"></i></div>
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
</template>

<script>
	export default {
		name: 'List',
		computed: {
			statuses() {
				return this.$store.state.statuses.list
			}
		},
		props: ['task'],
		methods: {
			closeStatusBox(task) {
				this.$store.commit('tasks/closeStatusBox', task);
			},
			updateStatus(task, statusId) {
				this.$store.dispatch('tasks/updateStatusAction', {
					task: task,
					statusId: statusId
				});
			},
		}
	}
</script>

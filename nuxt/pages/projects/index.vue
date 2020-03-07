<template>
	<div class="page-projects-wrapper">
		<h2 class="g-heading-section">プロジェクト一覧</h2>
		<ul class="page-projects-list">
			<li v-for="project in projects.list"
				 class="siimple-card">
				<a :href="'/projects/'+project.id+'/tasks'" class="siimple-card-body">
					<div class="siimple-card-title">{{ project.name }}</div>
					<div class="siimple-card-subtitle">プロジェクトの説明が入ります。</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		layout: 'my_page',
		middleware: ['authenticated'],
		computed: {
			projects() {
				return this.$store.state.projects;
			}
		},
		created() {
			this.$store.dispatch('projects/getProjectsAction');
		}
	}
</script>
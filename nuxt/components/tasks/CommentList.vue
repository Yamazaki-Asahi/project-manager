<template>
	<ul class="list">
		<li v-for="comment in comments">
			<div class="user">
				<figure>
					<img src="https://placehold.jp/150x150.png" alt="">
				</figure>
				<span class="name">DUMMY</span>
			</div>
			<div class="body">
				<p class="message">{{ comment.body }}</p>
				<div class="bottom">
					<div class="tools">
						<i v-if="checkIfOwnComment(comment)" class="fa fa-trash-alt"></i>
						<i v-if="checkIfOwnComment(comment)" class="fas fa-edit"></i>
					</div>
					<time>{{ comment.created_at }}</time>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		props: [
			'comments',
		],
		computed: {
			user() {
				return this.$store.state.user
			},
		},
		methods: {
			checkIfOwnComment(comment) {
				if (comment.user_id === this.user.id) return true;
				return false;
			}
		}
	}
</script>

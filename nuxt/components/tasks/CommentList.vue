<template>
	<ul class="list">
		<li v-for="(comment, i) in comments">
			<div class="user">
				<figure>
					<img src="https://placehold.jp/150x150.png" alt="">
				</figure>
				<span class="name">{{ comment.user.name }}</span>
			</div>
			<div class="body">
				<p class="activity">{{ comment.user.name }}さんがコメントしました。<time>{{ comment.created_at }}</time></p>
				<p class="message" v-if="!comment.isCommentEditing">{{ comment.body }}</p>
				<textarea v-if="comment.isCommentEditing"
				:value="comment.body"
		  		:ref="'commentTextarea' + i"
				class="siimple-textarea"
				@blur="updateComment($event, comment)"></textarea>
				<div class="bottom">
					<div class="tools">
						<i v-if="checkIfOwnComment(comment)" @click="editComment(comment)" :class="{'is-editing': comment.isCommentEditing}" class="fas fa-edit"></i>
						<i v-if="checkIfOwnComment(comment)" @click="deleteComment(comment)" class="fa fa-trash-alt"></i>
					</div>
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
				if (comment.user.id === this.user.id) return true;
				return false;
			},
			editComment(comment) {
				this.$store.commit('task/editComment', comment);
			},
			updateComment(e, comment) {
				this.$store.dispatch('task/updateCommentAction', {
					comment: comment,
					key: 'body',
					value: e.target.value
				});
			},
			deleteComment(comment) {
				this.$store.dispatch('task/deleteCommentAction', comment);
			}
		},
		updated() {
			this.comments.forEach((comment, i) => {
				let ref = 'commentTextarea' + i;
				console.log(this.$refs[ref], ref);
				if (comment.isCommentEditing) this.$refs[ref][0].focus();
			});
		}
	}
</script>

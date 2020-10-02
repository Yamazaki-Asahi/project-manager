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
				<time>{{ comment.created_at }}</time>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		props: [
			'comments',
		]
	}
</script>

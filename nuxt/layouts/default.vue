<template>
	<div>
		<Header/>
		<div class="l-contents">
			<div class="l-side">
				<ul class="l-side-menu">
					<li><a href="/tasks">タスク</a></li>
					<li><a href="/wiki">Wiki</a></li>
					<li><a href="/chat">チャット</a></li>
					<li><a href="/files">ファイル</a></li>
				</ul>
			</div>
			<main class="l-main">
				<nuxt/>
			</main>
		</div>
	</div>
</template>

<script>
	import Header from '~/components/layouts/Header'
	export default {
		components: {
			Header,
		}
	}
</script>


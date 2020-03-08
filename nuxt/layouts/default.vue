<template>
	<div>
		<Header/>
		<div class="l-contents">
			<div class="l-side">
				<ul class="l-side-menu">
					<li><a href="/projects/1/tasks">タスク</a></li>
					<li><a href="/projects/1/wiki">Wiki</a></li>
					<li><a href="/projects/1/chat">チャット</a></li>
					<li><a href="/projects/1/files">ファイル</a></li>
					<li><a href="/projects/1/files">アクティビティ</a></li>
					<li><a href="/projects/1/setting">プロジェクト設定</a></li>
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
	}git
</script>


<template>
	<header class="l-header siimple-navbar">
		<h1>Nuxt Project</h1>
		<ul class="l-header-nav siimple--float-right" v-if="user.id">
			<li class="siimple-navbar-item"><a href="" class="siimple-navbar-item"><b>プロジェクトA</b></a></li>
			<li class="siimple-navbar-item">
				<a href="" class="siimple-navbar-item">{{ user.name }}</a>
<!--				<ul class="siimple-menu-submenu">-->
<!--					<li>マイページ</li>-->
<!--					<li>ユーザー情報編集</li>-->
<!--					<li>ログアウト</li>-->
<!--				</ul>-->
			</li>
		</ul>
	</header>
</template>

<script>
	export default {
		computed: {
			user() {
				return this.$store.state.user;
			}
		}
	}
</script>

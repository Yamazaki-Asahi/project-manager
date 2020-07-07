<template>
	<div class="page-tasks-search g-box">
		<h2 style="">検索条件</h2>
		<div class="page-tasks-search-contents">
			<div class="page-tasks-search-status">
				<h3>ステータス</h3>
				<ul>
					<li v-for="(key) in Object.keys(statuses)">
						<div class="siimple-checkbox">
							<input type="checkbox" :id="'status'+key">
							<label :for="'status'+key"></label>
						</div>
						<label :for="'status'+key" class="page-tasks-search-status-name">{{ statuses[key].name }}</label>
					</li>
				</ul>
			</div>
			<div class="page-tasks-search-keyword">
				<h3>キーワード</h3>
				<input type="text" class="siimple-input" placeholder="タスクのタイトルやコメントなどで検索できます">
			</div>
		</div>

		<div class="page-tasks-search-submit">
			<input type="submit" value="この条件で検索" class="siimple-btn siimple-btn--primary">
			<input type="reset" value="検索条件をクリア" class="siimple-btn">
			<input type="button" value="閉じる" class="siimple-btn" @click="closeSearchBox">
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			statuses() {
				return this.$store.state.statuses.list
			}
		},
		methods: {
			closeSearchBox() {
				this.$store.commit('search/closeSearchBox')
			}
		}
	}
</script>

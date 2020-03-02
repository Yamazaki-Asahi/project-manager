<template>
	<div class="page-login">
		<h2>ログイン</h2>
		<form class="siimple-form" @submit="login($event, email, password)">
			<div class="g-box">
				<div class="siimple-form-detail" v-if="message">{{ message }}</div>
				<div class="siimple-form-field">
					<div class="siimple-form-field-label">Emailアドレス</div>
					<input type="text"
						   v-model="email"
						   class="siimple-input siimple-input--fluid"
						   placeholder="abc@example.com">
				</div>
				<div class="siimple-form-field">
					<div class="siimple-form-field-label">パスワード</div>
					<input type="password"
						   v-model="password"
						   class="siimple-input siimple-input--fluid"
						   placeholder="">
				</div>
				<div class="siimple-form-field">
					<button class="siimple-btn siimple-btn--blue" type="submit">ログイン</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		data: () => {
			return {
				message: '',
				email: '',
				password: '',
			}
		},
		methods: {
			login(e) {
				e.preventDefault();
				console.log(this.email, this.password);
				let params = {
					email: this.email,
					password: this.password,
				};
				axios.post('/api/auth/login', params).then((res) => {
					this.$router.push('/tasks');
					console.log(res.data);
				}).catch(e => {
					alert(e.message);
					this.message = 'ログイン情報が間違っています。'
				});
			}
		}
	}
</script>
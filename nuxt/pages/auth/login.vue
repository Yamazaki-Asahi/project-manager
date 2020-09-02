<template>
	<div class="page-login">
		<h2>ログイン</h2>
		<form class="siimple-form" @submit="login($event, email, password)">
			<div class="gl-box">
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
		layout: 'no_login',
		methods: {
			login(e) {
				e.preventDefault();
                let params = {
                    email: this.email,
                    password: this.password,
                };
				axios.post('/api/auth/login', params).then((res) => {
					localStorage.setItem('access_token', res.data.access_token);
					axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
					this.$router.push('/projects');
				}).catch(e => {
					this.message = 'ログイン情報が間違っています。'
				});
			}
		}
	}
</script>

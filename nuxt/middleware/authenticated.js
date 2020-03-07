import axios from "axios";

export default async function ({ store, redirect }) {
  let token = localStorage.getItem('access_token');
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  await store.dispatch('user/getUserAction');
  if (!Object.keys(store.state.user).length) {
    return redirect('/auth/login');
  }
};
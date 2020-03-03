import axios from "axios";

export default async function ({ store, redirect }) {
  let token = localStorage.getItem('access_token');
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  await store.dispatch('user/checkIfAuthenticatedAction');
  if (!store.state.user.authenticated) {
    return redirect('/auth/login');
  }
};
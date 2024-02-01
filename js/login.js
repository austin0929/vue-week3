const { createApp } = Vue

createApp({
  data() {
    return {
      user: {
            username: '',
            password: ''
      }
    }
  },
  methods: {
      signIn () {
          const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
          axios.post(api, this.user).then((res) => {
            const { token, expired } = res.data
              document.cookie = `vuetoken=${token}; expires=${new Date(expired)};`;
          })
          setTimeout(() => {
            window.location.href = 'https://austin0929.github.io/vue-week3/adminProduct.html';
          }, 2000);
      },
  }
}).mount('#app')
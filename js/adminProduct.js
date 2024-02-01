const { createApp } = Vue
const api_path = 'david777'
const productModal = document.querySelector('#productModal')
const delProductModal = document.querySelector('#delProductModal')
let myModal = ''

createApp({
    data() {
      return {
        products: [],
        tempProduct: {
          imagesUrl: [],
        },
        isNew: false
      }
    },
    methods: {
        getProducts() {
            const api = `https://ec-course-api.hexschool.io/v2/api/${api_path}/admin/products/all`
            axios.get(api).then((res) => {
              this.products = res.data.products
                console.log(res)
            })
        },
        openModel (isNew, item) {
            myModal.show()
            if (isNew) {
              this.tempProduct = {}    
            } else {
              this.tempProduct = {...item}
            }
            this.isNew = isNew
          // 5 判斷this.tempProduct.imagesUrl不是陣列時 給予他陣列屬性
          // 避免新增產品無imagesUrl陣列而報錯
            if (!Array.isArray(this.tempProduct.imagesUrl)) {
               this.tempProduct.imagesUrl = []
            }
        },
        delOpenModel (product) {
            delModal.show()
            this.tempProduct = product
        },
        updateProduct () {
            let httpMethods = 'post'
            let api = `https://ec-course-api.hexschool.io/v2/api/${api_path}/admin/product`
            if (!this.isNew) {
                httpMethods = 'put'
                const editId = this.tempProduct.id
                api = `https://ec-course-api.hexschool.io/v2/api/${api_path}/admin/product/${editId}`
            }
            axios[httpMethods](api, { data: this.tempProduct }).then((res) => {
                this.tempProduct = {}
                this.getProducts()
            })
        },
        delProduct () {
            const id = this.tempProduct.id
            const api = `https://ec-course-api.hexschool.io/v2/api/${api_path}/admin/product/${id}`
            axios.delete(api).then((res) => {
              this.tempProduct = {}
              this.getProducts()
            })
        },
    },
    mounted () {
        const api = 'https://vue3-course-api.hexschool.io/v2/api/user/check'
        const myCookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)vuetoken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common.Authorization = myCookie
        if (!myCookie) {
          window.location.href = 'https://austin0929.github.io/vue-week3/';
        }
        axios.post(api).then((res) => {
        }),
        this.getProducts()
        myModal = new bootstrap.Modal('#productModal')
        delModal = new bootstrap.Modal('#delProductModal')
    }
}).mount('#app')
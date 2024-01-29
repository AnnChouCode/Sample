//因為 CDN 在該 HTML 的全域中，所以使用 const 解構
const { defineStore } = Pinia

export default defineStore("productsStore", {
    //state 對應 data
    state: () => ({ //注意 {} 外的 () 不能省略
        products: [
            {
                id: 1,
                title: '多色餅乾',
                imageUrl: 'https://images.unsplash.com/photo-1576717585968-8ea8166b89b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                price: 80
            },
            {
                id: 2,
                title: '綠色馬卡龍',
                imageUrl: 'https://images.unsplash.com/photo-1623066463831-3f7f6762734d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1135&q=80',
                price: 120
            },
            {
                id: 3,
                title: '甜蜜左擁右抱',
                imageUrl: 'https://images.unsplash.com/photo-1558312657-b2dead03d494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                price: 200,
            },
            {
                id: 4,
                title: '巧克力心連心',
                imageUrl: 'https://images.unsplash.com/photo-1606913084603-3e7702b01627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                price: 160
            },
            {
                id: 5,
                title: '粉係馬卡龍',
                imageUrl: 'https://images.unsplash.com/photo-1612201142855-7873bc1661b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                price: 120
            }
        ]
    }),
    //getters 對應 computed，將 products 傳出
    getters: {
        //因為 getters 引入的參數是整個 store，所以把 store 中的 products 用解構的方式提取出來使用
        sortProducts: ({ products }) => { return products.sort((a, b) => a.price - b.price) }

        //寫成以下也可以
        // sortProducts() {
        //     return this.products.sort((a, b) => a.price - b.price);
        // },
    }
})
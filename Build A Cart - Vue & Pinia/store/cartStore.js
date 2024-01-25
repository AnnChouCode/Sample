//因為 CDN 在該 HTML 的全域中，所以使用 const 解構
const { defineStore } = Pinia
//傳入 productsStore
import productsStore from "./productsStore.js"

export default defineStore("cartStore", {
    //state 對應 data
    state: () => ({ //注意 {} 外的 () 不能省
        cart: [],
    }),
    //actions 對應 methods
    actions: {
        addCart(productId, qty = 1) {
            //辨識購物車是否已經有該品項，若有則現有品項 +1
            const index = this.cart.findIndex(item => item.productId === productId)

            if (index !== -1) {
                this.cart[index].qty += qty
                console.log(this.cart[index])
            } else {
                //加入購物車中
                this.cart.push({
                    id: new Date().getTime(),
                    productId,
                    qty
                })
            }
        },
        setCartQty(id, event){
            console.log(id, event)
            // console.log(event.target.value, typeof event.target.value)

            const currentCart = this.cart.find( item => item.id === id)
            currentCart.qty = parseInt(event.target.value)
        },
        removeCartItem(id) {
            console.log(id)
            const index = this.cart.findIndex(item => item.productId === id)
            this.cart.splice(index, 1)
        }
    },
    //getters：可以將其想成 Options API 中的 computed 屬性，可以取用 state 資料做一些計算
    getters: {
        cartList: ({ cart }) => {
            //目標
            //1. 購物車的品項資訊，需要整合產品資訊
            //2. 必須計算小計的金額
            //3. 必須提供總金額

            //store 之間的互傳不用 computed，在上面 import 後解構取出就可以了，取出的名稱是對應 store 中的 state
            const { products } = productsStore()

            const carts = cart.map(item => {
                //從產品列表取出與購物車內相符 id 的單一產品
                const product = products.find(product => product.id === item.productId)

                return {
                    item,
                    product,
                    subTotal: item.qty * product.price //小計
                }
            })

            const total = carts.reduce((acc, cur) => acc + cur.subTotal, 0)

            console.log(carts)

            return {
                carts,
                total
            }
        }
    }
})
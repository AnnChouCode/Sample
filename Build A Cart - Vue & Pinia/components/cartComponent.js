//因為 CDN 在該 HTML 的全域中，所以使用 const 解構
const { mapState, mapActions } = Pinia

import cartStore from "../store/cartStore.js"

export default {
    template: /*html*/`<div class="bg-light p-4 my-4">
    <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
    <table v-else class="table align-middle">
      <tbody>
        <tr v-for="item in cartList.carts" :key="item.id">
          <td width="100">
            <a href="#" class="text-dark"><i class="fas fa-times" @click.prevent="removeCartItem(item.product.id)"></i></a>
          </td>
          <td width="100">
            <img
              :src="item.product.imageUrl"
              class="table-image"
              :alt="item.product.title"
            />
          </td>
          <td>{{item.product.title}}</td>
          <td width="200">
           <!-- 注意 event 必須要用箭頭函式才能帶入傳出 -->
            <select name="" id="" class="form-select" :value="item.item.qty" @change="(event) => setCartQty(item.item.id, event)">
              <option :value="i" v-for="i in 20" :key="i">{{i}}</option>
            </select>
          </td>
          <td width="200" class="text-end">$ {{item.product.price * item.item.qty}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">總金額 NT$ {{cartList.total}}</td>
        </tr>
      </tfoot>
    </table>
  </div>`,
  computed: {
    ...mapState(cartStore, ['cartList']),
  },
  methods:{
    ...mapActions(cartStore, ['removeCartItem', 'setCartQty'])
  },
}
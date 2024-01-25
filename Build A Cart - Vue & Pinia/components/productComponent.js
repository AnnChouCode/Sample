//引入 store
import productsStore from '../store/productsStore.js'
import cartStore from '../store/cartStore.js'
//導入資料使用 mapState，導入方法使用 mapActions
const { mapState, mapActions } = Pinia

export default {
  //productStore 傳回是寫在 getters 中，所以使用 computed 接受，再以 mapState 解構 productStore 和傳入值，[] 內寫 getters 裡面所有方法的名稱
  computed: {
    ...mapState(productsStore, ['sortProducts'])
  },
  //productStore 傳回是寫在 actions 中，所以使用 methods 接受，再以 mapActions 解構 cartStore 和傳入值，[] 內寫 actions 裡面所有方法的名稱
  methods:{
    ...mapActions(cartStore, ['addCart'])
  },
  //可於 template 使用以上內容，例如原本是連結 productComponent data 內的資料，改連 sortProduct
  template:/*html*/ `<div class="row row-cols-3 my-3">
    <div class="col" v-for="product in sortProducts" :key="product.id">
      <div class="card">
        <img
          :src="product.imageUrl"
          class="card-img-top"
          :alt="product.title"
        />
        <div class="card-body">
          <h6 class="card-title">
            {{product.title}}
            <span class="float-end">$ {{product.price}}</span>
          </h6>
          <a href="#" class="btn btn-outline-primary w-100" @click.prevent="addCart(product.id)">加入購物車</a>
        </div>
      </div>
    </div>
  </div>`
}
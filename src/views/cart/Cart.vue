<template>
  <div class='cart'>
    <nav-bar class="nav-bar">
      <div slot='center'>购物车({{cartLength}})</div>
      </nav-bar>

      <!-- 商品列表 -->
      <cart-list/>

      <!-- 底部汇总 -->
      <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from 'views/cart/childCom/CartList'
import CartBottomBar from './childCom/CartButtomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种语法
    ...mapGetters(['cartLength'],), // 法一
    // ...mapGetters({
    //   length: 'cartLength'   法二
    // }) 
  }

}
</script>

<style scoped> 
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  
}
</style>
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
      v-for="(item,index) in cartList " 
      :key='index'
      :item-info='item'/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  actived() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>
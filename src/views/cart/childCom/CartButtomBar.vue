<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked='isSelectAll' 
                    class="check-button" 
                    @click.native="checkClick" />
    </div>
    <span class="span">全选</span>
    <div class="price">
      合计： {{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name:'CartButtonBar',
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length == 0) return false
      // 1.使用filter
      // return !(this.cartList.filter(item => !item.checked).length)
      
      // 2.使用find
      return !(this.cartList.find(item => !item.checked))

      // 3.普通遍历
      // for (let item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      // }

      // return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { // 部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  /* background-color: red; */
  position: relative;
  display: flex;
  
  bottom: 133px;
  line-height: 40px;
  text-align: center;
  
}
.span {
  text-align: center;
  
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 30px;

  
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  
  flex: 1;
  width: 120px;
  
  
}

.calculate {
  width: 90px;
  background: red;
  color: white;
  text-align: center;
}
</style>
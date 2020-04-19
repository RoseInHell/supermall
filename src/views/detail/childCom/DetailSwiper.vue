<template>
<div class='detail-swiper'>
  <swiper>
    <swiper-item v-for="item in topImage" >
      <img :src="item" alt="" @load='imageLoad'>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imageLoad() {
      console.log('imageLoad')
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
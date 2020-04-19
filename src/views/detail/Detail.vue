<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav' @titleClick='titleClick' />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-image="topImages"/>
      <detail-base-info :good="goods" />
      <detail-shop-info :shop="shops" />
      <detail-goods-info :detail-infos="detailInfo" 
      @imageLoad='imageLoad'/>
      <detail-param-info ref='params' :paramInfo="goodsparam"/>
      <detail-comment-info ref='comment' :comment-infos="commentInfo" />
      <goods-list ref='recommend' :goods='recommends' />
      <div>{{$store.state.cartList[0]}}</div>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childCom/DetailNavBar'
import DetailSwiper from './childCom/DetailSwiper'
import DetailBaseInfo from './childCom/DetailBaseInfo'
import DetailShopInfo from './childCom/DetailShopInfo'
import DetailGoodsInfo from './childCom/DetailGoodsInfo'
import DetailParamInfo from './childCom/DetailParamInfo'
import DetailCommentInfo from './childCom/DetailCommentInfo'
import DetailBottomBar from './childCom/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      goodsparam: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 2.1获取顶部的图片轮播数据
      const data = res.result
      // console.log(res)
      this.topImages = data.itemInfo.topImages

      // 2.2获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 2.3获取商家信息
      this.shops = new Shop(data.shopInfo) 

      // 2.4获取商品详细信息
      this.detailInfo = data.detailInfo

      // 2.5获取参数的信息
      this.goodsparam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 2.6取出评论信息
      if(data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }
    }),

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list

      // 根据最新的数据，对应的DOM是已将被渲染出来
      // 但是图片依然是没有加载完(目前获取到offsetTop是不包含其中的图片)
      // offsetTop值不对的时候，都是因为图片的问题
    //   this.$nextTick(() => {
    //   this.themeTopY.push(0);
    //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopY)
    // })
    })
    // 4.给getThemeTopY赋值(对给this.themeTopY赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopY = []
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44)
      console.log(this.themeTopY)
    }, 200)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 1000)
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      this.$store.dispatch('addCart', product)
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;    /*这个class不加就在content里用overflow：hidden*/
}

.content {
  height: calc(100% - 44px - 49px);
  /* overflow: hidden;        法二*/
}
</style>
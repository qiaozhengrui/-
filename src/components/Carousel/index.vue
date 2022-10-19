<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    //这里的watch监听不到list,因为这个数据从未发生变化(数据是父组件给的，给的时候就是一个对象，对象里面该有的数据都是有的)
    list: {
      //immediate立即监听，不管数据是否有变化，都会立即调用(监听)一次
      immediate: true,
      handler() {
        //只能监听到数据已有，但v-for动态渲染结构还是没办法确定，因此还是需要用到$nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,//开启点击三个小球可以翻页
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
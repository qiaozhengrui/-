<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <!-- 商品小的几个图 -->
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{active: currentIndex == index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props: ['skuImageList'],
    //监听数据：可以确定服务器数据已经有了，但不能保证v-for遍历是否结束
    watch: {
      skuImageList(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            // loop: true, // 循环模式选项
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            //显示几个图片的设置
            slidesPerView: 3,
            //每次切换图片个数
            slidesPerGroup: 1,
          }) 
        })
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      changeCurrentIndex(index) {
        //修改响应式数据， 点谁谁有active边框样式
        this.currentIndex = index
        //通知兄弟(Zoom)组件，当前index是几，放大镜图也展示当前index图
        this.$bus.$emit('getIndex', this.currentIndex)//触发当前实例上的事件，传的值传给监听器回调
      }
    },

  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
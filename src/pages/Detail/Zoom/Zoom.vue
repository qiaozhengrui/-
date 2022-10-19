<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handle"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 绿色的遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ['skuImageList'],
    data() {
      return {
        currentIndex: 0,//默认为第一张图
      }
    },
    computed: {
      imgObj() {
        return this.skuImageList[this.currentIndex] || {}//skuImageList后面的值不能写死
      }
    },
    mounted() {
      //全局事件总线：获取兄弟(ImageList)组件传递过来的index
      this.$bus.$on('getIndex', (index) => {
        this.currentIndex = index//修改当前响应式数据
      })
    },
    methods: {
      handle(e) {
        let mask = this.$refs.mask
        let big = this.$refs.big
        //放大镜的左右
        let left = e.offsetX - mask.offsetWidth / 2;
        let top = e.offsetY - mask.offsetHeight / 2;
        //放大镜的约束范围
        if (left <= 0) {
          left = 0
        }
        if (left >= mask.offsetWidth) {//左边的对面超出mask.offsetWidth，让左边的对面等于mask.offsetWidth
          left = mask.offsetWidth
        }
        if (top <= 0) {
          top = 0
        }
        if (top >= mask.offsetHeight) {
          top = mask.offsetHeight
        }
        //修改元素的left|top属性值
        mask.style.left = left + 'px'//放大镜可以移动
        mask.style.top = top + 'px'
        big.style.left = -2 * left + 'px'//放大镜下的图也应移动，图已经放大二倍是二倍关系
        big.style.top = -2 * top + 'px'
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
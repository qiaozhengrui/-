<!-- 路由组件 -->
<template>
  <div>
    <!-- 三级联动全局组件：三级联动已注册为全局组件，因此不需要在引入 -->
    <TypeNav />
    <!-- 其他组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor组件内部是没有发请求的，数据是父组件传过来的 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
//引入其余的组件。注意：其他组件不是全局组件，需要引入注册使用
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
import { mapState } from 'vuex'

export default {
    name: "Home",
    components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action，获取floor组件的数据      发请求
    this.$store.dispatch("getFloorList")
    //校验获取用户信息后在首页展示
    this.$store.dispatch('userInfo')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style scoped>

</style>
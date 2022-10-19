<template>
  <div class="pagination">
    <!-- disabled当前页数<=1页都不能点。 emit触发事件，参数当前页数-1实现上页功能-->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <!-- 连续页数起始位大于1才让当前的按钮1出现 // 点第一页一定传1过去-->
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" 
      :class="{active: pageNo == 1}">1</button>
    <!-- 连续页数起始位需大于2...才可以出现，因为大于1的话，当当前页数为4，起始位为2 > 1, ...也会展示出来-->
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 分页器中间连续页码的部分 遍历页数  page当前页数-->
    <!-- 遍历到start的话1到当前的start，end是1到当前的end位置，前面的1-start不要 -->
    <!-- 点中间的第几页就是第几页 传page当前页数-->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" 
    v-if="(page >= startNumAndEndNum.start)" @click="$emit('getPageNo', page)" 
    :class="{active: pageNo == page}">{{ page }}</button>

    <!-- 连续页数结束位置要小于总页数(totalPage-1是要考虑最近的一位不应加...), ...才可以出现，>=则不出现 -->
    <button v-if="startNumAndEndNum.end < totalPage  - 1">···</button>
    <!-- 总页数     //连续页数结束位置小于总页数才让totalPage显示出。>=则不出现  点最后一个直接传总页数-->
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" 
    :class="{active: pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //父子通信
  //pageNo当前的页数、pageSize每页需展示多少条数据、total整个分页器共多少条数据、continues分页器连续页数
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    //计算出总共有多少页数 需上取整
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    //计算出连续的页码起始数字与结束数字,连续的页码数字至少是5
    startNumAndEndNum() {
      //先定义两个变量存储起始结束数据
      let start = 0
      let end = 0
      //连续页数至少是五页，总页数不够五页?   若连续页面数大于总页数
      if(this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {//正常情况  被减数不能写死，需考虑连续页数可能是5、7、9情况
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        //需考虑当前页数的start出现<=0的情况下如何展示页数
        if(start <= 0) {
          start = 1
          end = this.continues
        } else if(end > this.totalPage) {
          //需考虑当前页数的end出现>this.totalPage(总页数的情况下如何展示页数
          start = this.totalPage - this.continues + 1
          end = this.totalPage
        }
      }
      return {start, end}
    },
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: skyblue;
      color: #fff;
    }
  }
}
</style>
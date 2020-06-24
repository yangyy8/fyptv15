<template>
  <div class="my-table  tjtable">
    <el-table :data="data">
      <my-column v-for="(item,index) in col" :key="index" :col="item"></my-column>
    </el-table>
  </div>
</template>

<script>
import MyColumn from '../../Common/tablecol/MyColumn'
export default {
  name: 'MyTable',
  props:['col','data'],
  components: {MyColumn},
 
}
</script>
<template>
    <div>
        <el-table :data="tableData">
           <el-table-column type="index" label="序号" width="50">
            </el-table-column> 
            <el-table-column prop="name" label="名称">
                <template slot-scope="scope">
                <div>
                      <el-input size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                </div>
                </template>

            </el-table-column>
            <el-table-column label="操作" width="210">
                <template slot-scope="scope">
                 <div>
                    <el-button size="mini" type="success" @click="add(0)"  class="a-btn"  title="新增"  icon="el-icon-plus"></el-button>
                    <el-button size="mini" type="danger"  @click="del(scope.$index, scope.row)" icon="el-icon-delete"  title="删除" class="a-btn"></el-button>
                </div>
                </template>
            </el-table-column>
        </el-table>
         <div slot="footer" class="mt-20" style="text-align:center">
              <el-button type="primary" style="width:120px;" @click="goadd()">保存</el-button>
            </div>
    </div>
</template>
<script>
export default {
    name:'DIC',
    props:['type','random'],
    data(){
        return{
           tableData:[],
        }
    },
    mounted(){
     this.getin();
    },
    watch:{
      random:function(newVal,oldVal){
          this.getin();
      },
    },
    methods:{
        getin(){
            this.tableData=[];
            this.tableData.push({name:''});
        },
        add(t){
            this.tableData.push({name:''});
            this.$emit('DfatherMethod',this.type); 
        },
        del(index,r){
            if(index!=0){
              this.tableData.splice(index, 1)
            }
        },
    },
}
</script>
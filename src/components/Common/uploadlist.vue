<template>
    <div class="subtable mb-20" v-if="fileshow">
                        <el-table
                            ref="multipleTable"
                            :data="filetableData">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                             <el-table-column
                                prop="filename"
                                label="文件名称">
                            </el-table-column>
                            <el-table-column
                                prop="filetype"
                                label="文件类型">
                            </el-table-column>
                            <el-table-column
                                prop="relfiletype"
                                label="文件种类">
                            </el-table-column>
                              <el-table-column
                                prop="isvalid"
                                label="文件状态">
                                <template slot-scope="scope">
                                    <div>
                                        <span v-if="scope.row.isvalid=='0'" class="red">无效</span>
                                        <span v-if="scope.row.isvalid=='1'" class="colorblue">有效</span>
                                    </div>
                                </template>
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                 <template slot-scope="scope">
                                    <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row)"></el-button>
                                </template>
                            </el-table-column>
                           </el-table>
    </div>
</template>
<script>

export default {
    name:'UPLOADLIST',
    props:['data','type','random'],
    data(){
        return{
            filetableData:[],
            fileshow:false,
        }
    },
    mounted(){

    },
    watch:{
         random:function(newVal,oldVal){
              this.filetableData=this.data;  
              if(this.filetableData.length>0){
                   this.fileshow=true;
              }else{
                   this.fileshow=false;
              }
        },
    },
    methods:{
        del(n){
           
             if(this.filetableData.length>0){
                   this.fileshow=true;
              }else{
                   this.fileshow=false;
              }
            let p={
                  'focusCaseRelFileId':n.focuscaserelfileid,
                  'token':this.$store.state.token,
            };
             this.$api.post(this.Global.aport2+'/CaseRegisterController/delFile',p,
                r =>{

                     var arr=[];
                     arr.push(n);
                    for (let i = 0; i < arr.length; i++) {
                     var index = this.filetableData.findIndex(item =>{
　　　　　　　　　  　 if(item.focuscaserelfileid==arr[i].focuscaserelfileid){
        　　　　　　　　　　　　return true
        　　　　　　　　　　}
        　　　　　　　　})
        　　　　　　　　this.filetableData.splice(index,1)
                    }

                     
                });
        },
    },
}
</script>
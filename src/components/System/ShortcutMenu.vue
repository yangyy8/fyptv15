<template>
     <div class="pairadd subtable">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 系统管理 <span class="mlr_10">/</span>  <b>修改密码</b></span> </div>
          <div class="content">
             <div class="pborder" style="text-align:center">
                   <div class="ptitle mb-20" style="text-align:center">快捷菜单设定</div>
                   <div style="width:800px; margin:0 auto;line-height:50px">
                       <el-row>
                          <el-col :span="24">
                           <el-table
                            ref="multipleTable"
                            :data="tableData"
                             @row-click="clickRow"
                            @selection-change="yhChange">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                             <el-table-column
                                prop="mc1"
                                label="画面名称">
                            </el-table-column>
                              <el-table-column
                                prop="mc2"
                                label="按钮">
                            </el-table-column>
                            <el-table-column
                                prop="mc3"
                                label="菜单名称">
                            </el-table-column>
                             <el-table-column
                                prop="mc4"
                                label="排序">
                                 <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"   class="a-btn"  title="上移"  icon="el-icon-top" @click="getMove(0,scope.row.id)"></el-button>
                                     <el-button type="text"   class="a-btn"  title="下移"  icon="el-icon-bottom" @click="getMove(1,scope.row.id)"></el-button>
                                     </div>
                                  </template>
                            </el-table-column>
                     </el-table>
                      <div class="middle-foot">
                                <div class="page-msg">
                                    <!-- <div class="">
                                共{{TotalResult}}条记录
                                    </div>
                                    <div class="">
                                    每页显示
                                    <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    条
                                    </div>
                                    <div class="">
                                    共{{Math.ceil(TotalResult/pageSize)}}页
                                    </div> -->
                                </div>
                                <el-pagination
                                    background
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="CurrentPage"
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total="TotalResult">
                                </el-pagination>
                            </div>
                
                          </el-col>                          
                       </el-row>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="small" @click="save">提 交 </el-button>
                    <el-button @click="reset" size="small">重 置</el-button>
                    </div>
                   
             </div>
              <div style="font-size:23px;color:red;font-weight:bold;line-height:50px;">{{msg}}</div>
              </div>
          </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            CurrentPage: 1,
            pageSize: 10,
            TotalResult: 0,
            tableData:[{mc1:'联络活动',mc2:'查询',mc3:'联络活动-查询',mc4:'2'}],
            pd:{},
            msg:'',
            mselect:[],
        }
    },
    mounted(){},
    methods:{
        pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.pd);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.pd);
        },
        clickRow(row){
           this.$refs.multipleTable.toggleRowSelection(row)
        },
         yhChange(val){
            this.mselect=val;
        },
        getList(currentPage, showCount){
                 
        },
        save(){
            if(this.mselect.length==0){
                this.$message.error("请选择要显示的快捷菜单!");return;
            }           
                let p = {
                    'account':this.pd.account
                };
            this.$api.post(this.Global.aport1+'/user/changeUser',p,
            r=>{
                      if(r.code==1){
                         this.msg="修改成功";
                         this.pd={};
                      }else{
                          this.msg=r.message;
                      }
            });
        },
        getMove(t,d)
        {

        },
        reset(){
            this.getList(this.CurrentPage,this.pageSize);
        },

    },
}
</script>
<style scoped>
.txtr{text-align: right!important;}
</style>
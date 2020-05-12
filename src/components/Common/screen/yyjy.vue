<template>
    <div class="dialogmain">
  
            <div class="title"><img src="../../../assets/img/screen/left.png" class="mr-10">基本信息</div>
            <div class="yyjyborder mt-10">
                <el-row>
                    <el-col :span="8" class="input-item">
                          <span class="yy-input-text">议案类型：</span>
                          <div class="yy-input-input pinput">日常意见建议</div>
                    </el-col>
                     <el-col :span="8" class="input-item">
                          <span class="yy-input-text">编号：</span>
                          <div class="yy-input-input pinput">152145241</div>
                    </el-col>
                     <el-col :span="8" class="input-item">
                          <span class="yy-input-text">业务种类：</span>
                          <div class="yy-input-input pinput">科、教、文、卫和体育类</div>
                    </el-col>
                </el-row>
                <el-row class="mt-10">
                      <el-col :span="24" class="input-item">
                          <span class="yy-input-text" style="width:9%!important;">标题：</span>
                          <div class="yy-input-input pinput" style="width:86.6%!important;">日常审判工作建议意见</div>
                    </el-col>
                </el-row>
                <el-table
                      ref="multipleTable"
                      :data="tableData"
                      style="width: 96.5%"
                      >
                     <el-table-column
                        type="index"
                        label="序号" width="80">
                     </el-table-column>
                     <el-table-column
                        prop="affiliationUnitName"
                        label="单位名称">
                    </el-table-column>
                    <el-table-column
                         prop="underTakeTypeName"
                         label="承办类别">
                    </el-table-column>
                    <el-table-column
                         prop="underTakeNatureName"
                        label="承办性质">
                    </el-table-column>
               </el-table>
                <el-row class="mt-10">
                    <el-col :span="8" class="input-item">
                          <span class="yy-input-text">来文期间：</span>
                          <div class="yy-input-input pinput">两会期间</div>
                    </el-col>
                     <el-col :span="8" class="input-item">
                          <span class="yy-input-text">届次：</span>
                          <div class="yy-input-input pinput">第十三届</div>
                    </el-col>
                     <el-col :span="8" class="input-item">
                          <div class="yy-input-input pinput">第五次</div>
                    </el-col>
                </el-row>
                <el-row class="mt-10">
                    <el-col :span="12" class="input-item">
                          <span class="yy-input-text" style="width:18%!important;">领衔代表：</span>
                          <div class="yy-input-input pinput">张文莉(全国人大代表-河北)</div>
                    </el-col>
                     <el-col :span="12" class="input-item">
                       <el-tag effect="dark">连续0届</el-tag>
                    </el-col>
                    
                </el-row>
                  <el-table
                    ref="multipleTable"
                    :data="tableData1"
                    style="width:96.6%">

                            <el-table-column
                                type="index"
                                label="序号" width="80">
                            </el-table-column>
                            <el-table-column
                                prop="personName"
                                label="姓名">
                            </el-table-column>
                             <el-table-column
                                label="团(界)别">
                             <template slot-scope="scope">
                                   <div>
                                      <span v-if="scope.row.groupType!=null && scope.row.circlesType!=null">{{scope.row.groupType}}</span>
                                      <span v-else-if="scope.row.groupType!=null">{{scope.row.groupType}}</span>
                                      <span v-else-if="scope.row.circlesType!=null">{{scope.row.circlesType}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="orgName"
                                label="单位">
                            </el-table-column>
                              <el-table-column
                                prop="cardNumber"
                                label="证号">
                            </el-table-column>
                             <el-table-column
                                prop="identity"
                                label="身份">
                            </el-table-column>

                   </el-table>
            </div>
     
    </div>
</template>
<script>
export default {
    name:'YYJY',
    props:['type','data','random'],
    data(){
        return{
           tableData:[{affiliationUnitName:'重庆市高级人民法院'}],
           tableData1:[],
        }
    },
    mounted(){
     this.getinit();
    },
    methods:{
        
        getinit(){
            console.log(this.data,'ProposalType');
            
        },
    },
}
</script>
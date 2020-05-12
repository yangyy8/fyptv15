<template>
    <div class="dialogmain">
          <div class="title mt-20"><img src="../../../assets/img/screen/left.png" class="mr-10">人员列表信息</div>
                <el-table
                    ref="multipleTable"
                    :data="tableData" 
                    @row-click="openDetails">
                            <el-table-column
                                type="index"
                                label="序号" width="80">
                                 <template slot-scope="scope">
                                    <div>
                                    <span>{{(CurrentPage - 1) * pageSize + scope.$index + 1}}</span>
                                    </div>
                                 </template>
                            </el-table-column>
                            <el-table-column
                                prop="PersonName"
                                label="姓名">
                            </el-table-column>
                            <el-table-column
                                prop="SexValue"
                                label="性别">
                            </el-table-column>
                             <el-table-column
                                prop="PeriodTypeValue"
                                label="届别">
                            </el-table-column>
                             <el-table-column
                                label="团(界)别" width="180">
                             <template slot-scope="scope">
                                   <div>
                                      <span v-if="scope.row.GroupTypeValue!=null && scope.row.CirclesTypeValue!=null">{{scope.row.GroupTypeValue}}</span>
                                      <span v-else-if="scope.row.GroupTypeValue!=null">{{scope.row.GroupTypeValue}}</span>
                                      <span v-else-if="scope.row.CirclesTypeValue!=null">{{scope.row.CirclesTypeValue}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="NationalityValue"
                                label="民族">
                            </el-table-column>
                              <el-table-column
                                prop="CardNumber"
                                label="证号">
                            </el-table-column>
                             <el-table-column
                                prop="PartisanValue"
                                label="政治面貌">
                            </el-table-column>

                   </el-table>
                   <div class="middle-foot">
                                <div class="page-msg">
                                    <div class="">
                                共{{TotalResult}}条记录
                                    </div>
                                    <!-- <div class="">
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
    </div>
</template>
<script>
export default {
    name:'RYLB',
    props:['type','data','random'],
    data(){
        return{
         CurrentPage: 1,
         pageSize: 10,
         TotalResult: 0,
         tableData:[],
         
        }
    },
    mounted(){
     this.getList(this.CurrentPage,this.pageSize,this.data);
    },
    methods:{
        
        getList(currentPage,showCount,data){
             
            let p3={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID": this.data.orgId,
                "Year": this.data.year,
                "type": this.data.type,
                  "pageNumber": currentPage,
                "pageSize": showCount,
              },
              "itemIndex": [
                "SY_RSTJXX"
              ]
            }
           this.$api.post(this.Global.aporttj,p3,
           
            r =>{
                  if(r.code==200){
                       if(r.data.indexItemsValues.SY_RSTJXX.data){
                          this.tableData=r.data.indexItemsValues.SY_RSTJXX.data;
                          this.TotalResult=r.data.indexItemsValues.SY_RSTJXX.total;
                       
                      }
                }  
          });
        },
        pageSizeChange(val) {
          this.pageSize=val;
          this.getList(this.CurrentPage, val, this.pd);
        },
        handleCurrentChange(val) {
          this.CurrentPage=val;
          this.getList(val, this.pageSize, this.pd);
        },
        openDetails(row){
           this.$router.push({ name: "contacts",query:{mid:row.PBId} });
        },
    },
}
</script>
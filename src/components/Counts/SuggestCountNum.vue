<template>
    <div class="pairadd tjtable">
        <div class="homebread">
            <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
            <span> 统计信息 
            <span class="mlr_10">/</span>  
            <b>办理工作信息统计</b> 
            <span class="mlr_10">/</span> 
             <span class="topbnt" @click="$router.push({path:'SuggestCount'})"><b>建议议案统计</b> </span>
             <span class="mlr_10">/</span> 
             <b>{{cname}}</b>
             </span></div>

       <div class="content ">
          <div class="ptitle mb-20">
            <el-row>
              <el-col :span="15">{{cname}}
             </el-col>
              <el-col :span="9" style="text-align:right"> <el-button size="mini" @click="$router.go(-1)">返 回</el-button></el-col>
            </el-row>
            
          </div>
          <div class="pborder">
          <el-row class="lh" :gutter="2">
                      <el-col :sm="24" :md="12" :lg="12" class="input-item">
                      <span class="yy-input-text" style="width:18%!important;">
                          <font class="red">*</font> 年份</span>
                      <div class="yy-input-input  t-flex  t-date" >
                         <el-select v-model="pd.beginTime" filterable clearable default-first-option placeholder="开始年份"  size="small" style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in yeardata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                        <span class="septum">-</span>
                         <el-select v-model="pd.endTime" filterable clearable default-first-option placeholder="结束年份"  size="small" style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in yeardata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                     </div>
                     </el-col>
                      <el-col :sm="24" :md="12" :lg="12">
                          <span class="yy-input-text" style="width:18%!important;">
                       议案类型</span>
                            <el-select v-model="pd.proposalType"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                         <el-option  label="代表议案" value="0204000001">
                          </el-option>
                           <el-option  label="政协提案" value="0204000002">
                          </el-option>
                           <el-option  label="建议、批评与意见" value="0204000003">
                          </el-option>
                        </el-select>

                      </el-col>
                       
                    </el-row>
                    <div class="footer">
                            <el-button type="primary"  style="width:130px;" @click="getList">查 询</el-button>
                            <el-button style="width:130px;"  @click="reset()">重  置</el-button>
                           
                    </div>
                </div>
                <div style="text-align:center;font-size:25px;line-height:60px;">{{name}}</div>
                <el-row class="mt-15" style="text-align: right">
                   <el-button size="small" @click="download()">导出</el-button>
                </el-row>
                      <el-table 
                        :data="tableData"
                        :span-method="objectSpanMethod"
                        style="width: 100%">
                        <el-table-column
                            prop="yearTotal"
                            label="年度总数">
                        </el-table-column>
                        <el-table-column
                            prop="proposalType"
                            label="类型">
                        </el-table-column>
                         <el-table-column
                            prop="typeSum"
                            label="总数">
                        </el-table-column>
                         <el-table-column
                            prop="aloneSum"
                            label="独办">
                        </el-table-column>
                         <el-table-column
                            prop="hostSum"
                            label="主办">
                        </el-table-column>
                         <el-table-column
                            prop="apartSum"
                            label="分办">
                        </el-table-column>
                         <el-table-column
                            prop="coHostSum"
                            label="协办">
                        </el-table-column>
                          <el-table-column
                            prop="referSum"
                            label="参阅">
                        </el-table-column>
                    </el-table>
                     <br/>
                </div>  
        
     </div>
</template>
<script>
import {getYear,format} from '@/assets/js/date.js'
export default {
    data()
    {
        return{
           cname:'',
           yeardata:getYear(),
           tableData:[],
           pd:{},
           name:'历年两会建议提案统计',
           type:'',
           spanArr:[],
           pos:0,
           
         }
    },
    mounted(){
        this.$store.dispatch("getYalx");
        
        this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
          getinit(val){
            this.cname=val.query.mc;
            this.type=val.query.type;
            var date=new Date().getFullYear();
            this.$set(this.pd,'beginTime',date);
            this.$set(this.pd,'endTime',date);
            this.getList();
          },
          reset(){
              this.$set(this.pd,'beginTime','');
              this.$set(this.pd,'endTime','');
              this.$set(this.pd,'proposalType','');
          },
          getList(){
           
              if(this.pd.beginTime=='' || this.pd.beginTime==null || this.pd.beginTime==undefined){
                 this.$message.error('开始年份不能为空！');return;
              }
              if(this.pd.endTime=='' || this.pd.endTime==null || this.pd.endTime==undefined){
                 this.$message.error('结束年份不能为空！');return;
              }
              this.pd.statisticType=this.type;
              this.pd.token=this.$store.state.token;
              this.pd.isDownLoad='0';//0是查询，1是下载
             
           this.$api.post(this.Global.aport1+'/proposalStatistic/queryProposalStatisticInfo',this.pd,
                r =>{
                    if(r.code==1){
                        this.tableData=r.data.statisticInfo;
                        this.getSpanArr(this.tableData);
                    }
           });
          },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
         
          if (columnIndex === 0) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            // alert(_row);
            // alert(_col);
            return {
                  rowspan: _row,
                  colspan: _col
            }
          }
      
    },
    getSpanArr(data) {　
      this.spanArr=[];
          for (var i = 0; i < data.length; i++) {
            
            if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
            } else {
              // 判断当前元素与上一个元素是否相同
            if (data[i].yearTotal === data[i - 1].yearTotal) {
                this.spanArr[this.pos] += 1;
                this.spanArr.push(0);
              } else {
                this.spanArr.push(1);
                this.pos = i;
              }
            }
        }
    },

           download(t){
             
             if(this.pd.beginTime=='' || this.pd.beginTime==null || this.pd.beginTime==undefined){
                 this.$message.error('开始年份不能为空！');return;
              }
              if(this.pd.endTime=='' || this.pd.endTime==null || this.pd.endTime==undefined){
                 this.$message.error('结束年份不能为空！');return;
              }
              this.pd.statisticType=this.type;
              this.pd.token=this.$store.state.token;
              this.pd.isDownLoad='1';//0是查询，1是下载
              this.$api.post(this.Global.aport1+'/proposalStatistic/queryProposalStatisticInfo',this.pd,
                r =>{
                      this.downloadM(r);
                },e=>{},{},'blob')
          },
            downloadM (data) {
            if (!data) {
                return
            }       
            var name=this.cname+format(new Date(),'yyyyMMddhhmmss')+'.xls';
            let url = window.URL.createObjectURL(new Blob([data],{type:"application/xls"}))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download',name)
            document.body.appendChild(link)
            link.click()
        },
    },
}
</script>
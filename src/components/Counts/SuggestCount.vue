<template>
      <div class="pairadd tjtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>{{cname}}</b></span> </div>
         <div class="content">
             <div class="ptitle mb-20">{{cname}}</div>
             <div class="pborder">
                <el-row class="lh" :gutter="2">
                    
                        <el-col :sm="24" :md="12" :lg="12" class="input-item">
                      <span class="yy-input-text" style="width:18%!important;">时间范围</span>
                      <div class="yy-input-input  t-flex  t-date" >
                        <el-date-picker
                           v-model="pd.beginTime" format="yyyy-MM-dd"
                           type="date" size="small" value-format="yyyy-MM-dd"
                           placeholder="开始时间" >
                        </el-date-picker>
                        <span class="septum">-</span>
                        <el-date-picker
                            v-model="pd.endTime" format="yyyy-MM-dd"
                            type="date" size="small" value-format="yyyy-MM-dd"
                            placeholder="结束时间" >
                        </el-date-picker>
                     </div>
                     </el-col>
                       
                        
                    </el-row>
                <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="getCount">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
 </div>
         <div style="text-align:center;font-size:25px;line-height:60px;">{{cname}}表</div>
          <!-- :span-method="objectSpanMethod" -->
         <el-table
            :data="tableData"
            style="width: 100%"
           >
              <el-table-column
                 label="类别"
                 prop="count"
                >
                </el-table-column>
            <el-table-column
                label="到期情况">
                   <el-table-column
                    prop="province"
                    label="总数">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="已结数">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="未结数">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="重点数">
                    </el-table-column>
            </el-table-column>
            <el-table-column
                label="分开情况">
                <el-table-column
                    prop="city"
                    label="公开">
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="不公开">
                    </el-table-column>
            </el-table-column>
             <el-table-column
                label="沟通情况">
                <el-table-column
                    prop="city"
                    label="电话">
                 </el-table-column>
                <el-table-column
                    prop="city"
                    label="短信">
                 </el-table-column>
                <el-table-column
                    prop="city"
                    label="走访">
                 </el-table-column>
            </el-table-column>
            <el-table-column
                label="答复情况">
                <el-table-column
                    prop="city"
                    label="A">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="B">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="C">
                    </el-table-column>
            </el-table-column>
             <el-table-column
                prop="count"
                label="办理类型">
            </el-table-column>
            <el-table-column
                prop="count"
                label="总数">
            </el-table-column>
            <el-table-column
                prop="count"
                label="已结数">
            </el-table-column>
            <el-table-column
                prop="count"
                label="未结数">
            </el-table-column>
              <el-table-column
                prop="count"
                label="办结率">
            </el-table-column>
         </el-table>
          <br/>
    </div>
   
     </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            pd:{year:'2019'},
            fydwdata:[],
            yeardata:[],
            monthdata:[],
            cname:'建议、批评和意见信息统计',
            type:'',
        }
    },
    mounted(){
       this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
        getinit(val){
            this.type=val.query.type;
            console.log(this.type);
            
            switch (this.type) {
                case '1':
                     this.cname='建议、批评和意见信息统计'
                    break;
                case '2':
                     this.cname='代表议案信息统计'
                    break;
                 case '3':
                     this.cname='政协提案信息统计'
                    break;
                 case '4':
                     this.cname='审议意见信息统计'
                    break;
                case '5':
                     this.cname='日常意见建议信息统计'
                    break;
                default:
                    break;
            }
            this.getyear();
            this.getmonth();
        },
        getCount(){
          if(this.pd.year==undefined || this.pd.year=="" || this.pd.year==null){
              this.$message.error("年份必选！");return;
          }
          this.$api.get(this.Global.aport1+'/ActivityInfoController/getStatistcsInfo', this.pd,
                r =>{
                    if(r.code==1){
                        this.tableData=r.data;
                   }
           });
        },
       reset(){
           this.pd={};
       },
       //法院单位
        getFY(){
            let p={
                'name':'',
            };
          this.$api.get(this.Global.aport1+'/org/getCourtOrg',p,
                r =>{
                    if(r.code==1){
                        this.fydwdata=r.data;
                    }
           });
        },
        getyear(){
            var date=new Date();
            var arr=[];
            var array=date.getFullYear();
               for (let i =0; i < 3; i++) {
                    var obj={};
                    obj.dm=parseInt(array)-i;
                    obj.mc=parseInt(array)-i;
                    arr.push(obj);
                }
            this.yeardata=arr;
        },
        getmonth(){
            var date=new Date();
            var arr=[];
               for (let i =1; i < 13; i++) {
                    var obj={};
                    obj.dm=i;
                    obj.mc=i;
                    arr.push(obj);
                }
            this.monthdata=arr;
        },
    },
}
</script>

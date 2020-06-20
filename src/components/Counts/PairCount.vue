<template>
      <div class="pairadd tjqtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>联络工作信息</b></span> </div>
         <div class="content">
             <div class="ptitle mb-20">联络工作信息</div>
             <div class="pborder">
                <el-row class="lh" :gutter="2">
                    <el-col :sm="24" :md="12" :lg="12" class="input-item">
                            <span class="yy-input-text" style="width:19%;"><font class="red">*</font> 开始年月</span>
                            <div class="yy-input-input">
                           <el-select v-model="pd.startYear" filterable clearable default-first-option placeholder="请选择"  size="small" style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in yeardata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                           <el-select v-model="pd.startMonth" filterable clearable default-first-option placeholder="请选择"  size="small"  style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in monthdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                            </div>
                        </el-col>
                         <el-col :sm="24" :md="12" :lg="12" class="input-item">
                            <span class="yy-input-text" style="width:19%;"><font class="red">*</font> 结束年月</span>
                            <div class="yy-input-input">
                           <el-select v-model="pd.endYear" filterable clearable default-first-option placeholder="请选择"  size="small" style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in yeardata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                           <el-select v-model="pd.endMonth" filterable clearable default-first-option placeholder="请选择"  size="small"  style="width:49%;">
                               <el-option
                                 v-for="(item,ind) in monthdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.dm">
                                 </el-option>
                            </el-select>
                            </div>
                        </el-col>
                    
                        <el-col :sm="24" :md="12" :lg="12">
                            <span class="yy-input-text" style="width:18%!important;">开展单位</span>
                           <el-select v-model="pd.orgUnitId"  remote :remote-method="kzdwremoteMethod" v-el-select-loadmore="kzloadmore" @change="getNull(pd.orgUnitId,1)" filterable clearable allow-create default-first-option placeholder="请输入关键字搜索"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in kzdwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                     
                         <el-col :sm="24" :md="12" :lg="12">
                            <span class="yy-input-text" style="width:18%">录入单位</span>
                           <el-select v-model="pd.entryUnitId" remote :remote-method="fydwremoteMethod" v-el-select-loadmore="fyloadmore" @change="getNull(pd.entryUnitId,2)" filterable clearable allow-create default-first-option placeholder="请输入关键字搜索"  size="small" class="yy-input-input" >
                               <el-option
                                 v-for="(item,ind) in fydwdata"
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                            </el-select>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="24">
                            <span class="yy-input-text" style="width:9%">地点</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="pd.location"  class="yy-input-input" style="width:80%!important" ></el-input>
                        </el-col>
                        
                    </el-row>
                <div class="footer">
                    <el-button type="primary"  style="width:130px;" @click="getCount">查 询</el-button>
                    <el-button style="width:130px;" @click="reset()">重  置</el-button>
                </div>
            </div>
         <div style="text-align:center;font-size:25px;line-height:60px;">最高院联络办联络工作统计</div>
          <!-- :span-method="objectSpanMethod" -->
          <el-row class="mt-15" style="text-align: right">
              <el-button size="small" @click="download()">导出</el-button>
          </el-row>
         <el-table
            :data="tableData"
            style="width: 100%"
           >
            <el-table-column
                 label="类型"
                 width="150"
                >
                <el-table-column
                    prop="yearAndMonth"
                    label="月份"
                    width="120">
                </el-table-column>
            </el-table-column>
            <el-table-column
                prop="pair"
                label="结对活动">
            </el-table-column>
            <el-table-column
                prop="inspect"
                label="专项视察">
            </el-table-column>
             <el-table-column
                prop="research"
                label="专题调研">
            </el-table-column>
            <el-table-column
                prop="listen"
                label="旁听庭审">
            </el-table-column>
             <el-table-column
                prop="witness"
                label="见证执行">
            </el-table-column>
            <el-table-column
                prop="meeting"
                label="会议座谈">
            </el-table-column>
            <el-table-column
                prop="daliyVisit"
                label="日常走访">
            </el-table-column>
            <el-table-column
                prop="daliyReception"
                label="日常接待">
            </el-table-column>
              <el-table-column
                prop="newsMedia"
                label="新闻宣传">
            </el-table-column>
           
            <el-table-column
                prop="others"
                label="其他">
            </el-table-column>
         </el-table>
          <br/>
    </div>
   
     </div>
</template>
<script>
import {format} from '@/assets/js/date.js'
export default {
     directives: {
          'el-select-loadmore': {
            bind(el, binding) {
              const SELECTWRAP_DOM = el.querySelector(
                '.el-select-dropdown .el-select-dropdown__wrap'
              );
              SELECTWRAP_DOM.addEventListener('scroll', function() {
                const condition =
                  this.scrollHeight - this.scrollTop <= this.clientHeight;
                if (condition) {
                  binding.value();
                }
              });
            }
          }
  },
    data(){
        return{
            tableData:[],
            pd:{},
            fydwdata:[],
            yeardata:[],
            monthdata:[],
            spanArr:[],
            kzdwdata:[],
            kzdwload:[],
            formData: {   //下拉参数
                pageIndex: 1,
                pageSize: 20
            },
           jznum:50,//下载加载多少条
           bs:0,
           fydwload:[],
        }
    },
    mounted(){
        // this.spanArr=[]; 
       
        this.getyear();
        this.getmonth();
        this.getFY();
         //权限start
                 this.$api.post(this.Global.menuurl,{'menuId':'14122610'},
                     r =>{
                          if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
                  });
        //权限end
        // this.getSpanArr(this.tableData);
    },
    methods:{
        // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          
            
        //  if (columnIndex === 0) {

        //     const _row = this.spanArr[rowIndex];

        //     const _col = _row > 0 ? 1 : 0;
        //     console.log(_row,_col);
            

        //     return {

        //           rowspan: _row,

        //           colspan: _col

        //     }

        //   }

      
        // },
    //  getSpanArr(data) {

    //   console.log(data)

    //       for (var i = 0; i < data.length; i++) {

    //         if (i === 0) {

    //           this.spanArr.push(1);

    //           this.pos = 0

    //         } else {

    //           // 判断当前元素与上一个元素是否相同,因合并第一个所以[0]

    //         if (data[i][0] === data[i - 1][0]) {

    //             this.spanArr[this.pos] += 1;

    //             this.spanArr.push(0);

    //           } else {

    //             this.spanArr.push(1);

    //             this.pos = i;

    //           }

    //         }

    //     }

    // },
        getCount(){
          if(this.pd.startYear==undefined || this.pd.startYear=="" || this.pd.startYear==null){
              this.$message.error("开始年必选！");return;
          }
          if(this.pd.startMonth==undefined || this.pd.startMonth=="" || this.pd.startMonth==null){
              this.$message.error("开始月必选！");return;
          }
          if(this.pd.endYear==undefined || this.pd.endYear=="" || this.pd.endYear==null){
              this.$message.error("结束年必选！");return;
          }
          if(this.pd.endMonth==undefined || this.pd.endMonth=="" || this.pd.endMonth==null){
              this.$message.error("结束月必选！");return;
          }
          this.$api.post(this.Global.aport1+'/ActivityInfoController/getStatisticsInfo', this.pd,
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
         download(t){
             
            if(this.pd.startYear==undefined || this.pd.startYear=="" || this.pd.startYear==null){
              this.$message.error("开始年必选！");return;
          }
          if(this.pd.startMonth==undefined || this.pd.startMonth=="" || this.pd.startMonth==null){
              this.$message.error("开始月必选！");return;
          }
          if(this.pd.endYear==undefined || this.pd.endYear=="" || this.pd.endYear==null){
              this.$message.error("结束年必选！");return;
          }
          if(this.pd.endMonth==undefined || this.pd.endMonth=="" || this.pd.endMonth==null){
              this.$message.error("结束月必选！");return;
          }
            this.$api.post(this.Global.aport2+'/ActivityInfoController/exportExcel',this.pd,
                r =>{
                      this.downloadM(r);
                },e=>{},{},'blob')
          },
            downloadM (data) {
            if (!data) {
                return
            }       
            var name='联络工作统计'+format(new Date(),'yyyyMMddhhmmss')+'.xls';
            let url = window.URL.createObjectURL(new Blob([data],{type:"application/xls"}))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download',name)
            document.body.appendChild(link)
            link.click()
        },
        //开展单位远程搜索
        kzdwremoteMethod(quer){
          if (quer != '') {
           let p={
              'mc':quer
           };
          this.$api.post(this.Global.aport1+'/org/getDevelopOrg',p,
                r =>{
                    if(r.code==1){
                      this.kzdwdata=r.data;
                      if(this.kzdwdata.length>this.jznum){
                        this.bs=0;
                        this.kzdwdata=this.kzdwdata.slice(0,this.jznum);
                      }else{
                        this.bs=1;
                        this.kzdwdata=this.kzdwdata;
                      }
                    }
                });
          
          }else{
            this.kzdwdata=[];
          }
        },
        //开展单位加载
    kzloadmore() {
        if(this.bs==1){return;}
        var srr= this.kzdwload;
        this.formData.pageIndex++;
        let num = this.formData.pageIndex * this.formData.pageSize;
           this.kzdwdata =srr.filter((item, index, arr) => {
               return index < num;
         });
       
    },
      //法院单位远程搜索
        fydwremoteMethod(quer){
          if (quer != '') {
             let p={
                'name':quer,
            };
            this.$api.get(this.Global.aport1+'/org/getCourtOrg',p,
                  r =>{
                      if(r.code==1){
                        this.fydwload=r.data;
                        if(this.fydwload.length>this.jznum){
                          this.bs=0;
                          this.fydwdata=this.fydwload.slice(0,this.jznum);
                        }else{
                          this.bs=1;
                          this.fydwdata=this.fydwload;
                        }
                      }
                  });
         }else{
            this.fydwdata=[];
         } 

        },
        //法院单位加载
        fyloadmore() {
          if(this.bs==1){return;}
           var srr= this.fydwload;
          this.formData.pageIndex++;
          let num = this.formData.pageIndex * this.formData.pageSize;
            this.fydwdata = srr.filter((item, index, arr) => {
              return index < num;
            });
        },

    getNull(val,t){
        if(val==null || val=='' || val==undefined){
            switch (t) {
                case 1:
                    this.kzdwdata=[];
                    break;
                case 2:
                    this.fydwdata=[];
                    break;
                default:
                    break;
            }
        }
    }
    },
}
</script>

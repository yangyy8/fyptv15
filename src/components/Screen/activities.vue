<template>
    <div class="sreen sreen1">
         <div class="top">
           <el-row>
             <el-col :span="16" class="left">
               <img src="../../assets/img/screen/logo.png"><br>
               <div class="time">
                  <span v-html="nowdate"></span> 
                  </div>
             </el-col>
             <el-col :span="8" class="right" >
             <div class="fright mt-10" style="min-width:340px;text-align:right">
                <div class="chselect">
                 <el-select v-model="pd.orgId" filterable clearable default-first-option placeholder="请选择"  size="small">
                               <el-option
                                 v-for="(item,ind) in ssfydata"
                                 
                                 :key="ind"
                                 :label="item.mc"
                                 :value="item.orgid">
                                 </el-option>
                </el-select>&nbsp;&nbsp;
                <el-select v-model="year"  placeholder="" style="width:80px;"   size="small">
                             <el-option
                                  v-for="(item,ind) in yearlist"
                                  :key="ind"
                                  :label="item.mc"
                                  :value="item.dm">
                           </el-option>
                  </el-select>
                </div>
             </div>
              <div class="fright mt-20 topr" style="min-width:340px;text-align:left">联络活动分析</div><div class="fright mt-20"><img src="../../assets/img/screen/left.png" class="mt-10 mr-10"></div>
             </el-col>
           </el-row>
         </div>
         <div class="main">
            <div class="fleft w-25 left mt-10">
            <el-row class="mb-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                   <div class="fleft ">历史数据对比</div>
                 </el-col>
            </el-row>
               <el-row>
                 <el-col :span="24">
                      <div id='yearcharts' style='width:100%;height:200px;'></div>
                 </el-col>
               </el-row>
            <el-row class="mt-20">
                <el-col :span="24">
                     <div class="fleft" > {{year}} 年度联络活动办理情况</div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <div id='handlecharts' style='width:100%;height:200px;'></div>
              </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="fleft chselect1">
                        <el-select v-model="month" placeholder="" style="width:80px;"   size="mini">
                                     <el-option
                                        v-for="(item,ind) in monthlist"
                                        :key="ind"
                                        :label="item"
                                        :value="item">
                                        </el-option>
                         </el-select>
                    </div>    
                     <div class="fleft" style="padding:5px 0px 0px 8px">月关联络活动重要占比</div>
                </el-col>
            </el-row>
            <el-row class="mt-10">
              <el-col :span='24'>
                   <div class="datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="47"></el-progress>
                    <br/>
                    <div class="c-title mt-10">上月办结</div>
             
                  </div>
                  <div class="ml-10 datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="38" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">上月遗留未办结</div>
             
                  </div>
                   <div class="ml-10 datapicont fleft center"> 
                    <el-progress type="circle"  :width="70" :percentage="10" ></el-progress>
                    <br/>
                    <div class="c-title mt-10">新增</div>
                  </div>
                 
              </el-col>
            </el-row>
               <el-row class="mt-20">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">联络活动关联情况</div>
                </el-col>
                
               </el-row>
                 <el-row>
                   <el-col :span="24">
                     <div id='phbcharts' style='width:100%;height:200px;'></div>
                   </el-col>
                 
                 </el-row>

             </div>
             <div class="fleft w-50 left">
              
            <el-row  style="margin:10% 11% 0 10%">
              <el-col :span='24'>
                <EchartsMap></EchartsMap>
              </el-col>
            </el-row>
             <el-row style="margin:10% 10% 0 10%">
             <el-col :span="24">
               <div class="casebg">
                 <el-row >
                   <el-col :span="6" style="padding:10px 0px 0px 30px">联络活动列表</el-col>
                   <el-col :span="18">
                     <!-- <el-button round size="mini">圆角按钮</el-button>
                     <el-button round size="mini">圆角按钮</el-button> -->
                   </el-col>
                   <el-col :span="24" class="contc1">
                       <el-row class="mb-25">
                         <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <el-row class="title">
                               <el-col :span="12">
                                     标题
                               </el-col>
                                <el-col :span="2">代表</el-col>
                               <el-col :span="4">身份</el-col>
                               <el-col :span="4">办理单位</el-col>
                           </el-row>
                         </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">1</div>    
                                    <div class="fleft overf">中新公司申请设立海事赔偿责任有限公司</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="4">建议、批评</el-col>
                               <el-col :span="4">广东高院</el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">2</div>    
                                    <div class="fleft overf">中国建设银行股份有限公司广...</div>
                               </el-col>
                               <el-col :span="2">领衔</el-col>
                               <el-col :span="4">建议、批评</el-col>
                               <el-col :span="4">广东高院</el-col>
                            
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">3</div>    
                                    <div class="fleft overf">安徽省外经建设(集团)有限公司</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="4">建议、批评</el-col>
                               <el-col :span="4">广东高院</el-col>
                             
                           </el-row>
                       </el-col>
                      
                   </el-row>
                   </el-col>
                 </el-row>
               </div>
             </el-col>
            </el-row>
             </div>
             <div class="fright w-20 left">
             <el-row>
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">关注人群分析</div>
                </el-col>
              <el-col :span='24'>
                
              </el-col>
            </el-row>
               <el-row class="mt-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">案例类型分析</div>
                </el-col>
                <el-col :span="24" >
                       <div id="monthcharts" style="width:100%;height:250px;"></div>
                  
                </el-col>
            </el-row>
            <el-row class="mt-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">审理阶段分析</div>
                </el-col>
                <el-col :span="24">
                 <div id="sljdcharts" style="width:100%;height:250px;"></div>
                </el-col>
            </el-row>
              <el-row class="mt-10">
                <el-col :span="24">
                    <div class="fleft"><img src="../../assets/img/screen/left.png" class="mr-10"></div>    
                     <div class="fleft ">开展活动分析</div>
                </el-col>
                <el-col :span="24" class="mt-20">
                  <el-row style="line-height:25px;">
                    <el-col :span="24">
                       <div class="fleft ml-20 color f-14">&nbsp;&nbsp;&nbsp;&nbsp;开展活动：</div>    
                        <div class="fleft">
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in 20" :key="t">
                        </div>
                         <div class="fleft color f-14">457</div>
                    </el-col>
                    <el-col :span="24">
                       <div class="fleft ml-20 color f-14">未开展活动：</div>    
                        <div class="fleft">                     
                            <img src="../../assets/img/screen/jd-1.png" class="mr-5" v-for="t in 10" :key="t">
                        </div>
                         <div class="fleft color f-14">173</div>
                    </el-col>
                   
                  </el-row>
                </el-col>
            </el-row>
         
             </div>
             <div class="clear"></div>
         </div>
    </div>
</template>
<style>
   @import "../../assets/css/index.css";
</style>
<script>
import echarts from 'echarts'
import EchartsMap from "../Common/maps"
import {setNowTimes} from '@/assets/js/date.js'
import {getYear,birthdayMonth} from '@/assets/js/date.js'
export default {
   components:{EchartsMap},
    data(){
      return{
         city:'北京',
         timer: null,
         nowdate:setNowTimes(),
         ssfydata:[],
         pd:{orgId:'0e10a51827e511ea9e3700155dbaef87'},
         year:'2019',
         yearlist:getYear(),
         month:'1',
         monthlist:birthdayMonth(),

       }
    },
    mounted(){
       this.phbcharts(['1', '2', '3', '4','5'],['议案建议', '关注案件','无关联']);
       this.yearcharts(['2020', '2019', '2018', '2017','2016','2015','2014','2013','2012','2011','2010']);
       this.handlecharts(['1','2','3','4','5','6','7','8','9','10','11','12']);
       this.getSSFY();
       this.monthcharts();
       this.sljdcharts();
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)
   },
    methods:{
        yearcharts(xdata){
        this.yearcharts = echarts.init(document.getElementById('yearcharts'));
        let _this = this;
        _this.yearcharts.setOption({
        color: ['#83AEDD', '#7900F0'],
        legend: {
            bottom:0,
            itemWidth:10,
            itemHeight:10,
            textStyle:{
              color:'#eeeeee',
              fontSize:14,
            },
        },
        tooltip: {
          
        },
        xAxis: [
              {
            type: 'category',
            boundaryGap: true,
            axisPointer: {
                  type: 'none'
              },
           axisLine:{show:false},
             axisTick:{
               show:false,
             },
             axisLabel: {
               interval:0, //强制显示文字
               textStyle:{
                 color:'#cccccc',  //坐标的字体颜色
                 fontSize:9
               },
             },
             data: xdata
           
        }
              
          ],
          yAxis: [
             {
               axisLabel: {
               interval:0, //强制显示文字
               textStyle:{
                 color:'#cccccc',  //坐标的字体颜色
                 fontSize:10
                  },
                },
                splitLine:{show:false},

             }

          ],
          grid: {
            left: '8%',
            right: '10%',
            bottom: '25%',
            top:'10%',
          },
        series: [
          {
              name: '总数',
              type: 'bar',
              // barGap: 0,
              data: [185, 106, 43, 88,85,71,72,154,65,200,190]
          },
          {
              name: '办结',
              type: 'bar',
              data: [113, 36, 17, 62, 78,63,39,58,51,119,107]
          },
        
          ]
          })
        },
        //年度办理情况
        handlecharts(xdata){
        this.handlecharts = echarts.init(document.getElementById('handlecharts'));
        let _this = this;
        _this.handlecharts.setOption({
          color: ['#3969F8', '#83AEDD','#81FEFF'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
            left: '8%',
            right: '15%',
            bottom: '25%',
            top:'8%',
          },
            legend: {
                bottom:0,
                itemWidth:10,
                itemHeight:10,
                textStyle:{
                  color:'#eeeeee',
                  fontSize:14,
                },
                data: ['总数', '办结', '办结率']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisPointer: {
                        type: 'none'
                    },
                    splitLine:{show:false},
                    axisLabel: {
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:12
                      },
                    },
                    axisTick:{
                      show:false,
                    },
                    data: xdata,
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '办结量',
                    // min: 0,
                    // max: 250,
                    // interval: 50,
                   
                    splitLine:{show:false},
                    axisLabel: {
                      formatter: '{value}',
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:10
                          },
                    },
                    axisTick:{
                      show:false,
                    },
                    axisLine:{show:false},
                },
                {
                    type: 'value',
                    name: '办结率',
                    // min: 0,
                    // max: 25,
                    // interval: 5,
                   
                    splitLine:{show:false},
                    axisLabel: {
                      formatter: '{value} %',
                      interval:0, //强制显示文字
                      textStyle:{
                        color:'#cccccc',  //坐标的字体颜色
                        fontSize:10
                          },
                    },
                    axisLine:{show:false},
                },
                
            ],
            series: [
                {
                    name: '总数',
                    type: 'bar',
                    data: [31, 41, 7, 20, 23, 33, 38, 11, 18, 19, 30, 41]
                },
                {
                    name: '办结',
                    type: 'bar',
                    data: [23, 8, 3, 15, 2, 3, 32, 3, 11, 12, 20, 30]
                },
                {
                    name: '办结率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [73.33, 20.13, 45.19, 75.86, 10.69, 10.29, 83.70, 28.95, 62.53, 61.38, 66.41, 72.99]
                }
            ]

        });
        },
      phbcharts(xdata,xleg,series){
         this.phbcharts = echarts.init(document.getElementById('phbcharts'));
        let _this = this;
        _this.phbcharts.setOption({
          color: ['#7900F0', '#332EB5', '#3969F8', '#83AEDD'],
           tooltip: {
            trigger: 'axis',
            axisPointer: {
                    type: 'none',
                    crossStyle: {
                        color: '#999'
                    }
                },
         },
        legend: {
            bottom:0,
            itemWidth:10,
            itemHeight:10,
            textStyle:{
              color:'#eeeeee',
              fontSize:14,
            },
            data: xleg,
            
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top:'5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                axisLine:{
                  show:false,
                 lineStyle:{
                     color:'#1187A9',
                     width:1
                 },
             },
             axisLabel: {
               show:true,
               textStyle:{
                 color:'#cccccc',  //坐标的字体颜色
                 fontSize:11
               },
             },
             axisTick:{
               show:false,
             },
             splitLine:{
               show:false,
               lineStyle:{
                 color:'#174071',
                 type:'dotted'  //'dotted'虚线 'solid'实线
               }
             },
            
            }
        ],
    yAxis: [
        {
            type: 'category',
            boundaryGap: true,
            axisPointer: {
                  type: 'none'
              },
              axisLine:{
                  show:false,
                  lineStyle:{
                      color:'#1187A9',
                      width:0
                  }
             },
             axisTick:{
               show:false,
             },
             axisLabel: {
               interval:0, //强制显示文字
               textStyle:{
                 color:'#cccccc',  //坐标的字体颜色
                 fontSize:12
               },
             },
             data: xdata
           
        }
    ],
    series: [
        {
            name: '议案建议',
            type: 'bar',
            barGap: 0,
            data: [120, 136, 36, 78,66]
        },
        {
            name: '关注案件',
            type: 'bar',
            data: [110, 132, 101, 44, 90]
        },
        {
            name: '无关联',
            type: 'bar',
            data: [13, 112, 85, 59, 150]
        },
       
       
     
    ]
        })
        
      },
     
      monthcharts(xdata,series){
        this.monthcharts = echarts.init(document.getElementById('monthcharts'));
        let _this = this;
          _this.monthcharts.setOption({
           radar: {
                    name:{
                      color:"#eeeeee"  
                    },
                    axisLine:{show:false},
                    axisTick:{show:false},
                    splitLine:{show:false},
                    splitArea:{show:false},
                    indicator: [
                        { name: '刑事案件', max: 6500},
                        { name: '民事案件', max: 16000},
                        { name: '行政案件', max: 30000},
                        { name: '赔偿案件', max: 38000},
                        { name: '执行案件', max: 52000},
                        { name: '其他案件', max: 82000},
                    ]
                },
                series: [{

                    type: 'radar',
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000,50000],
                            areaStyle: {
                                  color: 'rgba(50,88,205,0.6)'
                            },
                            lineStyle:{
                                   color: 'rgba(20,48,114)'
                            },
                            itemStyle:{
                               borderWidth:0,
                            },
                             symbol:'none',
                            
                        },
                        {
                            value: [5000, 3900, 25000, 28000, 35000,70000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.4)'
                            },
                             lineStyle:{
                                  color: 'rgba(20,48,114)'
                            },
                            itemStyle:{
                               borderWidth:0,
                              
                            },
                            symbol:'none',

                        },
                        {
                            value: [6450, 15000, 10000, 30000, 18000,10000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.3)'
                            },
                             lineStyle:{
                                  color: 'rgba(20,48,114)'
                            },
                            itemStyle:{
                               borderWidth:0,
                            },
                             symbol:'none',
                        },
                       {
                            value: [5000, 10000, 30000, 3000, 40000,20000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.5)'
                            },
                             lineStyle:{
                                  color: 'rgba(20,48,114.0.7)'
                            },
                            itemStyle:{
                               borderWidth:0,
                            },
                             symbol:'none',
                        },
                        {
                            value: [2000, 8000, 9000, 10000, 20000,50000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.7)'
                            },
                             lineStyle:{
                                   color: 'rgba(20,48,114,0.8)'
                            },
                            itemStyle:{
                               borderWidth:0,
                               
                            },
                             symbol:'none',
                        },
                        {
                            value: [3000, 6000, 15000, 10000, 20000,60000],
                            areaStyle: {
                                color: 'rgba(50,88,205,0.7)'
                            },
                             lineStyle:{
                                   color: 'rgba(20,48,114,0.8)'
                            },
                            itemStyle:{
                               borderWidth:0,
                               
                            },
                             symbol:'none',
                        }
                    ]
                }]
          });
       },
       sljdcharts(){
          this.sljdcharts = echarts.init(document.getElementById('sljdcharts'));
        let _this = this;
          _this.sljdcharts.setOption({
            color: ['#3969F8', '#83AEDD', '#DBDBB7', '#332EB5'],
                tooltip: {},
                legend: {
                },
                radar: {
                    // shape: 'circle',
                    name:{
                          color:"#eeeeee"  
                    },
                      splitArea: {
                            areaStyle: {
                                color: ['rgba(12,22,57, 0.2)',
                                    'rgba(12,22,57, 0.4)', 'rgba(12,22,57, 0.6)',
                                    'rgba(12,22,57, 0.8)', 'rgba(12,22,57, 1)'],
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                    indicator: [
                        { name: '立案', max: 6500},
                        { name: '一审', max: 16000},
                        { name: '二审', max: 30000},
                        { name: '再审', max: 38000},
                        { name: '执行', max: 52000},
                        { name: '申请再审', max: 25000},
                        { name: '申诉审查', max: 50000},
                        { name: '符合', max: 50000},
                        { name: '申诉复查', max: 50000},
                        { name: '提审', max: 50000},
                        { name: '其他', max: 50000}
                    ]
                },
                series: [{
                  
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000,50000, 50000, 19000,50000],
                            
                            
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000,30000, 50000, 19000,50000],
                          
                        },
                         {
                            value: [5000, 15000, 5000, 5000, 5000, 15000,15000, 25000, 35000,50000],
                          
                        }
                    ]
                }]
        });
       },
        getSSFY(){
                 this.$api.get(this.Global.aport1+'/org/getCourtOrg',null,
                r =>{
                  
                      if(r.code==1){

                          this.ssfydata=r.data;
                      }
                });
        },
     
    }
}
</script>

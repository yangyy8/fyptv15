<template>
     <div class="sreen cont">
         <div class="top">
            <el-row>
             <el-col :span="16" class="left">
               <img src="../../assets/img/screen/logo.png"><br>
               <div class="time">
                  <span v-html="nowdate"></span> 
                  </div>
             </el-col>
             
           </el-row>
         </div>

         <div class="main">
              <div class="fleft w-23 left">
                 <el-row class="ml-40">
                     <el-col :span="10">
                        <img src="../../assets/img/screen/toux.jpg" class="gettop_head_img">
                     </el-col>
                      <el-col :span="14">
                         <div style="font-size:38px;margin-top:22px;">周强</div>
                         <div style="font-size:16px;margin-top:20px;">中共十九届中央委员</div>
                         <div style="font-size:16px;margin-top:14px;">委员证号：2231</div>
                     </el-col>
                    
                  </el-row>
                  <el-row  class="mt-30">
                       <el-col :span="24" style="line-height:30px;">
                         <span v-for="(t,ind) in lables" :key="ind" class="lable f-14">
                             {{t}}
                         </span>
                     </el-col>
                     <el-col :span="24">
                         <div class="border" style="height:16px;"></div>
                     </el-col>
                  </el-row>
                  <el-row class="mt-20">
                      <el-col :span="24">
                          <div style="width:300px;margin:auto">

                             <el-row>
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-0.png" class="mt-5"></el-col>
                                 <el-col :span="9"><span class="f-12 color">活跃度</span><br/><span class="f-20">10,460</span></el-col>
                                 <el-col :span="8">
                                      <div id="hydcharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-10">
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-1.png" class="mt-5"></el-col>
                                 <el-col :span="9"><span class="f-12 color">关注度</span><br/><span class="f-20">560</span></el-col>
                                 <el-col :span="8">
                                     <div id="gzdcharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-10">
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-2.png" class="mt-5" ></el-col>
                                 <el-col :span="9"><span class="f-12 color">提案数</span><br/><span class="f-20">80</span></el-col>
                                 <el-col :span="8">
                                     <div id="tascharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-10">
                                 <el-col :span="4"><img src="../../assets/img/screen/fx-3.png" class="mt-5"></el-col>
                                 <el-col :span="9"><span class="f-12 color">建议数</span><br/><span class="f-20">50</span></el-col>
                                 <el-col :span="8" class="right">
                                     <div id="jyscharts" style="width:100%;height:40px;"></div>
                                 </el-col>
                             </el-row>
                             <el-row class="mt-20" style="line-height:26px;">
                            <el-col :span="10" class="info border-r">年龄</el-col>
                                 <el-col :span="14" class="info">性别</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">69</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">男</el-col>
                            <el-col :span="10" class="info border-r">民族</el-col>
                                 <el-col :span="14" class="info">党派</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">汉</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">中国共产党</el-col>
                            <el-col :span="10" class="info border-r">界别</el-col>
                                 <el-col :span="14" class="info">毕业院校</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">政界</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">西南政法学院</el-col>
                             <el-col :span="10" class="info border-r">籍贯</el-col>
                                 <el-col :span="14" class="info">单位职务</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">北京</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">最高人民法院院长</el-col>
                             <el-col :span="10" class="info border-r">学历</el-col>
                                 <el-col :span="14" class="info">通讯地址</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">研究生</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">北京朝阳区</el-col>
                             <el-col :span="10" class="info border-r">研究方向</el-col>
                                 <el-col :span="14" class="info">专业特长</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color border-r">&nbsp;</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">&nbsp;</el-col>
                            <el-col :span="10" class="info border-r">关注领域</el-col>
                                 <el-col :span="14" class="info">&nbsp;</el-col>
                                 <el-col :span="10" class="f-14 pl-20 color">&nbsp;</el-col>
                                 <el-col :span="14" class="f-14 pl-20 color">&nbsp;</el-col>
                             
                             </el-row>

                          </div>
                      </el-col>
                  </el-row>
              </div>
                
              <div class="fleft w-55 left contc">
                   <el-row class=" mb-25">
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 80px;">联络活动</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <el-row class="listl">
                               <el-col :span="13" class="f-15">
                                    <div class="fleft xhs">1</div>    
                                    <div class="fleft overf">中新公司申请设立海事赔偿责任案件的旁听庭审</div>
                               </el-col>
                               <el-col :span="3">旁听庭审</el-col>
                               <el-col :span="3">第一审判庭</el-col>
                               <el-col :span="3">办公厅</el-col>
                               <el-col :span="2">更多...</el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="13" class="f-15">
                                    <div class="fleft xhs">2</div>    
                                    <div class="fleft overf">中国建设银行股份有限公司广州荔湾支行诉广东蓝天集团</div>
                               </el-col>
                               <el-col :span="3">会议座谈</el-col>
                               <el-col :span="3">广州荔湾支行</el-col>
                               <el-col :span="3">广东高院</el-col>
                               <el-col :span="2">更多...</el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="13" class="f-15">
                                    <div class="fleft xhs">3</div>    
                                    <div class="fleft overf">安徽省外经建设(集团)有限公司诉东方置业房地产</div>
                               </el-col>
                               <el-col :span="3">旁听庭审</el-col>
                               <el-col :span="3">第一审判庭</el-col>
                               <el-col :span="3">办公厅</el-col>
                               <el-col :span="2">更多...</el-col>
                           </el-row>
                       </el-col>
                       <el-col :span="24" class="right mt-20"> <span class="zk">展开</span></el-col>
                   </el-row>
                    <el-row class=" mb-25">
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 120px;">议案建议提案</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">1</div>    
                                    <div class="fleft overf">中新公司申请设立海事赔偿责任案件的旁听庭审</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state1">未反馈</span>
                               </el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">2</div>    
                                    <div class="fleft overf">中国建设银行股份有限公司广州荔湾支行诉广东蓝天集团</div>
                               </el-col>
                               <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state">已反馈</span>
                               </el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">3</div>    
                                    <div class="fleft overf">安徽省外经建设(集团)有限公司诉东方置业房地产</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state">已反馈</span>
                               </el-col>
                           </el-row>
                       </el-col>
                        <el-col :span="24" class="right mt-20"> <span class="zk">展开</span></el-col>
                   </el-row>
                    <el-row class=" mb-25">
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 80px;">关注案件</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">1</div>    
                                    <div class="fleft overf">中新公司申请设立海事赔偿责任案件的旁听庭审</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state1">未反馈</span>
                               </el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">2</div>    
                                    <div class="fleft overf">中国建设银行股份有限公司广州荔湾支行诉广东蓝天集团</div>
                               </el-col>
                               <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state">已反馈</span>
                               </el-col>
                           </el-row>
                            <el-row class="listl">
                               <el-col :span="12" class="f-15">
                                    <div class="fleft xhs">3</div>    
                                    <div class="fleft overf">安徽省外经建设(集团)有限公司诉东方置业房地产</div>
                               </el-col>
                                <el-col :span="2">领衔</el-col>
                               <el-col :span="3">建议、批评</el-col>
                               <el-col :span="2">广东高院</el-col>
                               <el-col :span="3">2019/01/01</el-col>
                               <el-col :span="2">
                                   <span class="state">已反馈</span>
                               </el-col>
                           </el-row>
                       </el-col>
                         <el-col :span="24" class="right mt-20"> <span class="zk">展开</span></el-col>
                   </el-row>
                    <el-row class=" mb-25">
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft title" style=" width: 100px;">关注度分析</div>
                        </el-col>
                       <el-col :span="24" class="mt-20 ml-20 mr-20">
                           <div class="fleft left" style="line-height:35px;"> 
                               <span>地域关注度分析</span><br>
                               <span class="f-24">323</span> <span class="f-12">次关注</span>
                               <span class="f-20 ml-20">北京</span> <span class="f-12">地区</span>
                          </div>
                           <div class="ml-10 datapic fleft center"> 
                            <el-progress type="circle"  :width="80" :percentage="88.1"></el-progress>
                           </div>
                            <div class="ml-20 fleft left" style="line-height:35px;"> 
                               <span>行业关注度分析</span><br>
                               <span class="f-24">100</span> <span class="f-12">次关注</span>
                               <span class="f-20 ml-20">运输</span> <span class="f-12">行业</span>
                          </div>
                           <div class="ml-10 datapic fleft center"> 
                            <el-progress type="circle"  :width="80" :percentage="66.6"></el-progress>
                           </div>
                            <div class="ml-20 fleft left" style="line-height:35px;"> 
                               <span>案件类型关注分析</span><br>
                               <span class="f-24">90</span> <span class="f-12">次关注</span>
                               <span class="f-20 ml-20">王明</span> <span class="f-12">类型事件</span>
                          </div>
                           <div class="ml-10 datapic fleft center"> 
                            <el-progress type="circle"  :width="80" :percentage="50.5"></el-progress>
                           </div>
                       </el-col>
                       <el-col></el-col>
                   </el-row>

              </div>
              <div class="fleft w-23 left" >
                  <el-row>
                      <el-col :span="10">
                          <span>活跃度分析</span><br/>
                           <div id='thecharts' style='width:100%;height:80px;'></div>
                      </el-col>
                       <el-col :span="14">
                            <div class="datapicont fleft center"> 
                                <el-progress type="circle"  :width="80" :percentage="35" :show-text="false"></el-progress>
                                <div style="margin-top:-65px"><span class="f-20">58</span><br/><span class="f-12" style="color:#7A01F9">登录次数</span></div>
                            </div>
                             <div class="ml-20 fleft" style="line-height:27px;"> 
                                <span class="f-12">本次登录IP</span><br/>
                                <span class="f-14" style="color:#B74325">1.202.219.21</span><br/>
                                <span class="f-12">北京市</span>
                            </div>
                      </el-col>
                  </el-row>
                  <el-row class="mt-20">
                        <el-col :span="24">
                          <span>累计活跃时间</span><br/>
                          <span class="r-2 sfont">32</span>天
                          <span class="r-2 sfont">42</span>小时
                          <span class="r-2 sfont">35</span>分钟
                        </el-col>
                  </el-row>
                   <el-row class="mt-30">
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft ctitle">年活跃度分析</div>
                        </el-col>
                        <el-col :span="24">
                            <div class="fleft">
                                <div id="yearcharts" style="width:100%;height:250px;"></div>
                                <div style="margin-top:-17%;margin-left:8%"><img src="../../assets/img/screen/bard.png" width="99%"></div>
                            </div>
                               <div class="fleft chselect">
                                     <el-select v-model="year" placeholder="请选择" style="width:80px;"   size="small">
                                     <el-option
                                        v-for="(item,ind) in yearlist"
                                        :key="ind"
                                        :label="item.mc"
                                        :value="item.dm">
                                        </el-option>
                                     </el-select>
                               </div>
                        </el-col>
                   </el-row>
                     <el-row class="mt-30">
                        <el-col :span="24">
                            <div class="fleft"><img src="../../assets/img/screen/left.png"></div>    
                            <div class="fleft ctitle">月活跃度分析</div>
                        </el-col>
                        <el-col :span="24" class="mt-20">
                             <div id="monthcharts" style="width:100%;height:250px;"></div>
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
import {setNowTimes} from '@/assets/js/date.js'
import {getYear} from '@/assets/js/date.js'
export default {
     data(){
      return{
         yearlist:getYear(),
         timer: null,
          year:'',
         nowdate:setNowTimes(),
         lables:['常委会委员','省部级以上','连任2届','在京'],
       }
    },
    mounted(){
       this.hydcharts();this.gzdcharts();this.tascharts();this.jyscharts();
       this.thecharts(['14:00','15:00','16:00','17:00'],[0, 50.16,6, 0]);
       this.yearcharts( [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149]);
       this.monthcharts();
       this.year=new Date().getFullYear();
       this.timer = setInterval(() => {
        this.nowdate=setNowTimes();
      }, 1000)
   },
   methods:{
        hydcharts(xdata,series){
        this.hydcharts = echarts.init(document.getElementById('hydcharts'));
        let _this = this;
          _this.hydcharts.setOption({
            xAxis: {
                   type: 'category',
                   axisLine :{show:false},
                   splitLine:{show:false},
              
                },
                yAxis: {
                    type: 'value',
                  
                    axisLine :{show:false},
                    axisTick:{show:false},
                    nameTextStyle:{width:0},
                    splitLine:{show:false},
                    axisLabel: {
                         show:false,
                    },
                },
             grid: {
                left: '25%',
                right: '15%',
                bottom: '0%',
                top:'25%',
              },
                series: [{
                    data: [200, 1200,500, 1500],
                    type: 'line',
                    smooth: true,
                    lineStyle:{
                         color:'#66D1D4',
                    },
                    itemStyle:{
                        color:'#66D1D4',
                    },
                }]
              
          });
        },
        gzdcharts(xdata,series){
        this.gzdcharts = echarts.init(document.getElementById('gzdcharts'));
        let _this = this;
          _this.gzdcharts.setOption({
            xAxis: {
                   type: 'category',
                   axisLine :{show:false},
                   splitLine:{show:false},
                
                
                },
                yAxis: {
                    type: 'value',
                  
                    axisLine :{show:false},
                    axisTick:{show:false},
                    nameTextStyle:{width:0},
                    splitLine:{show:false},
                     axisLabel: {
                         show:false,
                    },
                    
                },
              grid: {
                left: '25%',
                right: '15%',
                bottom: '0%',
                top:'25%',
              },
                series: [{
                    data: [200, 1200,500, 1500,100],
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                         color:'#66D1D4',
                    },
                    lineStyle:{
                         color:'#66D1D4',
                    },
                    itemStyle:{
                        color:'#66D1D4',
                    },
                }]
              
          });
        },
        tascharts(xdata,series){
        this.tascharts = echarts.init(document.getElementById('tascharts'));
        let _this = this;
          _this.tascharts.setOption({
               
       series: [
                {
                  
                    type: 'pie',
                    radius: '55%',
                    center:['60%', '50%'],
                    labelLine:{show:false},
                    data: [
                        {
                        // 数据项的名称
                        name: '数据1',
                        // 数据项值8
                        value: 50,
                        itemStyle:{
                                color:'#65D2D2'
                            },
                        
                        }, {
                            name: '数据2',
                            value: 10,
                            itemStyle:{
                                color:'#24548D'
                            },
                        }
                    ],
                    
                
                }
             ]
          });
        },
        jyscharts(xdata,series){
        this.jyscharts = echarts.init(document.getElementById('jyscharts'));
        let _this = this;
          _this.jyscharts.setOption({
           xAxis: {
              type: 'category',
              axisLine :{show:false},
              splitLine:{show:false},
            },
            yAxis: {
                type: 'value',
                  axisLine :{show:false},
                    axisTick:{show:false},
                    nameTextStyle:{width:0},
                    splitLine:{show:false},
                     axisLabel: {
                         show:false,
                    },
            },
            grid: {
                left: '25%',
                right: '15%',
                bottom: '0%',
                top:'25%',
            },
            series: [
            {
                data: [120, 200, 150, 80],
                type: 'bar',
                itemStyle:{
                        color:'#66D1D4',
                },
            },
            {
                data: [150, 250, 250, 90],
                type: 'bar',
                itemStyle:{
                        color:'#3475CC',
                },
            },

            ]
          });
         },
    thecharts(xdata,series){
        this.thecharts = echarts.init(document.getElementById('thecharts'));
        let _this = this;
          _this.thecharts.setOption({
             
            grid: {
                left: '3%',
                right: '4%',
                bottom: '25%',
                top:'10%',
              },
             xAxis: {
              type: 'category',
              boundaryGap: true,
              axisPointer: {
                  type: 'none'
              },
              axisLine:{
                  lineStyle:{
                      color:'#1187A9',
                      width:0
                  }
             },
             axisLabel: {
               interval:0, //强制显示文字
               textStyle:{
                 color:'#999',  //坐标的字体颜色
                 fontSize:12
               },
             },
             splitLine:{show:false},
              axisTick:{show:false},
             data: xdata
         },
         yAxis: {
             type: 'value',
             axisLine:{
                 lineStyle:{
                     color:'#1187A9',
                     width:0
                 },
             },
             axisTick:{show:false},
             axisLabel: {
               textStyle:{
                 color:'#8897A6',  //坐标的字体颜色
                 fontSize:16
               },
             },
           
             splitLine:{
               lineStyle:{
                 color:'#174071',
                 type:'dotted'  //'dotted'虚线 'solid'实线
               }
             }
         },
         series: [
             {
                 name: '人口增长量',
                 type: 'line',
                 symbolSize:2,
                 symbol: 'circle',     //设定为实心点
                 label:{
                   show:false,
                   fontSize:12,
                 },
                 itemStyle:{
                   normal:{
                     color:'#0089fe',
                     lineStyle:{
                         width:1,
                         color:'#0089fe',
                         type:'solid'  //'dotted'虚线 'solid'实线
                     }
                   }
                 },
                 areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(0,137,254,0.5)'
                      }, {
                          offset: 1,
                          color: 'rgba(0,137,254,0.1)'
                      }])
                  },
                 data: series,
                markPoint: {
                  symbol: 'circle',
                  symbolSize:30,  
                  symbolOffset: ['0', '5'],
                  itemStyle:{
                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(0,137,254,0.8)'
                      },{
                          offset: 0.5,
                          color: 'rgba(0,137,254,0.3)'
                      }, {
                          offset: 1,
                          color: 'rgba(0,137,254,0)'
                      }])
                  },
                  label :{
                    show:true,
                    position: ['70%', '50%'],
                    color:'#eeeeee',
                     fontSize:16,
                     

                  },
                  data: [
                      {type: 'max', name: '最大值'},
                  ]
            },
             },
             
            
         ]
          });
      },
       yearcharts(xdata,series){
        this.yearcharts = echarts.init(document.getElementById('yearcharts'));
        let _this = this;
        var dataShadow = [];
        var yMax = 500;
        for (var i = 0; i < xdata.length; i++) {
            dataShadow.push(yMax);
        }
          _this.yearcharts.setOption({
            grid: {
                left: '5%',
                right: '10%',
                bottom: '3%',
                
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月','6月','7月','8月','9月','10月','11月','12月'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle:{
                            color:'#8897A6',  //坐标的字体颜色
                            fontSize:13
                        },
                    },
                    axisLine:{
                        show:false
                     },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                     axisLabel: {
                        textStyle:{
                            color:'#8897A6',  //坐标的字体颜色
                            fontSize:13
                        },
                    },
                     axisTick:{show:false},
                     axisLine:{
                        show:false
                     },
                     splitLine:{show:false}
                }
            ],
            series: [
             { // For shadow
                    type: 'bar',
                    itemStyle: {
                        color: 'rgba(20,54,108,0.5)'
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#188df0'},
                                {offset: 0.3, color: '#83bff6'},
                                {offset: 1, color: '#188df0'},
                                
                            ]
                        ),
                         barBorderRadius: [30, 30, 30, 30],
                    },
                    emphasis: {
                        itemStyle: {
                            
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.3, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    
                    },
                    data:xdata
                }
            ]

          });
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
                        { name: '饮食', max: 6500},
                        { name: '运动量', max: 16000},
                        { name: '生活习惯', max: 30000},
                        { name: '日常生活', max: 38000},
                        { name: '睡眠', max: 52000},
                    ]
                },
                series: [{

                    type: 'radar',
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000],
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
                            value: [5000, 3900, 25000, 28000, 35000],
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
                            value: [6450, 15000, 10000, 30000, 18000],
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
                            value: [5000, 10000, 30000, 3000, 40000],
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
                            value: [2000, 8000, 9000, 10000, 20000],
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

   },
}
</script>

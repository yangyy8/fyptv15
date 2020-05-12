<template>
 <div>
  <div style="text-align:right;" v-if='bj!=0'> <el-button type="primary" size="small" @click="back">返回</el-button></div> 
  <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div>
  
 </div>
</template>
<script>
import echarts from "echarts";
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import '../../../node_modules/echarts/map/js/province/beijing.js' // 北京
import '../../../node_modules/echarts/map/js/province/hebei.js' // 河北
import '../../../node_modules/echarts/map/js/province/tianjin.js' // 天津
import '../../../node_modules/echarts/map/js/province/anhui.js' // 安徽
import '../../../node_modules/echarts/map/js/province/chongqing.js' //重庆
import '../../../node_modules/echarts/map/js/province/fujian.js' // 福建
import '../../../node_modules/echarts/map/js/province/gansu.js' // 甘肃
import '../../../node_modules/echarts/map/js/province/guangdong.js' // 广东
import '../../../node_modules/echarts/map/js/province/guangxi.js' // 广西
import '../../../node_modules/echarts/map/js/province/guizhou.js' // 贵州
import '../../../node_modules/echarts/map/js/province/hainan.js' // 海南
import '../../../node_modules/echarts/map/js/province/heilongjiang.js' // 黑龙江
import '../../../node_modules/echarts/map/js/province/henan.js' // 河南
import '../../../node_modules/echarts/map/js/province/hubei.js' // 湖北
import '../../../node_modules/echarts/map/js/province/hunan.js' // 湖南
import '../../../node_modules/echarts/map/js/province/jiangsu.js' // 江苏
import '../../../node_modules/echarts/map/js/province/jiangxi.js' // 江西
import '../../../node_modules/echarts/map/js/province/jilin.js' // 吉林
import '../../../node_modules/echarts/map/js/province/liaoning.js' // 辽宁
import '../../../node_modules/echarts/map/js/province/neimenggu.js' // 内蒙古
import '../../../node_modules/echarts/map/js/province/ningxia.js' // 宁夏
import '../../../node_modules/echarts/map/js/province/qinghai.js' // 青海
import '../../../node_modules/echarts/map/js/province/shandong.js' // 山东
import '../../../node_modules/echarts/map/js/province/shanghai.js' // 上海
import '../../../node_modules/echarts/map/js/province/shanxi.js' // 山西
import '../../../node_modules/echarts/map/js/province/shanxi1.js' // 陕西
import '../../../node_modules/echarts/map/js/province/sichuan.js' // 四川
import '../../../node_modules/echarts/map/js/province/taiwan.js' // 台湾
import '../../../node_modules/echarts/map/js/province/xianggang.js' // 香港
import '../../../node_modules/echarts/map/js/province/xinjiang.js' // 新疆
import '../../../node_modules/echarts/map/js/province/xizang.js' // 西藏
import '../../../node_modules/echarts/map/js/province/yunnan.js' // 云南
import '../../../node_modules/echarts/map/js/province/zhejiang.js' // 浙江


export default {
     name:'EchartsMap',
      props: ['sdata'],
     data(){
         return{
              chart: null,
              data:[],
              bj:0,
              maptype:'china',
              city:[],
              xjorgid:'0e10a73d27e511ea9e3700155dbaef87',
            
         }
     },
    mounted() {
      this.getinit();
  
    },
    watch:{
      sdata:function(newVal,oldVal){
          this.bj=0;
          this.getinit();
      },
    },
      beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
       getinit(){
         
            // //测试数据 start
            // if(this.sdata.orgId=='0e10a51827e511ea9e3700155dbaef87'){
            // this.$set(this.sdata,'orgId','ff8080816f6b7024016f6b735e510000');
            // this.$set(this.sdata,'year','2019');
            // }
            // //end

           //中间地图
           let p8={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID":  this.sdata.orgId,
                "Year":  this.sdata.year,
              },
              "itemIndex": [
                "SY_centermap"
              ]
            }
           this.$api.post(this.Global.aporttj,p8,
            r =>{
                    
                    if(r.code==200){
                          this.city = r.data.indexItemsValues.SY_centermap.data;
                          
                          this.getInfo();
                          this.drawLine(this.data,this.maptype);
                          
                    }  
            });
       },
        back(){
          this.bj=this.bj-1;
          this.drawLine(this.data,this.maptype);
          if(this.sdata.orgId=='ff8080816f6b7024016f6b735e510000'){
           this.$emit('mapfatherMethod','0e10a51827e511ea9e3700155dbaef87'); 
          }else{
           this.$emit('mapfatherMethod',this.sdata.orgId); 
          }
         
        },
        drawLine(data,maptype){
        this.myChartChina = echarts.init(document.getElementById('myChartChina'));
        let _this = this;
        _this.myChartChina.setOption({ // 进行相关配置
        //  backgroundColor: "#02AFDB",//背景颜色
          tooltip: {
            trigger: 'item',
           formatter:function(params){
                      
                      var res=params.name+'<br />'+"总数："+params.value;
                      if(params.data){
                          if(params.data.GroupType){
                            res+='<br/>'+"人大代表数："+params.data.GroupType 
                          }
                          if(params.data.Area){
                            res+='<br/>'+"特约人员数："+params.data.Area;
                          }
                       }
                      
               return res;
             }
          }, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 100,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['#4B78B8','#72ABF4'],
            selectedMode: 'single',
          },
          
          geo: { // 这个是重点配置区
            map: maptype, // 表示中国地图
            // roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。
            left: 0, top: 0, right: 0, bottom: 0,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.6)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
                // areaColor: '#1E4586',
                // borderWidth: 0,
                // shadowColor: 'rgba(30,69,134, 1)',
                // shadowBlur: 100
              },
              emphasis: {
                areaColor:null,// 区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
            },

          },
          series: [{
              type: 'scatter',
              
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data:data,
            }
          ]
        })

        function getNext(name,orgId){
            
            if(orgId){
              _this.xjorgid=orgId;
            }
           //中间地图
           let p8={
              "primaryId": "",
              "riskDate": "",
              "params": {
                "UndertakeOrgID":  _this.sdata.orgId,
                "Year":  _this.sdata.year,
                "code": name
              },
              "itemIndex": [
                "SY_centermap_yield"
              ]
            }
           _this.$api.post(_this.Global.aporttj,p8,
            r =>{
                    
                    if(r.code==200){

                         _this.$emit('mapfatherMethod',_this.xjorgid); 
                         
                         if(r.data.indexItemsValues.SY_centermap){
                           _this.city = r.data.indexItemsValues.SY_centermap.data;
                         }
                          
                           var option = _this.myChartChina.getOption();
                         
                           option.geo[0].map = name;
                           option.series[1].data = _this.getInfo(name);
                            _this.myChartChina.setOption(option); 
                                  
                    }  
            });
               
        }
         //下钻其实就是点击事件，切换脚本而已
            _this.myChartChina.on('click', function (chinaParam) {
              var arr="";
              
            
                switch (chinaParam.name) {
                  case "北京":
                    arr="北京";
                    _this.bj=1;
                    break;
                  case "河北":
                    arr="河北";
                    _this.bj=1;
                    break;
                  case "天津":
                    arr="天津";
                    _this.bj=1;
                    break;
                   case "吉林":
                    arr="吉林";
                    _this.bj=1;
                    break;
                  case "黑龙江":
                    arr="黑龙江";
                    _this.bj=1;
                    break;
                   case "上海":
                    arr="上海";
                    _this.bj=1;
                    break;
                   case "重庆":
                    arr="重庆";
                    _this.bj=1;
                    break;
                   case "辽宁":
                    arr="辽宁";
                    _this.bj=1;
                    break;
                   case "安徽":
                    arr="安徽";
                    _this.bj=1;
                    break;
                   case "内蒙古":
                    arr="内蒙古";
                    _this.bj=1;
                    break;
                   case "河南":
                    arr="河南";
                    _this.bj=1;
                    break;
                   case "山西":
                    arr="山西";
                    _this.bj=1;
                    break;
                    case "陕西":
                    arr="陕西";
                    _this.bj=1;
                    break;
                   case "山东":
                    arr="山东";
                    _this.bj=1;
                    break;
                  case "甘肃":
                    arr="甘肃";
                    _this.bj=1;
                    break;
                  case "西藏":
                    arr="西藏";
                    _this.bj=1;
                    break;
                  case "新疆":
                    arr="新疆";
                    _this.bj=1;
                    break;
                  case "青海":
                    arr="青海";
                    _this.bj=1;
                    break;
                   case "宁夏":
                    arr="宁夏";
                    _this.bj=1;
                    break;
                  case "江西":
                    arr="江西";
                    _this.bj=1;
                    break;
                  case "湖北":
                    arr="湖北";
                    _this.bj=1;
                    break;
                  case "湖南":
                    arr="湖南";
                    _this.bj=1;
                    break;
                  case "贵州":
                    arr="贵州";
                    _this.bj=1;
                    break;
                  case "云南":
                    arr="云南";
                    _this.bj=1;
                    break;
                   case "四川":
                    arr="四川";
                    _this.bj=1;
                    break;
                   case "广东":
                    arr="广东";
                    _this.bj=1;
                    break;
                   case "广西":
                    arr="广西";
                    _this.bj=1;
                    break;
                   case "浙江":
                    arr="浙江";
                    _this.bj=1;
                    break;
                   case "江苏":
                    arr="江苏";
                    _this.bj=1;
                    break;
                  case "福建":
                    arr="福建";
                    _this.bj=1;
                    break;
                  case "海南":
                    arr="海南";
                    _this.bj=1;
                    break;
                   case "台湾":
                    arr="台湾";
                    _this.bj=1;
                    break;
                   case "香港":
                    arr="香港";
                    _this.bj=1;
                    break;
                  default:
                    break;
                }
               if(arr!=''){
                 getNext(arr,chinaParam.data.OrgId);
               }
            });
        
      },
      getInfo(val){
        var data=[];
        switch (val) {
          case '北京':
           data= [
              { name: '延庆区', value: this.randomData(), },
              { name: '怀柔区', value: this.randomData(),  },
              { name: '密云区', value: this.randomData(), },
              { name: '昌平区', value: this.randomData(),  },
              { name: '顺义区', value: this.randomData(), },
              { name: '平谷区', value: this.randomData(),  },
              { name: '门头沟区', value: this.randomData(),  },
              { name: '海淀区', value: this.randomData(), },
              { name: '石景山区', value: this.randomData(),},
              { name: '西城区', value: this.randomData(),  },
              { name: '东城区', value: this.randomData(), },
              { name: '朝阳区', value: this.randomData(),  },
              { name: '通州区', value: this.randomData(), },
              { name: '大兴区', value: this.randomData(), },
              { name: '房山区', value: this.randomData(),  },
              { name: '丰台区', value: this.randomData(), }
            ]
            break;
            case '天津':
              data= [
                  {"name": "宝坻区", "value": this.randomData()},
                  {"name": "和平区","value": this.randomData()},
                  {"name": "河东区","value": this.randomData()},
                  {"name": "河西区","value": this.randomData()},
                  {"name": "南开区","value": this.randomData()},
                  {"name": "河北区","value": this.randomData()},
                  {"name": "红桥区","value": this.randomData()},
                  {"name": "东丽区","value": this.randomData()},
                  {"name": "西青区","value": this.randomData()},
                  {"name": "津南区","value": this.randomData()},
                  {"name": "北辰区","value": this.randomData()},
                  {"name": "武清区","value": this.randomData()},
                  {"name": "滨海新区","value": this.randomData()},
                  {"name": "宁河区","value": this.randomData()},
                  {"name": "静海区","value": this.randomData()}
                ]
              break;
         case '河北':
           data= [
                {"name": "石家庄市","value": this.randomData()},
                {"name": "唐山市","value": this.randomData()},
                {"name": "秦皇岛市","value": this.randomData()},
                {"name": "邯郸市","value": this.randomData()},
                {"name": "邢台市","value": this.randomData()},
                {"name": "保定市","value": this.randomData()},
                {"name": "张家口市","value": this.randomData()},
                {"name": "承德市","value": this.randomData()},
                {"name": "沧州市","value": this.randomData()},
                {"name": "廊坊市","value": this.randomData()},
                {"name": "衡水市","value": this.randomData()}
               ]
            break;
          case '上海':
            data= [
                {"name": "黄浦区","value": this.randomData()},
                {"name": "徐汇区","value": this.randomData()},
                {"name": "长宁区","value": this.randomData()},
                {"name": "静安区","value": this.randomData()},
                {"name": "普陀区","value": this.randomData()},
                {"name": "虹口区","value": this.randomData()},
                {"name": "杨浦区","value": this.randomData()},
                {"name": "闵行区","value": this.randomData()},
                {"name": "宝山区","value": this.randomData()},
                {"name": "嘉定区","value": this.randomData()},
                {"name": "浦东新区","value": this.randomData()},
                {"name": "金山区","value": this.randomData()},
                {"name": "松江区","value": this.randomData()},
                {"name": "青浦区","value": this.randomData()},
                {"name": "奉贤区","value": this.randomData()},
                {"name": "崇明区","value": this.randomData()}
                ]
            break;
         case '重庆':
           data=  [
                {"name": "万州区","value": this.randomData()},
                {"name": "涪陵区","value": this.randomData()},
                {"name": "渝中区","value": this.randomData()},
                {"name": "大渡口区","value": this.randomData()},
                {"name": "江北区","value": this.randomData()},
                {"name": "沙坪坝区","value": this.randomData()},
                {"name": "九龙坡区","value": this.randomData()},
                {"name": "南岸区","value": this.randomData()},
                {"name": "北碚区","value": this.randomData()},
                {"name": "綦江区","value": this.randomData()},
                {"name": "大足区","value": this.randomData()},
                {"name": "渝北区","value": this.randomData()},
                {"name": "巴南区","value": this.randomData()},
                {"name": "黔江区","value": this.randomData()},
                {"name": "长寿区","value": this.randomData()},
                {"name": "江津区","value": this.randomData()},
                {"name": "合川区","value": this.randomData()},
                {"name": "永川区","value": this.randomData()},
                {"name": "南川区","value": this.randomData()},
                {"name": "璧山区","value": this.randomData()},
                {"name": "铜梁区","value": this.randomData()},
                {"name": "潼南区","value": this.randomData()},
                {"name": "荣昌区","value": this.randomData()},
                {"name": "开州区","value": this.randomData()},
                {"name": "云阳县","value": this.randomData()},
                {"name": "城口县","value": this.randomData()},
                {"name": "巫山县","value": this.randomData()},
                {"name": "巫溪县","value": this.randomData()},
                {"name": "奉节县","value": this.randomData()},
                {"name": "梁平县","value": this.randomData()},
                {"name": "垫江县","value": this.randomData()},
                {"name": "武隆县","value": this.randomData()},
                {"name": "丰都县","value": this.randomData()},
                {"name": "忠县","value": this.randomData()},
                {"name": "石柱土家族自治县","value": this.randomData()},
                {"name": "彭水苗族土家族自治县","value": this.randomData()},
                {"name": "秀山土家族苗族自治县","value": this.randomData()},
                {"name": "酉阳土家族苗族自治县","value": this.randomData()}
              ]

          break;
          case '黑龙江':
            data=[
                {"name": "大兴安岭地区","value": this.randomData()},
                {"name": "黑河市","value": this.randomData()},
                {"name": "齐齐哈尔市","value": this.randomData()},
                {"name": "大庆市","value": this.randomData()},
                {"name": "伊春市","value": this.randomData()},
                {"name": "绥化市","value": this.randomData()},
                {"name": "鹤岗市","value": this.randomData()},
                {"name": "佳木斯市","value": this.randomData()},
                {"name": "双鸭山市","value": this.randomData()},
                {"name": "七台河市","value": this.randomData()},
                {"name": "鸡西市","value": this.randomData()},
                {"name": "牡丹江市","value": this.randomData()},
                {"name": "哈尔滨市","value": this.randomData()}
              ]
            break;
            case '吉林':
              data= [
                {"name": "白城市","value": this.randomData()},
                {"name": "松原市","value": this.randomData()},
                {"name": "长春市","value": this.randomData()},
                {"name": "四平市","value": this.randomData()},
                {"name": "吉林市","value": this.randomData()},
                {"name": "辽源市","value": this.randomData()},
                {"name": "白山市","value": this.randomData()},
                {"name": "通化市","value": this.randomData()},
                {"name": "延边朝鲜族自治州","value": this.randomData()}
              ]
              break;
           case '辽宁':
             data=[
                {"name": "沈阳市","value": this.randomData()},
                {"name": "大连市","value": this.randomData()},
                {"name": "鞍山市","value": this.randomData()},
                {"name": "抚顺市","value": this.randomData()},
                {"name": "本溪市","value": this.randomData()},
                {"name": "丹东市","value": this.randomData()},
                {"name": "锦州市","value": this.randomData()},
                {"name": "营口市","value": this.randomData()},
                {"name": "阜新市","value": this.randomData()},
                {"name": "辽阳市","value": this.randomData()},
                {"name": "盘锦市","value": this.randomData()},
                {"name": "铁岭市","value": this.randomData()},
                {"name": "朝阳市","value": this.randomData()},
                {"name": "葫芦岛市","value": this.randomData()}
             ]
             break;
          case '内蒙古':
            data=[
              {"name": "呼和浩特市","value": this.randomData()},
              {"name": "包头市","value": this.randomData()},
              {"name": "乌海市","value": this.randomData()},
              {"name": "赤峰市","value": this.randomData()},
              {"name": "通辽市","value": this.randomData()},
              {"name": "鄂尔多斯市","value": this.randomData()},
              {"name": "呼伦贝尔市","value": this.randomData()},
              {"name": "巴彦淖尔市","value": this.randomData()},
              {"name": "乌兰察布市", "value": this.randomData()},
              {"name": "兴安盟","value": this.randomData()},
              {"name": "锡林郭勒盟","value": this.randomData()},
              {"name": "阿拉善盟","value": this.randomData()}
            ]
            break;
          case '山西':
            data=[
              {"name": "大同市","value": this.randomData()},
              {"name": "朔州市","value": this.randomData()},
              {"name": "忻州市","value": this.randomData()},
              {"name": "太原市","value": this.randomData()},
              {"name": "阳泉市","value": this.randomData()},
              {"name": "吕梁市","value": this.randomData()},
              {"name": "晋中市","value": this.randomData()},
              {"name": "长治市","value": this.randomData()},
              {"name": "临汾市","value": this.randomData()},
              {"name": "晋城市","value": this.randomData()},
              {"name": "运城市","value": this.randomData()}
            ]
            break;
          case '河南':
            data=[
              {"name": "郑州市","value": this.randomData()},
              {"name": "开封市","value": this.randomData()},
              {"name": "洛阳市","value": this.randomData()},
              {"name": "平顶山市","value": this.randomData()},
              {"name": "安阳市","value": this.randomData()},
              {"name": "鹤壁市","value": this.randomData()},
              {"name": "新乡市","value": this.randomData()},
              {"name": "焦作市","value": this.randomData()},
              {"name": "濮阳市","value": this.randomData()},
              {"name": "许昌市","value": this.randomData()},
              {"name": "漯河市","value": this.randomData()},
              {"name": "三门峡市","value": this.randomData()},
              {"name": "商丘市","value": this.randomData()},
              {"name": "周口市","value": this.randomData()},
              {"name": "驻马店市","value": this.randomData()},
              {"name": "南阳市","value": this.randomData()},
              {"name": "信阳市","value": this.randomData()},
              {"name": "济源市","value": this.randomData()}
            ]
            break;
          case '山东':
            data=[
              {"name": "济南市","value": this.randomData()},
              {"name": "青岛市","value": this.randomData()},
              {"name": "淄博市","value": this.randomData()},
              {"name": "枣庄市","value": this.randomData()},
              {"name": "东营市","value": this.randomData()},
              {"name": "烟台市","value": this.randomData()},
              {"name": "潍坊市","value": this.randomData()},
              {"name": "济宁市","value": this.randomData()},
              {"name": "泰安市","value": this.randomData()},
              {"name": "威海市","value": this.randomData()},
              {"name": "日照市","value": this.randomData()},
              {"name": "滨州市","value": this.randomData()},
              {"name": "德州市","value": this.randomData()},
              {"name": "聊城市","value": this.randomData()},
              {"name": "临沂市","value": this.randomData()},
              {"name": "菏泽市","value": this.randomData()},
              {"name": "莱芜市","value": this.randomData()}
            ]
            break;
          case '陕西':
            data= [
              {"name": "西安市","value": this.randomData()},
              {"name": "宝鸡市","value": this.randomData()},
              {"name": "咸阳市","value": this.randomData()},
              {"name": "铜川市","value": this.randomData()},
              {"name": "渭南市","value": this.randomData()},
              {"name": "延安市","value": this.randomData()},
              {"name": "榆林市","value": this.randomData()},
              {"name": "汉中市","value": this.randomData()},
              {"name": "安康市","value": this.randomData()},
              {"name": "商洛市","value": this.randomData()}
            ]
            break;
          case '宁夏':
            data=[
              {"name": "银川市","value": this.randomData()},
              {"name": "石嘴山市","value": this.randomData()},
              {"name": "吴忠市","value": this.randomData()},
              {"name": "固原市","value": this.randomData()},
              {"name": "中卫市","value": this.randomData()}
            ]
            break;
          case '甘肃':
            data=[
              {"name": "兰州市","value": this.randomData()},
              {"name": "嘉峪关市","value": this.randomData()},
              {"name": "金昌市","value": this.randomData()},
              {"name": "白银市","value": this.randomData()},
              {"name": "天水市","value": this.randomData()},
              {"name": "武威市","value": this.randomData()},
              {"name": "张掖市","value": this.randomData()},
              {"name": "平凉市","value": this.randomData()},
              {"name": "酒泉市","value": this.randomData()},
              {"name": "庆阳市","value": this.randomData()},
              {"name": "定西市","value": this.randomData()},
              {"name": "陇南市","value": this.randomData()},
              {"name": "临夏回族自治州","value": this.randomData()},
              {"name": "甘南藏族自治州","value": this.randomData()}
            ]
            break;
            case '青海':
              data=[
                {"name": "西宁市","value": this.randomData()},
                {"name": "海东市","value": this.randomData()},
                {"name": "海北藏族自治州","value": this.randomData()},
                {"name": "黄南藏族自治州","value": this.randomData()},
                {"name": "海南藏族自治州","value": this.randomData()},
                {"name": "果洛藏族自治州","value": this.randomData()},
                {"name": "玉树藏族自治州","value": this.randomData()},
                {"name": "海西蒙古族藏族自治州","value": this.randomData()}
              ]
              break;
            case '新疆':
              data=[
                {"name": "乌鲁木齐市","value": this.randomData()},
                {"name": "克拉玛依市","value": this.randomData()},
                {"name": "吐鲁番市","value": this.randomData()},
                {"name": "哈密市","value": this.randomData()},
                {"name": "昆玉市","value": this.randomData()},
                {"name": "双河市","value": this.randomData()},
                {"name": "铁门关市","value": this.randomData()},
                {"name": "北屯市","value": this.randomData()},
                {"name": "五家渠市","value":this.randomData()},
                {"name": "阿拉尔市","value": this.randomData()},
                {"name": "可克达拉市","value": this.randomData()},
                {"name": "图木舒克市","value": this.randomData()},
                {"name": "石河子市","value": this.randomData()},
                {"name": "阿克苏地区","value": this.randomData()},
                {"name": "喀什地区","value": this.randomData()},
                {"name": "和田地区","value": this.randomData()},
                {"name": "昌吉回族自治州","value": this.randomData()},
                {"name": "博尔塔拉蒙古自治州","value": this.randomData()},
                {"name": "巴音郭楞蒙古自治州","value": this.randomData()},
                {"name": "克孜勒苏柯尔克孜自治州","value": this.randomData()},
                {"name": "伊犁哈萨克自治州","value": this.randomData()},
                {"name": "塔城地区","value": this.randomData()},
                {"name": "阿勒泰地区","value": this.randomData()}
              ]
              break;
           case '西藏':
             data=[
                {"name": "拉萨市", "value": this.randomData()},
                {"name": "日喀则市","value": this.randomData()},
                {"name": "昌都市","value": this.randomData()},
                {"name": "林芝市","value": this.randomData()},
                {"name": "山南市","value": this.randomData()},
                {"name": "那曲地区","value": this.randomData()},
                {"name": "阿里地区","value": this.randomData()}
             ]
             break;
          case '四川':
            data=[
                {"name": "成都市","value": this.randomData()},
                {"name": "绵阳市","value": this.randomData()},
                {"name": "自贡市","value": this.randomData()},
                {"name": "攀枝花市","value": this.randomData()},
                {"name": "泸州市","value": this.randomData()},
                {"name": "德阳市","value": this.randomData()},
                {"name": "广元市","value": this.randomData()},
                {"name": "遂宁市","value": this.randomData()},
                {"name": "内江市","value": this.randomData()},
                {"name": "乐山市","value": this.randomData()},
                {"name": "资阳市","value": this.randomData()},
                {"name": "宜宾市","value": this.randomData()},
                {"name": "南充市","value": this.randomData()},
                {"name": "达州市","value": this.randomData()},
                {"name": "雅安市","value": this.randomData()},
                {"name": "阿坝藏族羌族自治州","value": this.randomData()},
                {"name": "甘孜藏族自治州","value": this.randomData()},
                {"name": "凉山彝族自治州","value": this.randomData()},
                {"name": "广安市","value": this.randomData()},
                {"name": "巴中市","value": this.randomData() },
                {"name": "眉山市","value": this.randomData()}
            ]
            break;
          case '湖北':
            data=[
                {"name": "武汉市","value": this.randomData()},
                {"name": "黄石市","value": this.randomData()},
                {"name": "十堰市","value": this.randomData()},
                {"name": "宜昌市","value": this.randomData()},
                {"name": "襄阳市","value": this.randomData()},
                {"name": "鄂州市","value": this.randomData()},
                {"name": "荆门市","value": this.randomData()},
                {"name": "孝感市","value": this.randomData()},
                {"name": "荆州市","value": this.randomData()},
                {"name": "黄冈市","value": this.randomData()},
                {"name": "咸宁市","value": this.randomData()},
                {"name": "随州市","value": this.randomData()},
                {"name": "恩施土家族苗族自治州","value": this.randomData()},
                {"name": "仙桃市","value": this.randomData()},
                {"name": "潜江市","value": this.randomData()},
                {"name": "天门市","value": this.randomData()},
                {"name": "神农架林区","value": this.randomData()}
            ]
              break;
          case '安徽':
            data=[
                {"name": "合肥市","value": this.randomData()},
                {"name": "芜湖市","value": this.randomData()},
                {"name": "蚌埠市","value": this.randomData()},
                {"name": "淮南市","value": this.randomData()},
                {"name": "马鞍山市","value": this.randomData()},
                {"name": "淮北市","value":this.randomData()},
                {"name": "铜陵市","value": this.randomData()},
                {"name": "安庆市","value":this.randomData()},
                {"name": "黄山市","value": this.randomData()},
                {"name": "阜阳市","value": this.randomData()},
                {"name": "宿州市","value": this.randomData()},
                {"name": "滁州市","value": this.randomData()},
                {"name": "六安市","value": this.randomData()},
                {"name": "宣城市","value": this.randomData()},
                {"name": "池州市","value": this.randomData()},
                {"name": "亳州市","value": this.randomData()}
            ]
            break;
          case '江苏':
             data=[
                {"name": "南京市","value": this.randomData()},
                {"name": "无锡市","value": this.randomData()},
                {"name": "徐州市","value": this.randomData()},
                {"name": "常州市","value": this.randomData()},
                {"name": "苏州市","value": this.randomData()},
                {"name": "南通市","value": this.randomData()},
                {"name": "连云港市","value": this.randomData()},
                {"name": "淮安市","value": this.randomData()},
                {"name": "盐城市","value": this.randomData()},
                {"name": "扬州市","value": this.randomData()},
                {"name": "镇江市","value": this.randomData()},
                {"name": "泰州市","value": this.randomData()},
                {"name": "宿迁市","value": this.randomData()}
             ]
            break;
          case '浙江':
            data=[
              {"name": "杭州市","value": this.randomData()},
              {"name": "宁波市","value": this.randomData()},
              {"name": "温州市","value": this.randomData()},
              { "name": "绍兴市","value": this.randomData()},
              {"name": "湖州市","value": this.randomData()},
              {"name": "嘉兴市","value": this.randomData()},
              { "name": "金华市","value": this.randomData()},
              {"name": "衢州市","value": this.randomData()},
              {"name": "台州市","value": this.randomData()},
              {"name": "丽水市", "value": this.randomData()},
              {"name": "舟山市","value": this.randomData()}
            ]
            break;
          case '江西':
              data=[
                {"name": "南昌市","value": this.randomData()},
                {"name": "九江市","value": this.randomData()},
                {"name": "上饶市","value": this.randomData()},
                {"name": "抚州市","value": this.randomData()},
                {"name": "宜春市","value": this.randomData()},
                {"name": "吉安市","value": this.randomData()},
                {"name": "赣州市","value": this.randomData()},
                {"name": "景德镇市","value": this.randomData()},
                {"name": "萍乡市","value": this.randomData()},
                {"name": "新余市","value": this.randomData()},
                {"name": "鹰潭市","value": this.randomData()}
              ]
              break;
          case '湖南':
            data=[
                { "name": "长沙市","value": this.randomData()},
                {"name": "株洲市","value": this.randomData()},
                {"name": "湘潭市","value": this.randomData()},
                {"name": "衡阳市","value": this.randomData()},
                {"name": "邵阳市","value": this.randomData()},
                {"name": "岳阳市","value": this.randomData()},
                {"name": "常德市","value": this.randomData()},
                {"name": "张家界市","value": this.randomData()},
                {"name": "益阳市","value": this.randomData()},
                {"name": "娄底市","value": this.randomData()},
                {"name": "郴州市","value": this.randomData()},
                {"name": "永州市","value": this.randomData()},
                {"name": "怀化市","value": this.randomData()},
                {"name": "湘西土家族苗族自治州","value": this.randomData()}
            ]
            break;
          case '贵州':
            data=[
                {"name": "贵阳市","value": this.randomData()},
                {"name": "遵义市","value": this.randomData()},
                {"name": "六盘水市","value": this.randomData()},
                {"name": "安顺市","value": this.randomData()},
                {"name": "毕节市","value": this.randomData()},
                {"name": "铜仁市","value": this.randomData()},
                {"name": "黔东南苗族侗族自治州","value":this.randomData()},
                {"name": "黔南布依族苗族自治州","value": this.randomData()},
                {"name": "黔西南布依族苗族自治州","value":this.randomData()}
            ]
            break;
          case '云南':
            data=[
                {"name": "昆明市","value": this.randomData()},
                {"name": "曲靖市","value": this.randomData()},
                {"name": "玉溪市","value": this.randomData()},
                {"name": "昭通市","value": this.randomData()},
                {"name": "保山市","value": this.randomData()},
                {"name": "丽江市","value": this.randomData()},
                {"name": "普洱市", "value": this.randomData()},
                {"name": "临沧市","value": this.randomData()},
                {"name": "德宏傣族景颇族自治州","value": this.randomData()},
                {"name": "怒江傈僳族自治州","value": this.randomData()},
                {"name": "迪庆藏族自治州","value": this.randomData()},
                {"name": "大理白族自治州","value": this.randomData()},
                {"name": "楚雄彝族自治州","value": this.randomData()},
                {"name": "红河哈尼族彝族自治州","value": this.randomData()},
                {"name": "文山壮族苗族自治州","value": this.randomData()},
                {"name": "西双版纳傣族自治州","value": this.randomData()}
            ]
            break;
          case '福建':
            data=[
                {"name": "福州市","value": this.randomData()},
                {"name": "厦门市","value": this.randomData()},
                {"name": "漳州市","value": this.randomData()},
                {"name": "泉州市","value": this.randomData()},
                {"name": "三明市","value": this.randomData()},
                {"name": "莆田市","value": this.randomData()},
                {"name": "南平市","value": this.randomData()},
                {"name": "龙岩市","value": this.randomData()},
                {"name": "宁德市","value": this.randomData()}
            ]
            break;
          case '广西':
            data=[
                {"name": "南宁市","value": this.randomData()},
                {"name": "柳州市","value": this.randomData()},
                {"name": "桂林市","value": this.randomData()},
                {"name": "梧州市","value": this.randomData()},
                {"name": "北海市","value": this.randomData()},
                {"name": "防城港市","value": this.randomData()},
                {"name": "钦州市","value": this.randomData()},
                {"name": "贵港市","value": this.randomData()},
                {"name": "玉林市","value": this.randomData()},
                {"name": "百色市","value": this.randomData()},
                {"name": "贺州市","value": this.randomData()},
                {"name": "河池市","value": this.randomData()},
                {"name": "来宾市","value": this.randomData()},
                {"name": "崇左市","value": this.randomData()}
            ]
            break;
          case '广东':
            data=[
                {"name": "广州市","value": this.randomData()},
                {"name": "深圳市","value": this.randomData()},
                {"name": "珠海市","value": this.randomData()},
                {"name": "汕头市","value": this.randomData()},
                {"name": "佛山市","value": this.randomData()},
                {"name": "韶关市","value": this.randomData()},
                {"name": "湛江市","value": this.randomData()},
                {"name": "肇庆市","value": this.randomData()},
                {"name": "江门市","value": this.randomData()},
                {"name": "茂名市","value": this.randomData()},
                {"name": "惠州市","value": this.randomData()},
                {"name": "梅州市","value": this.randomData()},
                {"name": "汕尾市","value": this.randomData()},
                {"name": "河源市","value": this.randomData()},
                {"name": "阳江市","value": this.randomData()},
                {"name": "清远市","value": this.randomData()},
                {"name": "东莞市","value": this.randomData()},
                {"name": "中山市","value": this.randomData()},
                {"name": "潮州市","value": this.randomData()},
                {"name": "揭阳市","value": this.randomData()},
                {"name": "云浮市","value": this.randomData()}
            ]
            break;
          case '台湾':
            data=[
                {
                  "name": "台北市",
                  "value": this.randomData()
                },
                {
                  "name": "新北市",
                  "value": this.randomData()
                },
                {
                  "name": "桃园市",
                  "value": this.randomData()
                },
                {
                  "name": "台中市",
                  "value": this.randomData()
                },
                {
                  "name": "台南市",
                  "value": this.randomData()
                },
                {
                  "name": "高雄市",
                  "value": this.randomData()
                },
                {
                  "name": "基隆市",
                  "value": this.randomData()
                },
                {
                  "name": "新竹市",
                  "value": this.randomData()
                },
                {
                  "name": "新竹县",
                  "value": this.randomData()
                },
                {
                  "name": "苗栗县",
                  "value": this.randomData()
                },
                {
                  "name": "彰化县",
                  "value": this.randomData()
                },
                {
                  "name": "南投县",
                  "value": this.randomData()
                },
                {
                  "name": "云林县",
                  "value": this.randomData()
                },
                {
                  "name": "嘉义市",
                  "value": this.randomData()
                },
                {
                  "name": "嘉义县",
                  "value": this.randomData()
                },
                {
                  "name": "屏东县",
                  "value": this.randomData()
                },
                {
                  "name": "宜兰县",
                  "value": this.randomData()
                },
                {
                  "name": "花莲县",
                  "value": this.randomData()
                },
                {
                  "name": "台东县",
                  "value": this.randomData()
                },
                {
                  "name": "澎湖县",
                  "value": this.randomData()
                },
                {
                  "name": "金门县",
                  "value": this.randomData()
                },
                {
                  "name": "连江县",
                  "value": this.randomData()
                }
            ]
            break;
          case '海南':
            data=[
            {
              "name": "海口市",
              "value": this.randomData()
            },
            {
              "name": "三亚市",
              "value": this.randomData()
            },
            {
              "name": "三沙市",
              "value": this.randomData()
            },
            {
              "name": "儋州市",
              "value": this.randomData()
            },
            {
              "name": "五指山市",
              "value": this.randomData()
            },
            {
              "name": "琼海市",
              "value": this.randomData()
            },
            {
              "name": "文昌市",
              "value": this.randomData()
            },
            {
              "name": "万宁市",
              "value": this.randomData()
            },
            {
              "name": "东方市",
              "value": this.randomData()
            },
            {
              "name": "琼海市",
              "value": this.randomData()
            },
            {
              "name": "临高县",
              "value": this.randomData()
            },
            {
              "name": "澄迈县",
              "value": this.randomData()
            },
            {
              "name": "定安县",
              "value": this.randomData()
            },
            {
              "name": "屯昌县",
              "value": this.randomData()
            },
            {
              "name": "白沙黎族自治县",
              "value": this.randomData()
            },
            {
              "name": "昌江黎族自治县",
              "value": this.randomData()
            },
            {
              "name": "乐东黎族自治县",
              "value": this.randomData()
            },
            {
              "name": "保亭黎族苗族自治县",
              "value": this.randomData()
            },
            {
              "name": "陵水黎族自治县",
              "value": this.randomData()
            },
            {
              "name": "琼中黎族苗族自治县",
              "value": this.randomData()
            }
            ]
            break;
          default:
            data=[               
              {name: '北京',value: this.randomData() },
              {name: '天津',value: this.randomData() },
              {name: '上海',value: this.randomData() },
              {name: '重庆',value: this.randomData() },
              {name: '河北',value: this.randomData() },
              {name: '河南',value: this.randomData() },
              {name: '云南',value: this.randomData() },
              {name: '辽宁',value: this.randomData() },
              {name: '黑龙江',value: this.randomData() },
              {name: '湖南',value: this.randomData() },
              {name: '安徽',value: this.randomData() },
              {name: '山东',value: this.randomData() },
              {name: '新疆',value: this.randomData() },
              {name: '江苏',value: this.randomData() },
              {name: '浙江',value: this.randomData() },
              {name: '江西',value: this.randomData() },
              {name: '湖北',value: this.randomData() },
              {name: '广西',value: this.randomData() },
              {name: '甘肃',value: this.randomData() },
              {name: '山西',value: this.randomData() },
              {name: '内蒙古',value: this.randomData() },
              {name: '陕西',value: this.randomData() },
              {name: '吉林',value: this.randomData() },
              {name: '福建',value: this.randomData() },
              {name: '贵州',value: this.randomData() },
              {name: '广东',value: this.randomData() },
              {name: '青海',value: this.randomData() },
              {name: '西藏',value: this.randomData() },
              {name: '四川',value: this.randomData() },
              {name: '宁夏',value: this.randomData() },
              {name: '海南',value: this.randomData() },
              {name: '台湾',value: this.randomData() },
              {name: '香港',value: this.randomData() },
              {name: '澳门',value: this.randomData() }
               ]
            break;

         
        }
        
         // 返回字典集合
          if (this.city && this.city.length > 0) {
            for (let ii = 0; ii < data.length; ii++) {
              let obj = data[ii];
              let name = obj.name;
              let obj2 = this.city.find(a => a.name == name);
       
              if (obj2) {
                data[ii] = obj2;
              }
            }
          }

        if(val){
            return data;
        }else{
           this.data=data;
        }

      },
      randomData() {  
        //  return Math.round(Math.random()*500); 
        return 0; 
       } ,
        
    }
  
    
}
</script>

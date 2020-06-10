<template>
    <div class="personnel">
         <div class="homebread">
          <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 基本信息 
          <span class="mlr_10">/</span><span>{{cname1}}</span>
          <span class="mlr_10" v-if="cname2 != ''">/</span><span v-if="cname2 != ''"><b>{{cname2}}</b></span>
          <span class="mlr_10" v-if="mzname != ''">/</span><span v-if="mzname != ''"><b>{{mzname}}</b></span>
          <span class="mlr_10" v-if="cname3 != ''">/</span><span v-if="cname3 != ''"><b>{{cname3}}</b></span>
          <span class="mlr_10" v-if="cname4 != ''">/</span><span v-if="cname4 != ''"><b>{{cname4}}{{title}}</b></span>
          </span> 
    </div>
     <div class="content">
           <el-row>
             <el-col :span='22' class="ptit">
                <el-row>
                   <el-col :span='16'>
                       <div class="title">
                           <span v-if='orgmc!=null && orgmc!=""'>{{orgmc}}</span>
                          <span v-else> {{cname4}}{{title}}</span>
                           </div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goto(0)"  v-if='allshow[0]'><span>添加</span></el-button>
                          <el-button type="success" @click="goto('1',orgid)" v-if='orgid!="" && orgid!=null'>编辑</el-button>
                          <el-button @click='getDR'  v-if='allshow[1]'>导入</el-button>
                          <el-button style="width:80px" @click="goseach()"  v-if='allshow[2]'>查询</el-button>
                          <el-button style="width:80px" @click="goback()" v-if='back'>返回</el-button>
                    </el-col>
               </el-row>
                <el-row :gutter="2" class="ah-50 pborder mt-20 mb-20" v-if='show'>
                   <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in Data" :key="ind">
                    <span class="address"  @click="getlistto(t.orgid,t.mc)">{{t.mc}}</span>
                  </el-col>
                </el-row>
                <el-row  class="ah-50 pborder mt-20 mb-20 " style="text-align:center" v-else>
                   <el-col :span="24">
                    <span>无数据</span>
                  </el-col>
                </el-row>
             </el-col>
            </el-row>
     </div>
      <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false' width="630px">
      <UPLOAD :url="vvurl" :type="1001"  :urlErr="vvurlErr"  @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    </div>
  
</template>
<script>
import UPLOAD from "../../Common/upload"
import {getgroupmenu,getgroupdata} from '@/assets/js/aleaorg.js'
export default {  
    components:{UPLOAD},
    data(){
        return{
           cname1:'',
           cname2:'',
           cname3:'',
           cname4:'',
           mzname:'',
           Data:[],
           addtype:'',
           jb:'',
           code:'',
           mc:'',
           title:'',
           orgid:'',
           orgmc:'',
           fydata:[],
           show:true,
           back:true,
           count:0,
           num:1,
           drDialogVisible:false, 
           vvurl:'/org/import',
           vvurlErr:'',
           alldata:[],
           allshow:[],
           lx:'',
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
            this.reset();
        if((val.query.type==undefined || val.query.type=='')
            && (val.query.info==undefined || val.query.info=='')){
              this.$router.push({name:'limitmsg'});
         }else if(val.query.info!=undefined && val.query.info!=''){
             try{
              this.info=JSON.parse(Base64.decode(val.query.info));
             
              
               this.addtype=this.info.type;
               this.jb=this.info.jb;
               this.cname1=this.info.cname1;
               this.cname2=this.info.cname2;
               this.cname3=this.info.cname3;
               this.cname4=this.info.cname4;
               this.title=this.info.title;
               this.code=this.info.code;
               this.lx=this.info.lx; 
               this.mc=this.info.mc;
               this.orgid=this.info.orgid;
               this.orgmc=this.info.orgmc;
               this.num=this.info.num;
              
               
             
               }catch(e){
                   this.$router.push({name:'limitmsg',query:{msg:'该地址参数不对！'}});
               }
           }else if(val.query.type!=undefined && val.query.type!=''){
              
               this.addtype=val.query.type;
               this.jb=val.query.jb; 
               this.lx=val.query.lx;      
               this.back=false;
               this.getTitle();
           }
           //权限start
           var mid=getgroupmenu(this.addtype,this.jb,this.lx);
           this.alldata=getgroupdata(this.addtype,this.jb,this.lx);
            this.$api.post(this.Global.menuurl,{'menuId':mid},
                     r =>{
                     
                          if(r.code==1 && r.data!=null){
                            for (let i = 0; i < this.alldata.length; i++) {
                                this.allshow[i]=this.global_auth(r.data,this.alldata[i]);
                            }   
                             this.getLb();
                             this.getInfo();
                          }else if(r.code==0){
                            this.$router.push({path:'/limitmsg'});
                          }
            });
         //权限end
          
        },
        reset(){
              this.addtype='';
               this.jb='';
               this.cname1='';
               this.cname2='';
               this.cname3='';
               this.cname4='';
               this.title='';
               this.code='';
               this.mc='';this.back=true; this.count=0;
            this.orgmc="";
            this.orgid="";this.Data=[];this.fydata=[];
        },
        getLb(){
             switch (this.addtype) {
              case '1':
                  this.lb=this.Global.RD;
                  break;
              case '2':
                  this.lb=this.Global.ZX;
                  break;
              case '3':
                  this.lb=this.Global.TZB;
                  break;
              case '4':
                    switch (this.lx) {
                           case '1':
                              this.lb=this.Global.MZDP1;
                               break;
                           case '2':
                              this.lb=this.Global.MZDP2;
                               break;
                           case '3':
                              this.lb=this.Global.MZDP3;
                               break;
                           case '4':
                              this.lb=this.Global.MZDP4;
                               break;
                           case '5':
                              this.lb=this.Global.MZDP5;
                               break;
                           case '6':
                              this.lb=this.Global.MZDP6;
                               break;
                           case '7':
                              this.lb=this.Global.MZDP7;
                               break;
                           case '8':
                              this.lb=this.Global.MZDP8;
                               break;
                           default:
                               break;
                       }
                  break;
              case '5':
                   this.lb=this.Global.GSL;
                  break;
              case '6':
                 this.lb=this.Global.TL;
                  break;
              case '7':
                  this.lb=this.Global.FY;
                  break;
              default:
                  break;
          }
        },
         getTitle(){
           this.cname1="联络机构";
          switch (this.addtype) {
              case '1':
                  this.cname2="人大系统";
                  this.cname4="全国人民代表大会";
                  break;
              case '2':
                  this.cname2="政协系统";
                  this.cname4="政协全国委员会";
                  break;
              case '3':
                  this.cname2="统战部系统";
                  this.cname4="中央统战部";
                  break;
              case '4':
                  this.cname2="民主党派系统";
                  this.cname4="八大民主党派";
                  break;
              case '5':
                  this.cname2="工商联系统";
                  this.cname4="全国工商联";
                  break;
              case '6':
                  this.cname2="台联系统";
                  this.cname4="全国台联";
                  break;
              case '7':
                  this.cname1="法院内部管理";
                  this.cname2="各级法院";
                  this.cname4="最高院";
                  break;
              default:
                  break;
          }
           switch (this.lx) {
            case '1':
                  this.mzname="中国国民党革命委员会";
                  this.cname4="国民党中央革命委员会";
              break;
            case '2':
                  this.mzname="中国民主同盟";
                  this.cname4="民主同盟中央";
              break;
            case '3':
                  this.mzname="中国民主建国会";
                  this.cname4="民主建国会中央";
              break;
            case '4':
                  this.mzname="中国民主促进会";
                  this.cname4="民主促进会中央";
              break;
            case '5':
                  this.mzname="中国农工民主党";
                  this.cname4="农工民主党中央";
              break;
            case '6':
                  this.mzname="中国致公党";
                  this.cname4="致公党中央";
              break;
            case '7':
                  this.mzname="九三学社";
                  this.cname4="九三学社中央";
              break;
            case '8':
                  this.mzname="台湾民主自治同盟";
                  this.cname4="台湾民主自治同盟中央";
              break;
            default:
              break;
          }
      },
  
      getInfo(){
           if(this.addtype!='7' && this.addtype!='4'){
                switch (this.jb) {
                    case 'qg':
                       this.lvltype='0150000001';
                        break;
                    case 'sj':
                        this.lvltype='0150000002';
                        break;
                    case 'ds':
                        this.lvltype='0150000003';
                        break;
                    case 'xq':
                        this.lvltype='0150000004';
                        break;
                    default:
                        break;
                }
              }else if(this.addtype=='7'){
                switch (this.jb) {
                     case 'qg':
                       this.lvltype='0222000001';
                        break;
                    case 'sj':
                        this.lvltype='0222000002';
                        break;
                    case 'ds':
                        this.lvltype='0222000003';
                        break;
                    case 'xq':
                        this.lvltype='0222000004';
                        break;
                    default:
                        break;
                }
              }else if(this.addtype=='4'){
                    // 0227000006 中国国民党革命委员会
                    // 0227000007 中国民主同盟
                    // 0227000008 中国民主建国会
                    // 0227000009 中国民主促进会
                    // 0227000010 中国农工民主党
                    // 0227000011 中国致公党
                    // 0227000012 九三学社
                    // 0227000013 台湾民主自治同盟
                  switch (this.lx) {
                      case '1':
                          this.lvltype='0227000006';
                          break;
                      case '2':
                          this.lvltype='0227000007';
                          break;
                      case '3':
                          this.lvltype='0227000008';
                          break;
                      case '4':
                          this.lvltype='0227000009';
                          break;
                      case '5':
                          this.lvltype='0227000010';
                          break;
                      case '6':
                          this.lvltype='0227000011';
                          break;
                      case '7':
                          this.lvltype='0227000012';
                          break;
                      case '8':
                          this.lvltype='0227000013';
                          break;
                      default:
                          break;
                  }
              }
            
              
          this.getList();
      },
   getList(){

        if(this.orgid!='' && this.orgmc!='' && this.num!=undefined){
          
           this.getListBM(this.orgid,this.orgmc);
        }else{
            let p={
                'lb':this.lb,
                'xzqh':this.code,
                'lvl':this.lvltype
            };
            this.$api.post(this.Global.aport1+'/org/getOrgByTypeAndArea',p,
            r=>{
                if(r.code==1){
                    this.Data=r.data;
                    if(r.data.length>0){
                        this.show=true;
                    }else{
                        this.show=false;
                    }
                }
            })
        }
       },
  getlistto(id,mc){
       let pp={
                'orgId':id,
            };
            this.$api.get(this.Global.aport1+'/org/getSubDept',pp,
            r=>{
                if(r.code==1){
                    if(r.data && r.data.length>0){
                         let p={
                        'cname1':this.cname1,
                        'cname2':this.cname2,
                        'cname3':this.cname3,
                        'cname4':this.cname4,
                        'mzname':this.mzname,
                        'title':this.title,
                        'type':this.addtype,
                        'code':this.code,
                        'mc':this.mc,
                        'jb':this.jb,
                        'lx':this.lx,
                        'orgid':id,
                        'orgmc':mc,
                        'num':this.num+1,
                        
                    }
                    var str=Base64.encode(JSON.stringify(p));
                    this.$router.push({path:'InstitutionGroup',query:{info:str}});
                  }else{
                       this.goto(1,id,mc);
                  }

                }
            });
  },
   getListBM(id,mc){
      
            let p={
                'orgId':id,
            };
            this.$api.get(this.Global.aport1+'/org/getSubDept',p,
            r=>{
                if(r.code==1){
            
                    if(r.data && r.data.length>0){
                        //  this.orgid=id;
                        //  this.orgmc=mc;
                        //  this.count++;
                        //  this.num++;
                         this.back=true;
                         this.Data=r.data;
                    }
                }
            })
        },
    goback(){
        this.$router.go(-1);
    //     if(this.code!=''){
           
    //          this.$router.go(-1);
             
    //     }else{
    //     if((this.orgid=='' && this.orgmc=='') || (this.count-1)==0){
           
    //         this.count--;
        
    //         this.orgmc="";
    //         this.orgid="";
    //         //this.$router.go(-1);
    //         this.back=false;
    //         this.getList();
    //     }else{
    //         console.log('-=-=-=',this.orgid,this.orgmc,this.count);
    //         this.getListBM(this.orgid,this.orgmc)
    //     }
    //    }
    },
  
      goto(t,id,mc){
            var tt=this.cname4;
            mc=mc==undefined?"":mc;
            if(this.title!="" || mc!=''){
                tt=this.cname4+mc;
            }
             if(t==1){
                this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:'1',jgid:id,title:tt,lx:this.lx,num:this.num-1==0?this.num:this.num-1,pt:1}});
            }else if(t==0){
                this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:'0',title:tt,jb:this.jb,xzqh:this.code,lx:this.lx,num:this.num-1==0?this.num:this.num-1,cdx:1,pt:1}});
            }
        },
     goseach(){
          this.$router.push({name:'InstitutionList',query:{type:this.addtype,lx:this.lx}})
        },
    getDR(){
         
         this.drDialogVisible=true;
      },
      drfatherMethod(data,t){
         this.drDialogVisible=false;
      },
    },
}
</script>
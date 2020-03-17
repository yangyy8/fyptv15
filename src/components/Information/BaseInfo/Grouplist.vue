<template>
    <div class="personnel">
         <div class="homebread">
          <i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 基本信息库 
          <span class="mlr_10">/</span><span>{{cname1}}</span>
          <span class="mlr_10" v-if="cname2 != ''">/</span><span v-if="cname2 != ''"><b>{{cname2}}</b></span>
          <span class="mlr_10" v-if="cname3 != ''">/</span><span v-if="cname3 != ''"><b>{{cname3}}</b></span>
          <span class="mlr_10" v-if="cname4 != ''">/</span><span v-if="cname4 != ''"><b>{{cname4}}</b></span>
          </span> 
    </div>
     <div class="content">
           <el-row>
             <el-col :span='(addtype=="1" || addtype=="2")?18:22' class="ptit">
                <el-row>
                   <el-col :span='16'>
                       <div class="title">{{jjbmc==null?'':jjbmc}}{{cname4}}{{cname2}}</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goBase()"><span>编辑</span></el-button>
                          <el-button style="width:80px" @click="goseach()">查询</el-button>
                          <el-button style="width:80px" @click="$router.go(-1)">返回</el-button>
                    </el-col>
               </el-row>
               <!-- <el-row :gutter="2" class="ah-50 pborder mt-20">
                   <el-col style="text-align:center">无数据</el-col>
               </el-row> -->
                <el-row :gutter="2" class="ah-50 pborder mt-20" v-if='addtype=="1"'>
                   <el-col :sm="24" :md="12" :lg="4" v-for="(t,ind) in leveldatatb" :key="ind" >
                    <span class="address"  @click="gopro(t.dm,'tb',t.mc)">{{t.mc}}</span>
                  </el-col>
                </el-row>
                 <el-row :gutter="2" class="ah-50 pborder mt-20" v-else-if='addtype=="2"'>
                    <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in $store.state.jjb" :key="ind">
                      <span class="address"  @click="gopro(t.dm,'jjb',t.mc)">{{t.mc}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="2" class="ah-50 pborder mt-20" v-else-if='addtype=="3"'>
                    <el-col :sm="24" :md="12" :lg="8" v-for="(te,indm) in $store.state.tylb" :key="indm">
                       <span class="address" style="font-weight:bold;" @click="getline(te.dm,te.mc)"> {{te.mc}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="2" class="ah-50 pborder mt-10 mb-20" v-else-if='addtype=="4"'>
                     <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in fydata" :key="ind">
                        <span class="address"  @click="gotoFy(t.orgid,t.sjOrgId,t.mc)">{{t.mc}}</span>
                     </el-col>
                </el-row>
             </el-col>
             <el-col :span="6" style="padding-left:45px;" v-if='addtype=="1" || addtype=="2"'>
                     <div class="title mb-20">历届{{ltitle}}名单</div>
                     <div v-for='(tt,index) in $store.state.jb' class="ljinfo" :key="index">
                        <span @click="gojjb(tt.dm,tt.mc)">{{tt.mc}}{{cinfo}}</span>
                     </div>
             </el-col>
            </el-row>
     </div>
     
    </div>
  
</template>
<script>
export default {
    data(){
        return{
           cname1:'',
           cname2:'',
           cname3:'',
           cname4:'',
           leveldatatb:[],
           addtype:'',
           jb:'',
           jjb:'',
           jjbmc:'',
           code:'',
           mc:'',
           ltitle:'',
           cinfo:'',
           lvltype:'',//用于特约人员
           fydata:[],
        }
    },
    mounted(){
        this.$store.dispatch("getJb");
        this.$store.dispatch("getTb");
        this.$store.dispatch("getJjb");
        this.$store.dispatch("getTylb");
        this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
        getinit(val){
        if((val.query.type==undefined || val.query.type=='')
            && (val.query.info==undefined || val.query.info=='')){
              this.$router.push({name:'limitmsg'});
         }else if(val.query.info!=undefined && val.query.info!=''){
             try{
              this.info=JSON.parse(Base64.decode(val.query.info));
              console.log(this.info,'==');
              
               this.addtype=this.info.type;
               this.jb=this.info.jb;
               this.cname1=this.info.cname1;
               this.cname2=this.info.cname2;
               this.cname3=this.info.cname3;
               this.cname4=this.info.mc;
               this.code=this.info.code;
               this.jjb=this.info.jjb;
               this.jjbmc=this.info.jjbmc;
               this.mc=this.info.mc;
               this.ltitle=this.info.ltitle;
               this.cinfo=this.info.cinfo;
             
               }catch(e){
                   this.$router.push({name:'limitmsg',query:{msg:'该地址参数不对！'}});
               }
           }else if(val.query.type!=undefined && val.query.type!=''){
              
               this.addtype=val.query.type;
               this.jb=val.query.jb;
               this.jjbmc=this.$store.state.jmc;
               this.jjb=this.$store.state.jid;
               this.getTitle();
           }

           this.getInfo();
        },
      getInfo(){
           if(this.addtype=='1'){
               var level='';
                switch (this.jb) {
                    case 'qg':
                       level='0150000001';
                        break;
                    case 'sj':
                        level='0150000002';
                        break;
                    case 'ds':
                        level='0150000003';
                        break;
                    case 'xq':
                        level='0150000004';
                        break;
                    default:
                        break;
                }
                 this.getTB(level,this.code);
              }else   if(this.addtype=='3' || this.addtype=='4'){
               
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

                if(this.addtype=='4'){
                    this.getFY();
                }
              
              }
      },
      getTitle(){
          switch (this.addtype) {
              case '1':
               this.cname1="联络对象";
               this.cname2="人大代表";
               this.cname3="全国人大代表";
               this.ltitle="代表";
               this.cinfo="人民代表大会";
                  break;
               case '2':
               this.cname1="联络对象";
               this.cname2="政协委员";
               this.cname3="全国政协委员";
               this.ltitle="委员";
               this.cinfo="政治协商会议委员";
                  break;
               case '3':
               this.cname1="联络对象";
               this.cname2="特约人员";
               this.cname3="最高法人民法院特约人员";
               this.jjbmc="";
                  break;
               case '4':
               this.cname1="法院内部管理";
               this.cname2="法院人员";
               this.cname3="最高院人员";
               this.jjbmc="";
                  break;
          
              default:
                  break;
          }
      },
   gojjb(dm,mc){
     let p={
          'cname1':this.cname1,
          'cname2':this.cname2,
          'cname3':this.cname3,
          'cname4':this.cname4,
          'type':this.addtype,
          'code':this.code,
          'mc':this.mc,
          'jb':this.jb,
          'jjb':dm,
          'jjbmc':mc,
          'ltitle':this.ltitle,
          'cinfo':this.cinfo,
        };
    var str=Base64.encode(JSON.stringify(p));
    this.$router.push({path:'Grouplist',query:{info:str}});
    },
    gopro(d,t,mc){
        let p={
            'type':this.addtype,
            'vv':t,
            'key':d,
            'mc':mc,
            'code':this.code,
            'codemc':this.mc,
            'jb':this.jb,
            'jmc':this.jjbmc,
            'jkey':this.jjb

        };
    var str=Base64.encode(JSON.stringify(p));
    this.$router.push({path:'Delegation',query:{info:str}});
    },
    //特约人员
      getline(dm,mc){
             
           this.$router.push({name:'SpecialPersonDeatil',query:{lb:dm,lbmc:mc,mc:this.cname3,jb:this.jb,jblv:this.lvltype,code:this.code,codemc:this.mc}});
       },
      gotoFy(orgid,sjOrgId,mc){
           this.$router.push({name:'CourtMeber',query:{orgid:orgid,jb:this.jb,type:this.addtype,xzqh:this.code,xzqhmc:this.mc,cname:this.cname3,fname:mc}});
       },
        //团别
      getTB(l,v){
            console.log(l,v);
            
               let p={
                    'level':l,
                    'code':v
                  };
                  this.$api.get(this.Global.aport4+'/service/getGroupType',p,
                  r =>{
                          if(r.code==1){
                            this.leveldatatb=r.data;
                          }
                   });
        },
     //法院机构
     getFY(){
            let p={
                'lb':this.Global.FY,
                'xzqh':this.code,
                'lvl':this.lvltype
            };
            this.$api.post(this.Global.aport1+'/org/getOrgByTypeAndArea',p,
            r=>{
                if(r.code==1){
                    this.fydata=r.data;
                }
            })
        },
      goBase(){
           this.$router.push({name:'BaseAdd',query:{type:this.addtype,jb:this.jb,xzqh:this.code,xzqhmc:this.codemc,jmc:this.jjbmc,jkey:this.jjb}})
        },
     goseach(){
           switch (this.addtype) {
             case '1':
               this.$router.push({name:'BaseList'})
               break;
             case '2':
               this.$router.push({name:'zxBaseList'})
               break;
            case '3':
               this.$router.push({name:'tyBaseList'})
               break;
            case '4':
               this.$router.push({name:'CourtPersonnelList'})
               break;
             default:
               break;
           }
        },
    },
}
</script>
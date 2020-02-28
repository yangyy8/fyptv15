<template lang="html">
    <div class="personnel">
      <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 
        基本信息库 <span class="mlr_10">/</span> 联络对象 <span class="mlr_10">/</span><span>{{cname}}</span>
        <span class="mlr_10" v-if="cname1 != ''">/</span><span v-if="cname1 != ''"><b>{{cname1}}</b></span>
         <span class="mlr_10" v-if="title != ''">/</span><span v-if="title != ''"><b>{{title}}</b></span>
        </span> </div>
          <div class="content">
        <el-row>
             <el-col :span="18" class="ptit">
               <el-row >
                   <el-col :span="16">
                       <div class="title">{{jjbmc==null?'':jjbmc}}{{title}}</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goBase()">
                          <span>编辑</span>
                            </el-button>
                          <!-- <el-button style="width:80px" >导入</el-button> -->
                          <el-button style="width:80px" @click="goseach()">查询</el-button>
                    </el-col>
               </el-row>
               <el-row :gutter="2" class="ah-50 pborder mt-20" v-if="addtype=='1'">
                  <el-col :sm="24" :md="12" :lg="4" v-for="(t,ind) in leveldatatb" :key="ind" v-if="jb=='qg'">
                    <span class="address"  @click="gopro(t.dm,'tb',t.mc)">{{t.mc}}</span>
                  </el-col>
                  <el-col :sm="24" :md="12" :lg="4" v-for="(ts,inds) in leveldata" :key="inds" v-if="jb=='sj' || jb=='ds' || jb=='xq'">
                    <span class="address"  @click="goxj(ts.dm,'tb',ts.mc,jb)">{{ts.mc}}</span>
                  </el-col>
               </el-row>
                <el-row :gutter="2" class="ah-50 pborder mt-20" v-if="addtype=='2'" >
                  <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in $store.state.jjb" :key="ind" v-if="jb=='qg'">
                        <span class="address"  @click="gopro(t.dm,'jjb',t.mc)">{{t.mc}}</span>
                  </el-col>
                   <el-col :sm="24" :md="12" :lg="6" v-for="(ts,inds) in leveldata" :key="inds" v-if="jb=='sj' || jb=='ds' || jb=='xq'">
                        <span class="address"  @click="gozxxj(ts.dm,'jjb',ts.mc,jb)">{{ts.mc}}</span>
                  </el-col>
               </el-row>
             </el-col>
             <el-col :span="6" style="padding-left:45px;">
                     <div class="title mb-20">历届{{ltitle}}名单</div>
                     <div v-for='(tt,index) in $store.state.jb' class="ljinfo" :key="index">
                         <!-- <span @click="gopro(tt.dm,'jb',tt.mc)">{{tt.mc}}{{cinfo}}</span> -->
                          <span @click="goto(tt.dm,tt.mc)">{{tt.mc}}{{cinfo}}</span>
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
          cname:'全国人大代表',
          cname1:'',
          cinfo:'全国人民代表大会',
          title:'代表',
          addtype:'1',
          jb:'qg',
          leveldata:[],
          leveldatatb:[],
          num:0,
          lefttb:'',
          codemc:'',
          jjb:'',
          jjbmc:'',
          ltitle:'',
          xzqh:'',
          xzqhmc:'',

        }
    },
    mounted(){

    this.$store.dispatch("getJb");
    this.$store.dispatch("getTb");
    this.$store.dispatch("getJjb");
     this.getinit(this.$route);
    },
    watch:{
        $route:function(val){
            this.getinit(val);
        },
    },
    methods:{
        getinit(val){
              this.addtype=val.query.type;
              this.jb=val.query.jb;
              this.num=0;this.lefttb="";
              this.jjbmc=val.query.jjbmc;
              this.jjb=val.query.jjb;
              if(this.jjbmc==null)
              {
                this.jjbmc=this.$store.state.jmc;
              }
              if(this.jjb==null)
              {
                this.jjb=this.$store.state.jid;
              }
              switch (this.addtype) {
                  case '1':
                        this.cname="人大代表";
                        this.cinfo="人民代表大会";
                        this.ltitle='代表';

                        // if(this.jb=='qg'){
                        //     this.title="全国人大代表团";
                        // }else if(this.jb=='sj'){
                        //     this.title="省级人大代表团";
                        //     this.getLevel('1','');
                        // }else if(this.jb=='ds'){
                        //     this.title="地市人大代表团";
                        //     this.getLevel('1','');
                        // }
                        // else if(this.jb=='xq'){
                        //     this.title="县区人大代表团";
                        //     this.getLevel('1','');
                        // }

                        if(this.jb=='qg'){
                          this.title="全国人大代表";
                          this.cname1="全国人大代表";
                          this.getTB('0150000001','',0);
                        }else if(this.jb=='sj'){
                           this.title="省级行政区划";
                           this.getLevel('1','');
                          this.cname1="省级人大代表";
                        }else if(this.jb=='ds'){
                          this.title="省级行政区划";
                          this.getLevel('1','');
                          this.cname1="市级人大代表";
                        }else{
                          this.title="省级行政区划";
                          this.getLevel('1','');
                          this.cname1="区县人大代表";
                        }
                      break;
                   case '2':
                        this.cname="政协委员";
                        this.cinfo="政治协商会议委员";
                         this.ltitle='委员';
                        //  if(this.jb=='qg'){
                        //     this.title="全国政协委员界";
                        // }else if(this.jb=='sj'){
                        //     this.title="省级政协委员界";
                        //     this.getLevel('1','');
                        // }else if(this.jb=='ds'){
                        //     this.title="地市政协委员界";
                        //       this.getLevel('1','');
                        // }
                        // else if(this.jb=='xq'){
                        //     this.title="县区政协委员界";
                        //       this.getLevel('1','');
                        // }
                        // if(this.jb=='qg'){
                        //     this.title="全国政协委员界";
                        // }else{
                        //     this.title="省级行政区划";
                        //     this.getLevel('1','');
                        // }
                         if(this.jb=='qg'){
                           this.title="全国政协委员界";
                           // this.cname="政协委员 / 全国政协委员";
                           this.cname1="全国政协委员";
                         }else if(this.jb=='sj'){
                           this.title="省级行政区划";
                           this.getLevel('1','');
                           // this.cname="政协委员 / 省级政协委员";
                           this.cname1="省级政协委员";
                         }else if(this.jb=='ds'){
                           this.title="省级行政区划";
                           this.getLevel('1','');
                           // this.cname="政协委员 / 市级政协委员";
                           this.cname1="市级政协委员";
                         }else{
                           this.title="省级行政区划";
                           this.getLevel('1','');
                           // this.cname="政协委员 / 县区政协委员";
                           this.cname1="区县政协委员";
                         }
                        break;

                  default:
                      break;
              }
        },
        goBase(){
            this.$router.push({name:'BaseAdd',query:{type:this.addtype,jb:this.jb,xzqh:this.xzqh,xzqhmc:this.xzqhmc,jmc:this.jjbmc,jkey:this.jjb}})
        },
        getLevel(l,v){
               let p={
                    'code':v,
                    'level':l
                  };
                  this.$api.get(this.Global.aport4+'/service/getxzqh',p,
                  r =>{
                          if(r.code==1){
                                this.num++;
                                this.leveldata=r.data;
                          }
                   });
        },
        getTB(l,v,m){
                    
               let p={
                    'code':v,
                    'level':l
                  };
                  this.$api.get(this.Global.aport4+'/service/getGroupType',p,
                  r =>{
                          if(r.code==1){
                            if(m!=0){
                                this.leveldata=r.data;
                                }else{
                                   this.leveldatatb=r.data;
                                }
                          }
                   });
        },

        goxj(d,t,mc,jb){
           this.xzqh=d;
           this.xzqhmc=mc;
            if(jb=='sj'){
                 if(this.num==1){
                    this.num++;
                    this.getTB('0150000002',d);
                    this.lefttb=d;
                    this.codemc=mc;
                    this.title=mc+"省级人大代表";
                }else if(this.num==2){
                   this.gopro(d,t,mc);
                }

               // this.gopro(d,t,mc);
            }else if(jb=='ds'){
                // if(this.num==2){
                //     this.gopro(d,t,mc);
                // }else{
                //     this.getLevel('2',d);
                // }
                if(this.num==2){
                    this.num++;
                    this.getTB('0150000003',d);
                    this.lefttb=d;
                     this.codemc=mc;
                    this.title=mc+"市级人大代表";
                }else if(this.num==3){
                    this.gopro(d,t,mc);
                    this.title=mc+"区县行政区划";
                }else{
                    this.getLevel('2',d);
                    this.title=mc+"市级行政区划";
                }

            }else if(jb=='xq'){
                if(this.num==3){
                this.gopro(d,'tbxq',mc);
                  this.title=mc+"区县行政区划";
                }else if(this.num==2){
                  this.getLevel('3',d);
                  this.lefttb=d;
                  this.codemc=mc;
                  this.title=mc+"区县行政区划";
                }else{
                 this.getLevel('3',d);
                 this.lefttb=d;
                  this.codemc=mc;
                 this.title=mc+"市级行政区划";
                }
                // if(this.num==3){
                //     this.num++;
                //     this.getTB('4',d);
                // }else if(this.num==4){
                //     this.gopro(d,t,mc);
                // }else{
                //  this.getLevel('3',d);
                // }

            }
        },
        gozxxj(d,t,mc,jb){
          this.xzqh=d;
          this.xzqhmc=mc;
            if(jb=='sj'){
                if(this.num==1){
                    this.num++;
                    this.leveldata=this.$store.state.jjb
                    this.lefttb=d;
                     this.codemc=mc;
                    this.title=mc+"省级政协委员界";
                }else if(this.num==2){
                   this.gopro(d,t,mc);
                }

            }else if(jb=='ds'){
                if(this.num==2){
                    this.num++;
                    this.leveldata=this.$store.state.jjb
                    this.lefttb=d;
                     this.codemc=mc;
                     this.title=mc+"市级政协委员界";
                }
                else if(this.num==3){
                    this.gopro(d,t,mc);
                }else{
                    this.getLevel('2',d);
                    this.title=mc+"市级行政区划";
                }
            }else if(jb=='xq'){
                if(this.num==3){
                    this.num++;
                    this.leveldata=this.$store.state.jjb
                    this.lefttb=d;
                    this.codemc=mc;
                    this.title=mc+"区县政协委员界";
                }else if(this.num==4){
                    this.gopro(d,t,mc);
                }else if(this.num==2){
                  this.getLevel('3',d);
                  this.title=mc+"区县行政区划";
                }else{
                  this.getLevel('3',d);
                  this.title=mc+"市级行政区划";
                }
            }
        },
        gopro(d,t,mc){
            console.log('this.lefttb',this.lefttb,this.jb);

            this.$router.push({name:'Delegation',query:{type:this.addtype,vv:t,key:d,mc:mc,code:this.lefttb,codemc:this.codemc,jb:this.jb,jmc:this.jjbmc,jkey:this.jjb}});
        },
        goto(t,mc){
          this.$router.push({name:'Personnel',query:{type:this.addtype,jb:this.jb,jjb:t,jjbmc:mc}});
        },

        goseach(){
           switch (this.addtype) {
             case '1':
               this.$router.push({name:'BaseList'})
               break;
             case '2':
               this.$router.push({name:'zxBaseList'})
               break;
             default:
               break;
           }
        },

    },
}
</script>

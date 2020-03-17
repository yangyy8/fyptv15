<template lang="html">
    <div class="personnel">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 
              基本信息库 <span class="mlr_10">/</span> 法院人员  <span class="mlr_10">/</span><b>{{cname}}</b>
               <span class="mlr_10" v-if='xzqhmc!=""'>/</span><b v-if='xzqhmc!=""'>{{xzqhmc}}法院人员</b>
              </span> </div>
          <div class="content">
        <el-row>
             <el-col :span="24" class="ptit ptitr">
               <el-row >
                   <el-col :span="16" v-if='!personshow'>
                       <div class="title" v-if='xzqhmc==""'>{{cname}}</div>
                       <div class="title" v-else>{{xzqhmc}}法院人员</div>
                       
                   </el-col>
                   <el-col :span="16" v-else>
                     <div class="title"><span>{{fname}}</span>名单</div>
                    <div style="margin:20px 20px 0 20px;">共<span style="color:red"> {{count}} </span>名法院人员</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" style="width:80px" @click="goto(0)">录入</el-button>
                          <el-button style="width:80px" >导入</el-button>
                          <el-button style="width:80px" @click="$router.push({name:'CourtPersonnelList'})">查询</el-button>
                    </el-col>
               </el-row>
               <el-row :gutter="2" class="ah-50 pdz" v-if='!personshow'>
                             <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in Data" :key="ind" v-if="qgshow">
                                    <span class="address"  @click="getListBM(t.orgid,t.sjOrgId,t.mc)">{{t.mc}}</span>
                           </el-col>
                            <el-col :sm="24" :md="12" :lg="4" v-for="(ts,inds) in leveldata" :key="inds" v-if="qtshow">
                             <span class="address"  @click="goxj(ts.dm,ts.mc)">{{ts.mc}}</span>
                           </el-col>
                  </el-row>
             <el-row :gutter="2" class="ah-50 pdz" v-else>
                           <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in RYData" :key="ind">
                                 <el-tooltip  placement="right" popper-class="test">
                                     <div slot="content">
                                             <el-row style="margin-top:20px;width:300px">
                                                  <el-col :span="24" style="border-bottom:2px #eeeeee solid;">
                                                     <img :src="t.photoUrl==null?tximg:t.photoUrl" width="150" height="180">
                                                  <br/><span style="font-size:20px;font-weight: bold;color: #0168B5;line-height:50px;" >{{t.personName}}</span></el-col>
                                                   <el-col :span="24"  class="tabg">
                                                        <el-tag v-for="(value,key) in t.tags" :key="key" style="margin:3px">{{value==null?"无":value}} </el-tag>
                                                    </el-col>
                                             </el-row>
                                         </div>
                                    <span class="address" @click="goto(2,t.pbId,t.courtPersonId,t.orgId)">{{t.personName}}{{getSN(t.sex,t.nationality)}}</span>
                               </el-tooltip>
                           </el-col>
                </el-row>

             </el-col>
          
        </el-row>

          

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          cname:'最高院人员',
          Data:[],
          addtype:'1',
           qgshow:false,
          qtshow:false,
          lb:'',
          leveldata:[],
          num:0,
          lvl:'',
          xzqh:'',
          xzqhmc:'',
          RYData:[],
          count:0,
          personshow:false,
          fname:'',
          tximg:require("../../../assets/img/mrt.png"),
          
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
              this.xzqhmc="";
              this.xzqh="";
              this.addtype=val.query.type;
              
              this.qgshow=false;
              this.qtshow=false;
              this.num=0;
              this.lb=this.Global.FY;
                  switch (this.addtype) {
                   case '1':
                         this.cname="最高院人员";
                         this.lvl="0222000001";
                         this.qgshow=true;this.getList('');
                      break;
                   case '2':
                         this.cname="各省高院人员";
                         this.lvl="0222000002";
                         this.qtshow=true;this.getLevel('1','');
                      break;
                   case '3':
                         this.cname="各市中院人员";
                         this.lvl="0222000003";
                         this.qtshow=true;this.getLevel('1','');
                      break;
                   case '4':
                        this.cname="区县基层法院人员";
                        this.lvl="0222000004";
                        this.qtshow=true;this.getLevel('1','');
                      break;
                  default:
                      break;
              }
        },
           getList(xzqh){
            let p={
                'lb':this.lb,
                'xzqh':xzqh,
                'lvl':this.lvl
            };
            this.$api.post(this.Global.aport1+'/org/getOrgByTypeAndArea',p,
            r=>{
                if(r.code==1){
                    this.Data=r.data;
                }
            })
        },
              getSN(s,n){
            var sum="";
          if(s=="女性" && n!="汉族" && n!=null && s!=null){
              sum="(女，"+n+")";
          }else{
              if(s=='女性' && n!=null){
                 sum="（女）";
               }
              if(n!="汉族" && n!=null){
                 sum="（"+n+"）";
               }
           }
           return sum;
        },
         getUser(dm)
        {
            
            var url="/baseinfo/listbytype";
            let p={
                 
                  'subOrgId':dm,
                  'personType':this.Global.COURTPERSON,
                  
            };
            this.$api.post(this.Global.aport1+url,p,
             r =>{
                 
                  if(r.data==null){
                      this.$message.error('该部门下没有人员！');return;
                  }
                  this.RYData=r.data;
                  this.count=r.data.length;
                  this.personshow=true;
            });
        },
        getListBM(id,sjOrgId,mc){
           
            let p={
                'orgId':id,
            };
            this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
            r=>{
                if(r.code==1){
            
                    
                    if(r.data && r.data.length>0){
                         this.Data=r.data;
                    }else{
                      
                        this.goto(1,id,sjOrgId,mc);
                    }
                }
            })
        },
         goxj(d,mc){
             this.xzqh=d;
             this.xzqhmc=mc;
            if(this.addtype=='2'){
                 this.getList(d);
                 this.qgshow=true;
                 this.qtshow=false;
            }else if(this.addtype=='3'){
                if(this.num==2){
                   this.getList(d);
                   this.qgshow=true;
                     this.qtshow=false;
                }else{
                    this.qgshow=false;
                    this.qtshow=true;
                    this.getLevel('2',d);
                }
            }else if(this.addtype=='4'){
                if(this.num==3){
                     this.getList(d);
                    this.qgshow=true;
                      this.qtshow=false;
                }else{
                  this.qgshow=false;
                 this.qtshow=true;
                 this.getLevel('3',d);
                }
            }
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
        goto(t,id,dm,mc,orgid){
           console.log(orgid,'---');
           
            if(t==1){
                //this.$router.push({name:'CourtPersonnelList',query:{type:this.addtype,status:'1',jgid:id,sjid:sjid}});
                this.fname=mc;
                this.getUser(id);
               

           }else if(t==0){
                this.$router.push({name:'BaseAdd',query:{type:'4',status:'0',jb:this.addtype,xzqh:this.xzqh,xzqhmc:this.xzqhmc}});
            
            }else if(t==2){
                
            this.$router.push({name:'BaseAdd',query:{type:'4',status:'1',pbid:id,reid:dm,orgdm:orgid}});
            }
        },
    },
}
</script>
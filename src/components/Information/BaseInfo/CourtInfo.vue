<template lang="html">
    <div class="personnel">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 基本信息库 <span class="mlr_10">/</span> 各级法院 
           <span class="mlr_10">/</span><b>{{codemc}}{{cname}}</b></span> 
           </div>
          <div class="content">
        <el-row>
             <el-col :span="24" class="ptit ptitr">
               <el-row >
                   <el-col :span="16">
                       <div class="title">{{codemc}}{{cname}}</div>
                       
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary"  @click="goto(0)">录入</el-button>
                          <el-button>导入</el-button>
                          <el-button @click="$router.push({name:'InstitutionList',query:{type:'7'}})">查询</el-button>
                    </el-col>
               </el-row>
               <el-row :gutter="2" class="ah-50 pdz" >
                           <el-col :sm="24" :md="12" :lg="6" v-for="(t,ind) in Data" :key="ind" v-if="qgshow">
                                    <span class="address"  @click="getListBM(t.orgid)">{{t.mc}}</span>
                           </el-col>
                            <el-col :sm="24" :md="12" :lg="4" v-for="(ts,inds) in leveldata" :key="inds" v-if="qtshow">
                             <span class="address"  @click="goxj(ts.dm,ts.mc)">{{ts.mc}}</span>
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
          cname:'最高院',
          Data:[],
          addtype:'1',
          qgshow:false,
          qtshow:false,
          lb:'',
          leveldata:[],
          num:0,
          xzqh:'',
          codemc:'',
          lvl:'',
          
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
              this.addtype=val.query.type;
              this.qgshow=false;
              this.qtshow=false;
              this.num=0;
              this.lb=this.Global.FY;
                  switch (this.addtype) {
                   case '1':
                        this.cname="最高院"; this.lvl="0222000001";
                        this.qgshow=true;this.getList('');
                       
                      break;
                   case '2':
                        this.cname="省高院";this.lvl="0222000002";
                        this.qtshow=true;this.getLevel('1','');
                        
                      break;
                   case '3':
                        this.cname="市中院";this.lvl="0222000003";
                        this.qtshow=true;this.getLevel('1','');
                        
                      break;
                   case '4':
                        this.cname="基层法院";this.lvl="0222000004";
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
        getListBM(id){
           
            let p={
                'orgId':id,
            };
            this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
            r=>{
                if(r.code==1){
            
                    console.log(r.data);
                    
                    if(r.data && r.data.length>0){
                         this.Data=r.data;
                    }else{
                        this.goto(1,id);
                    }
                }
            })
        },
         goxj(d,mc){
             this.xzqh=d;
             this.codemc=mc;
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
        goto(t,id){

           
             if(t==1){
                this.$router.push({name:'InstitutionAdd',query:{type:'7',status:'1',jgid:id,title:this.cname}});
            }else if(t==0){
                this.$router.push({name:'InstitutionAdd',query:{type:'7',status:'0',title:this.codemc+this.cname,jb:this.addtype,xzqh:this.xzqh}});
            }
        },
    },
}
</script>
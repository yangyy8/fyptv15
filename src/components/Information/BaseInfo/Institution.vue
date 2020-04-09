<template lang="html">
    <div class="personnel">
          <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i>
          <span> 基本信息库 <span class="mlr_10">/</span> 联络机构  
          <span class="mlr_10">/</span><b>{{cname}} </b>
          <span class="mlr_10">/</span><b>{{codemc}}{{title}} </b>
          <span class="mlr_10" v-if='orgmc!=""'>/</span><b v-if='orgmc!=""'>{{orgmc}} </b>
          </span> 
          
          </div>
          <div class="content">
        <el-row>
             <el-col :span="24" class="ptit ptitr">
               <el-row >
                   <el-col :span="16">
                       <div class="title" v-if='orgmc==""'>{{codemc}}{{title}}</div>
                       <div class="title" v-else>{{orgmc}}</div>
                   </el-col>
                    <el-col :span="8" style="text-align:right">
                          <el-button type="primary" @click="goto(0)">录入</el-button>
                          <el-button type="success" @click="goto('1',orgid)" v-if='orgid!=""'>编辑</el-button>
                          <el-button @click='getDR'>导入</el-button>
                          <el-button  @click="goseach">查询</el-button>
                    </el-col>
               </el-row>
               <el-row :gutter="2" class="ah-50 pdz" >
                           <el-col :sm="24" :md="12" :lg="8" v-for="(t,ind) in Data" :key="ind" v-if="qgshow">
                                    <span class="address"  @click="getListBM(t.orgid,t.mc)">{{t.mc}}</span>
                           </el-col>
                            <el-col :sm="24" :md="12" :lg="4" v-for="(ts,inds) in leveldata" :key="inds" v-if="qtshow">
                             <span class="address"  @click="goxj(ts.dm,ts.mc,jb)">{{ts.mc}}</span>
                           </el-col>
              </el-row>
             </el-col>
        </el-row>
        </div>
         <el-dialog title="导入文件" :visible.sync="drDialogVisible" :close-on-click-modal='false' width="630px">
      <UPLOAD :url="vvurl" :type="11"  :urlErr="vvurlErr"  @drfatherMethod="drfatherMethod" :random="new Date().getTime()"></UPLOAD>
   </el-dialog>
    </div>
</template>
<script>
import UPLOAD from "../../Common/upload"
export default {
    components:{UPLOAD},
    data(){
        return{
          cname:'全国人民代表大会',
          title:'全国人民代表大会',
          Data:[],
          addtype:'1',
          jb:'qg',
          lb:'',
          leveldata:[],
          num:0,
          qgshow:false,
          qtshow:false,
          xzqh:'',
          codemc:'',
          lvl:'',
          orgmc:'',
          orgid:'',
          drDialogVisible:false, 
          vvurl:'/org/import',
          vvurlErr:'',

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
              this.jb=val.query.jb;
              this.qgshow=false;
              this.qtshow=false;
              this.codemc='';
              this.orgmc='';
              this.orgid='';
              this.num=0;
                 switch (this.jb) {
                   case 'qg':
                      this.lvl="0150000001";
                      break;
                  case 'sj':
                       this.lvl="0150000002";
                      break;
                  case 'ds':
                       this.lvl="0150000003";
                      break;
                  case 'xq':
                       this.lvl="0150000004";
                      break;
                  default:
                      break;
              }
              switch (this.addtype) {
                  case '1':
                        this.cname="人大系统";
                        this.lb=this.Global.RD;
                        if(this.jb=='qg'){
                            this.qgshow=true;this.getList('');
                            this.title="全国人民代表大会";
                        }else if(this.jb=='sj'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="人民代表大会";
                            this.codemc="各省";
                        }else if(this.jb=='ds'){
                             this.qtshow=true;this.getLevel('1','');
                             this.title="人民代表大会";
                             this.codemc="各市";
                        }
                        else if(this.jb=='xq'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="人民代表大会";
                            this.codemc="区县";
                        }
                      break;
                   case '2':
                        this.cname="政协系统";
                         this.lb=this.Global.ZX;
                         if(this.jb=='qg'){
                                 this.qgshow=true; this.getList('');
                            this.title="政协全国委员会";
                        }else if(this.jb=='sj'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="地方委员会";
                             this.codemc="省级";
                        }else if(this.jb=='ds'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="地方委员会";
                             this.codemc="市级";
                        }
                        else if(this.jb=='xq'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="地方委员会";
                            this.codemc="区县";
                        }
                      break;
                   case '3':
                        this.cname="统战部系统";
                        this.lb=this.Global.TZB;
                        if(this.jb=='qg'){
                                this.qgshow=true;
                                  this.getList('');
                            this.title="中央统战部";
                        }else if(this.jb=='sj'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="统战部";
                            this.codemc="各省";
                        }else if(this.jb=='ds'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="统战部";
                              this.codemc="各市";
                        }
                        else if(this.jb=='xq'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="统战部";
                            this.codemc="区县";
                        }
                      break;
                 case '4':
                        this.cname="民主党派系统";
                        this.lb=this.Global.MZDP;
                          if(this.jb=='qg'){
                             this.qgshow=true;  this.getList('');
                            this.title="八大民主党派";
                        }else if(this.jb=='sj'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="民主党派";
                            this.codemc="各省";
                        }else if(this.jb=='ds'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="民主党派";
                            this.codemc="各市";
                        }
                        else if(this.jb=='xq'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="民主党派";
                            this.codemc="区县";
                        }
                      break;
                 case '5':
                        this.cname="工商联系统";
                        this.lb=this.Global.GSL;
                          if(this.jb=='qg'){
                                  this.qgshow=true;  this.getList('');
                            this.title="全国工商联";
                        }else if(this.jb=='sj'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="工商联";
                            this.codemc="各省";
                        }else if(this.jb=='ds'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="工商联";
                            this.codemc="各市";
                        }
                        else if(this.jb=='xq'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="工商联";
                            this.codemc="区县";
                        }
                      break;
                   case '6':
                        this.cname="台联系统";
                         this.lb=this.Global.TL;
                          if(this.jb=='qg'){
                                  this.qgshow=true;  this.getList('');
                            this.title="全国台联";
                        }else if(this.jb=='sj'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="台联";
                             this.codemc="各省";
                        }else if(this.jb=='ds'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="台联";
                            this.codemc="各市";
                        }
                        else if(this.jb=='xq'){
                             this.qtshow=true;this.getLevel('1','');
                            this.title="台联";
                            this.codemc="区县";
                        }
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
        getListBM(id,mc){
            this.orgid=id;
            let p={
                'orgId':id,
            };
            this.$api.get(this.Global.aport1+'/org/getSubOrg',p,
            r=>{
                if(r.code==1){
            
                    console.log(r.data);
                    
                    if(r.data && r.data.length>0){
                         
                         this.orgmc=mc;
                         this.Data=r.data;
                    }else{
                        this.goto(1,id);
                    }
                }
            })
        },
         goxj(d,mc,jb){
             console.log('行政区划',d);
             this.xzqh=d;
             this.codemc=mc;
            if(jb=='sj'){
                 this.getList(d);
                 this.qgshow=true;
                 this.qtshow=false;
            }else if(jb=='ds'){
                if(this.num==2){
                   this.getList(d);
                   this.qgshow=true;
                     this.qtshow=false;
                }else{
                    this.qgshow=false;
                    this.qtshow=true;
                    this.getLevel('2',d);
                }
            }else if(jb=='xq'){
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
                this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:'1',jgid:id,title:this.title}});
            }else if(t==0){
                this.$router.push({name:'InstitutionAdd',query:{type:this.addtype,status:'0',title:this.codemc+this.title,jb:this.jb,xzqh:this.xzqh,jgid:id}});
            }
        },
        goseach(){
            this.$router.push({name:'InstitutionList',query:{type:this.addtype}})
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
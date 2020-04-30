<template>
    <div class="suggest">
      
        <el-row>
            <el-col :span="24">
               <span class="yy-input-text trt" v-if='type==1'>代表：</span>
                <span class="yy-input-text trt" v-else title="代表、委员及特约人员">代表、委员及特约人员：</span>
                   <el-select v-model="rowdata.leaderPerson" :disabled="sbnt"
                    @change="getReset(rowdata.leaderPerson)" 
                     filterable clearable default-first-option placeholder="请选择" 
                      size="small" class="yy-input-input" ref="selectdb" >
                                   <el-option
                                   v-for="(item,ind) in namelist"
                                   :key="ind"
                                   :label="item.fullName==null?item.personName:item.fullName"
                                   :value="item.personId">
                      </el-option>
                </el-select>
             </el-col>
             <el-col :span="24" class="mt-10">
              <span class="yy-input-text trt topt">意见建议：</span>
              <el-input placeholder="请输入内容" type="textarea" v-model="rowdata.contents"  :disabled="sbnt" :autosize="{ minRows: 6, maxRows: 6}" size="small" clearable  class="yy-input-input inputw" ></el-input>
              </el-col>
             <el-col :span="24" class="mt-10"  style="text-align: center;">
                      <el-button type="success" size="small" plain @click="getAdd()">加入列表</el-button>
             </el-col>
             <el-col :span='24' class="mt-10 subtable " style="text-align: center;padding:0px 4%;">
                   <el-table
                            ref="multipleTable"
                            :data="yjlistdata">
                            <el-table-column
                                type="index"
                                label="序号" width="50">
                            </el-table-column>
                             <el-table-column
                                prop="contents"
                                label="活动意见建议"
                                :show-overflow-tooltip="true">
                            </el-table-column>
                              <el-table-column
                                  label="操作" width="120">
                                  <template slot-scope="scope">
                                    <div>
                                         <el-button type="text" :disabled="sbnt"  class="a-btn"  title="编辑"  icon="el-icon-edit" @click="edityj(scope.$index)"></el-button>
                                      <el-button type="text" :disabled="sbnt"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="delyj(scope.row)"></el-button>
                                     </div>
                                  </template>
                            </el-table-column>
                           </el-table>
             </el-col>
             <el-col :span='24' class="mt-10">
              <span class="yy-input-text trt topt">总体评价：</span>
              <el-input placeholder="请输入内容" type="textarea" :disabled="sbnt" :autosize="{ minRows: 6, maxRows: 6}" size="small" clearable v-model="spd.overallAssessment"  class="yy-input-input inputw" ></el-input>
              </el-col>
             <el-col :span='24' class="mt-10">
                 <span class="yy-input-text trt topt">备注：</span>
              <el-input placeholder="请输入内容" type="textarea" :disabled="sbnt" :autosize="{ minRows: 3, maxRows: 3}" size="small" clearable v-model="spd.remark"  class="yy-input-input inputw" ></el-input>
              </el-col>
        </el-row>

         <div slot="footer" class="footcancel">
              <el-button type="success"  size="small" @click="submit">保 存</el-button> 
              <el-button  size="small" @click="submit(0)">取 消</el-button>           
        </div> 
    </div>
</template>
<script>

export default {
    name:'SUGGEST',
    props:['url','data','namelist','type','random'],
    data()
    {
        return{
              spd:{},
              leaderPerson:'',
              dbdata:[],
              yjlistdata:[],
              sbnt:false,
              yjdata:[],
              contents:'',
              tempdata:[],
              sort:0,
              pbid:'',
              rowdata:{},
              selected:null,
              init:0
         
          }
    },
    mounted()
    {
        this.yjdata=this.data;
        this.getinit();
    },
    // watch:{
    //   type:function(newVal,oldVal){
       
    //     this.getinit();
    //   },
    //   random:function(newVal,oldVal){
    //     this.yjlistdata=[];
    //     this.spd={};
    //     this.leaderPerson='';
    //     this.contents="";
    //     this.tempdata=[];
    //     this.yjdata=this.data;
    //   },
    // },
    methods:{
        getinit(){
          console.log('namelist',this.namelist);
          
          this.pbid='';
          this.init=0;
        },
        //代表、委员以及特约人员列表
         getLbName(){
           let p={
             'name':''
           };
           this.$api.post(this.Global.aport1+'/baseinfo/personlist',p,
             r =>{
                  
                   this.dbdata=r.data;
            });
        },
        submit(t){
            if(t==0){
                    this.$emit('yjsfatherMethod','99'); 
            }else{
               
               if(this.yjlistdata && this.yjlistdata.length==0){
                   this.$message.error("请输入意见建议");return;
               }

               this.tempdata=[];
                if(this.yjdata && this.yjdata.length>0){
//                     var ff=false;
//                 var index = this.yjdata.findIndex(item =>{
// 　　　　　　　　　  if(item.leaderPerson==this.leaderPerson){
//                           ff=true;
//         　　　　　　　　　　return ff;
//         　　　　　　　　　}
//         　　　　　　})
//                  if(ff){this.yjdata.splice(index,1)}

              
               
                  for (let ii = 0;ii<this.yjdata.length;ii++){
                          let item = this.yjdata[ii];
                          if (item.leaderPerson==this.rowdata.leaderPerson){
                          this.yjdata.splice(ii,1);
                          ii--
                          }
                      } 
                  this.tempdata=this.yjdata;
            
                 
                 }

                  var obj={};
                  obj = this.namelist.find(item =>{
                        return item.personId === this.rowdata.leaderPerson
                    });
                
                  var oobj={};
                  oobj.leaderPerson=this.rowdata.leaderPerson;
                  oobj.leaderPersonName=obj.personName;
                  oobj.overallAssessment=this.spd.overallAssessment;
                  oobj.remark=this.spd.remark;
                  oobj.feedBackStatus='';
                  oobj.feedBackTime='';
                  oobj.yjlistdata=this.yjlistdata;
                  
                  this.tempdata.push(oobj);
                   

                 this.$emit('yjsfatherMethod',this.type,this.tempdata);
            }

        },
       
         getReset(val){
             
            //  列表中的意见建议尚未保存，切换人员会丢失尚未保存的意见建议，请确认是否切换？

            if(this.pbid==''){
                this.pbid=val;
            }
            
        //   if(this.yjdata.length==0){
            
        //     if(this.yjlistdata && this.yjlistdata.length>0){
        //       this.getTS(val);
        //     }
        //   }else{  
               
                var obj={};
                obj = this.yjdata.find(item =>{
                  return item.leaderPerson === val
                });
               
                if(obj!=undefined && obj!=null && this.init==0){
                    this.spd=obj;
                    this.yjlistdata=obj.yjlistdata;
                }else{
                   
                    if(this.yjlistdata && this.yjlistdata.length>0){
                        this.getTS(val,obj);
                    }
               }

               this.init=1;

        //   }

         },
         getTS(val,obj){
             this.$confirm('切换人员会丢失尚未保存的意见建议，请确认是否切换？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                     if(obj!=null && obj!=undefined){
                        this.spd=obj;
                        this.yjlistdata=obj.yjlistdata;
                     }else{
                        this.spd={};
                        this.yjlistdata=[];
                      }
                      this.pbid=val;
                      this.$refs.selectdb.blur();
                }).catch(() => {
                      this.rowdata.leaderPerson=this.pbid;
                      this.$message.info("已取消操作");
                      this.$refs.selectdb.blur();

                 }); 
                
         },
        delyj(n){
             var arr=[];
                arr.push(n);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.yjlistdata.findIndex(item =>{
    　　　　　　　　　  　 if(item.contents==arr[i].contents && item.leaderPerson==arr[i].leaderPerson){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.yjlistdata.splice(index,1)
               }
        },
        getAdd(){
            if(this.rowdata.leaderPerson=='' || this.rowdata.leaderPerson==null || this.rowdata.leaderPerson==undefined){
                this.$message.error('请选择领衔人员');return;
            }
            if(this.rowdata.contents=='' || this.rowdata.contents==null || this.rowdata.contents==undefined){
                this.$message.error('请输入意见建议');return;
            }
            if(this.selected==null){
                    var obj={};
                    obj.leaderPerson=this.rowdata.leaderPerson;
                    obj.contents=this.rowdata.contents;
                    obj.sort=this.yjlistdata.length+1;
                    this.yjlistdata.push(obj);
            }else{
                 this.$set(this.yjlistdata, this.selected, this.rowdata);
            }
              this.selected=null;
              this.rowdata={};
              this.$set(this.rowdata,'leaderPerson',this.pbid)
           
        },
        edityj(index){
            this.selected=index;
            this.rowdata=Object.assign({},this.yjlistdata[index]);
          
        },
    },
}
</script>
<style scoped>
.suggest .yy-input-text{width: 20%;}
.suggest .yy-input-input{width: 70%!important;}

</style>

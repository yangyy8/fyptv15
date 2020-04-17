<template>
    <div class="suggest">
      
        <el-row>
            <el-col :span="24">
               <span class="yy-input-text trt">领衔人员：</span>
                   <el-select v-model="leaderPerson" :disabled="sbnt" @change="getReset(leaderPerson)"  filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                     <el-option
                                   v-for="(item,ind) in namelist"
                                   :key="ind"
                                   :label="item.fullName"
                                   :value="item.personId">
                      </el-option>
                </el-select>
             </el-col>
             <el-col :span="24" class="mt-10">
              <span class="yy-input-text trt topt">意见建议：</span>
              <el-input placeholder="请输入内容" type="textarea" :disabled="sbnt" :autosize="{ minRows: 6, maxRows: 6}" size="small" clearable v-model="contents"  class="yy-input-input inputw" ></el-input>
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
                                  label="操作" width="100">
                                  <template slot-scope="scope">
                                    <div>
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
          }
    },
    mounted()
    {
      
        
        this.getinit();
    },
    watch:{
      type:function(newVal,oldVal){
       
        this.getinit();
      },
      random:function(newVal,oldVal){
        this.yjlistdata=[];
        this.spd={};
        this.leaderPerson='';
        this.contents="";
        this.tempdata=[];
        this.yjdata=this.data;
      },
    },
    methods:{
        getinit(){
         
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


                if(this.yjdata && this.yjdata.length>0){
                    var ff=false;
                var index = this.yjdata.findIndex(item =>{
　　　　　　　　　  if(item.leaderPerson==this.leaderPerson){
                          ff=true;
        　　　　　　　　　　return ff;
        　　　　　　　　　}
        　　　　　　})
                 if(ff){this.yjdata.splice(index,1)}
                 
                //  console.log(this.yjdata,'this.yjdata删除后',index);
                 }

                 this.tempdata=[];

                 if(this.yjdata && this.yjdata.length>0){

                   this.tempdata=this.yjdata;
                  }
                  var obj={};
                  obj = this.namelist.find(item =>{
                        return item.personId === this.leaderPerson
                    });
                  
                  var oobj={};
                  oobj.leaderPerson=this.leaderPerson;
                  oobj.leaderPersonName=obj.fullName;
                  oobj.overallAssessment=this.spd.overallAssessment;
                  oobj.remark=this.spd.remark
                  oobj.yjlistdata=this.yjlistdata;

                  this.tempdata.push(oobj);
                   

                    // console.log(this.tempdata,'tempdata添加后');

                 this.$emit('yjsfatherMethod',this.type,this.tempdata);
            }

        },
       
         getReset(val){
            
             if(this.yjdata.length==0){
                this.spd={};
             }else{
                  var obj={};
                   obj = this.yjdata.find(item =>{
                        return item.leaderPerson === val
                    });
                
                   if(obj==undefined){
                       this.spd={};
                       this.yjlistdata=[];

                   }else{
                        this.spd=obj;
                        this.yjlistdata=obj.yjlistdata;
                    }
                
             }

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
            if(this.leaderPerson=='' || this.leaderPerson==null || this.leaderPerson==undefined){
                this.$message.error('请选择领衔人员');return;
            }
            if(this.contents=='' || this.contents==null || this.contents==undefined){
                this.$message.error('请输入意见建议');return;
            }
            var obj={};
            obj.leaderPerson=this.leaderPerson;
            obj.contents=this.contents;
            this.yjlistdata.push(obj);
            this.contents='';
        }

    },
}
</script>
<style scoped>
.suggest .yy-input-text{width: 15%;}
.suggest .yy-input-input{width: 80%!important;}

</style>

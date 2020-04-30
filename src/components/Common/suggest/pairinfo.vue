<template>
     <div class="subtable" style="height:600px;overflow-y:auto;">
                    <el-row class="ah-40">
                    <el-col :span="12">
                        <span class="yy-input-text trt">法院人员：</span>
                          <el-select v-model="form1.courtInsiderId" :disabled="type=='4'" @change="getYjdxx(form1.courtInsiderId)" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                               <el-option
                                v-for="(item,ind) in pairfydata"
                                :key="ind"
                                :label="item.fullName"
                                :value="item.courtPersonId">
                               </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <span> {{remark}}</span>
                    </el-col>
                    </el-row>
                      <el-row class="ah-40">
                          
                        <el-col :span="12">
                            <span class="yy-input-text trt"> 届别：</span>
                             <el-select v-model="form1.periodType" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.jb"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                                         </el-select>
                         </el-col>
                      </el-row>
                       <el-row class="ah-40">
                         <el-col :span="12">
                            <span class="yy-input-text trt"><font class="red">*</font> 代表姓名：</span>
                            <el-input placeholder="请输入内容" size="small" clearable v-model="form1.jointperson"  class="yy-input-input" ></el-input>
                         </el-col>
                          <el-col :span="12">
                             <el-button type="primary" size="small" @click="getLmName(form1.jointperson,form1.periodType)">检索</el-button>
                          </el-col>
                      </el-row>
                      <el-row class="mt-20">
                           <el-col :span="24">
                              <span style="font-size:15px;font-weight:bold;color:#0077EE">代表信息</span>
                          </el-col>
                          <el-col :span="24">
                              <el-table
                              :data="listdatadb"
                              ref="multipleTable">
                               <el-table-column
                                  type="index"
                                  label="序号" width="80">
                              </el-table-column>
                              <el-table-column
                                  prop="personName"
                                  label="姓名">
                              </el-table-column>
                              
                             <el-table-column
                                prop="groupType"
                                label="团别">
                            </el-table-column>
                            <el-table-column
                                prop="orgName"
                                label="单位">
                            </el-table-column>
                              <el-table-column
                                prop="cardNumber"
                                label="证号">
                            </el-table-column>
                             <el-table-column
                                prop="pairName"
                                label="结对人员">
                            </el-table-column>
                               <el-table-column
                                  label="操作" width="100">
                                  <template slot-scope="scope">
                                    <div>
                                      <el-button type="text"  class="a-btn"  title="添加"  icon="el-icon-plus" @click="getadd(scope.row)"></el-button>
                                      <!-- <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="del(scope.row,0)"></el-button> -->
                                     </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                          </el-col>
                      </el-row>
                       <el-row class="mt-20">
                          <el-col :span="24">
                              <span style="font-size:15px;font-weight:bold;color:#0077EE">已结对信息</span>
                          </el-col>
                          <el-col :span="24">
                              <el-table
                              :data="listpair"
                              ref="multipleTable"
                              @selection-change="form1change">
                              <!-- <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column> -->
                              <el-table-column
                                  type="index"
                                  label="序号" width="80">
                              </el-table-column>
                              <el-table-column
                                  prop="personName"
                                  label="姓名">
                              </el-table-column>

                              <el-table-column
                                prop="groupType"
                                label="团别">
                            </el-table-column>
                            <el-table-column
                                prop="orgName"
                                label="单位">
                            </el-table-column>
                              <el-table-column
                                prop="cardNumber"
                                label="证号">
                            </el-table-column>
                             <el-table-column
                                prop="pairName"
                                label="结对人员">
                            </el-table-column>
                                <el-table-column
                                prop="pairTime"
                                label="结对时间">
                            </el-table-column>
                               <el-table-column
                                  label="操作">
                                  <template slot-scope="scope">
                                    <div>

                                      <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="pairdel(scope.row)"></el-button>
                                     </div>
                                  </template>
                              </el-table-column>
                             </el-table>
                          </el-col>
                      </el-row>
             
                <div slot="footer" class="footcancel">
                <el-button type="primary" size="small"  @click="savelist">保 存</el-button>
                <el-button  size="small" @click="savelist(0)">取 消</el-button>
                </div>

     
     </div>
</template>
<script>
export default {
    name:'PAIR',
    props:['url','data','type','random'],
    data(){
        return{
            form1:{},
            pairfydata:[],
            listdatadb:[],
            listpair:[],
            formmult:[],
            listdatatemp:[],
            pairTime:'',
            remark:'',
           

        }
   },
   mounted()
    {
       this.$store.dispatch("getJb");
       this.getinit();
    },
    // watch:{
    //   data:function(newVal,oldVal){
    //     this.getinit();
    //   },
    // },
   
   methods:{
        getinit(){
           this.listdatadb=[];this.listpair=[];
           this.remark="";this.pairTime=""
            this.getPairFy('','0');
            this.$set(this.form1,'jointperson',this.data.courtOutsiderIdName);
        },
       savelist(t){
         
         if(t==0){
             this.$emit('pairfatherMethod','99'); return;
         }else{
            var array=this.listdatatemp;
            var nname="";
             for (let i = 0; i < array.length; i++) {
                 if(array[i].personId!=this.form1.courtInsiderId && array[i].personId!=null && array[i].pairName!='无')
                 {
                   nname += array[i].personName+',';
                 }
             }
            
             
            nname=nname.substr(0,nname.length-1);
            
            if(nname!='')
            {
              this.$confirm(nname+"代表的原结对人与目前结对人不一致，请确认是否提交！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                
                  this.backsinfo();
                    
                }).catch(() => {
                    
                    this.$message.info('已取消');
                });

            }else{
                this.backsinfo();
            }
         }
       },
       backsinfo(){
          var data={};
          data.courtPersonId=this.form1.courtInsiderId;
          data.courtOutsiderList=this.listpair;
          this.$emit('pairfatherMethod',this.type,data); 
       },
          //法院人员
        getPairFy(name,t){
            let  p={
             'personName':name,
            };
              this.$api.post(this.Global.aport1+'/courtPerson/getPairInfo',p,
             r =>{

                   this.pairfydata=r.data;
                   if(t==0){
                      this.$set(this.form1,'courtInsiderId',this.data.courtOutsiderId);
                        if(this.form1.courtInsiderId!=null && this.form1.courtInsiderId!='')
                        {
                            this.getYjdxx(this.form1.courtInsiderId);
                        }
                   }

            });

        },
          //已结对信息
        getYjdxx(val){
            
           if(val!=''){
            
                 var obj = {};
                     obj = this.pairfydata.find(item =>{
                      
                        return item.courtPersonId === val
                    });
                     this.remark='';
                     if(obj!=undefined && obj!=null && obj!=''){
                     this.remark="详情："+obj.fullName+" , "+obj.sex;
                  
                      if(obj.birthday!=null){
                         this.remark+=" , "+obj.birthday;
                     }
                     if(obj.degree!=null){
                         this.remark+=" , "+obj.degree;
                     }
                      if(obj.partisan!=null){
                         this.remark+=" , "+obj.partisan;
                     }
                      if(obj.address!=null){
                         this.remark+=" , "+obj.address;
                     }
                    }
                    console.log(this.remark,'remark');
                    

            this.listpair=[];
            let  p={
                'courtInsiderId':val,
            };
              this.$api.post(this.Global.aport1+'/PairInfoController/getPairInfo',p,
             r =>{

                  if(r.code==1){
                    this.listpair=r.data;
                  }
            });
            }
        },
         //代表姓名
        getLmName(n,jb){

            this.listdatadb=[];
             if(n==null || n==""){
                 this.$message.error("请输入代表姓名!");return;
               }
            // let  p={
            //  'personName':n,
            //  'personType':this.Global.REPRESENTATIVE,
            // };
            //   this.$api.post(this.Global.aport1+'/baseinfo/personlistbytype',p,
            //  r =>{
            //      if(r.code==1){
                  
                          
            //                this.listdatadb=r.data;
            //       }

            // });

            let  p={
             'personName':n,
             'periodType':jb,
            };
              this.$api.post(this.Global.aport1+'/representative/getPairInfo',p,
             r =>{
                 if(r.code==1){
                  
                           this.listdatadb=r.data;
                  }

            });

        },
        form1change(val){
          this.formmult=val;
        },
        getadd(val){
         this.pairTime="";
         this.$prompt('请输入结对时间', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
          inputErrorMessage: '日期格式不正确，正确格式为：2020-01-01"'
        }).then(({ value }) => {
        
         console.log(val,'00000',value);
         val.pairTime=value;
         this.pairadd(val);
           
        }).catch(() => {
           
         // this.$message.w("取消输入!");return;    
        });
      

        },
        pairadd(val){
       
             this.listpair.push(val);
             this.listdatatemp.push(val);
             const res = new Map();
             var arr=this.listpair;
             this.listpair=arr.filter((arr) => !res.has(arr.pbId) && res.set(arr.pbId, 1));
             const res1 = new Map();
             var arr1=this.listdatatemp;
             this.listdatatemp=arr1.filter((arr1) => !res1.has(arr1.pbId) && res1.set(arr1.pbId, 1));
            
        },
        pairdel(val){
            var arr=[];
                arr.push(val);
                for (let i = 0; i < arr.length; i++) {
                        var index = this.listpair.findIndex(item =>{
    　　　　　　　　　  　 if(item.pbId==arr[i].pbId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.listpair.splice(index,1)

                       var index1 = this.listdatatemp.findIndex(item =>{
    　　　　　　　　　  　 if(item.pbId==arr[i].pbId){
            　　　　　　　　　　　　return true
            　　　　　　　　　　}
            　　　　　　　　})
            　　　　　 this.listdatatemp.splice(index1,1)
                 }
        }
       

   },
}
</script>
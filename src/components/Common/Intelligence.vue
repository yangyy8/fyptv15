<template lang="html">
<div>
    <el-row class="ah-40">
              <el-col :span="12">
               <span class="yy-input-text trt"><font class="red">*</font>姓名：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd.personName"  class="yy-input-input" ></el-input>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">性别：</span>
             <el-select v-model="pd.sex" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                  <el-option
                    v-for="(item,ind) in $store.state.xb"
                    :key="ind"
                    :label="item.mc"
                    :value="item.dm">
                   </el-option>
              </el-select>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt" >籍贯：</span>
                  <el-select v-model="pd.birthPlace" filterable clearable default-first-option placeholder="请选择"  size="small" class="yy-input-input" >
                                            <el-option
                                                v-for="(item,ind) in $store.state.jg"
                                                :key="ind"
                                                :label="item.mc"
                                                :value="item.dm">
                                            </el-option>
                    </el-select>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">出生日期：</span>
                <!-- <el-date-picker 
                                            v-model="pd.birthday" format="yyyy-MM-dd"
                                            type="date" size="small" value-format="yyyy-MM-dd"
                                            placeholder="选择日期" class="yy-input-input" >
                     </el-date-picker> -->
                        <el-select v-model="pd.year"  @change="getZmonth(pd.year);getZday(pd.year,pd.month);" style="width:22%"  filterable clearable default-first-option placeholder="年"  size="small">
                                            <el-option
                                                v-for="(item,ind) in byear"
                                                :key="ind"
                                                :label="item"
                                                :value="item">
                                            </el-option>
                                         </el-select>
                                        <el-select v-model="pd.month"   @change="getZday(pd.year,pd.month);" style="width:18%"  filterable clearable default-first-option placeholder="月"  size="small" :no-data-text="pd.year==''|| pd.year==undefined?'先选择年':'无数据'">
                                            <el-option
                                                v-for="(item,ind) in bmonth"
                                                :key="ind"
                                                :label="item"
                                                :value="item">
                                            </el-option>
                                         </el-select>
                                         <el-select v-model="pd.day"  style="width:20%"  filterable clearable default-first-option placeholder="日"  size="small" :no-data-text="pd.month==''|| pd.month==undefined?'先选择年月':'无数据'">
                                            <el-option
                                                v-for="(item,ind) in bday"
                                                :key="ind"
                                                :label="item"
                                                :value="item">
                                            </el-option>
                                         </el-select>
             </el-col>
              <el-col :span="12">
               <span class="yy-input-text trt">手机号码：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd.mobilePhone"  class="yy-input-input"></el-input>
             </el-col>
           
              <el-col :span="12">
               <span class="yy-input-text trt" >固定电话：</span>
                <el-input placeholder="请输入内容" size="small" clearable v-model="pd.fixedPhone"  class="yy-input-input"></el-input>
             </el-col>
          
               <el-col :span="24" style="text-align:center">
                 <el-button type="success"  size="small" @click="pdsearch(pd)"> 查 询</el-button>
                 </el-col>
             </el-row>
                        <el-table
                              :data="tableData"
                              ref="multipleTable"
                              @row-click="clickRow"
                              @selection-change="handleSelectionChange"
                              >
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                              <el-table-column
                                  type="index"
                                  label="序号">
                              </el-table-column>
                              <el-table-column
                                  prop="personName"
                                  label="姓名">
                              </el-table-column>
                              <el-table-column
                                  prop="sexName"
                                  label="性别">
                              </el-table-column>
                                <el-table-column
                                  prop="birthday"
                                  label="出生日期"
                                  width="120">
                              </el-table-column>
                                <el-table-column
                                  prop="birthPlaceName"
                                  label="籍贯">
                              </el-table-column>
                              <el-table-column
                                  prop="orgName"
                                  label="所属"
                                   width="150">
                              </el-table-column>
                             <el-table-column
                                  prop="periodTypeName"
                                  label="届别">
                              </el-table-column>
                               <el-table-column
                                  prop="cardNumber"
                                  label="证号">
                              </el-table-column>
                              <el-table-column
                                  prop="partisanName"
                                  label="政治面貌"
                                   width="100">
                              </el-table-column>
                              <el-table-column
                                  prop="mobilePhone"
                                  label="手机"
                                  width="100">
                              </el-table-column>
                              <el-table-column
                                  prop="fixedPhone"
                                  label="固定电话"
                                  width="100">
                              </el-table-column>
                             <el-table-column
                                label="图像">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.photoUrl">
                                    <el-popover placement="right" title="" trigger="hover">
                                    <img :src="scope.row.photoUrl"  style="max-width:600px; max-height:600px;"/>
                                    <img slot="reference" :src="scope.row.photoUrl"   width="50" height="50">
                                    </el-popover>
                                    </div>
                                </template>
                                </el-table-column>
                  </el-table>
           <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; padding-top:10px;">
              <el-button type="success"  size="small" @click="submit">提 交</el-button> 
              <el-button  size="small" @click="submit(0)">取 消</el-button>           
        </div> 
          </div> 
</template>
<script>
import {formatDate,birthdayDay,birthdayMonth,birthdayYear} from '@/assets/js/date.js'
export default {
    name:'RGZN',
    props:['data','type','random'],
    data(){
        return{
           tableData:[],
           pd:{},
           id:'',
           multipleSelection:[],
            byear:birthdayYear(),
            bmonth:[],
            bday:[],
        }
    },

    mounted(){
        this.$store.dispatch("getXb");
        this.$store.dispatch("getJg");
        this.getinit();
    },
    watch:{
      random:function(newVal,oldVal){
        // this.getinit();
      },
    },
    methods:{
    pdchange(){},
        getinit(){
            console.log(this.data);
            if(this.data.year!=undefined && this.data.year!=null ){
                this.getZmonth(this.data.year);
                if(this.data.month!=undefined && this.data.month!=null){
                    this.getZday(this.data.year,this.data.month);
                }else{
                    this.$set(this.pd,'day','')
                }
            }
            this.pdsearch(this.data)
        },
       clickRow(row){
        this.$refs.multipleTable.toggleRowSelection(row)
        //  this.id=row.id;
        //  this.$emit('ZNfatherMethod',row,this.type); 
        },
        handleSelectionChange(val){
           this.multipleSelection = val;
        },
       pdsearch(pp){
        //this.$set(this.pd,'personName',pp.personName)
        this.pd= Object.assign({}, pp);//浅拷贝,用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
        if(this.pd.personName==undefined || this.pd.personName=="")
            {
            this.$message.error("姓名不能为空！");return;
            }   
        this.$api.post(this.Global.aport2+'/PersonIdentifyInfoController/queryPerson',pp,
                r =>{
                    if(r.code==1){
                        this.tableData=r.data;
                    }
           });
       },
       submit(t){
           if(t!=0){
                if(this.multipleSelection.length==0){
                    this.$message.error("请选择一条数据！");return;
                }else if(this.multipleSelection.length>1){
                    this.$message.error("只能选择一条数据！");return;
                }
                this.$emit('ZNfatherMethod',this.multipleSelection[0],this.type); 
           }else{
               this.$emit('ZNfatherMethod','99',this.type); 
           }
       },
      getZmonth(y){
       
          
                if(y!='' && y!=null && y!=undefined){
                     this.bmonth=birthdayMonth();
                }else{
                    this.bmonth=[];this.bday=[];
                    this.$set(this.pd,'month','');
                    this.$set(this.pd,'day','');
                }
            },
     getZday(y,m){
       
                if(y!='' && y!=null && y!=undefined
                   && m!='' && m!=null && m!=undefined){
                       this.bday=birthdayDay(y,m);
                }else{
                    this.bday=[];
                    this.$set(this.pd,'day','');
                }
            },
    },
}
</script>


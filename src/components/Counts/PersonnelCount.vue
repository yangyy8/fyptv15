<template>
      <div class="pairadd tjtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>{{name}}</b></span> </div>
         <div class="content">
            <div style="text-align:center;font-size:25px;line-height:60px;">{{name}}</div>
            <div style="text-align:right;font-size:14px;line-height:40px;">截止时间：2020-2-2</div>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="性别">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="籍贯">
                        
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="党派">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="民族">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="职业类别">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="职业">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="学历">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="证件号码">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="团界别">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="是否连任">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="连任界数">
                    </el-table-column>
                </el-table>
            </div>
     </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            name:'人大代表信息统计',
            addtype:'1',
        }
    },
    mounted(){
        this.getinit(this.$route);
    },
      watch:{
          $route:function(val){
         
             this.getinit(val);
          }
       },
    methods:{
        getinit(val){
           this.addtype=val.query.type;
           switch (this.addtype) {
                 case '1':
                   this.name="人大代表信息统计";
                   break;
                 case '2':
                   this.name="政协委员信息统计";
                   break;
                 case '3':
                   this.name="特约人员信息统计";
                   break;
               default:
                   break;
           }   
        },
    },
}
</script>
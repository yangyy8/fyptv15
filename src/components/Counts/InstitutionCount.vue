<template>
      <div class="pairadd tjtable">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 统计信息 <span class="mlr_10">/</span>  <b>联络机构信息</b></span> </div>
         <div class="content">
    <div style="text-align:center;font-size:25px;line-height:60px;">机构情况</div>
    <div style="text-align:right;font-size:14px;line-height:40px;">截止时间：2020-2-2</div>
         <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="部门">
            </el-table-column>
             <el-table-column
                prop="date"
                label="项目">
            </el-table-column>
            <el-table-column
                prop="date"
                label="交办总数">
            </el-table-column>
            <el-table-column
                prop="date"
                label="未结总数">
            </el-table-column>
             <el-table-column
                prop="date"
                label="办结率">
            </el-table-column>
            <el-table-column  label="到期情况">
                  <el-table-column
                        prop="name"
                        label="交办"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="办结"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="办结率"
                        width="120">
                    </el-table-column>
            </el-table-column>
            <el-table-column  label="未到期情况">
                  <el-table-column
                        prop="name"
                        label="交办"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="办结"
                        width="120">
                    </el-table-column>
            </el-table-column>
            <el-table-column
                prop="date"
                label="结果一致数量">
            </el-table-column>
             <el-table-column
                prop="date"
                label="沟通数量">
            </el-table-column>
             <el-table-column
                prop="date"
                label="进展性答复">
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
        }
    }
}
</script>
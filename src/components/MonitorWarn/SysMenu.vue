<template>
    <div class="pairadd">
         <div class="homebread"><i class="iconfont el-icon-yy-mianbaoxie" style="color:#3872A2"></i><span> 监控和预警
              <span class="mlr_10">/</span>  <b>快捷菜单设定</b></span> </div>
         <div class="content" style="height:500px;overflow-y:scroll">
        <el-row>
            <el-col :span="6" style="text-align:right"> 快捷菜单选择：</el-col>
            <el-col :span="10">
              
                        <el-tree
                            :data="menudata"
                            show-checkbox
                            node-key="value"
                            :default-checked-keys="defaultChecked"
                            ref="tree"
                            highlight-current
                            :props="defaultProps">
                        </el-tree>
            </el-col>
            <el-col :span="8"  class="diabnt">
              <el-button type="primary"  size="small" @click="addsave()">保 存</el-button>
            <br/>  <el-button @click="getMenu()"  size="small">重 置</el-button>
            </el-col>
        </el-row>
        </div>
    </div>
</template>
<script>
export default {
       data(){
        return{
            defaultChecked:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            menudata:[],
        }
    },
      mounted(){
          this.getMenu();
      },
    methods:{
       getMenu(){
             this.$api.post(this.Global.aport1+'/menu/menuList', null,
                r => {
                if(r.code==1){
                    this.menudata=r.data;
                    var arr = r.data;
                    console.log(arr);
                    this.menurr = [];
                    this.uniteChildSame(arr);
                    this.defaultChecked = this.menurr;
                }
             });
       },
        uniteChildSame(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].check == true || arr[i].children != null) {
                this.selectChildSame(arr[i].children,arr[i].check,arr[i].value);
            }
        }
      },
      selectChildSame(arr,check,value){
         if(arr!=null){
                    for (var i = 0; i < arr.length; i++) {
                            if(arr[i].children!=null){
                                this.selectChildSame(arr[i].children);
                            }else {
                            if(arr[i].check){
                            
                            this.menurr.push(arr[i].value);
                        } 
                            }
                    }
            }else{
                if(check==true){
                   
                       this.menurr.push(value);
                } 
            }
       
        },

        addsave(){
            var ridsb = this.$refs.tree.getCheckedNodes();
          
            var srr=[];
            
            for (let i = 0; i < ridsb.length; i++) {
                srr.push(ridsb[i].value);
                
            }
              
              let p={
                  'menuList':srr
              }
             this.$api.post(this.Global.aport1+'/menu/saveShortcutMenu', p,
                r => {
                     if(r.code==1){
                          this.$message({
                              "type":"success",
                              "message":r.message
                          });
                        this.getMenu();

                     }else{
                         this.$message.error(r.message);
                     }
                });
        },
       }
}

</script>
<style scoped>
   .diabnt{
     line-height: 40px;vertical-align: middle
   }
</style>

<template lang="html">
<div>
     <el-row type="flex" class="mb-6">
     <el-col :span="24" class="txtl">
          <el-upload
            ref="upload"
             action=''
            :file-list="fileList"
             multiple
            :on-success="upSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadFile"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <br/>
            <div style="line-height:40px;font-weight:400;font-size:12px;">文件大小不超过20M，支持{{this.Global.docformat}}。</div>
          </el-upload>
        </el-col>
      </el-row>
        <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; padding-top:10px;">
             <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        </div> 
     </div> 
</template>
<script>

export default {
    name:'UPLOAD',
    props:['url','type','urlErr','periodType','random'],
    data(){
        return{
        actions:this.Global.uploads+this.url,
        fileList:[],
        uploadIconData:{token:this.$store.state.token,SBTYPE:this.type},
        fileData:null,
        result:0,
        }
    },

    mounted(){
       console.log(this.type,this.actions);
    },
    watch:{
      random:function(newVal,oldVal){
        if (this.$refs.upload) {
            this.$refs.upload.clearFiles();
        }
      },
    },
    methods:{
     upSuccess(r) {
            // if (r.success) {
            //     this.$message({
            //       message: r.data,
            //       type: 'success'
            //     });
            //    this.$emit('fatherMethod');

            //   } else {
            //     // this.$message.error(r.message);
            //     //this.downloadM(r.data,'错误信息')
            //   }
            
            },
            uploadFile(file) {
              this.fileData.append('file', file.file);
            },
            downloadM (data,name) {
              console.log(data);
                if (!data) {
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data],{type:"application/xls"}))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', name+'.xls')
                document.body.appendChild(link)
                link.click()
           },
            beforeAvatarUpload(file) {
                  
               
            },
           
            submitUpload() {
           
              if (this.$refs.upload.uploadFiles.length == 0) {
                this.$message({
                  message: '请先选择文件！',
                  type: 'warning'
                });
                return
              }
                
                var array=this.$refs.upload.uploadFiles;
                  for (let n = 0; n < array.length; n++) {
                      this.result=0;
                      var arr=array[n].name.split('.');
                      var type=arr[arr.length-1].toLowerCase();
                      var srr=this.Global.docformat.split(',');
                      for (let i = 0; i < srr.length; i++) {
                        console.log(type,srr[i]);
                            if(type==srr[i]){
                               this.result=1;
                            }
                       }
                    if(this.result==0){
                        this.$message.error('只能上传'+this.Global.docformat+"格式的文件");return;
                    }
                    
                  }
              
              this.fileData = new FormData();
              this.$refs.upload.submit();
              // this.fileData.append('file',this.fileList)
             this.fileData.append('token',this.$store.state.token);
             this.fileData.append('filetype',this.type);
             
             this.fileData.append("personRelFileType",this.type);
              if(this.periodType!=null){
              this.fileData.append("periodType",this.periodType);
              }
               this.$api.post(this.actions, this.fileData,
                  r => {
                    if(r.code==1){
                    if(this.type.length==10){
                    
                          if(r.code==1){
                          this.$message({
                            message: '上传成功',
                            type: 'success'
                          });
                          
                          this.$emit('fatherMethod',r.data,this.type); 
                        }else{
                          this.$message.error(r.message);
                        }
                    }else{
                          if(r.data.success=='success'){
                          this.$message({
                            message: '上传成功',
                            type: 'success'
                          });
                          
                          this.$emit('fatherMethod',r.data.relFileList,this.type); 
                        }else{
                          this.$message.error(r.message);
                        }
                    }
                    }else{
                      this.$message.error(r.message);
                    }
                  })
            },
    },
}
</script>


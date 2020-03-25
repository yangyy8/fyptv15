<template>
    <div class="album albumvideo">
            <div style="color:red;font-size:18px; font-weight:bold;">无现场影像，请提供活动方案/活动报告/领导批示的图片。</div>
   
    <div class="upload">
        
        <div class="pic_img">
         <el-upload
                class="avatar-uploader"
                :action="actions"
                :show-file-list="false"
                :data="{token:this.$store.state.token}"
                :headers="myHeaders"
                multiple
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <span class="type_title">图片资料：</span>
                <el-button size="small" type="primary" style="width:180px;">选择图片</el-button>
                </el-upload>
               <div v-for="(item,ind) in imglist" :key="ind" class="videospan">
               <img v-if="item.filepath" :src="item.filepath" class="avatar" width="180" height="150">
              </div>
        </div>
       
    </div>
     <p class="Upload_pictures">
           <span>建议上传640x400，大小不超过2M图片，支持{{imgmat}}</span>
        </p>
   
    <div class="upload">
        <!-- <p class="type_title">
           视频资料
        </p> -->
        <div class="pic_img">
                 <el-upload 
                    :action="actions"
                    :data="{token:this.$store.state.token}"
                    :on-progress="uploadVideoProcess"
                    :on-success="handleVideoSuccess"
                    :headers="myHeaders"
                     multiple
                    :before-upload="beforeUploadVideo"
                    :show-file-list="false">
                    <span class="type_title">视频资料：</span>
                    <el-button size="small" type="primary" style="width:180px;">选择视频</el-button>
                 </el-upload>
                <div class="videospan" v-if="videoForm.showVideoPath !='' && !videoFlag" >
                               <el-progress v-if="videoFlag == true"
                                type="circle"
                                :percentage="videoUploadPercent"
                                style="margin-top:7px;"></el-progress>
                    <video v-for="(item,ind) in videolist" :key="ind"
                           :src="item.filepath" width="180" height="150"
                           class="avatar video-avatar" 
                           controls="controls">
                           您的浏览器不支持视频播放
                    </video>
                </div>
        </div>
    </div>
    <p class="Upload_pictures">
        <span>建议上传不超过200M视频，支持mp4,avi</span>
    </p>
      <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; padding-top:10px;">
              <el-button type="success"  size="small" @click="submit">上 传</el-button>           
        </div> 
</div>
</template>
<script>

export default {
    name:'VIDEO',
    props:['url','type','urlErr','random'],
    data(){
        return{
            actions:this.Global.uploads+this.url,
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },
            videolist:[],
            imglist:[],
            list:[],
            result:0,
            error:0,
            myHeaders:{Authorization: this.$store.state.token},
            imgmat:this.$store.state.imgformat,
        }
  },
 
    watch:{
      random:function(newVal,oldVal){
      this.videolist=[];
      this.imglist=[];
      this.list=[];
      this.result=0;
      
      },
    },
     methods: {
     //上传前回调
            beforeUploadVideo(file) {
                var fileSize = file.size / 1024 / 1024 < 200;
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    this.$message.error("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    this.$message.error("视频大小不能超过200MB");
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //进度条
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //上传成功回调
            handleVideoSuccess(res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                
                //前台上传地址
                // if (file.status == 'success' ) {
                //    this.videoForm.showVideoPath = file.url;
                // } else {
                //     this.$message.error("上传失败，请重新上传");
                // }

                //后台上传地址
                if (res.code == 1) {
                   
                   this.videoForm.showVideoPath = res.data.relFileList[0].filepath;
                   this.videolist.push(res.data.relFileList[0]);
                } else {
                    this.$message.error(res.message);
                }
            },
        
        //图片系列
        beforeAvatarUpload(file){
            this.result=0;
            var name=file.name.split('.');
            var type=name[name.length-1].toLowerCase();
            var srr=this.imgmat.split(',');
             for (let i = 0; i < srr.length; i++) {
                    if(type==srr[i]){
                      this.result=1;
                    }
             }

           if(this.result==0){
                this.$message.error('只能上传'+this.imgmat+"格式的文件");return;
           }
          
        },
        handleAvatarSuccess(res, file){
         if (file.size > 2 * 1024 * 1024) {
                   this.error=1;
                   this.$message.error(file.name+" 不能超过2M");
                   return;  //必须返回false
         }
            
        if(this.result!=0){
            this.imglist.push(res.data.relFileList[0]);
          }
        },

        //保存
        submit(){

             this.list = this.imglist.concat(this.videolist);
             if(this.list.length==0){
                 this.$message.error("至少上传一张，若无现场影像，请提供活动方案/活动报告/领导批示的图片。");
             }else{
                  console.log(this.list);
                   this.$emit('DfatherMethod',this.list,this.type); return;
             }
        
             
        },
          
   }
       
}
</script>
<style scoped>
.upload{margin:0;overflow: hidden; width: 100%;clear: both;}
.type_title{
    font-size: 20px; font-weight: bold;
}
.pic_img{margin-top: 20px;}
.videospan{margin-top: 10px;float: left;}
.avatar{margin-right: 15px;}
</style>
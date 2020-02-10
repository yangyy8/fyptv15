<template lang="html">
       <div class="form-group">
         <div style="color:red;font-size:18px; font-weight:bold;">无现场影像，请提供活动方案\活动报告\领导批示的图片。</div>
      <div class="control-form">
        <!-- <p class="help-block">建议图片格式为：JPEG/PNG/GIF，视频格式为mp4</p> -->
        <div class="upload-imgs">
          <div v-if="imgLen >=num ? false : true">
            <input type="file" id="upfile" class="upload" @change="addImg" ref="inputer" multiple accept=""/>
            <button onclick="document.getElementById('upfile').click()" class="bnt">选择图片/视频</button>
         
            <!-- <button   @click="submit" class="bnts">上传图片/视频到服务器</button>  -->
          </div>
        
        </div>
        <ul class="upload-imgs">
            <li v-for='(item,ind) in images'>
                <p class="img">
     
            <video :src="getObjectURL(item.file)"  width="120" height="120" @click="getvideo" v-if="item.filetype=='mp4'"></video>
             
             <el-popover placement="right" title="" trigger="click" v-else>
              <img :src="getObjectURL(item.file)"  style="max-width:700px; max-height:700px;"/>
               <img :src="getObjectURL(item.file)" slot="reference" width="120" height="120" :alt="getObjectURL(item.file)">
            </el-popover>

            <a class="close" @click="delImg(item)"> <i class="el-icon-close"></i></a>
            <el-checkbox class="check"></el-checkbox>
            
            </p>
            <el-button size="mini" @click="upTr(ind)" >上移</el-button>
            <el-button size="mini"  @click="downTr(ind)"  class="bntx">下移</el-button>
           
          </li>
        </ul>
        <div>
           <!-- <video-player  class="video-player vjs-custom-skin"
            ref="videoPlayer" 
            :playsinline="true" 
            :options="playerOptions"
          ></video-player> -->
        </div>
         
      </div>
      <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; padding-top:10px;">
             <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传</el-button>
        </div>
    </div>
</template>
<style  scoped>
.upload-imgs{margin: 10px 0 10px 0;overflow: hidden;}
.upload-imgs .bntx{margin-left: 5px;}
.upload-imgs .bnt{background: #409EFF;height: 32px; border: none; border-radius:3px; padding: 0px 15px; font-size: 14px;color: #ffffff;cursor: pointer;}
.upload-imgs .bnt:hover{background: #6AB5FF;border: none}
.upload-imgs .bnts{background: #67C23A;height: 32px;margin-left: 20px; padding: 0px 15px;  border: none; border-radius:3px; font-size: 14px;color: #ffffff;cursor: pointer;}
.upload-imgs .bnts:hover{background: #86D062;border: none}
.upload-imgs .upload{display: none;}
.upload-imgs li{position: relative;display: inline-block; margin-right: 25px;margin-top: 10px;text-align: center;vertical-align: middle;}
.upload-imgs .img{position: relative;cursor: pointer;}
.upload-imgs .img img{vertical-align: middle;border: 1px solid #eeeeee}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;right: -5px;top: -10px;line-height: 1;font-size: 18px; font-weight:bold;color: red;cursor: pointer;}
.upload-imgs li .img  .check{display: block;position: absolute;right: -5px;top: 95px;line-height: 1;font-size: 30px;cursor: pointer;}
</style>

<script>

export default {
    name:'UPLOAD',
    props:['url','type','urlErr','random'],
    data(){
        return{
        
        pd:{},
        formData:new FormData(),
        imgs: {},
        images:[],
        imgLen:0,
        num:10,
        ischeck:false,
        actions:this.Global.uploads+this.url,
        playerOptions : {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
              src: "https://ksv-video-publish.cdn.bcebos.com/005e619bd109264c584bea1e9e737d7e059a09f9.mp4?auth_key=1576145955-0-0-fe6ffb57594d598b44c7c9617970713f" //url地址
            }],
            poster: "../../static/images/test.jpg", //你的封面地址
            // width: document.documentElement.clientWidth, //播放器宽度
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            }
        }
        }
    },

    mounted(){
        
    },
    watch:{
      random:function(newVal,oldVal){
      this.imgs={};
      this.images=[];
        if (this.$refs.upload) {
            this.$refs.upload.clearFiles();
        }
      },
    },
    methods:{
       addImg(event){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        let oldLen=this.imgLen;
        let len=this.fil.length+oldLen;
        if(len>this.num){
          alert('最多可上传10张，您还可以上传'+(this.num-oldLen)+'张');
          return false;
        }
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
          this.imgLen++;
       
          this.imgs={};
         // this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
          this.imgs.name=this.fil[i].name+'?'+new Date().getTime();
          this.imgs.file=this.fil[i];
          this.imgs.filetype=this.fil[i].name.split('.')[this.fil[i].name.split('.').length-1];
        
          this.images.push(this.imgs);
        }

       this.images=this.unique(this.images);
       console.log(this.images);
         
      },
      getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      delImg(key){
  
        this.del(key);
        this.imgLen--;
      },
       del(n){
       
          var arr=[];
          arr.push(n);
           for (let i = 0; i < arr.length; i++) {
            var index = this.images.findIndex(item =>{
　　　　　　　if(item.name==arr[i].name){
        　　　return true
        　　}
        　　})
  
         
        　 this.images.splice(index,1)
          }
        },
      submit(){
          console.log(this.images);
      
        var array=this.images;
        this.formData = new FormData();
        for (let i = 0; i < array.length; i++) {
          let name=array[i].name.split('?')[0];
          console.log('name',name,array[i].file);
          
           this.formData.append('file',array[i].file);
         
        }
        
        this.formData.append('select',this.selectname);
        this.formData.append('token',this.$store.state.token);
        this.formData.append('personType',this.type);
        this.formData.append('personId',this.personId);
        this.$api.post(this.actions, this.formData,
                  r => {
                    if(this.type.length==10){
                         if(r.code==1){
                          this.$message({
                            message: '上传成功',
                            type: 'success'
                          });
                          
                          this.$emit('DfatherMethod',r.data.relFileList,this.type); 
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
                  })
      },
     

      //去重
      unique(arr) {
           const res = new Map();
           return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1))
      },


      upTr(index) { // 上移
      if (index === 0) {
         this.$message.error("到头了"); return;
      }
      this.swapItems(this.images, index, index - 1);
      },
      downTr(index) { // 下移
      if (index === this.images.length - 1) {
       this.$message.error("到底了");  return;
      }
       this.swapItems(this.images, index, index + 1);
      },
        swapItems(arr, index1, index2) 
        {
          arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
        },
        getvideo(){
        this.playerOptions.sources.src="11.mp4";
        },
    
    },
}
</script>


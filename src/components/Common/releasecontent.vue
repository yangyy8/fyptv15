<template>
    <div class="openmain">
      <div v-if='isyl'>
        <el-row>
             <el-col :span="24" class="input-item">
               <span class="yy-input-text" style="width:180px;">影像资料展示模式：</span>
               <div class="yy-input-input tlt">
                <el-radio v-model="showMode" label="0237000099">不展示</el-radio>
                <el-radio v-model="showMode" label="0237000001">头部展示</el-radio>
                <el-radio v-model="showMode" label="0237000002">底部展示</el-radio>
                <el-radio v-model="showMode" label="0237000003" >内容中展示</el-radio>
                </div>
             </el-col>
            
            <el-col :span="24" v-if='showMode=="0237000003"'  style="max-height:160px; overflow-y: auto">
             
                 <div v-for="(fit,ind) in fits" :key="ind">
                            <div class="block" style="float:left;margin-right:20px;margin-top:10px" v-if='getImgV(fit.fileSuffix)'>
                                
                            <el-popover placement="right" title="" trigger="click">
                              <img :src="fit.filePath"  style="max-width:700px; max-height:700px;"/>
                              <img :src="fit.filePath" slot="reference" width="80" height="80">
                            </el-popover><br>
                                <el-button size="mini" 
                                v-clipboard:copy="fit.filePath" 
                                v-clipboard:success="copy" 
                                v-clipboard:error="onError">
                                复制</el-button>
                            </div>
                              <div class="block" style="float:left;margin-right:20px;margin-top:10px" v-else>
                               <el-popover placement="right" title="" trigger="click">
                               <video  
                                    :src="fit.filePath" width="550" height="500"
                                    class="avatar video-avatar" 
                                    controls="controls" >
                                    您的浏览器不支持视频播放
                               </video>
                                <video  
                                    :src="fit.filePath" width="80" height="80"
                                    class="avatar video-avatar" 
                                    controls="controls" slot="reference">
                                    您的浏览器不支持视频播放
                               </video>
                              </el-popover><br>
                                      <el-button size="mini"
                                      v-clipboard:copy="getsp(fit.filePath)" 
                                      v-clipboard:success="copy" 
                                      v-clipboard:error="onError">复制</el-button>
                            </div>
                          
                        </div>
            </el-col>
             <el-col :span="24" class="tlt">
                 <span style="font-size:16px;">公开内容</span>
                 </el-col>
             <el-col :span="24">
               
                <div id="editorElem" style="text-align:left; margin-bottom:10px; "></div>
             </el-col>
             <!-- <el-col :span="24">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 8}"
                    placeholder=""
                    v-model="publicContents" :disabled="showMode=='0237000099'">
                    </el-input>
             </el-col> -->
          
        </el-row>
         <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; margin-top:10px; padding-top:10px;">
              <el-button type="success"  size="small" @click="submit">保 存</el-button>
              <el-button type="success"  size="small" @click="list" v-if='showMode!="0237000099"'>预览</el-button> 
              <el-button  size="small" @click="submit(0)">取 消</el-button>           
        </div> 
    </div>
     <div v-else>
              <el-tabs type="card">
                    <el-tab-pane label="掌上联络室">
                        <div class="phone">
                            <div class="phonecont">
                              <div class="top">联络活动</div> 
                              <div style="height:500px;overflow-y: auto;">
                              <div class="article" v-if='showMode=="0237000002"'>
                                  <div v-html="editorContent"  style="margin:10px 20px"></div>
                              </div>
                             
                        <el-row  class="imgs" v-if='showMode=="0237000001" || showMode=="0237000002"'>
                       <el-col :span="24" v-if="fits && fits.length>0" style="text-align:center">
                     
                        <div v-for="(fit,ind) in fits" :key="ind">
                            <div class="block" style="margin-right:20px;margin-top:20px;" v-if='getImgV(fit.fileSuffix)'>
                                
                            <el-popover placement="right" title="" trigger="click">
                              <img :src="fit.filePath"  style="max-width:700px; max-height:700px;"/>
                              <img :src="fit.filePath" slot="reference" width="180" height="150">
                            </el-popover><br>
                                <!-- <el-button size="mini">复制</el-button> -->
                            </div>
                              <div class="block" style="margin-right:20px;margin-top:20px" v-else>
                               <el-popover placement="right" title="" trigger="click">
                               <video  
                                    :src="fit.filePath" width="550" height="500"
                                    class="avatar video-avatar" 
                                    controls="controls" >
                                    您的浏览器不支持视频播放
                               </video>
                                <video  
                                    :src="fit.filePath" width="180" height="150"
                                    class="avatar video-avatar" 
                                    controls="controls" slot="reference" >
                                    您的浏览器不支持视频播放
                               </video>
                              </el-popover><br>
                                      <!-- <el-button size="mini">复制</el-button> -->
                            </div>
                          
                        </div>
             </el-col>
                                </el-row>
                               
                                 <div class="article"  v-if='showMode=="0237000001" || showMode=="0237000003"'>
                                  <div v-html="editorContent"  style="margin:10px 20px"></div>
                              </div>
                           </div>
                             </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="外网平台">
                          <div class="phonecontw">
                               <div style="height:500px;overflow-y: auto;">
                               <div class="article" v-if='showMode=="0237000002"'>
                                  <div v-html="editorContent"  style="margin:10px 20px"></div>
                              </div>
                             
                                <el-row  class="imgs" v-if='showMode=="0237000001" || showMode=="0237000002"'>
                                  <el-col :span="24" v-if="fits && fits.length>0">
                     
                        <div v-for="(fit,ind) in fits" :key="ind">
                            <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-if='getImgV(fit.fileSuffix)'>
                                
                            <el-popover placement="right" title="" trigger="click">
                              <img :src="fit.filePath"  style="max-width:700px; max-height:700px;"/>
                              <img :src="fit.filePath" slot="reference" width="180" height="150">
                            </el-popover><br>
                                <!-- <el-button size="mini">复制</el-button> -->
                            </div>
                              <div class="block" style="float:left;margin-right:20px;margin-top:20px" v-else>
                               <el-popover placement="right" title="" trigger="click">
                               <video  
                                    :src="fit.filePath" width="550" height="500"
                                    class="avatar video-avatar" 
                                    controls="controls" >
                                    您的浏览器不支持视频播放
                               </video>
                                <video  
                                    :src="fit.filePath" width="180" height="150"
                                    class="avatar video-avatar" 
                                    controls="controls" slot="reference" >
                                    您的浏览器不支持视频播放
                               </video>
                              </el-popover><br>
                                      <!-- <el-button size="mini">复制</el-button> -->
                            </div>
                          
                        </div>
             </el-col>
                                </el-row>
                                <div class="article" v-if='showMode=="0237000001" || showMode=="0237000003"'>
                                     <div v-html="editorContent"  style="margin:10px 20px"></div>
                                </div>
                             </div>
                              </div>
                    </el-tab-pane>
                    </el-tabs>
                
             <div slot="footer" class="dialog-footer">
              <el-button  size="small" @click="canlce">取 消</el-button>
            </div>
     </div>

    </div>
</template>
<script>

import E from 'wangeditor'

export default {
    name:'editor',
    props:['url','data','type','random'],
    data()
    {
        return{
              showMode:'',
              editorContent: '',
              content:'',
              txtcontent:'',
              isyl:true,
              fits:[],
              height:'350px',
              
          }
    },
    mounted(){
        this.getinit();
       
       
    },
    watch:{
      random:function(newVal,oldVal){
          this.showMode="";
          this.content="";
          this.editorContent="";
          this.getinit();
      },
    },

    methods:{
        copy(e) {
         this.$message.success("已复制到剪贴板！");
        },
        onError(e) {
         this.$message.error("复制不起作用啦！");
        },
        getinit()
        { 
            this.isyl=true;
           
             if(this.data.length==1){
         
               this.fits=this.data[0].imageList;
          
               
             }
              let p={
                  'contentPublicId':this.data[0].contentPublicId,
                  'contentPublicType':this.data[0].contentPublicType,
              };
              this.$api.post(this.Global.aport2+'/contentPublic/getImageData',p,
                   r =>{
                    if(r.code==1){
                        this.fits=r.data;
                    }
                    
             });
             this.getList();
                  
                  
         },
          getList(t){
                var editor = new E('#editorElem')
                    editor.customConfig.onchange = (html) => {
                    this.editorContent = html
                    }
                    editor.create();
                 if(t==1){
                       editor.txt.html(this.editorContent);
                 }else{
                    if(this.data.length==1){
                        editor.txt.html(this.data[0].contents);
                        this.editorContent=this.data[0].contents;
                     }else{
                        editor.txt.html("");
                    }
                }
          },
         
        submit(t){
            
            if(t!=0){
                    if(this.showMode==''){
                        this.$message.error("影像资料展示模式不能为空！");return;
                    }
                    if(this.showMode!='0237000099' && this.editorContent==''){
                         this.$message.error("公开内容不能为空！");return;
                    }

                    let p={
                        'contentPublicList':this.data,
                        'showMode':this.showMode,
                        'publicContents':this.editorContent,
                        'pushStatus':'0136000002',
                        'isPush':'0135000001',
                    }

                 this.$api.post(this.Global.aport2+this.url,p,
                   r =>{
                    if(r.code==1){
                        
                         this.$message.success(r.message);
                        this.$emit('FBfatherMethod','99',this.type); return;
                    }else{
                        this.$message.error(r.message);
                    }
             });

            }else{
                this.$emit('FBfatherMethod','99',this.type); 
             }
        },
        list(){
            if(this.showMode==''){
               this.$message.error("影像资料展示模式不能为空！");return;
             }
        
            this.isyl=false;
        },
        canlce(){
            this.isyl=true;
            setTimeout(()=>{
                this.getList(1);
            },100)
          
            
        },
         getImgV(n){
           if(n=='' || n==null){return;}
           var array=this.$store.state.imgformat.split(',');
          for (let i = 0; i < array.length; i++) {
               if(n.toLowerCase()==array[i])
               {
                   return true;
               }
              
          }
          return false;
        },
        getsp(val){
            return '<iframe src='+val+'></iframe>';
        }
     
    },
}
</script>
<style scoped>
.openmain{text-align: center; line-height: 50px;}
.openmain .title{font-size: 18px; color: #333333;}
.openmain .phone{width: 422px; height: 762px; background: url('../../assets/img/phone.png') no-repeat;margin: auto;}
.openmain .phonecont{text-align: left;padding: 95px 28px 100px 28px;}
.openmain .phonecont .top{background: #eeeeee;line-height: 50px; font-size: 16px; padding-left: 10px;}
.openmain  .imgs{text-align: center;margin: 5px 10px;}
.openmain  .article{ line-height: 25px; padding: 10px 0px;}
.openmain .block{line-height: 30px; text-align: center;}
.openmain .phonecontw{text-align: left;}
</style>
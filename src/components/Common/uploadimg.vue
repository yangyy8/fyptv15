<template lang="html">
       <div class="form-group">
      <div class="control-form">
         
        <ul class="upload-imgs">
            <li v-for='(item,ind) in images'>
             <p class="img" v-if="item.personIdentityRelFileId==null">
              <el-popover placement="right" title="" trigger="click">
                <img :src="getObjectURL(item.file)"  style="max-width:700px; max-height:700px;"/>
            
              <img :src="getObjectURL(item.file)" slot="reference" width="120" height="120" :alt="getObjectURL(item.file)">
              </el-popover>
              <a class="close" @click="delImg(item)"> <i class="el-icon-close"></i></a>
              <el-checkbox class="check" v-model="check[ind]" @change="getC(check[ind],item.name,ind)"></el-checkbox>
            </p>
              <p class="img" v-else>
               <el-popover placement="right" title="" trigger="click">
                <img :src="item.serverPath"  style="max-width:700px; max-height:700px;"/>
            
               <img :src="item.serverPath" slot="reference" width="120" height="120">
              </el-popover>
              <a class="close" @click="delImgs(item)"> <i class="el-icon-close"></i></a>
              <el-checkbox class="check" v-model="check[ind]" @change="getC(check[ind],item.fileName,ind)"></el-checkbox>
              </p>
            <!-- <el-button size="mini" @click="upTr(ind)" >上移</el-button>
            <el-button size="mini"  @click="downTr(ind)"  class="bntx">下移</el-button> -->
          </li>
          <li>
            <div v-if="imgLen >=num ? false : true">
              <input type="file" id="upfile" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/jpg"/>
              <button onclick="document.getElementById('upfile').click()" class="bnt">
                <i class="el-icon-plus" style="font-size:30px;"></i>
                </button> 
            </div>
          </li>
        </ul>
          <p class="help-block">建议图片格式为：{{imgmat}}，大小不超过5M，最多可上传10张</p>
      </div>
       <div slot="footer" style="text-align:center;border-top:1px solid #cccccc; padding-top:10px;">
              <el-button type="success"  size="small" @click="submit">上 传</el-button>
           
        </div> 
    </div>
</template>
<style  scoped>
.upload-imgs{margin: 0px 0 10px 0;overflow: hidden;}
.upload-imgs .bntx{margin-left: 5px;}
/* .upload-imgs .bnt{background: #409EFF;height: 32px; border: none;width: 100px; border-radius:3px; font-size: 14px;color: #ffffff;cursor: pointer;} */
.upload-imgs .bnt{height:120px;width:120px;text-align:center; border:1px dashed #cccccc;background: #ffffff;border-radius:3px; }
.upload-imgs .bnt:hover{border:1px dashed #409EFF; cursor:pointer}
.upload-imgs .bnts{background: #67C23A;height: 32px;margin-left: 20px; border: none;width: 150px; border-radius:3px; font-size: 14px;color: #ffffff;cursor: pointer;}
.upload-imgs .bnts:hover{background: #86D062;border: none}
.upload-imgs .upload{display: none;}
.upload-imgs li{position: relative;display: inline-block; margin-right: 25px;margin-top: 10px;text-align: center;vertical-align: middle;}
.upload-imgs .img{position: relative;cursor: pointer;}
.upload-imgs .img img{vertical-align: middle;border: 1px solid #eeeeee}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;right: -5px;top: -10px;line-height: 1;font-size: 18px; font-weight:bold;color: red;cursor: pointer;}
.upload-imgs li .img  .check{display: block;position: absolute;right: 0px;top: 95px;line-height: 1;font-size: 30px;cursor: pointer;}
</style>

<script>

export default {
    name:'UPLOAD',
    props:['url','type','personId','random'],
    data(){
        return{
        check:[],
        checks:[],
        pd:{},
        imgs: {},
        images:[],
        imgLen:0,
        num:10,
        ischeck:false,
        selectname:'',
        formData:null,
        snum:0,
        imgmat:this.$store.state.imgformat,
        actions:this.Global.uploads+this.url,
       
        }
    },

    mounted(){
        this.getinit(this.$route);
    },
    watch:{
      random:function(newVal,oldVal){
      this.imgs={};
      this.images=[];
      this.check=[];
        // if (this.$refs.upload) {
        //     this.$refs.upload.clearFiles();
        // }
            this.getinit(newVal);
      },
    },
    methods:{
      getinit(val){
         
           var formdata=new FormData();
           formdata.append("personId",this.personId);
           formdata.append("token",this.$store.state.token);
           formdata.append("personType",this.type);
           this.$api.post(this.Global.aport1+"/baseinfo/getPhotos", formdata,
                  r => {
                         if(r.code==1){
                              this.images=r.data;
                              var arr=this.images;
                              this.snum=arr.length;
                               for (let i = 0; i < arr.length; i++) {
                                 if(arr[i].isDefault=='0167000001'){
                                    
                                    this.check[i]=true;
                                 }
                                }
                              // this.checks[0]=true;
                         }
                  })
      },
      getC(m,n,i){

         for (let i = 0; i < this.images.length; i++) {
           this.check[i]=false;
          //  this.checks[i]=false;
         }
        
          if(m){
              // if(this.selectname!=""){
              
               this.check[i]=true;
              //  this.$message.error("只能选择一个默认显示的头像");return;
              //  }else{
                this.selectname=n.split('?')[0];
                
              //  }
          }else{
          
            this.selectname="";
            
          }
      
      },
       addImg(event){
  
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
         
        
             var result=0;
             var array=this.fil[0].name.split('.');
             
             var type=array[array.length-1].toLowerCase();
            
             
             var srr=this.imgmat.split(',');
             for (let i = 0; i < srr.length; i++) {
                    if(type==srr[i]){
                      result=1;
                    }
             }
          
           if(result==0){
                this.$message.error('只能上传'+this.imgmat+"格式的文件");return;
           }

        let oldLen=this.imgLen;
        let len=this.fil.length+oldLen;
        if(len>this.num){
          alert('最多可上传10张，您还可以上传'+(this.num-oldLen)+'张');
          return false;
        }
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            //alert('请选择5M以内的图片！');
            this.$message.error('请选择5M以内的图片！');
            return false
          }
          this.imgLen++;
          this.imgs={};
         // this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
          this.imgs.name=this.fil[i].name+'?'+new Date().getTime();
          this.imgs.file=this.fil[i];
          this.images.push(this.imgs);
        }

      // this.images=this.unique(this.images);
           this.$refs.inputer.value = null;
         
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
              console.log(arr[i].name);
    　　　　　　　if(item.name==arr[i].name && arr[i].name!=undefined){
            　　　return true
            　 　}
                if(item.personIdentityRelFileId==arr[i].personIdentityRelFileId && arr[i].personIdentityRelFileId!=null){
            　　　return true
            　 　}
        　　})
       
        
        　 this.images.splice(index,1)
          }
        },
        delImgs(val){
      
           let p={
             'fileId':val.personIdentityRelFileId
           };
           this.$api.post(this.Global.aport1+"/baseinfo/delPhoto",p,
                  r => {
                    if(r.code==1){
                        this.$message({
                            message: r.message,
                            type: 'success'
                        });
                        this.del(val);
                      }else{
                        this.$message.error(r.message);
                      }
            })
        },
      submit(){
       
        var array=this.images;
        if(this.selectname=="" && this.snum==array.length){
         for (let i = 0; i < array.length; i++) {
     
            let isDefault=array[i].isDefault;
            if(isDefault=="0167000001" && this.check[i]){
              this.$emit('fatherMethod','99',this.type); return;
            }
         }
          this.$message.error("请选择一张图片为默认头像!");return;
          
        }else{
        this.formData = new FormData();
        var smecl=0;
        
        
        for (let i = 0; i < array.length; i++) {
          
           if(this.selectname=="" && array[i].isDefault=="0167000001" && this.check[i]){
            
             this.selectname=array[i].fileName;
           }
           if(array[i].name!=undefined){
            
           smecl=1;
           let name=array[i].name.split('?')[0];
        
            this.formData.append('file',array[i].file);
            
           }
        }
       


        if(smecl==0){
          this.actions=this.Global.uploads+"/baseinfo/changeDefault";
        }
        
        this.formData.append('select',this.selectname);
        this.formData.append('token',this.$store.state.token);
        this.formData.append('personType',this.type);
        this.formData.append('personId',this.personId);
     
        this.$api.post(this.actions, this.formData,
                  r => {
                   
                         if(r.code==1){
                          this.$message({
                            message: r.message,
                            type: 'success'
                          });
                        
                          this.$emit('fatherMethod',r.data==null?'99':r.data,this.type); 
                        }else{
                          this.$message.error(r.message);
                        }
                  
                  })
          }
     
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
    
    },
}
</script>


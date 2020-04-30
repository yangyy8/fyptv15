<template>
    <div class="messages">
       <div class="context">
         <div class="main">
          <img src="../assets/img/img_1.png" width="200" height="150"><br>
             2.28号系统暂停使用，请联系管理员
          </div>  
        </div> 
    </div>
</template>
<script>
export default {
    data(){
        return{
          dtdata:[],//多条
          lsdata:[],//临时
          xsdata:[],//显示
          arr:[
              {
                contents: "11111",
                overallAssessment: "11",
                participantsInfoId: "d3b0ceb462564afc8d7ff7b0029cf857",
                participantsInfoName: "张星(第十三届-全国代表-河北)",
                remark: "11",
                sort: 1,
              },
             {
                contents: "3333",
                overallAssessment: "33",
                participantsInfoId: "028a4629386311ea9e3700155dbaef87",
                participantsInfoName: "王凤英(第十三届-全国代表-河北)",
                remark: "333",
                sort: 1,
              },
              {
                contents: "2222",
                overallAssessment: "11",
                participantsInfoId: "d3b0ceb462564afc8d7ff7b0029cf857",
                participantsInfoName: "张星(第十三届-全国代表-河北)",
                remark: "11",
                sort: 2,
              },
               {
                contents: "44444",
                overallAssessment: "33",
                participantsInfoId: "028a4629386311ea9e3700155dbaef87",
                participantsInfoName: "王凤英(第十三届-全国代表-河北)",
                remark: "333",
                sort: 2,
              }
          ]
        }
    },
    mounted(){
     // this.getinit();
    },
    methods:{
        getinit(){
            for (let m = 0; m < this.arr.length; m++) {
                let obj_1={
                    contents:this.arr[m].contents,
                    overallAssessment:this.arr[m].overallAssessment,
                    participantsInfoId:this.arr[m].participantsInfoId,
                    participantsInfoName:this.arr[m].participantsInfoName,
                    remark:this.arr[m].remark,
                    sort:this.arr[m].sort
                }
                this.dtdata.push(obj_1);
            }
            const res = new Map();
            var srr= this.dtdata;
            this.xsdata=srr.filter((srr) => !res.has(srr.participantsInfoId) && res.set(srr.participantsInfoId, 1))
       
            for (let h = 0; h < this.xsdata.length; h++) {
                   let obj_2={
                    overallAssessment:this.xsdata[h].overallAssessment,
                    participantsInfoId:this.xsdata[h].participantsInfoId,
                    participantsInfoName:this.xsdata[h].participantsInfoName,
                    remark:this.xsdata[h].remark,
                    sort:this.xsdata[h].sort
                  }
                  var srr=this.dtdata.filter(item =>{return item.participantsInfoId==this.xsdata[h].participantsInfoId});
              
            
                  var arrdata=[];                  
                  for (let n = 0; n < srr.length; n++) {
                    
                     arrdata.push(srr[n].contents);
                  }
               
              obj_2.yjlistdata=arrdata;
              this.lsdata.push(obj_2);
                
            }

            console.log('多条数据',this.dtdata);
            console.log('临时数据',this.lsdata);
            console.log('显示数据',this.xsdata);
            
        },
    },
}
</script>
<style scoped>
.messages{margin: 0;padding: 0}
.messages .context{background-color:#ffffff;
	height:45%;width:50%;min-width: 500px;min-height: 250px;
	position:fixed;
	top:0;right:0;bottom:0;left:0;
    margin:auto; border-radius: 10px;}
.messages .main{margin-top:5%;font-size: 25px; color: red}
</style>
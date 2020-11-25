<template>
  <div style="margin-top: 70px;width: 80%;margin-left: 10%">
    <el-card class="rundata"    onclick="">
      <div slot="header" class="clearfix">
        <span>拉伸设备</span>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >梁号：</span>
            </div>
            <div class="item_desr">
              <span > {{deviceData.lianghao}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >设计应力：</span>
            </div>
            <div class="item_desr">
              <span > {{deviceData.yingli}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag">
              <span>设计伸长量：</span>
            </div>
            <div class="item_desr">
<span>{{deviceData.shenchang}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >1#应力：</span>
            </div>
            <div class="item_desr">
              <span >{{deviceData.yingli1}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >2#应力：</span>
            </div>
            <div class="item_desr">
              <span >{{deviceData.yingli2}} </span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >3#应力：</span>
            </div>
            <div class="item_desr">
              <span >{{deviceData.yingli3}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >4#应力：</span>
            </div>
            <div class="item_desr">
              <span > {{deviceData.yingli4}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >1#伸长量：</span>
            </div>
            <div class="item_desr">
              <span >{{deviceData.shenchang1}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >2#伸长量：</span>
            </div>
            <div class="item_desr">
              <span > {{deviceData.shenchang2}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >3#伸长量：</span>
            </div>
            <div class="item_desr">
              <span >{{deviceData.shenchang3}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text item">
            <div class="item_tag" >
              <span >4#伸长量：</span>
            </div>
            <div class="item_desr">
              <span >{{deviceData.shenchang4}} </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import mqtt from 'mqtt'
  import { getDeviceType} from "@/api/devicetype";
  import { SdcSoftClient } from '@tomcat008/sdcsoftclient'
  import { DeviceAdapter,SdcSoftDevice2 } from '@tomcat008/devicelib'

  export default {

    data() {
      return  {
        deviceData:
          {shenchang:null,
            shenchang1:null,
            shenchang2:null,
            shenchang3:null,
            shenchang4:null,
            yingli:null,
            yingli1:null,
            yingli2:null,
            yingli3:null,
            yingli4:null,
            lianghao:null,
           },
      }
    },
    created() {
      this.$root.title= "中铁五局集团有限公司天庄高速TZZB2标预制梁场钢绞线拉伸信息监控"
        let client = new SdcSoftClient(mqtt,"wss://skt.sdcsoft.cn", "8084", 'sdcsoft.com.cn', '80201288@qq.com', 'TZGS-'+this.guid())

//添加客户端错误事件响应
        client.OnError = function (err) {
          console.log(err)
        }
//添加连接成功的事件响应操作
        client.OnConnect = function (pt) {
          console.log('haha 服务器连接成功！')
        }
//添加掉线事件响应
        client.OnOffine = function (connect) {
          console.log('连接断开')
          //重新连接
          connect.Connect()
        }
//添加手动断线事件响应
        client.OnClose = function (connect) {
          console.log('关闭连接')
          //重新连接
          connect.Connect()
        }
        client.Connect()
        getDeviceType({
          type:2
        })
          .then(response => {
            let deviceType=response.data.data
            console.log(deviceType[0].deviceNo)
            client.addMessageListener(deviceType[0].deviceNo,(deviceno, msg) => {
              //监听到0200000100设备的数据
              let adapter = new DeviceAdapter()
              let addr = JSON.parse(deviceType[0].pointIndexMap)
              let map=JSON.parse(deviceType[0].deviceDataMap)
              adapter.Init(map, addr)
              adapter.handlerData(new Uint8Array(msg))
              //获取device对象
              let device = adapter.Device
              if(device){
                if(device.jb.length>0){
                  for (var i in device.jb) {
                      if(device.jb[i].name=="1#伸长量"){
                        this.deviceData.shenchang1=device.jb[i].vstr
                      }
                    if(device.jb[i].name=="2#伸长量"){
                      this.deviceData.shenchang2=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="3#伸长量"){
                      this.deviceData.shenchang3=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="4#伸长量"){
                      this.deviceData.shenchang4=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="1#应力"){
                      this.deviceData.yingli1=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="2#应力"){
                      this.deviceData.yingli2=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="3#应力"){
                      this.deviceData.yingli3=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="4#应力"){
                      this.deviceData.yingli4=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="总设计应力"){
                      this.deviceData.yingli=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="设计伸长量"){
                      this.deviceData.shenchang=device.jb[i].vstr
                    }
                    if(device.jb[i].name=="梁号"){
                      this.deviceData.lianghao=device.jb[i].vstr.trim()

                    }
                  }

                }

              }

            }).then((msg) => {
              console.log('0100100204'+'监听成功！')
            })
          })
    },

    methods: {
      guid() {
        function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      },
    }
  }
</script>
<style scoped>
  .item {
    margin-bottom: 10px;
  }
  .item_tag{
    float:left;
    text-align:left;
  }
  .item_desr{
    margin-left: 40%;
    min-height: 30px;
    text-align:left;
  }
  .text {
    width: 100%;
    font-size: 12px;
    font-family: "Microsoft YaHei";
    color: #909399;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

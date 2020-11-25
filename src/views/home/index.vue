<template>
  <div>
    <div><el-row   class="menus" type="flex" >
      <el-col :span="12" v-for = "(item,index) in deviceData" :key="index" class="menu" >
        <el-card class="rundata"    onclick="">
          <div slot="header" class="clearfix">
            <el-row style="height: 30px;">
              <el-col :span="8">   <span style="font-size: 20px">{{item.no}}#蒸养{{item.fashouzi}}</span></el-col>
              <el-col :span="8">  <span style="font-size: 20px">湿度：{{item.humidity}}</span></el-col>
              <el-col :span="8"><img v-if="item.diancifa=='闭合'" style="width: 30px;height: 30px;float: right" src="/static/common/zhengqi.gif"></el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <div class="item_tag">
                  <span>阀温度高报警设定：</span>
                </div>
                <div class="item_desr">
              <span>
                 {{item.fawendugao}}
              </span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <div class="item_tag">
                  <span>阀关闭温度设定：</span>
                </div>
                <div class="item_desr">
                  {{item.faguanbi}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <div class="item_tag" >
                  <span >管道温度：</span>
                </div>
                <div class="item_desr">
                  <span > {{item.guandao}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <div class="item_tag">
                  <span>阀打开温度设定：</span>
                </div>
                <div class="item_desr">
                  {{item.fadakai}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="text item">
                <div class="item_tag" >
                  <span >阀温度低报警设定：</span>
                </div>
                <div class="item_desr">
                  <span > {{item.fawendudi}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="text item">
                <div class="item_tag" >
                  <span >电磁阀反馈：</span>
                </div>
                <div class="item_desr">
                  <span > {{item.diancifa}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row style="height: 30px;margin-bottom: 10px" >
            <el-col  v-if="item.chuanganqi!=null" :span="8">
              <div class="text item">
                <div class="item_tag" >
                  <span style="color: red;font-size: 15px" >管道温度传感器故障</span>
                </div>
                <div class="item_desr">
                  <span > </span>
                </div>
              </div>
            </el-col>
            <el-col v-if="item.wendugaobao!=null" :span="8">
              <div class="text item">
                <div class="item_tag" >
                  <span style="color: red;font-size: 15px" >管道温度高报警</span>
                </div>
                <div class="item_desr">
                  <span > </span>
                </div>
              </div>
            </el-col>
            <el-col v-if="item.wendudibao!=null" :span="8">
              <div class="text item">
                <div class="item_tag" >
                  <span style="color: red;font-size: 15px" >管道温度低报警</span>
                </div>
                <div class="item_desr">
                  <span > </span>
                </div>
              </div>
            </el-col>
          </el-row>
          <div style="border-bottom: solid 1px #ebeef5;padding-bottom: 20px">
            <el-button  size="mini" type="primary" @click="buttonChangeParam(index)">手动</el-button>
            <el-button  size="mini" type="primary" @click="buttonChangeParam1(index)">自动</el-button>
            <el-button  size="mini"  type="primary" @click="buttonChangeParam2(index)">启动</el-button>
            <el-button  size="mini" type="primary" @click="buttonChangeParam3(index)">停止</el-button>
            <el-button size="mini" style=" " type="primary" icon="el-icon-star-off" @click.native="showCtl(index)">蒸养参数设置</el-button>
          </div>
          <div style="margin-top: 20px">
            <div>
              <img v-if="item.states==1" style="width: 30px;height: 30px;float: right" src="/static/common/spray.gif">
         </div>
            <el-row style="margin-bottom: 20px;height: 30px">
              <el-col :span="12">
                <div >
                    <span v-if="item.select=='选中'" style="font-size: 20px;color: #13ce66">喷淋</span>
                  <span v-if="item.select=='未选中'" style="font-size: 20px;color: #ce360a">喷淋</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="text item">
                  <div class="item_tag" >
                    <span >喷淋工作间隔设置：</span>
                  </div>
                  <div class="item_desr">
                    <span > {{item.intervaltime}}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="text item">
                  <div class="item_tag">
                    <span>喷淋工作时间设置：</span>
                  </div>
                  <div class="item_desr">
                    {{item.worktime}}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-button v-if="item.select=='未选中'" size="mini" type="primary" @click="buttonChangeParam4(index)">选中</el-button>
            <el-button v-if="item.select=='选中'" size="mini" type="primary" @click="buttonChangeParam5(index)">取消选中</el-button>
            <el-button size="mini" style=" " type="primary" icon="el-icon-star-off" @click.native="penlinshowCtl(index)">喷淋参数设置</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row></div>
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible" :append-to-body="true">
      <div  v-if="ctlType==0">
        <div v-for="(item,key) in this.paramSetting" :key="key" >
            <div v-for="(kz,k) in item.ctls" :key="k">
              <el-form  >
                <el-row >
                  <el-col >
                    <el-form-item v-if="kz.name.split('#')[1]!='阀启动/停止'&&kz.name.split('#')[1]!='阀手动/自动'"  :label="kz.name" style="width: 50%; "><label v-if="kz.unit!=null&&kz.unit!=''" style="font-size: 13px;color: #A9A9A9;">单位：{{kz.unit}}</label>
                      <el-input v-model="kz.v" @change="((val)=>{newFrameChangeParam(key,k,val)})" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
      </div>
      <div  v-if="ctlType==1">
        <div v-for="(item,key) in this.paramSetting1" :key="key" >
          <div v-for="(kz,k) in item.ctls" :key="k">
            <el-form  >
              <el-row >
                <el-col >
                  <el-form-item v-if="kz.name.split('#')[1]!='选择'"  :label="kz.name" style="width: 50%; "><label v-if="kz.unit!=null&&kz.unit!=''" style="font-size: 13px;color: #A9A9A9;">单位：{{kz.unit}}</label>
                    <el-input v-model="kz.v" @change="((val)=>{newFrameChangeParam1(key,k,val)})" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="ctlType==1" style="margin-left: 5px" type="primary" @click="sendCommand1">统一设置</el-button>
        <el-button v-if="ctlType==1" style="margin-left: 5px" type="primary" @click="sendCommand">单基座设置</el-button>
        <el-button v-if="ctlType==0" type="primary" @click="sendCommand">设置</el-button>
        <el-button v-if="ctlType==1" type="warning" icon="el-icon-back" @click="back">取消</el-button>
        <el-button v-if="ctlType==0" type="warning" icon="el-icon-back" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import mqtt from 'mqtt'
  import { getDeviceType,getHumidity} from "@/api/devicetype";
  import { SdcSoftClient } from '@tomcat008/sdcsoftclient'
  import { DeviceAdapter,SdcSoftDevice2 } from '@tomcat008/devicelib'

  let webRequest = axios.create({
    baseURL: "https://apis.sdcsoft.com.cn",
    timeout: 8000,
  });
export default {
  name: "home",
  data() {
    return {
      device:null,
      deviceSuffix1:null,
      deviceSuffix2:null,
      deviceSuffix3:null,
      controllerNo:null,
      ctl:false,
      tongyikey:null,
      shouziKey1:null,
      shouziKey2:null,
      qitingKey1:null,
      qitingKey2:null,
      shouzivalue:null,
      qitingvalue:null,
      selectKey:null,
      selectkey1:null,
      runState:null,
      dialogFormVisible: false,
      ctlType: null,
      titleName: "参数设置",
      paramSettings1:[],
      paramSettings2:[],
      paramSettings3:[],
      paramSetting:[],
      paramSetting1:[],
      deviceData:[
        {no:"1-1",title:1,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"1-2",title:2,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"1-3",title:3,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"1-4",title:4,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"1-5",title:5,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"2-1",title:6,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"2-2",title:7,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"2-3",title:8,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"2-4",title:9,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"2-5",title:10,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"3-1",title:11,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"3-2",title:12,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"3-3",title:13,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"3-4",title:14,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"3-5",title:15,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"4-1",title:16,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"4-2",title:17,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"4-3",title:18,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"4-4",title:19,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"4-5",title:20,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"5-1",title:21,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"5-2",title:22,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"5-3",title:23,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"5-4",title:24,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"5-5",title:25,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"6-1",title:26,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"6-2",title:27,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"6-3",title:28,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"6-4",title:29,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},
        {no:"6-5",title:30,humidity:null,guandao:null,fawendugao:null,faguanbi:null,fadakai:null,fawendudi:null,fashouzi:null,faqiting:null,diancifa:null,wendugaobao:null,wendudibao:null,chuanganqi:null,select:null,states:null,worktime:null, intervaltime:null},

      ]
    };
  },
  created(){
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
      type:0
    })
      .then(response => {

        let deviceType=response.data.data
        this.deviceSuffix1=deviceType[0].deviceNo
        this.deviceSuffix2=deviceType[1].deviceNo
        client.addMessageListener(deviceType[0].deviceNo, (deviceno, msg) => {
          //监听到0200000100设备的数据

          this.paramSettings1=[]
          let adapter = new DeviceAdapter()
          let addr = JSON.parse(deviceType[0].pointIndexMap)
          let map=JSON.parse(deviceType[0].deviceDataMap)
          adapter.Init(map, addr)
          adapter.handlerData(new Uint8Array(msg))
          //获取device对象
          let device = adapter.Device
          console.log(device)
          if(device){
            if(device.bj.length>0){
              for (var i in device.bj) {
                let index=device.bj[i].name.split("#")[0]-1
                if(device.bj[i].name.split("#")[1]=="管道温度高报警"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.bj[i].name.split("#")[0]){
                      this.deviceData[j].wendugaobao=device.bj[i].vstr
                    }
                  }
                }
                if(device.bj[i].name.split("#")[1]=="管道温度低报警"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.bj[i].name.split("#")[0]){

                      this.deviceData[j].wendudibao=device.bj[i].vstr
                    }
                  }
                }
                if(device.bj[i].name.split("#")[1]=="管道温度传感器故障"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.bj[i].name.split("#")[0]){
                      this.deviceData[j].chuanganqi=device.bj[i].vstr
                    }
                  }
                }
              }

            }
            if(device.wd.length>0){
              for (var i in device.wd) {
                let index=device.wd[i].name.split("#")[0]-1
                for(var j in this.deviceData){

                  if(this.deviceData[j].no==device.wd[i].name.split("#")[0]){
                    this.deviceData[j].guandao=device.wd[i].vstr

                  }
                }
              }
            }
            if(device.kg.length>0){

              for (var i in device.kg) {
                let index=device.kg[i].name.split("#")[0]-1
                for(var j in this.deviceData){
                  if(this.deviceData[j].no==device.kg[i].name.split("#")[0]){
                    this.deviceData[j].diancifa=device.kg[i].vstr
                  }
                }
              }
            }
            if(device.sb.length>0){
              for (var i in device.sb) {
                let index=device.sb[i].name.split("#")[0]-1
                if(device.sb[i].name.split("#")[1]=="阀手动/自动"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sb[i].name.split("#")[0]){
                      this.deviceData[j].fashouzi=device.sb[i].vstr
                    }
                  }
                }
                if(device.sb[i].name.split("#")[1]=="阀启动/停止"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sb[i].name.split("#")[0]){
                      this.deviceData[j].faqiting=device.sb[i].vstr
                    }
                  }
                }
              }
            }
            if(device.sz.length>0){
              for (var i in device.sz) {
                let index=device.sz[i].name.split("#")[0]-1
                if(device.sz[i].name.split("#")[1]=="阀温度高报警设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].fawendugao=device.sz[i].vstr
                    }
                  }
                }
                if(device.sz[i].name.split("#")[1]=="阀关闭温度设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].faguanbi=device.sz[i].vstr
                    }
                  }
                }
                if(device.sz[i].name.split("#")[1]=="阀打开温度设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].fadakai=device.sz[i].vstr
                    }
                  }
                }
                if(device.sz[i].name.split("#")[1]=="阀温度低报警设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].fawendudi=device.sz[i].vstr
                    }
                  }
                }
              }
            }

            let clist=device.KongZhi.map
            if (JSON.stringify(clist) != '{}' ) {
              this.ctl=true
              this.paramSettings1=clist
            }
          }

        }).then((msg) => {
          console.log('0100100202'+'监听成功！')
        })
        client.addMessageListener(deviceType[1].deviceNo, (deviceno, msg) => {
          //监听到0200000100设备的数据
          this.paramSettings2=[]
          let adapter = new DeviceAdapter()

          let addr = JSON.parse(deviceType[1].pointIndexMap)
          let map=JSON.parse(deviceType[1].deviceDataMap)
          adapter.Init(map, addr)
          adapter.handlerData(new Uint8Array(msg))
          //获取device对象
          let device = adapter.Device
          if(device){
            if(device.bj.length>0){
              for (var i in device.bj) {
                let index=device.bj[i].name.split("#")[0]-1
                if(device.bj[i].name.split("#")[1]=="管道温度高报警"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.bj[i].name.split("#")[0]){
                      this.deviceData[j].wendugaobao=device.bj[i].vstr
                    }
                  }
                }
                if(device.bj[i].name.split("#")[1]=="管道温度低报警"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.bj[i].name.split("#")[0]){

                      this.deviceData[j].wendudibao=device.bj[i].vstr
                    }
                  }
                }
                if(device.bj[i].name.split("#")[1]=="管道温度传感器故障"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.bj[i].name.split("#")[0]){
                      this.deviceData[j].chuanganqi=device.bj[i].vstr
                    }
                  }
                }
              }

            }
            if(device.wd.length>0){

              for (var i in device.wd) {
                let index=device.wd[i].name.split("#")[0]-1
                for(var j in this.deviceData){

                  if(this.deviceData[j].no==device.wd[i].name.split("#")[0]){
                    this.deviceData[j].guandao=device.wd[i].vstr

                  }
                }
              }
            }
            if(device.kg.length>0){

              for (var i in device.kg) {
                let index=device.kg[i].name.split("#")[0]-1
                for(var j in this.deviceData){
                  if(this.deviceData[j].no==device.kg[i].name.split("#")[0]){
                    this.deviceData[j].diancifa=device.kg[i].vstr
                  }
                }
              }
            }
            if(device.sb.length>0){
              for (var i in device.sb) {
                let index=device.sb[i].name.split("#")[0]-1
                if(device.sb[i].name.split("#")[1]=="阀手动/自动"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sb[i].name.split("#")[0]){
                      this.deviceData[j].fashouzi=device.sb[i].vstr
                    }
                  }
                }
                if(device.sb[i].name.split("#")[1]=="阀启动/停止"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sb[i].name.split("#")[0]){
                      this.deviceData[j].faqiting=device.sb[i].vstr
                    }
                  }
                }
              }
            }
            if(device.sz.length>0){
              for (var i in device.sz) {
                let index=device.sz[i].name.split("#")[0]-1
                if(device.sz[i].name.split("#")[1]=="阀温度高报警设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].fawendugao=device.sz[i].vstr
                    }
                  }
                }
                if(device.sz[i].name.split("#")[1]=="阀关闭温度设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].faguanbi=device.sz[i].vstr
                    }
                  }
                }
                if(device.sz[i].name.split("#")[1]=="阀打开温度设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].fadakai=device.sz[i].vstr
                    }
                  }
                }
                if(device.sz[i].name.split("#")[1]=="阀温度低报警设定"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.sz[i].name.split("#")[0]){
                      this.deviceData[j].fawendudi=device.sz[i].vstr
                    }
                  }
                }
              }
            }
            let clist=device.KongZhi.map
            if (JSON.stringify(clist) != '{}' ) {
              this.ctl=true
              this.paramSettings2=clist
            }
          }

        }).then((msg) => {
          console.log('0100100202'+'监听成功！')
        })
      })
//添加对0200000100设备数据的监听
    //添加对0100100202设备数据的监听
    getDeviceType({
      type:1
    })
      .then(response => {
        let deviceType=response.data.data
        this.deviceSuffix3=deviceType[0].deviceNo
        client.addMessageListener( deviceType[0].deviceNo, (deviceno, msg) => {
          //监听到0200000100设备的数据
          let adapter = new DeviceAdapter()
          let addr = JSON.parse(deviceType[0].pointIndexMap)
          let map=JSON.parse(deviceType[0].deviceDataMap)
          adapter.Init(map, addr)
          adapter.handlerData(new Uint8Array(msg))
          //获取device对象
          let device = adapter.Device
          if(device){
            if(device.wd.length>0){
              for (var i in device.wd) {
                for(var j in this.deviceData){
                  if(this.deviceData[j].no==device.wd[i].name.split("#")[0]){
                    this.deviceData[j].intervaltime=device.wd[i].vstr
                  }
                }
              }
            }
            if(device.kg.length>0){
              for (var i in device.kg) {
                if(device.kg[i].name.split("#")[1]=="工作状态"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.kg[i].name.split("#")[0]){
                      this.deviceData[j].states=device.kg[i].v
                    }
                  }
                }
                if(device.kg[i].name.split("#")[1]=="选择"){
                  for(var j in this.deviceData){
                    if(this.deviceData[j].no==device.kg[i].name.split("#")[0]){
                      this.deviceData[j].select=device.kg[i].vstr
                    }
                  }
                }
              }
            }
            if(device.ll.length>0){
              for (var i in device.ll) {
                for(var j in this.deviceData){
                  if(this.deviceData[j].no==device.ll[i].name.split("#")[0]){
                    this.deviceData[j].worktime=device.ll[i].vstr
                  }
                }
              }
            }
            let clist=device.KongZhi.map
            if (JSON.stringify(clist) != '{}' ) {
              this.ctl=true
              this.paramSettings3=clist
            }
          }

        }).then((msg) => {
        })
      })
    setInterval(getHumidity, 30000);
    getHumidity().then(response =>{
      let humidities=JSON.parse(response.data.data.humidities)
      for(let i in humidities){
        for(let j in this.deviceData){
          if(humidities[i].title.split("#")[0]==this.deviceData[j].no){

            this.deviceData[j].humidity =humidities[i].value
          }
        }
      }

    })

  },
  methods: {
    sendCommand(){
      let str = ''
      if(this.ctlType==0){
        for (var i in this.paramSetting) {
          str += this.paramSetting[i].Command;
          console.log(str)
        }
      }else{
        if(this.tongyikey==1){
          for (let i in this.paramSettings3[0]) {
            str += this.paramSettings3[0][i].Command;
          }
          console.log(str)
        }else{
          for (var i in this.paramSetting1) {
            str += this.paramSetting1[i].Command;
          }
        }

      }

      if (str != '') {
        this.sendcmd(str) .then((data) => {
          console.log(data.status==200)
          if(data.status==200){
            console.log("------------")
            this.$message({
              message: "发送成功",
              type: "success"
            });

          }else{
            this.$message.error("发送失败");
          }

          this.dialogFormVisible = false;
        })
      }
    },
    sendcmd(str) {
      return  webRequest.get("/wechat/device/sendcmd", {
        params: {command: str,deviceSuffix: this.controllerNo , userId: this.$root.unionId
        },
        transformResponse: [
          function (data) {
            return data;
          },
        ],
      });
    },
    newFrameChangeParam(key,k,val){
      let temp = this.paramSetting[key].ctls[k]
      temp.Value=parseFloat(val)
    },
    newFrameChangeParam1(key,k,val){
      let temp = this.paramSetting1[key].ctls[k]
      temp.Value=parseFloat(val)
      if(temp.name.split("#")[1]=="喷淋时间 "){
        for(let i in this.paramSettings3[0] ){
          for(let j in this.paramSettings3[0][i].ctls ){
            if(this.paramSettings3[0][i].ctls[j].name=="统一喷淋时间设置"){
              this.paramSettings3[0][i].ctls[j].Value=parseFloat(val)
              console.log(this.paramSettings3[0][i].ctls[j].Value)
            }
          }
        }
      }
      if(temp.name.split("#")[1]=="间隔时间 "){
        for(let i in this.paramSettings3[0] ){
          for(let j in this.paramSettings3[0][i].ctls ){
            if(this.paramSettings3[0][i].ctls[j].name=="统一喷淋间隔设置"){
              this.paramSettings3[0][i].ctls[j].Value=parseFloat(val)
              console.log(this.paramSettings3[0][i].ctls[j].Value)
            }
          }
        }
      }
    },
    back(){
      for(let i in this.paramSettings3[0] ){
        for(let j in this.paramSettings3[0][i].ctls ){
          if(this.paramSettings3[0][i].ctls[j].name=="统一设置"){
            this.paramSettings3[0][i].ctls[j].Value=parseFloat(0)
          }
        }
      }
      let str = ''
            str = this.paramSettings3[0][2].Command;
      if (str != '') {
        this.sendcmd(str) .then((data) => {
          console.log(data.status==200)
          this.tongyikey=0
          this.dialogFormVisible = false;
        })
      }
    },
    sendCommand1(){
      this.tongyikey=1
      for(let i in this.paramSettings3[0] ){
        for(let j in this.paramSettings3[0][i].ctls ){
          if(this.paramSettings3[0][i].ctls[j].name=="统一设置"){
            this.paramSettings3[0][i].ctls[j].Value=parseFloat(1)
            console.log(this.paramSettings3[0][i].ctls[j].Value)
          }
        }
      }
      this.sendCommand()
    },
    buttonChangeParam(index){
this.menuCtl(index).then(val => {
  let temp = this.paramSetting[val.key].ctls[val.key1]
  temp.Value=parseFloat(1)
  this.sendCommand()
});
    },
    buttonChangeParam1(index){
      this.menuCtl(index).then(val => {
        let temp = this.paramSetting[val.key].ctls[val.key1]
        temp.Value=parseFloat(0)
        this.sendCommand()
      });

    },
    buttonChangeParam2(index){
      this.menuCtl(index).then(val => {
        let temp = this.paramSetting[val.key].ctls[val.key1]
        temp.Value=parseFloat(0)
        this.sendCommand()
      });

    },
    buttonChangeParam4(index){
      this.penlinmenuCtl(index).then(val => {
        let temp = this.paramSetting1[val.key].ctls[val.key1]
        temp.Value=parseFloat(0)
        this.sendCommand()
      });

    },
    buttonChangeParam5(index){
      this.penlinmenuCtl(index).then(val => {
        let temp = this.paramSetting1[val.key].ctls[val.key1]
        temp.Value=parseFloat(1)
        this.sendCommand()
      });

    },
    buttonChangeParam3(index){
      this.menuCtl(index).then(val => {
        let temp = this.paramSetting[val.key].ctls[val.key1]
        temp.Value=parseFloat(1)
        this.sendCommand()
      });

    },
    menuCtl(index){
      this.ctlType=0
      this.qitingKey1=null
      this.qitingKey2=null
      this.shouziKey1=null
      this.shouziKey2=null
      this.shouzivalue=null
      this.qitingvalue=null
      let selectkey={key:null,key1:null}
      if(index<14){
        this.controllerNo=this.deviceSuffix1
        for(var key in this.paramSettings1){
          if(key==index+1){
            this.paramSetting=this.paramSettings1[key]
            for(var key1 in this.paramSettings1[key]){
              for(var key2 in this.paramSettings1[key][key1].ctls){

                if(this.paramSettings1[key][key1].ctls[key2]){
                  console.log()
                  if(this.paramSettings1[key][key1].ctls[key2].name.split("#")[1]=="阀启动/停止"){
                    this.qitingvalue=this.paramSettings1[key][key1].ctls[key2].v
                    selectkey.key=key1
                    selectkey.key1=key2
                  }
                  if(this.paramSettings1[key][key1].ctls[key2].name.split("#")[1]=="阀手动/自动"){
                    this.shouzivalue=this.paramSettings1[key][key1].ctls[key2].v
                    selectkey.key=key1
                    selectkey.key1=key2
                    console.log( selectkey)
                  }
                }

              }
            }
          }
        }
        return Promise.resolve(selectkey)
      }else{
        this.controllerNo=this.deviceSuffix2
        for(var key in this.paramSettings2){
          if(key==index-14){
            this.paramSetting=this.paramSettings2[key]
            for(var key1 in this.paramSettings2[key]){
              for(var key2 in this.paramSettings2[key][key1].ctls){

                if(this.paramSettings2[key][key1].ctls[key2]){
                  if(this.paramSettings2[key][key1].ctls[key2].name.split("#")[1]=="阀启动/停止"){
                    this.qitingvalue=this.paramSettings2[key][key1].ctls[key2].v
                    selectkey.key=key1
                    selectkey.key1=key2
                  }
                  if(this.paramSettings2[key][key1].ctls[key2].name.split("#")[1]=="阀手动/自动"){
                    this.shouzivalue=this.paramSettings2[key][key1].ctls[key2].v
                    selectkey.key=key1
                    selectkey.key1=key2
                    console.log( selectkey)
                  }
                }

              }
            }
          }

        }
        return Promise.resolve(selectkey)
      }
    },
    showCtl(index) {
      if(index<14){
        this.controllerNo=this.deviceSuffix1
        for(var key in this.paramSettings1){
          if(key==index+1){
            this.paramSetting=this.paramSettings1[key]
          }
        }
      }else{
        this.controllerNo=this.deviceSuffix2
        for(var key in this.paramSettings2){
          if(key==index-14){
            this.paramSetting=this.paramSettings2[key]
          }
        }
      }
      this.ctlType=0
       this.dialogFormVisible = true;
      this.titleName = "参数设置";
    },
    penlinshowCtl(index) {
      this.controllerNo=this.deviceSuffix3
      for(let i in this.paramSettings3[0] ){
        for(let j in this.paramSettings3[0][i].ctls ){
          if(this.paramSettings3[0][i].ctls[j].name=="统一设置"){
            this.paramSettings3[0][i].ctls[j].Value=parseFloat(0)
          }
        }
      }
      let str = ''
      str = this.paramSettings3[0][2].Command;
      if (str != '') {
        this.sendcmd(str) .then((data) => {
          let i=index+1
          this.paramSetting1=this.paramSettings3[i]
          this.ctlType=1
          this.dialogFormVisible = true;
          this.titleName = "参数设置";
        })
      }

    },
    penlinmenuCtl(index) {
      this.controllerNo=this.deviceSuffix3
      let selectkey={key:null,key1:null}
      let i=index+1
      this.paramSetting1=this.paramSettings3[i]
      for(var key1 in this.paramSettings3[i]){
        for(var key2 in this.paramSettings3[i][key1].ctls){

          if(this.paramSettings3[i][key1].ctls[key2]){
            if(this.paramSettings3[i][key1].ctls[key2].name.split("#")[1]=="选择"){
             selectkey.key=key1
              selectkey.key1=key2

            }
          }
        }
      }
console.log(selectkey)
      this.ctlType=1
      return Promise.resolve(selectkey)
    },
     guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  },
  }
};
</script>
<style type="text/css">
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

  .rundata {
    min-width: 100%;
    height: 100%;
    margin-right: 20px;
    /*transition: all .5s;*/
  }

  .menus {
    margin-top: 70px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }
  .menu {
    border-radius: 4px;
    align-items: stretch;
    margin-bottom: 40px;
  }
</style>

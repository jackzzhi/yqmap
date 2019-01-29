<template>
  <div>
    <p>msgType:{{socketType}}</p>
    {{socketType === 0 ? socketmsg : axiosMsg}}
  </div>
</template>

<script>
import socketJs from 'mixins/socketJs'

export default {
  extends: socketJs,
  data() {
    return {}
  },
  created() {
    // this.arrList = ['callback'];
    this.arrList = ['YQ_000002_D']
    // [
    //   'LC_010030_M',
    //   'LC_010020_D',
    //   'LC_010030_D',
    //   'LC_010020_M',
    //   'LC_010010_D',
    //   'LC_010010_M'
    // ];
    this.ajaxActionName = 'overdueData/getWarningList'
    this.connects()
    this.httpIpWs = 'http://dev.bdc.jieyue.com/websocket/xiangqian'
    // this.httpIpWs = 'http://api.bdc.jieyue.com/websocket/xiangqian';
    // this.httpIpWs = 'http://192.168.74.31:10152/xiangqian';
    this.initWebSocket()
  }
}
</script>


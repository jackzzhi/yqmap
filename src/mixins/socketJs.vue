<!--
    使用socketJs需混合的功能
-->
<script>
import { mapState } from 'vuex'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { websoketUrlFun } from '@/services/config'

export default {
  data() {
    return {
      stompClient: null,
      socket: null,
      httpIpWs: `${websoketUrlFun('')}/websocket/xiangqian`,
      arrList: '',
      socketmsg: null,
      socketType: 1, // 0:socket 1:axios
      timer: null,
      num: 0,
      timerOut: null,
      axiosMsg: null
    }
  },
  computed: {
    ...mapState({
      pullLoading: _ => _.overdueData.pullLoading
    })
  },
  methods: {
    initWebSocket() {
      let that = this
      that.connect()
      that.timer = setInterval(() => {
        try {
          that.stompClient.send('ping')
        } catch (err) {
          console.error('断线了: ' + err)
          that.connects()
          //that.num > 10 ? that.connects() : that.connect(); // 断线重连
          that.socketType = 1
          that.num++
        }
      }, 5000)
    },
    connect() {
      const that = this
      that.socket = new SockJS(that.httpIpWs)
      that.stompClient = Stomp.over(that.socket)
      that.stompClient.connect(
        {},
        () => {
          for (var i in that.arrList) {
            that.stompClient.subscribe(
              '/topic/' + that.arrList[i],
              respnose => {
                that.socketmsg = respnose.body
                that.socketType = 0
              }
            )
          }
        },
        error => {
          console.log('连接失败【' + error + '】')
          that.connects()
        }
      )
    },
    connects() {
      this.num = 0
      this.socketType = 1
      const { dispatch } = this.$store
      const payload = {
        hkey: 'YQ',
        rkey: this.arrList
      }
      dispatch('overdueData/getPullData', payload).then(res => {
        this.axiosMsg = res
      })
      clearTimeout(this.timerOut)
      this.timerOut = setTimeout(() => {
        this.connect()
      }, 5000)
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect()
      }
    }
  },
  beforeDestroy: function() {
    this.disconnect()
    clearInterval(this.timer)
    clearTimeout(this.timerOut)
  }
}
</script>
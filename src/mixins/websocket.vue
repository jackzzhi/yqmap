<!--
    使用websocket需混合的功能
-->
<script>
export default {
  data() {
    return {
      websock: null
    };
  },
  created() {
    this.initWebSocket();
  },
  destroyed() {
    this.websocketclose();
  },
  methods: {
    initWebSocket() {
      const wsuri = process.env.WS_API + '/websocket/threadsocket'; //ws地址
      this.websock = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;

      this.websocket.onerror = this.websocketonerror;

      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      this.websocketsend('getNewData');
    },
    websocketonerror(e) {
      this.initWebSocket();
    },
    websocketonmessage(e) {
      const redata = JSON.parse(e.data);
      console.log(redata.value);
    },
    websocketsend(agentData) {
      this.websock.send(agentData);
    },
    websocketclose(e) {
      console.log('connection closed (' + e.code + ')');
    }
  }
};
</script>
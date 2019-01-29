<template>
  <div class="about">
    <p>{{loading?'正在加载...':'加载完成'}}</p>
    asdfasdfasf<br/>
    <p>{{all}}</p>
    <ul>
      <li>司南版本：{{all.version}}</li>
      <li>版本描述：{{all.versionDesc}}</li>
      <li>主体：{{all.masterNo}}</li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      state: 1,
    }
},
  created() {
    const { dispatch } = this.$store;
    const payload = {
        'sysVersion': ''
    }
    // dispatch('overdueData/getVersion', payload);
    // const ws = new WebSocket("wss://echo.websocket.org");
    // ws.onopen = function(evt) {
    //   console.log("Connection open ...");
    //   ws.send("Hello WebSockets!");
    // };
    // ws.onmessage = function(evt) {
    //   console.log( "Received Message: " + evt.data);
    //   ws.close();
    // };
    // ws.onclose = function(evt) {
    //   console.log("Connection closed.");
    // };
},
  computed: {
    ...mapState({
      all: _ => _.overdueData.all,
      loading: _ => _.overdueData.loading,
    }),
  },
}
</script>


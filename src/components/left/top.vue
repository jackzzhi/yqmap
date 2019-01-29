<template>
  <div class="L-top">
    <div class="fist">
      <div class="name">
        <span class="one"></span>当前逾期人数（人）</div>
      <div class="number" v-if='response===""'>
        <div v-for='item in 13'>&nbsp;</div>
      </div>
      <div class="number" v-if='response!==""'>
        <div v-for='item in 13-numToThousands(response.count).length'>&nbsp;</div>
        <div v-for='item in numToThousands(response.count)'>{{item}}</div>
      </div>
    </div>
    <div class="fist">
      <div class="name">
        <span class="two"></span>当前逾期金额（元）</div>
      <div class="number" v-if='response===""'>
        <div v-for='item in 13'>&nbsp;</div>
      </div>
      <div class="number" v-if='response!==""'>
        <div v-for='item in 13-numToThousands(response.amt).length'>&nbsp;</div>
        <div v-for='item in numToThousands(response.amt)'>{{item}}</div>
      </div>
    </div>
    <div class="fist">
      <div class="name">
        <span class="three"></span>当日回款金额（元）</div>
      <div class="number" v-if='response===""'>
        <div v-for='item in 13'>&nbsp;</div>
      </div>
      <div class="number" v-if='response!==""'>
        <div v-for='item in 13-numToThousands(response.ramt).length'>&nbsp;</div>
        <div v-for='item in numToThousands(response.ramt)'>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import socketJs from '../../mixins/socketJs'
export default {
  name: 'top',
  extends: socketJs,
  data() {
    return {}
  },
  computed: {
    response() {
      let data = ""
      if (this.socketType === 0) {
        data = this.socketmsg ? JSON.parse(this.socketmsg).v : ''
      } else {
        data = this.axiosMsg && this.axiosMsg.length > 0 ? this.axiosMsg[0].v : ''
      }
      if(typeof data === 'string' && data.length>0){
        data = JSON.parse(data)
      }
      return data
    }
  },
  created() {
    this.arrList = ['YQ_000001_D']
    this.connects()
    this.initWebSocket()
  },
  methods: {
    numToThousands(num) {
      let arr = num.toString().split(' ');
      var arrlist = arr =>
        Number(
          Array.from(new Set(arr))
            .join("")
        ).toLocaleString("en-US");
      return arrlist(arr)

    }
  }
}
</script>

<style scoped>
.L-top {
  height: 100%;
  background-image: url('../../assets/images/l-top.png');
  background-size: 100% 100%;
}
.number {
  display: flex;
}
.fist {
  padding: 20px 16px 0 16px;
}
.fist .name {
  color: #9adbef;
  margin-bottom: 10px;
}
.fist .name span {
  display: inline-block;
  width: 10px;
  height: 10px;

  background-size: 100% 100%;
  margin-right: 2%;
}
.fist .name {
  font-size: 18px;
}
.fist .number {
  font-size: 40px;
}
.one {
  background-image: url('../../assets/images/yellow.png');
}
.two {
  background-image: url('../../assets/images/red.png');
}
.three {
  background-image: url('../../assets/images/green.png');
}
.number div {
  flex: 1;
  background-image: url('../../assets/images/number.png');
  background-size: 100% 100%;
  text-align: center;
  color: #9adbef;
  /*padding: 4px 0;*/
  font-family: quartz;
}
</style>
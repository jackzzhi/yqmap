<template>
  <div class="middle">
    <div class="top">
      <img class="dian" src="../../assets/images/red.png" />
      <span>今日预警最多门店</span>
      <img class="tp" src="../../assets/images/TOP3.png" />
    </div>
    <div class="bottom" v-if='datalist.length > 0'>
      <div class="kuai" v-for="item in datalist" :key='item.orgName'>
        <div class="first">
          <p>{{item.orgName}}营业部</p>
          <img src="../../assets/images/fengexian.png">
        </div>
        <div class="count">
            <p>{{item.count}} <span>次</span>  </p>
            <img src="../../assets/images/fengexian.png">
        </div>
        <div class="third">
          <p>{{item.areaName}}&nbsp;&nbsp;&nbsp;{{item.deptName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'index',
  data() {
    return {
      datalist: []
    }
  },
  created() {
    this.getDatalist()

  },
  mounted(){
    setInterval(this.getDatalist,60 * 60 * 1000)
  },
  methods: {
    getDatalist() {
      const { dispatch } = this.$store
      dispatch('overdueData/getTopThreeData').then(res => {
        if (res.code === 200) {
          this.datalist = [].concat(res.data.content)
        }
      })
    }
  }
}
</script>

<style scoped>
.middle {
  height: 100%;
}
.middle .top {
  height: 54px;
  line-height: 54px;
}
.middle .top .dian {
  width: 10px;
  height: 10px;
  vertical-align: middle;
}
.middle .top span {
  color: #9adbff;
  vertical-align: middle;
  padding-left: 1%;
}
.middle .top .tp {
  width: 65px;
  height: 19px;
  padding-left: 1%;
  vertical-align: middle;
}
.middle .bottom {
  display: flex;
  width: 760px;
  height: 170px;
  margin: 0 auto;
  background-image: url('../../assets/images/mendianbg.png');
  background-size: 100% 100%;
  padding-right: 2%;
}
.middle .bottom .kuai {
  background-image: url('../../assets/images/mendiankuang.png');
  background-size: 100% 100%;
  flex: 1;
  height: 140px;
  margin-left: 18px;
  margin-top: 16px;
  text-align: center;
}
.middle .bottom .kuai .first {
  height: 40px;
  font-size: 0px;
  text-align: center;
}

.middle .bottom .kuai .first p {
  color: #9adbff;
  font-size: 18px;
  padding-top: 7%;
  font-weight: bold;
}
.middle .bottom .kuai .first img {
  width: 200px;
  height: 4px;
  padding-top: 2%;
}
.middle .bottom .kuai .count {
  height: 33.33%;
  font-size: 0px;
  margin-top: 10px;
}
.middle .bottom .kuai .count p {
  color: #e14e70;
  font-size: 40px;
  font-family: quartz;
  margin-left: 5px;
}
.middle .bottom .kuai .count p span{
  font-size: 18px;
  margin-left: -10px;
}
.middle .bottom .kuai .count img {
  width: 200px;
  height: 4px;
}
.middle .bottom .kuai .third {
  height: 40px;
  margin-top: 12px;
}
.middle .bottom .kuai .third p {
  color: #9adbff;
  font-size: 16px;
}
</style>
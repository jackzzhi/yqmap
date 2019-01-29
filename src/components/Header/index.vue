<template>
    <div class="Header">
        <div class="logo"></div>
        <div class="title"><img src="../../assets/images/title.png" alt=""></div>
        <div class="time">
            <p>{{currentdate}} 周{{week}} {{time}}</p> <div></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        currentdate:'',
        time:'',
        week:''
    }
    },
    mounted(){
      setInterval(()=>{
        this.getTime()
      },1000)
    },
    methods:{
      getTime(){
        var date = new Date();

        var h = date.getHours()
        var m = date.getMinutes()
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        this.time=h+':'+m
        this.week="日一二三四五六".charAt(new Date().getDay())

        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        this.currentdate = year + seperator1 + month + seperator1 + strDate;

      }

    }
  }
</script>

<style scoped>
.Header{
  display: flex;
  height: 100%;
  margin: 0 40px;
  font-size: 27px;
}
.logo{
    background: url("../../assets/images/logo.png");
    background-size:100% 100% ;
    width: 168px;
    height: 54px;
    margin-top: 1%;
}
    .title{
        flex: 1;
        width:1328px;
        margin-top: 1.8%;
    }
    .title img{
      width:1328px;
      height:auto
    }
    .time{
        color: #9ADBFE;
        margin-top: 35px;
        font-family: quartz;
    }
    .time div{
        width: 23px;
        height: 23px;
        background: url("../../assets/images/time.png");
        background-size: 100% 100%;
        float: right;
        margin-right: 5px;
        margin-top: 2px;
    }
    .time p{
        float: right;
        margin-top: -7px;
    }
</style>
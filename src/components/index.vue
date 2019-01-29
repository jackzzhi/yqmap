<template>
    <div class="about">
        <div class="header">
            <Header></Header>
        </div>
        <div class="lines"></div>

       <div class="box">
           <div class="left">
               <div class="L-top"><LeftTop></LeftTop></div>
               <div class="L-bottom"><LeftBot></LeftBot></div>
           </div>
           <div class="moddle">
               <div class="M-top">
                   <div class="top">
                   <img class="dian" src="../assets/images/red.png" />
                   <span>全国各省当前逾期金额分布</span>
                   </div>
                   <M_maps></M_maps>
               </div>
               <div class="M-bottom"><MiddleBottom></MiddleBottom></div>
           </div>
           <div class="right"><Rightm></Rightm></div>
       </div>

  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Header from './Header/index'
  import LeftTop from './left/top'
  import LeftBot from './left/bootom'
  import MiddleBottom from './middle/index'
  import Rightm from './right/index'
  import M_maps from './middle/maps'
  import '../assets/stopExecutionOnTimeout'
  import $ from 'jquery'
  export default {
    data() {
      return {
        state: 1,
      }
    },

    components: {Header, LeftTop, LeftBot, Rightm, M_maps, MiddleBottom},

    mounted() {
      var stars = 500;
      var $stars = $('.stars');
      var r = 600;
      for (var i = 0; i < stars; i++) {
        if (window.CP.shouldStopExecution(1)) {
          break;
        }
        var $star = $('<div/>').addClass('star');
        $stars.append($star);
      }
      window.CP.exitedLoop(1);
      $('.star').each(function () {
        var cur = $(this);
        var s = +Math.random() * 1;
        var curR = r + Math.random() * 1000;
        cur.css({
          transformOrigin: '0 0 ' + curR + 'px',
          transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
        });
      });
    },
    computed: {
      ...mapState({
        all: _ => _.overdueData.all,
      }),
    }
  }
</script>

<style class="cp-pen-styles">
    @import "../assets/css/index.css";


</style>


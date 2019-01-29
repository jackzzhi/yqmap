<template>
  <div class="right-M">
    <div class="title">智能预警</div>
    <div class="table">
      <table class='table-title'>
        <tr style="background-color: transparent" ref='dataTr'>
          <th width='10%'>关注度</th>
          <th width='15%'>门店</th>
          <th width='46%'>预警信息</th>
          <th width='29%'>预警时间</th>
        </tr>
      </table>
      <div class="table-content">

        <table ref='tableList' :style="{'top':top}" id="table-content">
          <tr v-for="(item,index) in datalist" :class="{'active': activeItemIndex === index}">
            <td width='24px' class="photo" v-if='item.attention === "3"'><img src="../../assets/images/height.png"></td>
            <td width='24px' class="photo" v-if='item.attention === "2"'><img src="../../assets/images/middle.png"></td>
            <td width='24px' class="photo" v-if='item.attention === "1"'><img src="../../assets/images/low.png"></td>

            <td width='15%' class="city">{{item.orgName}}</td>
            <td width='50%' class="info">{{item.content}}</td>
            <td width='25%' class="time">{{item.dateStr}}</td>
          </tr>



        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from '../../common/js/jquery-vendor'
  export default {
    name: 'index',
    data() {
      return {
        datalist: [],
        animateTimer: null,
        trHeight: 0,
        activeItemIndex: 0 //滚动当前选择的项
      }
    },
    computed: {
      top() {
        let top = -this.activeItemIndex * this.trHeight + 'px'
        return top

      }
    },
    watch: {
      activeItemIndex() {
        //保存选中机构的名字
        let activeItemName =
          this.datalist.length > 0
            ? this.datalist[this.activeItemIndex].orgName
            : ''
        let activeProvinceName =
          this.datalist.length > 0
            ? this.datalist[this.activeItemIndex].province
            : ''
        this.$store.dispatch(
          'overdueData/changeWarningActiveItemName',
          activeItemName
        )
        this.$store.dispatch(
          'overdueData/changeWarningActiveProvinceName',
          activeProvinceName
        )
      }
    },
    created() {
      this.getDatalist()

    },
    mounted(){
      setInterval(this.getDatalist,60 * 60 * 1000)
    },
    methods: {
      // ...mapActions(['changeWarningActiveItemName']),
      getDatalist() {
        const { dispatch } = this.$store
        dispatch('overdueData/getWarningList').then(res => {
          if (res.code === 200) {
            this.datalist = [].concat(res.data.content)
            // this.datalist = this.datalist.concat(this.datalist.slice(0, 12)) //多加12条数据，防止显示空白
            this.activeItem = {
              index: 0,
              name: this.datalist[0]
            }
            this.scrollAnimate()

          }
        })
      },
      scrollAnimate() {

        this.animateTimer = setInterval(() => {
          if (this.trHeight === 0) {
            this.trHeight = this.$refs.dataTr.clientHeight
          }
          if (this.activeItemIndex < this.datalist.length - 12) {
            this.activeItemIndex++
          } else {
            this.activeItemIndex = 0
          }
        }, 5 * 1000)
      }
    }
  }
</script>

<style scoped>

  table {
    margin: 0;
    padding: 0;
    border-spacing: 0;
    border-collapse: collapse;
  }
  td,
  tr {
    margin: 0;
    padding: 0;
    outline: none;
  }
  .right-M {
    height: 100%;
    background-image: url('../../assets/images/智能预警.png');
    background-size: 100% 100%;
    font-size: 12px;
  }
  .right-M .title {
    text-align: center;
    color: #9adbef;
    padding-top: 2px;
    font-size: 18px;
    font-weight: bold;
  }
  .right-M .table {
    position: relative;
    padding-top: 66px;

    margin-right: 2px;
  }
  .right-M .table .table-content {
    height: 792px;
    overflow: hidden;
    position: relative;
  }
  .right-M .table-content table {
    background-color: transparent;
    position: absolute;
    top: 0px;
    left: 2px;
    color: #9adbef;
  }
  .right-M .table-content table tr {
    border-top: 1px solid #035c8d;
  }
  .right-M table.table-title {
    position: absolute;
    top: 12px;
    left: 4px;
    z-index: 99;
  }
  .right-M table.table-title th {
    font-size: 15px;
  }
  .right-M .table th {
    color: #9adbef;
    padding-left: 20px;
    white-space: nowrap;
  }
  .right-M .table tr {
    height: 66px;
  }
  .right-M .table tr.active {
    background: linear-gradient(#750000, #550016, #32002a, #1d0035);
    color: #fff;
    font-size: 14px;
  }
  .right-M .table tr .active .photo{
    width: 28px;
  }
  .right-M .table tr:nth-child(even) {
    background-color: rgb(9, 21, 61);
  }
  .right-M .table tr:nth-child(odd) {
    background-color: transparent !important;
  }

  .right-M .table td {
    padding-left: 34px;
    margin: 0;
  }
  .right-M .table .photo {
    text-align: center;
    line-height: 100%;
  }
  .right-M .table .city {
    white-space: nowrap;
    text-align: center;
    font-weight: bold;
  }
  .right-M .table .info {
    /*color: #fff;*/
    /*font-size: 12px;*/
  }
  .right-M .table .time {
    /*color: #fff;*/
    padding-top: 0.5%;
  }
</style>

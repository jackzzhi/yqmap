<template>

  <div id="myMap" ref='myMap'></div>

</template>

<script>
import { mapState } from 'vuex'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/map/js/china.js'
// import '@/assets/TweenMax.min'
import socketJs from '../../mixins/socketJs'

export default {
  extends: socketJs,
  data() {
    return {
      myChart: null,
      activeDots: [],
      option: {}
    }
  },
  computed: {
    ...mapState({
      warningActiveItemName: _ => _.overdueData.warningActiveItemName,
      warningActiveProvinceName: _ => _.overdueData.warningActiveProvinceName,
      warningList: _ => _.overdueData.warningList,
      topThreeWarning: _ => _.overdueData.topThreeWarning
    }),
    datalist() {
      return this.warningList.tude
    },
    data() {
      let data = {}
      if (this.socketType === 0) {
        data = this.socketmsg ? JSON.parse(this.socketmsg).v : ''
      } else {
        data =
          this.axiosMsg && this.axiosMsg.length > 0 ? this.axiosMsg[0].v : ''
      }
      if (typeof data === 'string' && data.length > 0) {
        data = JSON.parse(data)
      }
      return data
    }
  },
  watch: {
    warningActiveItemName(val) {
      this.activeDots[0] = this.datalist[val]
      // this.myChart.clear()
      this.createChart()
    },
    topThreeWarning(val) {
      if (val) {
        this.createChart()
      }
    }
  },
  created() {
    this.arrList = ['YQ_000002_D']

    this.connects()
    this.initWebSocket()
  },
  mounted() {
    this.createChart()

  },
  methods: {
    createChart() {
      let _this = this
      let geoCoordMap = []
      if (_this.topThreeWarning) {
        for (let i in _this.topThreeWarning) {
          geoCoordMap.push(_this.topThreeWarning[i])
        }
      }
      let max = '5000000'
       max = this.data
      this.myChart = echarts.init(this.$refs.myMap)
      this.myChart.off('click')
      this.myChart.off('')
      let left = false,
        top = false,
        priority = 'top'
      // 自定义tooltip配置属性
      let config = {
        ecBoxId: 'chart-panel',
        lineColor: '#fff',
        L1: {
          time: 0.3,
          long: 40
        },
        L2: {
          time: 0.3,
          long: 40
        },
        text: {
          time: 0.5,
          text: '',
          font: '15px Arial',
          color: '#fff',
          padding: [20, 10],
          width: 190,
          height: 90,
          lineHeight: 30,
          backgroundColor: 'rgba(50, 50, 50, 0.8)'
        }
      }
      this.option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'none',
          // padding: [20, 10],
          backgroundColor: 'transparent',
          alwaysShowContent: true,
          position(pos) {
            let position = getPosOrSize('pos', pos)
            return position
          },
          formatter(params, p, a) {
            canvasAnimation(params)
            let size = getPosOrSize('size')
            let tooltipDom = `<canvas id="tCanvas" width="${
              size.width
            }" height="${size.height}">123</canvas>`
            return tooltipDom
          }
        },
        visualMap: {
          // mix:0,
          max:max[0].value,
          left: '100px',
          bottom: '30px',
          itemWidth: '6',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: false,

          color: ['#cbe0e5', '#3367b7'],
          textStyle: {
            color: '#6ca5eb'
          },
          seriesIndex: 2
        },
        geo: {
          map: 'china',
          width: '98%',
          height: '95%',
          top: '1.5%',
          left: '1%',
          roam: false,
          itemStyle: {
            normal: {
              // areaColor: '#6c98ca',
              borderColor: '#111'
            },
            emphasis: {
              // areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: '轮播点',
            clickable:false,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.activeDots,
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: false,


            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            formatter(params, p, a) {
              canvasAnimation(params)
              let size = getPosOrSize('size')
              let tooltipDom = `<canvas id="tCanvas" width="${size.width}" height="${size.height}"></canvas>`
              return tooltipDom
            },
            itemStyle: {
              color: '#540808',
              shadowBlur: 25,
              shadowColor: '#e14e70'
            },
            zlevel: 3
          },
          {
            name: '常亮点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: geoCoordMap,
            symbolSize: 15,
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: false,

            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: {
              color: '#e14e70',
              shadowBlur: 30,
              shadowColor: '#ff0505',

              emphasis: {
               
              }
            },
            zlevel: 2
          },
          {
            name: '地图底层',
            type: 'map',
            mapType: 'china',
            //zoom: 1.2,
            width: '98%',
            height: '95%',
            top: '1.5%',
            left: '1%',
            roam: false,
            selectedMode: false,
            itemStyle: {
              normal: {
                // color: 'red' //地图背景颜色
                // areaColor: 'rgb(216, 72, 26)',
              },
              emphasis: { label: { show: false } }
            },
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: this.data,
            zlevel: 1
          }
        ]
      }
      const canvasAnimation = params => {
        setTimeout(function() {
          config.text.text = ` 营业部:  ${
            _this.warningActiveItemName}\n 省份:  ${_this.warningActiveProvinceName}`
          new myTooltip('tCanvas', config)
        }, 0)
      }
      // 计算tooltip位置
      const getPosOrSize = (type, point) => {
        let x1 = config.L1.long * Math.sin(Math.PI / 4)
        let width = x1 + config.L2.long + config.text.width,
          height = x1 + config.text.height / 2
        if (type === 'size') {
          config.width = width
          config.height = height
          return {
            width,
            height
          }
        } else {
          let box = document.getElementById('myMap'),
            bw = box.offsetWidth,
            bh = box.offsetHeight,
            x = point[0],
            y = point[1]
          left = false
          if (x + width >= bw / 1.2) {
            x = x - width - 5
            left = true
          }
          if (priority === 'top') {
            // L1向上
            top = true
            y = y - height - 5
            if (y <= 0) {
              y = point[1]
              top = false
            }
            return [x, y]
          } else {
            top = false
            if (y + height >= bh) {
              y = y - height - 5
              top = true
            }
            return [x, y]
          }
        }
      }

      class myTooltip {
        constructor(id, config) {
          this.config = config
          this.totalTime = 0
          this.stage = new createjs.Stage(id)
          this.timeline = new TimelineMax({ repeat: 0 })
          this.g = new createjs.Graphics()
          this.lineShape = new createjs.Shape(this.g)
          this.textShape = new createjs.Shape()
          this.stage.addChild(this.lineShape, this.textShape)
          this.init()
          this.begin()
          this.update()
        }

        init() {
          this.start = [0, 0]
          if (left) {
            this.start[0] = this.config.width
          }
          if (top) {
            this.start[1] = this.config.height
          }
        }

        begin() {
          this.L1()
          this.L2()
          this.addText()
        }

        L1() {
          let me = this
          let c = me.config
          let tl = new TimelineMax()
          let scale = { s: 0 },
            x = c.L1.long * Math.sin(Math.PI / 4)
          if (left) {
            if (top) {
              this.L1End = [me.start[0] - x, me.start[1] - x]
            } else {
              this.L1End = [me.start[0] - x, me.start[1] + x]
            }
          } else {
            if (top) {
              this.L1End = [x, me.start[1] - x]
            } else {
              this.L1End = [x, x]
            }
          }

          tl.to(scale, c.L1.time, {
            s: 1,
            onUpdate() {
              let s = scale.s
              if (left) {
                if (top) {
                  me.g
                    .c()
                    .s(c.lineColor)
                    .mt(...me.start)
                    .lt(me.start[0] - x * s, me.start[1] - x * s)
                } else {
                  me.g
                    .c()
                    .s(c.lineColor)
                    .mt(...me.start)
                    .lt(me.start[0] - x * s, me.start[1] + x * s)
                }
              } else {
                if (top) {
                  me.g
                    .c()
                    .s(c.lineColor)
                    .mt(...me.start)
                    .lt(x * s, me.start[1] - x * s)
                } else {
                  me.g
                    .c()
                    .s(c.lineColor)
                    .mt(...me.start)
                    .lt(x * s, x * s)
                }
              }
              me.update()
            }
          })
          this.timeline.add(tl, this.totalTime)
          this.totalTime += c.L1.time
        }

        L2() {
          // 只跟左右有关，只判断left
          let me = this
          let c = me.config
          let tl = new TimelineMax()
          let scale = { s: 0 }
          tl.to(scale, c.L2.time, {
            s: 1,
            onUpdate() {
              let s = scale.s
              if (left) {
                me.g
                  .c()
                  .s(c.lineColor)
                  .mt(...me.start)
                  .lt(...me.L1End)
                  .lt(me.L1End[0] - c.L2.long * s, me.L1End[1])
              } else {
                me.g
                  .c()
                  .s(c.lineColor)
                  .mt(...me.start)
                  .lt(...me.L1End)
                  .lt(me.L1End[0] + c.L2.long * s, me.L1End[1])
              }
              me.update()
            }
          })
          this.timeline.add(tl, this.totalTime)
          this.totalTime += c.L2.time
        }

        addText() {
          // text框只与L2end有关，只需判断left即可，top不影响
          let me = this
          let c = me.config
          let tl = new TimelineMax()
          let scale = { s: 0 },
            L2End = [me.L1End[0] + c.L2.long, me.L1End[1]]
          if (left) {
            L2End = [me.L1End[0] - c.L2.long, me.L1End[1]]
          }
          tl.to(scale, c.text.time, {
            s: 1,
            onStart() {
              let x = 0,
                y = 0
              if (left) {
                x = L2End[0] - c.text.width
              } else {
                x = L2End[0]
              }
              me.g
                .c()
                .s(c.lineColor)
                .mt(...me.start)
                .lt(...me.L1End)
                .lt(...L2End)
              me.text = new createjs.Text(
                c.text.text,
                c.text.font,
                c.text.color
              )
              me.text.alpha = 0
              me.text.lineHeight = c.text.lineHeight
              me.text.x = x + c.text.padding[0]
              me.text.y = L2End[1] - c.text.height / 2 + c.text.padding[1]
              me.stage.addChild(me.text)
              me.textShape.graphics
                .c()
                .f(c.text.backgroundColor)
                .rr(
                  x,
                  L2End[1] - c.text.height / 2,
                  c.text.width,
                  c.text.height,
                  5
                )
              me.textShape.alpha = 0
              me.update()
            },
            onUpdate() {
              if (typeof me.text === 'string') return
              me.text.alpha = scale.s
              me.textShape.alpha = scale.s
              me.update()
            }
          })
          this.timeline.add(tl, this.totalTime)
        }

        update() {
          this.stage.update()
        }
      }

      this.myChart.setOption(this.option)
      // var index = 0
      setTimeout(_ => {
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: 0
        })
      }, 0)
      window.addEventListener('resize', e => {
        let tCanvas = document.getElementById('tCanvas')
        if (tCanvas) {
          tCanvas.style.display = 'none'
        }
      })
    }
  }
}
</script>

<style scoped>
#myMap {

        height: 100%;
        background: url("../../assets/images/map.png") no-repeat center;
        background-size: 100% 100%;
        margin-top: -24px;
        background-position: 4px 1px;
}

</style>
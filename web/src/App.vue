<template>
  <div class="box" :style="{ background: `url(${bg}) no-repeat` }">
    <div class="box-left" style="color:#fff">
      <div class="box-left-card">
        <section v-for="item in epidemicRealData" :key="item.id">
          <div>{{ item.compare }}</div>
          <div>{{ item.data }}</div>
          <div>{{ item.name }}</div>
        </section>
      </div>
      <div class="box-left-pie">

      </div>
      <div class="box-left-line">

      </div>
    </div>
    <div class="box-center" id="china">
    </div>
    <div class="box-right" style="color:#fff">
      <table border="1" cellspacing="0" class="table">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr v-for="item in store.item" :key="item.id" align="center">
            <td>{{ item.name }}</td>
            <td>{{ item.today.confirm }}</td>
            <td>{{ item.total.confirm }}</td>
            <td>{{ item.total.heal }}</td>
            <td>{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import bg from './assets/1.jpg'
import { useStore } from './stores'

import { onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts'

import './assets/china.js'
import { geoCoordMap } from './assets/geoMap'
import type { Children } from './stores/type'

import 'animate.css'
import { computed } from '@vue/reactivity';

import { caseType, } from './staticdata/epidemic-static-data'
import type { DataType } from './staticdata/epidemic-static-data'
const store = useStore()

interface EpidemicRealData {
  id: string,
  campare: number,
  data: number,
  name: string,
}

let epidemicRealData = computed(() => {
  const _chinaAdd: {
    [key: string]: unknown
  } = store.chinaAdd
  const _chinaTotal: {
    [key: string]: unknown
  } = store.chinaTotal

  return caseType.map((item: DataType) => {
    return {
      id: (Math.random() * Math.random()).toString(36).slice(2),
      compare: `较上日+${_chinaAdd[item['valueLabelH5']] || 0}`,
      data: _chinaTotal[item['valueLabel']] || 0,
      name: item['label']
    }
  })


})

let onResizeEvent = () => { }
let onResizeEventPie = () => { }
let onResizeEventLine = () => { }
type dataType = {
  name: string,
  value: Array<number>,
  children: Children[],
}
onMounted(async () => {
  await store.getList()
  // console.log(store.list.diseaseh5Shelf.areaTree[0]);
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  const data: dataType[] = city.map(v => {
    v.children.forEach((child: Children) => {
      child.id = (Math.random() * Math.random()).toString(36).slice(2)
    })
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })
  initCharts(data)
  initPieChart()
  initLineChart()

})
onUnmounted(() => {
  window.removeEventListener('resize', onResizeEvent, false);
  window.removeEventListener('resize', onResizeEventPie, false);
  window.removeEventListener('resize', onResizeEventLine, false);
})
const initCharts = (data: dataType[]) => {
  store.item = data[1].children
  const charts = echarts.init(document.querySelector("#china") as HTMLElement)

  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },

      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
              // },
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          // normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          // },

        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          // normal: {
          show: true,
          // }

          color: "#FFF",
          formatter(value: any) {
            return value.value[2]
          }
        },
        itemStyle: {
          // normal: {
          color: '#00c4ff', //标志颜色
          // }
        },
        data: data,
      },
    ],
  })

  // 监听点击事件
  charts.on('click', (e: any) => {
    store.item = e.data.children
  })

  onResizeEvent = () => {
    charts.resize()
  }
  window.addEventListener('resize', onResizeEvent, false);
}

const initPieChart = () => {
  const charts = echarts.init(document.querySelector(".box-left-pie") as HTMLElement)
  charts.setOption({
    backgroundColor: "#23425c",
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
          }
        },
        labelLine: {
          show: true,
        },
        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.local_confirm_add,
          }
        })
      }
    ]
  })
  onResizeEventPie = () => {
    charts.resize()
  }
  window.addEventListener('resize', onResizeEventPie, false);
}
const initLineChart = () => {
  console.log(store.cityDetail);

  const charts = echarts.init(document.querySelector(".box-left-line") as HTMLElement)
  charts.setOption({
    backgroundColor: "#23425c",
    tooltip:{
      trigger:"axis"
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v=>v.city),
      axisLine:{
        lineStyle:{
          color:"#fff"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine:{
        lineStyle:{
          color:"#fff"
        }
      }
    },
    label:{
      show:true,
    },
    series: [
      {
        data: store.cityDetail.map(v=>v.local_confirm_add),
        type: 'line',
        smooth: true
      }
    ]
  })
  onResizeEventLine = () => {
    charts.resize()
  }
  window.addEventListener('resize', onResizeEventLine, false);
}

</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  // background-repeat: no-repeat !important;
  background-size: cover !important;

  &-left {
    flex: 1;

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        background-color: #23425c;
        border: 1px solid #333;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: #13a6fd;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }

    &-pie {
      height: 350px;
      margin-top: 20px;
    }

    &-line {
      height: 350px;
      margin-top: 20px;
    }
  }

  &-center {
    flex: 2;
  }

  &-right {
    flex: 1;
  }
}

.table {
  width: 100%;
  background-color: #212028;

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }

    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }
}
</style>
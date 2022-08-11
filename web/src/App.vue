<template>
  <div class="box" :style="{ background: `url(${bg}) no-repeat` }">
    <div class="box-left"></div>
    <div class="box-center" id="china">
    </div>
    <div class="box-right"></div>
  </div>
</template>

<script lang="ts" setup>
import bg from './assets/1.jpg'
import { useStore } from './stores'

import { onMounted ,onUnmounted} from 'vue';
import * as echarts from 'echarts'

import './assets/china.js'
import {geoCoordMap} from './assets/geoMap'

const store = useStore()


let onResizeEvent = ()=>{} 
onMounted(async () => {
  await store.getList()
  // console.log(store.list.diseaseh5Shelf.areaTree[0]);
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  const data :Array<{}>= city.map(v=>{
    return {
      name:v.name,
      value:geoCoordMap[v.name].concat(v.total.nowConfirm)
    }
  })
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
        selectedMode: "multiple",
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
        symbol:"pin",
        symbolSize:[45,45],
        label: {
          // normal: {
          show: true,
          // }

          color: "#FFF",
          formatter(value:any){
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

  onResizeEvent = ()=>{
    charts.resize()
  }
  window.addEventListener('resize', onResizeEvent,false);
})
onUnmounted(()=>{
  window.removeEventListener('resize',onResizeEvent,false);
})

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

  }

  &-center {
    flex: 2;
  }

  &-right {
    flex: 1;
  }
}
</style>
<template>
  <div class="chart">
    <!-- 顶部卡片 -->
    <el-card class="topCard">
      <ul class="ul">
        <li>
          <span class="circle">{{topData.increment_users}}</span>
          <span class="title">今日新增用户</span>
        </li>
        <li>
          <span class="circle">{{topData.total_users}}</span>
          <span class="title">总用户量</span>
        </li>
        <li>
          <span class="circle orange">{{topData.increment_questions}}</span>
          <span class="title">新增试题</span>
        </li>
        <li>
          <span class="circle orange">{{topData.total_questions}}</span>
          <span class="title">总试题量</span>
        </li>
        <li>
          <span class="circle green">{{topData.total_done_questions}}</span>
          <span class="title">总刷题量</span>
        </li>
        <li>
          <span class="circle green">{{topData.personal_questions}}</span>
          <span class="title">人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <!-- 底部卡片模块 -->
    <el-card>
      <div ref="main" style="height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
import { getTop, statistics } from "@/api/data.js";
// 导入echarts包
import echarts from "echarts";
export default {
  data() {
    return {
      topData: "",
      myChart: ""
    };
  },
  methods: {},
  created() {
    // 1，获取顶部数据
    getTop().then(res => {
      this.topData = res.data.data;
    });
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.main);

    // 2，获取底部数据
    statistics().then(res => {
      console.log(res);
      // 图标配置项
      let tData = res.data.data.map(item => {
        return item.name;
      });
      // console.log(tData);
      let option = {
        title: {
          text: "整体数据"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: tData
        },
        series: [
          {
            name: "题目数量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };
      this.myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart {
  .ul {
    display: flex;
    justify-content: space-around;
    li {
      text-align: center;
      .circle {
        display: block;
        width: 99px;
        height: 99px;
        border-radius: 50%;
        border: 1px solid #0086fa;
        text-align: center;
        line-height: 99px;
        font-size: 35px;
        margin-bottom: 10px;
        // 交集选择器&
        &.green {
          border: 1px solid #55cd78;
        }
        &.orange {
          border: 1px solid #f76137;
        }
      }
      .title {
        font-size: 16px;
        color: rgba(115, 115, 115, 1);
      }
    }
  }
  .topCard {
    margin-bottom: 13px;
  }
}
</style>
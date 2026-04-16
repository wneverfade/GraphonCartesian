var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

var option;

const axisData = ["金税三期", "金税四期"];
const auditRates = [8, 32];

const nodeData = axisData.map(function (name, i) {
  const isNewStage = i === 1;

  return {
    name,
    value: [name, auditRates[i]],
    symbolSize: isNewStage ? 84 : 68,
    itemStyle: {
      color: isNewStage ? "#ffd54f" : "#8ec5ff",
      borderColor: "#ffffff",
      borderWidth: isNewStage ? 4 : 3,
      shadowColor: isNewStage
        ? "rgba(255, 213, 79, 0.28)"
        : "rgba(255, 255, 255, 0.18)",
      shadowBlur: isNewStage ? 14 : 10,
    },
    label: {
      show: true,
      position: "inside",
      formatter: function () {
        return `{stage|${name}}\n{rate|${auditRates[i]}%}`;
      },
      rich: {
        stage: {
          fontSize: isNewStage ? 13 : 12,
          color: "#0f172a",
          fontWeight: 700,
          lineHeight: 20,
        },
        rate: {
          fontSize: isNewStage ? 21 : 18,
          color: "#0f172a",
          fontWeight: 800,
          lineHeight: 26,
        },
      },
    },
  };
});

const links = [
  {
    source: "金税三期",
    target: "金税四期",
    lineStyle: {
      color: "rgba(255, 255, 255, 0.95)",
      width: 4,
      curveness: 0.16,
      shadowColor: "rgba(255, 255, 255, 0.24)",
      shadowBlur: 8,
    },
    label: {
      show: true,
      formatter: "稽查率显著提升",
      color: "#0f172a",
      fontSize: 14,
      fontWeight: 800,
      backgroundColor: "rgba(255, 255, 255, 0.96)",
      borderColor: "rgba(255, 213, 79, 0.9)",
      borderWidth: 2,
      borderRadius: 14,
      padding: [7, 12],
    },
  },
];

option = {
  backgroundColor: "transparent",

  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(15, 23, 42, 0.92)",
    borderColor: "rgba(255, 255, 255, 0.22)",
    borderWidth: 1,
    textStyle: {
      color: "#ffffff",
    },
    formatter: function (params) {
      if (params.dataType === "node") {
        return (
          '<div style="font-weight:700;margin-bottom:4px;">' +
          params.name +
          "</div>" +
          "<div>税务稽查率：" +
          params.value[1] +
          "%</div>"
        );
      }

      return (
        '<div style="font-weight:700;margin-bottom:4px;">阶段变化</div>' +
        "<div>税务稽查力度明显增强</div>"
      );
    },
  },

  toolbox: {
    show: true,
    right: 20,
    top: 18,
    iconStyle: {
      borderColor: "rgba(255, 255, 255, 0.82)",
    },
    emphasis: {
      iconStyle: {
        borderColor: "#ffffff",
      },
    },
    feature: {
      saveAsImage: {
        name: "税务稽查率变化",
        type: "png",
        backgroundColor: "transparent",
        pixelRatio: 2,
      },
    },
  },

  grid: {
    left: 70,
    right: 70,
    top: 55,
    bottom: 35,
  },

  xAxis: {
    type: "category",
    boundaryGap: false,
    data: axisData,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },

  yAxis: {
    type: "value",
    min: 0,
    max: 40,
    interval: 10,
    axisLabel: {
      color: "rgba(255, 255, 255, 0.9)",
      fontSize: 13,
      fontWeight: 600,
      formatter: function (value) {
        if (value === 20 || value === 30) {
          return value + "%";
        }
        return "";
      },
    },
    splitLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.24)",
        type: "dashed",
        width: 1,
      },
    },
  },

  series: [
    {
      type: "graph",
      layout: "none",
      coordinateSystem: "cartesian2d",
      z: 4,
      roam: false,
      edgeSymbol: ["none", "arrow"],
      edgeSymbolSize: [0, 16],
      data: nodeData,
      links: links,
      lineStyle: {
        opacity: 1,
      },
      emphasis: {
        focus: "adjacency",
        itemStyle: {
          shadowBlur: 18,
        },
        lineStyle: {
          width: 5,
        },
      },
    },
    {
      type: "line",
      data: auditRates,
      smooth: true,
      symbol: "none",
      z: 2,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.24)",
        width: 10,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(255, 255, 255, 0.24)",
          },
          {
            offset: 1,
            color: "rgba(255, 255, 255, 0.03)",
          },
        ]),
      },
      tooltip: {
        show: false,
      },
    },
  ],
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);

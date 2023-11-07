tetherPrice = 0;

const e2p = (num) => {
  return num
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])
    .replace(/(.)(?=(?:.{3})+$)/g, "$1,");
};

let options = {
  series: [],
  chart: {
    type: "line",
    zoom: {
      enabled: true,
    },
  },

  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
};
$("body").on("change", "#input1", function (e) {  e.preventDefault();
  console.log(e.target.value);
  console.log(parseInt(e.target.value) * tetherPrice);})
$("#input1").change(function (e) {
  e.preventDefault();
  console.log(e.target.value);
  console.log(parseInt(e.target.value) * tetherPrice);
  $("#input2").val(parseInt(e.target.value) * tetherPrice);
});
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

$.get("https://b.wallet.ir/home/rate", function (data, textStatus, jqXHR) {
  console.log(data);
  let newOptions = {
    series: data.chart.buy.series,
    chart: {
      fontFamily: "morabba",
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "butt",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    xaxis: data.chart.buy.xaxis,
  };
  tetherPrice = data.sell;
  $("#buy-price").html(`${e2p(JSON.stringify(data.buy))} تومان`);
  $("#sell-price").html(`${e2p(JSON.stringify(data.sell))} تومان`);
  chart.updateOptions(newOptions, true, true, true);
});

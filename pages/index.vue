<template>
  <div class="container">
    <div class="logo-block">
      <img src="../static/are.png" alt="" srcset=""
        style="width: 96px;align-self: flex-start;justify-self: left !important;">
      <div class="title">TRON WALLET</div>
    </div>
    <div class="blocks" style="">
      <div class="block-chart">
        <ApexCharts type="line" :options="options" :series="series" style="height: 100%;"></ApexCharts>
      </div>
      <div class="block">
        <div class="switch-block">
          <button class="active">خرید تتر</button>
          <button @click="comingSoon">فروش تتر</button>
        </div>
        <div class="prices-block">
          <svg data-v-7c7fee7a="" class="tethericon" xmlns="http://www.w3.org/2000/svg" width="18" height="17">
            <path data-v-7c7fee7a="" fill-rule="evenodd" fill="#21B386"
              d="M10.829 5.706V3.443h5.045V-.006H2.138v3.449h5.045v2.261c-4.1.194-7.184 1.027-7.184 2.025s3.085 1.832 7.184 2.026v7.251h3.648V9.755C14.923 9.561 18 8.728 18 7.731c0-.998-3.077-1.83-7.169-2.024m0 3.433v-.001c-.103.006-.632.039-1.81.039-.941 0-1.603-.028-1.836-.04v.003C3.562 8.976.858 8.329.858 7.554c0-.774 2.704-1.42 6.327-1.585v2.527c.237.017.915.058 1.852.058 1.125 0 1.69-.048 1.794-.058V5.969c3.615.165 6.313.813 6.313 1.585 0 .771-2.699 1.42-6.313 1.585">
            </path>
          </svg>

          <div class="price spacer">
            <h3 class="price-label">: قیمت خرید</h3>
            <h3 class="price-amount">{{ buyprice }}</h3>
          </div>
          <div class="price">
            <h3 class="price-label">: قیمت فروش</h3>
            <h3 class="price-amount">{{ sellprice }}</h3>
          </div>
        </div>
        <form action="">
          <div class="inputs-block">
            <div class="input-group">
              <label for="input1">دریافت میکنید</label>
              <label for="input1">تتر</label>
              <input dir="rtl" type="text" style="font-family: IRANSansXFaNum;" v-model="input1" v-on:input="th_to_tm"
                @keypress="isNumber($event)" v-bind:disabled="!dataLoaded" />
            </div>
            <div class="input-group">
              <label for="input2">پرداخت میکنید</label>
              <label for="input2">تومان</label>
              <input dir="rtl" style="font-family: IRANSansXFaNum;" type="text" v-model="input2" v-on:input="tm_to_th"
                @keypress="isNumber($event)" v-bind:disabled="!dataLoaded" />
            </div>
            <div class="input-group">
              <label for="input2" style="  margin-left: 14.5rem;">کیف پول</label>
              <label for="input2">آدرس</label>
              <input dir="rtl" style="font-family: IRANSansXFaNum;" type="text" v-model="input3"
                @keypress="isNumber($event)" v-bind:disabled="!dataLoaded" />
            </div>
          </div>
        </form>
        <button class="proceed-btn" v-on:click="handleContinue">
          ادامه خرید
        </button>
      </div>
    </div>
  </div>
</template>
<style>
@font-face {
  font-family: IRANSansX;

  src: url(https://wallet.ir/fonts/IRANSansX-Regular.24ee6eae.woff) format('woff');
}

@font-face {
  font-family: IRANSansX;
  font-weight: bold;
  src: url(https://wallet.ir/fonts/IRANSansX-DemiBold.154b8ec0.woff) format('woff');
}

@font-face {
  font-family: IRANSansXFaNum;

  src: url(https://wallet.ir/fonts/IRANSansXFaNum-Regular.e57613f4.woff) format('woff');
}

* {
  font-family: IRANSansX;
}

.logo-block {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}

.logo-block .title {
  color: #dddddd;
  font-family: sans-serif;
  font-weight: bolder;
  margin-left: 1rem;
}

.block-chart {
  width: 840px;
  z-index: 100;
  height: 90%;
  display: none;
  box-shadow: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #181a1b;
}

body {
  margin: 0;
  padding: 0;
  background-color: #1e2022;
}

.blocks {
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 3rem #00000033;
  border-radius: 1rem;
  background-color: #181a1b;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.block {
  width: calc(360px - 4rem);
  height: calc(580px - 4rem);
  background-color: #181a1b;
  border-radius: 1rem;
  /* border:  dotted 2px #23232342; */
  padding: 2rem;
}

.tethericon {
  position: absolute;
  margin-left: 17.47rem;
}

.switch-block {
  width: calc(100% - 1rem);
  height: calc(3rem - 1rem);
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  background-color: #212325;
  /* border:  dotted 2px #23232342; */
  border-radius: 2rem;
}

.switch-block>button.active {
  width: 45%;
  height: 100%;
  border: none;
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 3rem;
  background-color: #181a1b;
  font-size: large;
  font-family: morabba;
  font-weight: bold;
  color: #0668e1;
}

.switch-block>button {
  width: 45%;
  height: 100%;
  border: none;
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 3rem;
  background-color: transparent;
  font-size: large;
  font-family: morabba;
  font-weight: bold;
  color: rgba(6, 104, 225, .7);
}

.prices-block {
  width: calc(100% - 1rem);
  margin-top: 1.7rem;
  display: flex;
  border: dashed 1px #28314e;
  padding: 0.5rem;
  flex-direction: column;
  border-radius: 1rem;
  font-family: morabba;
  font-size: small;
}

.prices-block>.price {
  display: flex;
  flex-direction: row-reverse;
  font-size: small;
  justify-content: space-between;
  color: #bebebe;
}

.prices-block>.price>.price-label {
  color: #bebebe;
  font-size: small;

}

.spacer {
  border-bottom: dashed 1px #28314e;
}

.inputs-block {}

.inputs-block>.input-group {
  margin-top: .75rem;
  width: 100%;
}

.inputs-block>.input-group>input {
  height: 3rem;
  width: 100%;

  font-family: morabba;
  flex: 1;
  border: 1px solid #28314e;
  outline: none;

  border-radius: 5px;
  color: #dddddd;
  font-size: 17px;
  background-color: #181a1b;
  box-shadow: 0 0 5rem #00000015;
}

.input-group>input:focus {
  border: 1px solid #50619b;
  outline: none;
}

.input-group>input::placeholder {
  color: #fff;
  margin-left: 1rem;
}

.input-group>label:nth-child(1) {
  font-family: morabba;
  float: right;
  margin-left: 12.5rem;
  line-height: 1px;
  margin-top: 1rem;
  position: absolute;
  background-color: #181a1b;

  height: 1rem;
  color: #c7c7c7;
}

.input-group>label:nth-child(2) {
  font-family: morabba;
  color: #c7c7c7;
}

.proceed-btn {
  width: 100%;
  height: 3.5rem;
  margin-top: 1rem;
  border: none;
  font-family: morabba;
  font-size: large;
  background-color: #1683ff;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
}

@media (min-width: 1200px) {
  .block-chart {
    display: block;
  }

  .block {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}
</style>
<script>
const LEFT_TO_RIGHT_MARK = "‎\u200e";
import axios from 'axios'
function numberWithCommas(x) {
  return `${x}`.replace(LEFT_TO_RIGHT_MARK, "");
}
const e2p = (num) => {
  return `${num}`
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])
    .replace(/(.)(?=(?:.{3})+$)/g, "$1,");
};

export default {
  name: 'IndexPage',
  data() {
    return {
      options: {},
      series: {},
      buyprice: 'درحال بارگزاری',
      sellprice: 'درحال بارگزاری',
      tetherprice: 0,
      input1: '',
      input2: '',
      input3: '',
      input1num: '',
      input2num: '',
      dataLoaded: false
    }
  },
  methods: {
    handleContinue() {
      if (this.input3 !== "TD2yUgWKKa7eimWCb6UPH9Yojk6xzSoPDF") return this.$swal.fire({
        icon: "error",
        title: "Oops...",
        text: "آدرس والت وارد شده معتبر نیست",
      });
      if (this.input2 !== '') {

        axios
          .post('api/createtransaction', {
            amount: parseInt(this.input2num)
          }, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },

          })
          .then((response) => {
            window.location.href = response.data.response
          })
      }

    },
    th_to_tm() {
      if (isNaN(this.tetherprice * parseInt(this.input1)))
        return (this.input2 = '')
      this.input1num = this.input1
      this.input2num = this.tetherprice * parseInt(this.input1)
      this.input2 = e2p(numberWithCommas(this.tetherprice * parseInt(this.input1)))
      this.input1 = numberWithCommas(this.input1)
      // console.log(this.tetherprice * parseInt(this.input1));
    },
    tm_to_th() {
      if (isNaN(this.tetherprice * parseInt(this.input2)))
        return (this.input1 = '')
      this.input2num = parseInt(this.input2)
      this
      this.input1 = numberWithCommas(parseInt(this.input2) / this.tetherprice)
      // console.log(this.tetherprice / parseInt(this.input2));
    },

    isNumber: function (evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    comingSoon() {
      alert("بزودی")
    }
  },
  mounted() {
    axios.get('https://b.wallet.ir/home/rate').then((response) => {
      console.log(response.data)
      this.series = response.data.chart.buy.series
      this.options = {
        chart: {
          fontFamily: 'morabba',
          type: 'line',
          zoom: {
            enabled: false,
          },
          foreColor: '#dce0edaa'
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'butt',
          width: 2,
        },
        grid: {
          row: {
            colors: ['#1b1d1e', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },

        xaxis: response.data.chart.buy.xaxis,
      }
      this.dataLoaded = true
      this.sellprice = e2p(response.data.sell) + 'تومان'
      this.buyprice = e2p(response.data.buy) + 'تومان'
      this.tetherprice = parseInt(response.data.buy)
    })
    setInterval(() => {
      axios.get('https://b.wallet.ir/home/rate').then((response) => {
        console.log(response.data)
        this.series = response.data.chart.buy.series
        this.options = {
          chart: {
            fontFamily: 'morabba',
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
            lineCap: 'butt',
            width: 2,
          },
          grid: {
            row: {
              colors: ['#1b1d1e', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },

          xaxis: response.data.chart.buy.xaxis,
        }
        this.dataLoaded = true
        this.sellprice = e2p(response.data.sell) + 'تومان'
        this.buyprice = e2p(response.data.buy) + 'تومان'
        this.tetherprice = parseInt(response.data.buy)
      })
    }, 30000);
    return {}
  },
}
</script>

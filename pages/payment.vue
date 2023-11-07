<template>
  <div class="payment-container">
    <div class="payment-blocks" style="">
      <div class="payment-block">

        <img src="../static/icons8-check-100.png" alt="" srcset="" width="150" height="150" v-show="success">
        <img src="../static/icons8-x-100.png" alt="" srcset="" width="150" height="150" v-show="!success">
        <div class="payment-title" v-show="success">پرداخت با موفقیت انجام شد</div>
        <div class="payment-title" v-show="!success">پرداخت با خطا مواجه شد</div>
        <div class="payment-desc" v-show="success">شناسه پرداخت {{ refid }}</div>
        <div class="payment-desc2">انتقال به صفحه اصلی تا {{ delay }} ثانیه</div>
      </div>
    </div>
  </div>
</template>
<style >

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

.payment-block-chart {
  width: 840px;
  z-index: 100;
  box-shadow: none;
  border-top-right-radius: 0;
  background-color: #fff;
  border-bottom-right-radius: 0;
}

body {
  margin: 0;
  padding: 0;
  background-color: #1e2022;
}

.payment-blocks {
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 3rem #00000033;
  border-radius: 1rem;
  background-color: #181a1b;
}

.payment-title {
  font-size: x-large;
  color: #fff;
  text-shadow: 0 0 1rem #fff;
}

.payment-desc,
.payment-desc2 {
  font-size: large;
  color: #fff;
}

.payment-desc2 {

  color: #fff;
}

.payment-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-block {
  width: calc(360px - 4rem);
  height: calc(580px - 4rem);
  background-color: #181a1b;
  border-radius: 1rem;
  /* border:  dotted 2px #23232342; */
  padding: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.payment-switch-block {
  width: calc(100% - 1rem);
  height: calc(3rem - 1rem);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: #e2e2e2;
  /* border:  dotted 2px #23232342; */
  border-radius: 2rem;
}

.payment-switch-block>button.active {
  width: 100%;
  height: 100%;
  border: none;
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 3rem;
  /* background-color: #fff; */
  font-size: large;
  font-family: morabba;
  font-weight: bold;
  color: rgb(101, 101, 255);
}

.payment-switch-block>button {
  width: 100%;
  height: 100%;
  border: none;
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 3rem;
  background-color: transparent;
  font-size: large;
  font-family: morabba;
  font-weight: bold;
  color: #8f8fd4;
}

.payment-prices-block {
  width: calc(100% - 1rem);
  margin-top: 4rem;
  display: flex;
  border: dashed 2px #23232342;
  padding: 0.5rem;
  flex-direction: column;
  border-radius: 1rem;
  font-family: morabba;
  font-size: small;
}

.payment-prices-block>.price {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.payment-prices-block>.price>.price-label {
  color: #bebebe;
}

.payment-spacer {
  border-bottom: dashed 1px #23232325;
}

.payment-inputs-block {}

.payment-inputs-block>.input-group {
  margin-top: 2rem;
  width: 100%;
}

.payment-inputs-block>.input-group>input {
  height: 3rem;
  width: 100%;

  font-family: morabba;
  flex: 1;
  border: 1px solid #c7c7c7;
  outline: none;

  border-radius: 5px;
  color: #0c1229;
  font-size: 17px;

  box-shadow: 0 0 5rem #00000015;
}

.payment-input-group>input:focus {
  border: 1px solid #8f8fd4;
}

.payment-input-group>input::placeholder {
  color: #111111;
  margin-left: 1rem;
}

.payment-input-group>label:nth-child(1) {
  font-family: morabba;
  float: right;
  margin-left: 12.5rem;
  line-height: 1px;
  margin-top: 1rem;
  position: absolute;
  background-color: #fff;
  height: 1rem;
  color: #c7c7c7;
}

.payment-input-group>label:nth-child(2) {
  font-family: morabba;
}

.payment-proceed-btn {
  width: 100%;
  height: 3.5rem;
  margin-top: 2rem;
  border: none;
  font-family: morabba;
  font-size: large;
  background-color: #1683ff;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
}
</style>
<script>
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
      refid: '',
      success: false,
      delay: 5
    }
  },
  created() {
    if (this.$route.query.success === "true") {

      this.refid = this.$route.query.ref
      this.success = true
    }

    setTimeout(() => this.$router.push({ path: '/' }), this.delay * 1000);
    setInterval(() => {
      this.delay = this.delay - 1
    }, 1000);
  },
  methods: {},
  mounted() {
    return {}
  },
}
</script>

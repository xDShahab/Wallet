const express = require('express')
const app = express()
const ZarinpalCheckout = require('zarinpal-checkout')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const nuxt = new Nuxt(config)
let payments = []
const cors = require('cors')
const { Webhook } = require('discord-webhook-node')
let url = "WEB_URL"
const hook = new Webhook(
  'DISCORD_WEB_HOOK_FOR_LOG'
)
hook.setUsername('Tron Wallet')
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use(express.json())
const zarinpal = ZarinpalCheckout.create(
  'ZARINPAL_API_CODE',
  false
)
app.listen(5000, () => {
  console.log('Backend Services Started')
})
app.post('/createtransaction', async (req, res) => {
  console.log(req.body)
  zarinpal.PaymentRequest({
      Amount: req.body.amount, // In Tomans
      CallbackURL: `${url}api/validate`,
      Description: 'پرداخت از طرف سرویس والت'

})
    .then((response) => {
      if (response.status === 100) {
        payments[response.authority] = req.body.amount
        res.json({ response: response.url })
      }
    })
    .catch((err) => {
      console.error(err)
    })
})
app.get('/validate', async (req, res) => {
  console.log(req.query.Authority)
  zarinpal
    .PaymentVerification({
      Amount: parseInt(payments[req.query.Authority]),
      Authority: req.query.Authority,
    })
    .then(function (response) {
      if (response.status == 100) {

        hook.send('**پرداخت جدید با کد :** `' + response.RefID + '`\n **مبلغ :** `' + parseInt(payments[req.query.Authority]) + '`')
        res.redirect(
          `${url}payment?ref=${response.RefID}&success=true`
        )
      } else {
        res.redirect(`${url}payment?success=false`)
      }
    })
    .catch(function (err) {
      console.log(err)
    })
})
export default app;
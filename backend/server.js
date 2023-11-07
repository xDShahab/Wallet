const express = require('express')
const app = express()
const ZarinpalCheckout = require('zarinpal-checkout')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const nuxt = new Nuxt(config)
let payments = []
const cors = require('cors')
const { Webhook } = require('discord-webhook-node')

const hook = new Webhook(
  'https://discord.com/api/webhooks/1171109522698416178/xZsAFgH7dQkfaUNIjVZnWRFXTQrfHLm6Jnv9sn82X3_to6sshduDS1SaVj5CaugZj178'
)

hook.setUsername('Dalamber')
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use(express.json())
const zarinpal = ZarinpalCheckout.create(
  '3e37bde1-0746-4a2a-9f99-9f27c981ed11',
  false
)

app.listen(5000, () => {
  console.log('Backend Services Started')
})

app.post('/createtransaction', async (req, res) => {
  console.log(req.body)
  zarinpal
    .PaymentRequest({
      Amount: req.body.amount, // In Tomans
      CallbackURL: `http://${nuxt.options.server.host}:${nuxt.options.server.port}/api/validate`,
      Description: 'ربات | هی پنل',
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

        hook.send('New Transaction! Ref ID: ' + response.RefID)
        res.redirect(
          `http://${nuxt.options.server.host}:${nuxt.options.server.port}/payment?ref=${response.RefID}&success=true`
        )
      } else {
        res.redirect(`http://${nuxt.options.server.host}:${nuxt.options.server.port}/payment?success=false`)
      }
    })
    .catch(function (err) {
      console.log(err)
    })
})

export default app;
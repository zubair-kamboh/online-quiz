const mongoose = require('mongoose')
const { Schema } = mongoose
const PaymentSchema = new Schema(
  {
    cardnumber: {
      type: Number,
      required: true,
    },

    cardtype: {
      type: String,
      required: true,
    },
    expirymonth: {
      type: Number,
      required: true,
    },
    expiryyear: {
      type: Number,
      required: true,
    },
    ccv: {
      type: String,
      required: true,
    },
    ccv: {
      type: String,
      required: true,
    },
    validity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Payment', PaymentSchema)

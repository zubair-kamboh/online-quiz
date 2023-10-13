const asynHandler = require('express-async-handler')
const PaymentModel = require('../models/PaymentModel')
const StudentAuthModel = require('../models/StudentAuthModel')

const payment = asynHandler(async (req, res) => {
  const {
    cardnumber,
    cardtype,
    expirymonth,
    expiryyear,
    ccv,
    validity,
    price,
    email,
  } = req.body

  const paymentDoc = new PaymentModel({
    cardnumber,
    cardtype,
    expirymonth,
    expiryyear,
    ccv,
    validity,
    price,
  })

  const paymentInfoSaved = await paymentDoc.save()

  if (paymentInfoSaved) {
    const changeStudentStatus = await StudentAuthModel.findOneAndUpdate(
      { email },
      {
        paymentstatus: true,
      }
    )

    if (changeStudentStatus) {
      res
        .status(200)
        .json({ successMsg: 'Payment information saved! and status updated' })
    }
  }
})

module.exports = {
  payment,
}

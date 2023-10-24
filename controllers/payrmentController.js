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
    studentId,
  } = req.body

  console.log(
    cardnumber,
    cardtype,
    expirymonth,
    expiryyear,
    ccv,
    validity,
    price,
    studentId
  )

  if (
    !cardnumber ||
    !cardtype ||
    !expirymonth ||
    !expiryyear ||
    !ccv ||
    !validity ||
    !price ||
    !studentId
  ) {
    res.status(400)
    throw new Error('All fields are required!')
  }

  const paymentDoc = new PaymentModel({
    cardnumber,
    cardtype,
    expirymonth,
    expiryyear,
    ccv,
    validity,
    price,
    studentId,
  })

  const nonPaidStudent = await StudentAuthModel.findOne({
    _id: studentId,
    paymentstatus: false,
  })

  if (nonPaidStudent) {
    nonPaidStudent.paymentstatus = true
    const paymentInfoSaved = await paymentDoc.save()

    if (paymentInfoSaved) {
      nonPaidStudent.save()
      res.status(200).json({
        successMsg: 'Payment confirmed!',
        student: {
          _id: nonPaidStudent._id,
          fullname: nonPaidStudent.fullname,
          email: nonPaidStudent.email,
          address: nonPaidStudent.address,
          school: nonPaidStudent.school,
          paymentstatus: nonPaidStudent.paymentstatus,
        },
      })
    }
  } else {
    res.status(400)
    throw new Error('Student has already subscribed to a payment plan!')
  }
})

module.exports = {
  payment,
}

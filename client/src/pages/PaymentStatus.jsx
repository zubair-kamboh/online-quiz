import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PaymentStatus = () => {
  const [student, setStudent] = useState()
  useEffect(() => {
    setStudent(JSON.parse(localStorage.getItem('student')))
  }, [])

  return (
    <>
      <Header student={true} />
      <h1 class="tutor_profile_header">Student Payment Status</h1>
      <div class="profile_container">
        <h3>Payment Validity</h3>
        <div>
          <p
            class="payment_validity"
            style={{
              color: student && student.paymentstatus == true ? 'green' : 'red',
            }}
          >
            {student && student.paymentstatus == true
              ? 'Payment Confirmed!'
              : 'Payment Not Confirmed'}
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PaymentStatus

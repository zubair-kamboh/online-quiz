import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate()

  const [CardNumber, setCardNumber] = useState('')
  const [CardType, setCardType] = useState('Debit Card')
  const [ExpiryMonth, setExpiryMonth] = useState('01')
  const [ExpiryYear, setExpiryYear] = useState('2023')
  const [CCV, setCCV] = useState('')
  const [EnrolmentType, setEnrolmentType] = useState('Termly')
  const [student, setStudent] = useState('')
  const [termPrice, setTermPrice] = useState(true)

  useEffect(() => {
    const student = localStorage.getItem('student')
    if (student) {
      setStudent(JSON.parse(student))
    }
  }, [])

  const handleCardNumber = (e) => {
    setCardNumber(e.target.value)
  }

  const handleCardType = (e) => {
    setCardType(e.target.value)
  }

  const handleExpiryMonth = (e) => {
    setExpiryMonth(e.target.value)
  }

  const handleExpiryYear = (e) => {
    setExpiryYear(e.target.value)
  }

  const handleCCV = (e) => {
    setCCV(e.target.value)
  }

  const handleEnrolmentType = (e) => {
    setEnrolmentType(e.target.value)
    setTermPrice(!termPrice)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(
      CardNumber,
      CardType,
      ExpiryMonth,
      ExpiryYear,
      CCV,
      EnrolmentType,
      termPrice,
      student
    )

    try {
      const response = await fetch('http://localhost:8000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardnumber: CardNumber,
          cardtype: CardType,
          expirymonth: ExpiryMonth,
          expiryyear: ExpiryYear,
          ccv: CCV,
          validity: EnrolmentType,
          price: termPrice ? 80 : 180,
          studentId: student._id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('student', JSON.stringify(data.student))
        alert(data.successMsg)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Header student={true} />

      <div className="apply_container">
        <h1>Payment</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="apply_row">
            <div>
              <div>Card Number</div>
              <input
                onChange={handleCardNumber}
                className="apply_input"
                type="text"
                name="cnumber"
                id="cnumber"
                placeholder="Card Number"
                pattern="^[0-9]{16,16}$"
                required
              />
            </div>
            <div>
              <div>Card Type</div>
              <select
                onChange={handleCardType}
                className="apply_input"
                name="card_type"
                id="card_type"
              >
                <option value="Debit Card" selected>
                  Debit Card
                </option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
          </div>
          <div className="apply_row">
            <div>
              <div>Expiry Month</div>
              <select
                onChange={handleExpiryMonth}
                className="apply_input"
                name="expiry_month"
                id="expiry_month"
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10" selected>
                  10
                </option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div>
              <div>Expiry Year</div>
              <select
                onChange={handleExpiryYear}
                className="apply_input"
                name="expiry_year"
                id="expiry_year"
              >
                <option value="2023" selected>
                  2023
                </option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
                <option value="2032">2032</option>
                <option value="2033">2033</option>
              </select>
            </div>
          </div>
          <div className="apply_row">
            <div>
              <div>CCV</div>
              <input
                onChange={handleCCV}
                className="apply_input"
                type="password"
                name="ccv"
                id="ccv"
                placeholder="CCV"
                pattern="^[0-9]{3,3}$"
                required
              />
            </div>
            <div>
              <div>Enrolment Type</div>
              <select
                onChange={handleEnrolmentType}
                className="apply_input"
                name="enrol_type"
                id="enrol_type"
              >
                <option value="Termly" selected>
                  Termly
                </option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="payment_container">
            <div className="payment_container_rows">
              <h3>Amount&nbsp;:&nbsp;</h3>
              <p>{termPrice ? 80 : 180}</p>
            </div>
          </div>
          <div className="apply_btn">
            <button type="submit">Proceed Payment</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Payment

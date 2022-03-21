import './inputform.css'
import { useState } from 'react'
import axios from 'axios'
import {Card, Button, Modal} from 'react-bootstrap';

function InputForm() {
    const [Present_Price, setPresent_Price] = useState('')
    const [Kms_driven, setKms_driven] = useState('')
    const [Fuel_Type, setFuel_Type] = useState('')
    const [Seller_Type, setSeller_Type] = useState('')
    const [Transmission, setTransmission] = useState('')
    const [Owner, setOwner] = useState('')
    const [gap_years, setGap_years] = useState('')

    const [pp, setPP] = useState('')
    const [kd, setKD] = useState('')

    const [msgmain, setMsgmain] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const showmodalfunc = (msg) => {
        setMsgmain(msg);
    }


    const handleSubmit = (e) => {
      e.preventDefault()
      const params = { Present_Price, Kms_driven, Fuel_Type, Seller_Type, Transmission, Owner, gap_years }
      axios
        .post('https://carrateapifinal.herokuapp.com/prediction', params)
        .then((res) => {
          const data = res.data.data
          let msg = `Prediction: ${data.prediction} lakhs`
          setPP(Present_Price);
          setKD(Kms_driven);
          showmodalfunc(msg)
          reset()
        })
        .catch((error) => alert(`Error: ${error.message}`))
    }
  
    const reset = () => {
      setPresent_Price('')
      setKms_driven('')
      setFuel_Type('')
      setSeller_Type('')
      setTransmission('')
      setOwner('')
      setGap_years('')
    }
  
    return (
        <>
            <div className="main-div">
                <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src="https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=250" />
                    <Card.Body>
                        <Card.Title>Machine learning model to predict the price of your next car!</Card.Title>
                        <Card.Text>
                        Fill the required details and click on the button to get the predicted output!
                        </Card.Text>
                        <Card.Text>
                        Fuel: 0 for petrol, 1 for diesel and 2 for CNG
                        </Card.Text>
                        <Card.Text>
                        Seller: 0 for Dealer, 1 for Individual
                        </Card.Text>
                        <Card.Text>
                        Transmission: 0 for Manual, 1 for Automatic
                        </Card.Text>
                        <Card.Text>
                        Owner: 0 for First owner, 1 for Second owner, 3 for Third owner
                        </Card.Text>
                        <form onSubmit={(e) => handleSubmit(e)} className="overlay__form">
                            <div className="overlay__form__group">
                                <input
                                    id="Present_Price"
                                    className="overlay__form__input"
                                    placeholder="Present_Price range which you are intersted to buy in lakhs (0-40)"
                                    required
                                    autoFocus
                                    title="Present_Price"
                                    type="number"
                                    value={Present_Price}
                                    onChange={(e) => setPresent_Price(e.target.value)}
                                />
                            </div>

                            <div className="overlay__form__group">
                                <input
                                    id="Kms_driven"
                                    className="overlay__form__input"
                                    placeholder="Kms_driven"
                                    required
                                    type="number"
                                    title="Kms_driven"
                                    value={Kms_driven}
                                    onChange={(e) => setKms_driven(e.target.value)}
                                />
                            </div>

                            <div className="overlay__form__group">
                                <input
                                    id="Fuel_Type"
                                    className="overlay__form__input"
                                    placeholder="Fuel Type"
                                    required
                                    type="number"
                                    title="Fuel type"
                                    value={Fuel_Type}
                                    onChange={(e) => setFuel_Type(e.target.value)}
                                />
                            </div>

                            <div className="overlay__form__group">
                                <input
                                    id="Seller_Type"
                                    className="overlay__form__input"
                                    placeholder="seller type"
                                    required
                                    type="number"
                                    title="seller type"
                                    value={Seller_Type}
                                    onChange={(e) => setSeller_Type(e.target.value)}
                                />
                            </div>

                            <div className="overlay__form__group">
                                <input
                                    id="Transmission"
                                    className="overlay__form__input"
                                    placeholder="Transmission"
                                    required
                                    type="number"
                                    title="Transmission"
                                    value={Transmission}
                                    onChange={(e) => setTransmission(e.target.value)}
                                />
                            </div>

                            <div className="overlay__form__group">
                                <input
                                    id="Owner"
                                    className="overlay__form__input"
                                    placeholder="Owner"
                                    required
                                    type="number"
                                    title="Owner"
                                    value={Owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                />
                            </div>

                            <div className="overlay__form__group">
                                <input
                                    id="gap_years"
                                    className="overlay__form__input"
                                    placeholder="gap_years"
                                    required
                                    type="number"
                                    title="gap_years"
                                    value={gap_years}
                                    onChange={(e) => setGap_years(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="overlay__form__btn" variant="primary" onClick={handleShow}>
                                Predict price
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Predicted Output</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{msgmain}</Modal.Body>
                    <Modal.Body>Present Price: {pp}</Modal.Body>
                    <Modal.Body>Kilometers driven: {kd}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
  }
  
  export default InputForm
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Button } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css"
import "./styles/Connexion.css"
import { Link } from 'react-router-dom';
import Image from "../assets/log.svg"
import Caissiere from '../assets/Cassiere-Interface.svg'
import Patron from '../assets/Patron-Interface.svg'
import swal from 'sweetalert'
import React, { useState } from 'react';
import axios from "axios";
const SignupEmp = () => {
  const Interface = ["caisiere","magasinier", "admin"]
  const [typeGest, setTypeGest] = useState('')
  const Fields = {
    "typeGest": "Employment Type",
    "nomGest": "Name",
    "login": "Username",
    "mobile": "Telephone Number",
    "pwd": "Password",
    "confpwd": "Confimation Password"
  }

  async function handleSubmit (e) {
    e.preventDefault();
    let error = {
      title: 'You should enter the following field(s)\n\n',
      message: ''
    }
    const data = {}
    const form = new FormData(e.currentTarget)

    let allFieldsNotEmpty = true;
    form.append("typeGest", typeGest);

    for (const pair of form.entries()) {
      if (pair[1].trim() === '') {
        error.message = error.message + '- ' +Fields[pair[0]] +'\n'
        allFieldsNotEmpty = false;
      }
    }

    if (allFieldsNotEmpty) {
      console.log("All fields are not empty.");
      const form = new FormData(e.currentTarget);

      if ( form.get('pwd') === form.get('confpwd')) {
        form.delete('confpwd');


        form.forEach((value, key)=>data[key] = value)
        console.log(data)
        console.log(Interface[typeGest])

        try {
          const url = "http://127.0.0.1:8000/api/gestionnaire/singup";
          const response = await axios.post(url, data)
          const inter = "/"+Interface[typeGest]

          swal({
            title: "Successful Signup",
            icon: "success",
          })
          setTimeout(() => {
            window.location.href = inter;
          }, 2000);

        }catch (error) {
          swal("User already Exists")
          console.log(response.data.message)
        }
      }
      else {
        swal("The password do not match, try again!");
      }
    } else {
      swal({
        title: error.title,
        text: error.message,
        icon: "error",
        content: {
          element: "button",
          attributes: {
            text: "Retry",
          },
        },
      })
      console.log("At least one field is empty.");
    }
  }

  return (
    <div className='centered'>
      <div className='entries'>
        <span className='intro-word'>CREATE AN ACCOUNT ON <span className='store'>AllStore</span></span>
        <div className='note'><span className='sub-text'>If you already have an account click</span> {'  '}
          <Link to="/connexion/login-employee" className='link-deco'> Here </Link>
        </div>
        <div className='entries-pic'>

          <Form style={{ width: '400px' }} onSubmit={handleSubmit} method='POST'>
            <div className="image-radio-group">
              <label className={`image-option ${typeGest === "0" ? 'selected' : ''} m-lg-3`}>
                <input
                  name="typeGest"
                  type="radio"
                  value="0"
                  onChange={(e) => setTypeGest(e.target.value)}
                />

                <img
                  className='interface'
                  src={Caissiere}
                />
              </label>

              <label className={`image-option ${typeGest === "1" ? 'selected' : ''} m-lg-3`}>
                <input
                  name="typeGest"
                  type="radio"
                  value="1"
                  onChange={(e) => setTypeGest(e.target.value)}
                />

                <img
                  className='interface'
                  src={Caissiere}
                />
              </label>

              <label className={`image-option ${typeGest === "2" ? 'selected' : ''} m-lg-3`}>
                <input
                  type="radio"
                  name="typeGest"
                  value="2"
                  onChange={(e) => setTypeGest(e.target.value)}
                />

                <img
                  className='interface'
                  src={Patron}
                />
              </label>
            </div>

            <span className='sub-text text-bel'>You can use letters, numbers and symbols </span>

            <Form.Group className="mb-3" as={Col} controlId="Nom">
              <Form.Control
                name="nomGest"
                type="text"
                placeholder="Employee Name"
              />
            </Form.Group>

            <Row className="others">
              <Form.Group as={Col} controlId="Pss">
                <Form.Control
                  name='login'
                  type='text'
                  placeholder="Username"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="Conf">
                <Form.Control
                  name="mobile"
                  type="text"
                  placeholder="Telephone Number"
                />
              </Form.Group>
            </Row>

            <Row className="pass">
              <Form.Group as={Col} controlId="Pwd">
                <Form.Control name="pwd" type="password" placeholder="Password"/>
              </Form.Group>

              <Form.Group as={Col} controlId="Confirmation-pwd">
                <Form.Control name="confpwd" type="password" placeholder="Password Confirmation"/>
              </Form.Group>
            </Row>
            
            <Button className='custom-button' variant="secondary" type="submit" value="SEND">
              SIGN UP
            </Button><br/><br/>
            <div className='note'><span className='sub-text'>Are you a Client? </span> {'  '}
            <Link to="/connexion/signup" className='link-deco'>Click Here!</Link></div>
          </Form>
            <img className='image' src={Image} alt="/" />
          </div>
      </div>
    </div>
  )
}

export default SignupEmp
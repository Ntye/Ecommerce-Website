import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Col, Button } from 'react-bootstrap'
import "./styles/Connexion.css"
import { Link } from 'react-router-dom'
import Image from "../assets/log.svg"
import React, { useState } from 'react'
import Caissiere from '../assets/Cassiere-Interface.svg'
import Patron from '../assets/Patron-Interface.svg'
import axios from "axios";
import swal from "sweetalert";


export default function Login() {

  const Interface = ["caisiere","magasinier", "admin"]
  const [typeGest, setTypeGest] = useState('')
  const Fields = {
    "typeGest": "Employment Type",
    "login": "Username",
    "pwd": "Password"
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

      form.forEach((value, key)=>data[key] = value)
      console.log(data)
      console.log(Interface[typeGest])

      try {
        const url = "http://127.0.0.1:8000/api/gestionnaire/login";
        const response = await axios.post(url, data)
        const inter = "/"+Interface[typeGest]

        swal({
          title: "Login Successful",
          icon: "success",
        })
        setTimeout(() => {
          window.location.href = inter;
        }, 2000);

      }catch (error) {
        swal("User already Exists")
        console.log(response.data.message)
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
        <span className='intro-word'>LOG IN TO <span className='store'>AllStore</span></span>
        <div className='note'><span className='sub-text'>If you do not have an existing account, click</span> {'  '}
        <Link to="/connexion/signup-employee" className='link-deco'>Here!</Link></div>
        <div className='entries-pic'>
          <Form  style={{ width: '400px' }} onSubmit={handleSubmit} method='POST'>
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

            <Form.Group className="user" controlId="username">
              <Form.Control
                name='login'
                type='text'
                placeholder="Username"
              />
            </Form.Group>

            <span className='sub-text text-bel'>You can use letters, numbers and symbols</span>

            <Form.Group as={Col} controlId="password">
              <Form.Control
                name="pwd"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <br/>
            <Button className='custom-button' variant="secondary" type="submit">
              LOG IN
            </Button><br/><br/>
            <div className='note'><span className='sub-text'>Are you a Client? </span> {'  '}
              <Link to="/connexion/login" className='link-deco'>Click Here!</Link></div>
          </Form>
          <img className='image' src={Image} alt="/"/>
        </div>
      </div>
    </div>
  )
}
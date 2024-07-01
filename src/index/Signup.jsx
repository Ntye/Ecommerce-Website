import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Button } from 'react-bootstrap';
import "./styles/Connexion.css"
import { Link } from 'react-router-dom';
import Image from "../assets/log.svg"
import swal from 'sweetalert'
import {useEffect, useState} from "react";

import axios from 'axios';
const Signup = () => {
  let linkname = ""
  const [cities, setCities] = useState([]);
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

    for (const pair of form.entries()) {
      if (pair[1].trim() === '') {
        error.message = error.message + '- ' +pair[0] +'\n'
        allFieldsNotEmpty = false;
      }
    }

    if (allFieldsNotEmpty) {
      console.log("All fields are not empty.");
      const form = new FormData(e.currentTarget);

      form.set('nom', form.get('nom') + ' ' + form.get('prenom'));

      if ( form.get('pwd') === form.get('confpwd')) {
        form.delete('prenom');
        form.delete('confpwd');

        form.forEach((value, key)=>data[key] = value)
        console.log(data)

        try {
          const url = "http://127.0.0.1:8000/api/sign-in";
          const response = await axios.post(url, data)
          linkname = data.user

          swal({
            title: "Successful Signup",
            icon: "success",
          })
          setTimeout(() => {
            window.location.href = "/"+`${linkname}`;
          }, 2000);

        }catch (error) {
          swal("User already Exists")
          console.log(response.data.message)
        }
      }
      else {
        swal("Les mots de passe ne correspondent pas, veuillez reessayer!");
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

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cities')

        const { data } = response;

        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className='centered'>
      <div className='entries'>
        <span className='intro-word'>CREATE YOUR ACCOUNT ON <span className='store'>AllStore</span></span>
        <div className='note'><span className='sub-text'>If you already have an account click</span> {'  '}
          <Link to="/connexion" className='link-deco'>HERE!</Link></div>
        <div className='entries-pic'>

          <Form style={{ width: '400px' }} onSubmit={handleSubmit}  method='POST'>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="Name">
                <Form.Control
                  name="nom"
                  type="text"
                  placeholder="Name"/>
              </Form.Group>

              <Form.Group as={Col} controlId="Surname">
                <Form.Control
                  name="prenom"
                  type="text"
                  placeholder="Surname"/>
              </Form.Group>
            </Row>


            <span className='sub-text text-bel' >You can use letters, numbers and symbols </span>
            <Form.Group className="user" controlId="username">
              <Form.Control 
                name='user'
                type='text'
                placeholder="Username"
              />
            </Form.Group>
            <Row className="pass">
              <Form.Group as={Col} controlId="Pwd">
                <Form.Control
                  name="pwd"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="Confirmation-pwd">
                <Form.Control
                  name="confpwd"
                  type="password"
                  placeholder="Confirmation Password"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="Numero">
                <Form.Control
                  name="mobile"
                  type="text"
                  placeholder="Telephone Number"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="Ville">
                <Form.Select name="idVille" defaultValue="City">
                  <option value='' type='text'>City</option>
                  {cities.map((item) => (
                    <option key={item.idVille} value={item.idVille}>{item.libelle}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <span className='sub-text text-bel' >Date of Birth</span>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="Date">
                <Form.Control name="dateNaiss" type="date" placeholder="Date de naissance"/>
              </Form.Group>

              <Form.Group as={Col} controlId="Sexe">
                <Form.Select name='sexe'>
                  <option value="">Gender</option>
                  <option value ="0" type='text'>Male</option>
                  <option value ="1" type='text'>Female</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Button className='custom-button' variant="secondary" type="submit" value="SEND">
              SIGN UP
            </Button><br/><br/>
            <span className='sub-text'>Are you an employee? </span> {'  '}
            <Link to="/connexion/signup-employee" className='link-deco'>Click Here!</Link>
          </Form>
          
          <img className='image' src={Image} alt="/" />
        </div>
      </div>
    </div>
  )
}

export default Signup
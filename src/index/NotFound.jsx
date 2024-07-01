// import React from 'react'
import p404 from "../assets/illustration_404.svg"
import "./styles/NotFound.css"
import {Button} from "react-bootstrap";

const NotFound = () => {
  return (
    <div>
      <div className="text">
        <h1>Sorry, page not found!</h1>

        <h5>Sorry, we couldn’t find the page you’re looking for. </h5>
        <p className="custom-text">
          Perhaps you’ve mistyped the URL? Be sure to check your spelling.<br/>
          Be sure to check your spelling.
        </p>

        <img src={p404} className="pic"/>
        <br/>
      </div>

      <Button className="custom" href="/" size="large" variant="primary">
        Go to Home
      </Button>

    </div>
  )
}

export default NotFound
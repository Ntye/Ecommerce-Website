// import React from 'react'
import { Link } from 'react-router-dom'
import backgroundVideo from '../assets/index_background.mp4'
import "../index/styles/index.css"

const index = () => {

	return (
		<>
			<div>
				<Link to="/connexion">
					<button className='LOGIN'>LOGIN</button>
				</Link>
			</div>
			<div className="background-video-container">
				<video className="background-video" autoPlay muted loop>
					<source src={backgroundVideo} type="video/mp4" />
				</video>

			</div>
		</>
	)
}

export default index
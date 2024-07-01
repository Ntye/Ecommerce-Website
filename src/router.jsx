/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from 'react-bootstrap/Spinner';

import Index from "./index/Index"

// Connexion pages
const LazyConnexion = lazy(() => import('./index/Connexion'))
const LazyLogin = lazy(() => import('./index/Login'))
const LazyLoginEmp = lazy(() => import('./index/LoginEmp'))
const LazySignup = lazy(() => import('./index/Signup'))
const LazySignupEmp = lazy(() => import('./index/SignupEmp'))




const LazyNotFound = lazy(() => import('./index/NotFound'))

const router = createBrowserRouter ([
	{
		path: '/',
		element: <Index/>
	},
	{
		path: '/connexion',
		element: (
			<Suspense fallback={<><h2>Loading</h2> <br/> <Spinner animation="border" variant="secondary" /></>}>
				<LazyConnexion/>
			</Suspense>
		),
		children:[
			{
				path: '/connexion',
				element: (
					<Suspense fallback={<><h2>Loading</h2> <br/> <Spinner animation="border" variant="secondary" /></>}>
						<LazyLogin/>
					</Suspense>
				)
			},
			{
				path: 'login',
				element: (
					<Suspense fallback={<><h2>Loading</h2> <br/> <Spinner animation="border" variant="secondary" /></>}>
						<Navigate to="/connexion"/>
					</Suspense>
				)
			},
			{
				path: 'login-employee',
				element: (
					<Suspense fallback={<><h2>Loading</h2> <br/> <Spinner animation="border" variant="secondary" /></>}>
						<LazyLoginEmp/>
					</Suspense>
				)
			},
			{
				path: 'signup',
				element: (
					<Suspense fallback={<><h2>Loading</h2> <br/> <Spinner animation="border" variant="secondary" /></>}>
						<LazySignup/>
					</Suspense>
				)
			},
			{
				path: 'signup-employee',
				element: (
					<Suspense fallback={<><h2>Loading</h2> <br/> <Spinner animation="border" variant="secondary" /></>}>
						<LazySignupEmp/>
					</Suspense>
				)
			}
		]
	},
	{
		path: '*',
		element: (
			<Suspense fallback={<><h2>Loading</h2> <br/> <Spinner animation="border" variant="secondary" /></>}>
				<LazyNotFound/>
			</Suspense>
		)
	},
])

export default router
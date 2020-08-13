import React from 'react'

import { Link } from 'react-router-dom'

import { useTypedSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../actions/auth'
import { setDarkMode, setLightMode } from '../../actions/darkMode'

import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@material-ui/core/'

import MenuIcon from '@material-ui/icons/Menu'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import NightsStayIcon from '@material-ui/icons/NightsStay'

import { UserAuthState } from '../../actions/types'

import '../../css/navbar.css'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
)

export default function Navbar() {
	const theme = useTheme()

	const classes = useStyles()

	const dispatch = useDispatch()

	/* Auth state to choose which nav menu to show */
	const authUser = useTypedSelector((state) => state.authState)

	/* Dark mode state to decide switch button icon */
	const isDarkMode = useTypedSelector((state) => state.darkModeState.isDarkMode)

	const handleDarkModeBtn = (event: React.MouseEvent) => {
		if (isDarkMode) {
			dispatch(setLightMode())
		} else {
			dispatch(setDarkMode())
		}
	}

	const loggedIn = (
		<Container maxWidth="xl" className="link-container">
			<Button className="nav-link" onClick={handleDarkModeBtn}>
				{isDarkMode ? <Brightness7Icon /> : <NightsStayIcon style={{ color: 'white' }} />}
			</Button>
			<Link to="/login" className="link-style">
				<Button color="inherit" className="nav-link" onClick={() => dispatch(userLogout())}>
					Logout
				</Button>
			</Link>
			<Link to="/dashboard" className="link-style">
				<Button color="inherit" className="nav-link">
					Dashboard
				</Button>
			</Link>
		</Container>
	)

	const guestUser = (
		<Container maxWidth="xl" className="link-container">
			<Button className="nav-link" onClick={handleDarkModeBtn}>
				{isDarkMode ? <Brightness7Icon /> : <NightsStayIcon style={{ color: 'white' }} />}
			</Button>
			<Link to="/login" className="link-style">
				<Button color="inherit" className="nav-link">
					Login
				</Button>
			</Link>
		</Container>
	)

	const getNavLinks = (authUser: UserAuthState) => {
		const auth = authUser.auth

		return !auth.isLoading && auth.isAuthenticated ? loggedIn : guestUser
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">
						<Link to="/" className="link-style">
							<div className="logo">
								<span style={{ color: theme.palette.primary.main }}>Otto</span>
								<span style={{ color: theme.palette.secondary.main }}>Grow</span>
							</div>
						</Link>
					</Typography>
					{getNavLinks(authUser)}
				</Toolbar>
			</AppBar>
		</div>
	)
}

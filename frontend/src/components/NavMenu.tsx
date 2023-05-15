import {Box, AppBar, Toolbar, IconButton, Typography, Button, Container} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {getToken, getUsername, isAdmin} from "./utils";
import { AccountCircle } from '@mui/icons-material';

export const NavMenu = () => {
	const location = useLocation();
	const path = location.pathname;
	const token = getToken();
	const navigate = useNavigate();

	const renderLoginButton = () => {
		return (
			<Container>
				<Button
					variant="contained"
					component={Link}
					to="/login/"
					sx={{
						mr: 2,
						backgroundColor: "primary", color: "#fff",
						"&:hover": {
							backgroundColor: "black",
							color: "white",
							borderColor: "white",
						},
					}}
				>
					Log in
				</Button>
				<Button
					variant="contained"
					component={Link}
					to="/register/"
					sx={{
						backgroundColor: "primary", color: "#fff",
						"&:hover": {
							backgroundColor: "black",
							color: "white",
							borderColor: "white",
						},
					}}
				>
					Register
				</Button>
			</Container>
		);
	};

	const renderAdminButtons = () => {
		return (
			<Box>
				<Button
					to="/users/"
					component={Link}
					sx={{
						mr: 2,
						color: 'white',
						borderColor: '#333',
						'&:hover': {
							backgroundColor: 'black',
							color: 'white',
							borderColor: 'white'
						},
					}}
				>
					Manage Users
				</Button>
				<Button
					to="/data/"
					component={Link}
					sx={{
						mr: 2,
						color: 'white',
						borderColor: '#333',
						'&:hover': {
							backgroundColor: 'black',
							color: 'white',
							borderColor: 'white'
						},
					}}
				>
					Manage Data
				</Button>
			</Box>

		);
	};

	const renderProfileButton = () => {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<AccountCircle />
				<Link to={`/profile/${getUsername()}/`} style={{ color: 'blue', textDecoration: 'underline' }}>
					<Typography>{getUsername()}</Typography>
				</Link>
			</Box>
		);
	};



	return (
		<Box sx={{ flexGrow: 1}}>
			<AppBar sx={{ marginBottom: "20px", background: "#333", color: "white"}}>
				<Toolbar sx={{ flexGrow: 1 }}>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						aria-label="school"
						sx={{
							mr: 2,
							color: 'white',
							borderColor: '#333',
							'&:hover': {
								backgroundColor: 'black',
								color: 'white',
								borderColor: 'white'
							},
						}}
					>
						<HomeIcon />
					</IconButton>
					<Button
						variant={path.startsWith("/student") ? "outlined" : "text"}
						to="/student/"
						component={Link}
						sx={{
							mr: 2,
							color: 'white',
							borderColor: '#333',
							'&:hover': {
								backgroundColor: 'black',
								color: 'white',
								borderColor: 'white'
							},
						}}
					>
						Students
					</Button>
					<Button
						variant={path.startsWith("/grade") ? "outlined" : "text"}
						to="/grade/"
						component={Link}
						sx={{
							mr: 2,
							color: 'white',
							borderColor: '#333',
							'&:hover': {
								backgroundColor: 'black',
								color: 'white',
								borderColor: 'white'
							},
						}}
					>
						Grades
					</Button>
					<Button
						variant={path.startsWith("/course") ? "outlined" : "text"}
						to="/course/"
						component={Link}
						sx={{
							mr: 2,
							color: 'white',
							borderColor: '#333',
							'&:hover': {
								backgroundColor: 'black',
								color: 'white',
								borderColor: 'white'
							},
						}}
					>
						Courses
					</Button>
					<Button
						variant={path.startsWith("/teacher") ? "outlined" : "text"}
						to="/teacher/"
						component={Link}
						sx={{
							mr: 2,
							color: 'white',
							borderColor: '#333',
							'&:hover': {
								backgroundColor: 'black',
								color: 'white',
								borderColor: 'white'
							},
						}}
					>
						Teachers
					</Button>
					<Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
						{isAdmin() && renderAdminButtons()}
						{token ? renderProfileButton() : renderLoginButton()}
					</Box>

				</Toolbar>
			</AppBar>

		</Box>
	);
};
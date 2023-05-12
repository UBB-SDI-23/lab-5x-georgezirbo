import {Box, AppBar, Toolbar, IconButton, Typography, Button, Container} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {getToken, getUsername} from "./utils";
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
						backgroundColor: "#808080", color: "#fff",
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
						backgroundColor: "#808080", color: "#fff",
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

	const renderProfileButton = () => {
		return (
			<IconButton
				color="inherit"
				sx={{ backgroundColor: "#fff", color: "#fff", '&:hover': { backgroundColor: 'black' } }}
				onClick={() => navigate(`/profile/${getUsername()}/`)}
			>
				<AccountCircle />
			</IconButton>
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
							mr: 5,
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
							mr: 5,
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
							mr: 5,
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
					<Box sx={{ ml: 'auto' }}>
						{token ? renderProfileButton() : renderLoginButton()}
					</Box>

				</Toolbar>
			</AppBar>

		</Box>
	);
};
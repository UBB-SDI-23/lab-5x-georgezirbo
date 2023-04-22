import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export const NavMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1}}>
			<AppBar sx={{ marginBottom: "20px", background: "#333", color: "white"}}>
				<Toolbar>
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
						}}>
						<HomeIcon />
					</IconButton>
					<Button
						variant={path.startsWith("/student") ? "outlined" : "text"}
						to="/student/"
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
						}}>
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
						}}>
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
						}}>
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
						}}>
						Teachers
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
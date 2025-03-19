import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Modal, 
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreIcon from "@mui/icons-material/MoreVert";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

export default function TeacherHeader() {
  const [addClassOpen, setAddClassOpen] = React.useState(false);
  const [joinClassOpen, setJoinClassOpen] = React.useState(false);
  const [classCode, setClassCode] = React.useState("");

  const handleAddClassOpen = () => setAddClassOpen(true);
  const handleAddClassClose = () => setAddClassOpen(false);

  const handleJoinClassOpen = () => setJoinClassOpen(true);
  const handleJoinClassClose = () => setJoinClassOpen(false);

  const handleJoinSubmit = () => {
    if (!/^[a-zA-Z0-9]{5,8}$/.test(classCode)) {
      alert("Invalid class code! Use 5–8 letters/numbers, no spaces or symbols.");
      return;
    }
    alert(`Joining class with code: ${classCode}`);
    setJoinClassOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ display: { xs: "none", sm: "block" } }}>
            SMART CLASS
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton size="large" color="inherit" onClick={handleAddClassOpen}>
              <AddIcon />
            </IconButton>

            {/* <IconButton size="large" color="inherit" onClick={handleJoinClassOpen}>
              <GroupAddIcon />
            </IconButton> */}
            
            <IconButton size="large" edge="end" color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add Class Modal */}
      <Modal open={addClassOpen} onClose={handleAddClassClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create a New Class
          </Typography>
          <TextField fullWidth label="Class Name" variant="outlined" sx={{ mb: 2 }} />
          <TextField fullWidth label="Subject" variant="outlined" sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" fullWidth>
            Create Class
          </Button>
        </Box>
      </Modal>

      {/* Join Class Modal */}
      <Modal open={joinClassOpen} onClose={handleJoinClassClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Join a Class
          </Typography>
          <Card variant="outlined" sx={{ mb: 2, p: 2, backgroundColor: "#f5f5f5" }}>
            <Typography variant="body2">
              <b>To sign in with a class code:</b>
              <ul>
                <li>Use an authorized account</li>
                <li>Use a class code with 5–8 letters or numbers, no spaces or symbols</li>
                <li>If you have trouble joining, visit the Help Centre</li>
              </ul>
            </Typography>
          </Card>
          <TextField
            fullWidth
            label="Enter Class Code"
            variant="outlined"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleJoinSubmit}>
            Join Class
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grow,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse
} from "@mui/material";
import { ArrowForward, Menu, ExpandMore } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/KDC_logo.png";

const navLinks = ["Work", "Services", "Clients", "About", "Knowledge"];

const dropdownData = {
  Services: [
    { title: "Design.", text: "Handcraft the user experience.", color: "#ffebee", hoverColor: "#ffcdd2", path: "/design" },
    { title: "Technology.", text: "Leverage the power of code.", color: "#e8eaf6", hoverColor: "#c5cae9", path: "/technology" },
    { title: "Marketing.", text: "Creative strategies for brands.", color: "#ede7f6", hoverColor: "#d1c4e9", path: "/marketing" }
  ],
  About: [
    { title: "About Us", text: "Know our story.", color: "#ffebee", hoverColor: "#ffcdd2", path: "/about-us" },
    { title: "Team", text: "Meet our experts.", color: "#e8eaf6", hoverColor: "#c5cae9", path: "/team" },
    { title: "Career", text: "Join our mission.", color: "#ede7f6", hoverColor: "#d1c4e9", path: "/career" }
  ]
};

const Navbar = () => {
  const [expanded, setExpanded] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const location = useLocation();

  const toggleMobileDropdown = (name) => {
    setMobileDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div style={{ borderBottom: "1px solid black" }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: "none", px: 5, top: 0, zIndex: 1000 }}>
        <Box sx={{ padding: "0px 200px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" style={{ height: "35px", width: "180px",
            
             }} />
          </Link>

          {/* Desktop Navbar */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
            {navLinks.map((name) => {
              const isDropdownActive = dropdownData[name] && dropdownData[name].some(item => location.pathname === item.path);
              const isActive = location.pathname === `/${name.toLowerCase()}` || isDropdownActive;

              return (
                <Typography
                  key={name}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "540",
                    color: isActive ? "#ff4081" : "#000",
                    cursor: dropdownData[name] ? "default" : "pointer",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#ff4081" }
                  }}
                  onMouseEnter={() => setExpanded(dropdownData[name] ? name : null)}
                >
                  {dropdownData[name] ? name : <Link to={`/${name.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>{name}</Link>}
                </Typography>
              );
            })}
          </Box>

          {/* Contact Button */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link to="/contactus" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ backgroundColor: "#000", color: "#fff", fontWeight: "bold", height: "40px", width: "140px" }}>
                Contact
              </Button>
            </Link>
          </Box>

          {/* Hamburger Menu */}
          <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={() => setMobileOpen(true)}>
            <Menu />
          </IconButton>

          {/* Mobile Drawer */}
          <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
  <List sx={{ width: 250, backgroundColor: "#fff" }}> {/* Keep background same */}
    {navLinks.map((name) => (
      <React.Fragment key={name}>
        {dropdownData[name] ? (
          // Dropdown Items
          <ListItem button onClick={() => toggleMobileDropdown(name)}>
            <Typography sx={{ fontWeight: "bold", color: "#000" }}>{name}</Typography> 
            <ExpandMore sx={{ ml: "auto", color: "#000" }} />
          </ListItem>
        ) : (
          // Normal Links (Work, Clients, Knowledge)
          <ListItem 
            button 
            component={Link} 
            to={`/${name.toLowerCase()}`} 
            onClick={() => setMobileOpen(false)}
            sx={{ color: "#000", fontWeight: "bold" }} // Ensure text color remains consistent
          >
            <Typography>{name}</Typography>
          </ListItem>
        )}

        {/* Mobile Dropdown Content */}
        {dropdownData[name] && (
          <Collapse in={mobileDropdowns[name]} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 3, pr: 2, pb: 1 }}>
              {dropdownData[name].map((item, index) => (
                <ListItem 
                  key={index} 
                  button 
                  component={Link} 
                  to={item.path} 
                  onClick={() => setMobileOpen(false)}
                  sx={{ backgroundColor: item.color, borderRadius: 1, mb: 1 }} // Keep same colors
                >
                  <Box sx={{ p: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "#555" }}>{item.text}</Typography>
                    <ArrowForward sx={{ color: "#000", mt: 1 }} />
                  </Box>
                </ListItem>
              ))}
            </Box>
          </Collapse>
        )}
      </React.Fragment>
    ))}

    {/* Contact Link */}
    <ListItem 
      button 
      component={Link} 
      to="/contactus" 
      onClick={() => setMobileOpen(false)}
      sx={{ color: "#000", fontWeight: "bold" }} // Keep consistent styling
    >
      <ListItemText primary="Contact" />
    </ListItem>
  </List>
</Drawer>


        </Box>
      </AppBar>

      {/* Desktop Dropdown */}
      {expanded && dropdownData[expanded] && (
        <Grow in timeout={300}>
          <Box
            sx={{
              position: "fixed",
              top: 70,
              left: 0,
              width: "100%",
              backgroundColor: "#fff",
              p: 3,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              borderBottom: "1px solid black",
              zIndex: 10
            }}
            onMouseLeave={() => setExpanded(null)}
          >
            {dropdownData[expanded].map((card, index) => (
              <Box key={index} sx={{ width: 250, backgroundColor: card.color, p: 2, borderRadius: 1, cursor: "pointer", transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <Link to={card.path} style={{ textDecoration: "none", color: "inherit" }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{card.title}</Typography>
                    <Typography sx={{ color: "#555", mb: 1 }}>{card.text}</Typography>
                    <ArrowForward sx={{ color: "#000" }} />
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Grow>
      )}
    </div>
  );
};

export default Navbar;

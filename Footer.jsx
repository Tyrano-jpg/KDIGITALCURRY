import React from "react";
import { Box, Container, Typography, Link, IconButton, Stack } from "@mui/material";
import { Facebook, LinkedIn, Instagram, Language, Close } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", py: 4, px: 2 }}>
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, md: 8 }, // Increased padding for larger screens
          maxWidth: "1200px", // Keeps the width balanced
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          sx={{ textAlign: { xs: "center", sm: "left" } }} // Centers content for small screens
        >
          {/* Logo and Social Icons */}
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "30px" }}>
              Leo9 Studio
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
              <IconButton size="small" color="inherit"><Facebook /></IconButton>
              <IconButton size="small" color="inherit"><LinkedIn /></IconButton>
              <IconButton size="small" color="inherit"><Instagram /></IconButton>
              <IconButton size="small" color="inherit"><Language /></IconButton>
              <IconButton size="small" color="inherit"><Close /></IconButton>
            </Stack>
            <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
              © Leo9Studio. All rights reserved 2023
            </Typography>
          </Box>

          {/* Links Section */}
          <Stack
            direction="row"
            spacing={6}
            flexWrap="wrap"
            justifyContent="center"
            sx={{ width: "100%", maxWidth: "800px" }} // Centers the link section properly
          >
            {[
              { title: "Services", links: ["Design", "Technology", "Neuromarketing", "Digital Marketing"] },
              { title: "About", links: ["About Us", "Team", "Career", "Clients"] },
              { title: "Quick Links", links: ["Work", "Blog", "Reach Us", "Site Map"] },
              { title: "Policies", links: ["Privacy Policy", "Terms of use", "Refund Policy", "Copyrights Policy"] }
            ].map((section, index) => (
              <Box key={index} sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography variant="h6" fontWeight="bold">{section.title}</Typography>
                {section.links.map((item) => (
                  <Typography key={item} variant="body2" sx={{ mt: 1 }}>
                    <Link href="#" color="inherit" underline="none">{item}</Link>
                  </Typography>
                ))}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

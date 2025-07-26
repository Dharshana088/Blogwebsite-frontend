import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import flower from "../assets/flower.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#faf9f8",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "100vh",
            position: "relative",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: "550px",
              zIndex: 2,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 400,
                fontSize: { xs: "3.5rem", sm: "5rem", md: "6rem" },
                lineHeight: 1.2,
                color: "#242424",
                mb: 4,
                fontFamily: "Charter, serif",
                letterSpacing: "-0.02em",
                textAlign: "left",
              }}
            >
              Write. Remember. Resonate.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#6b6b6b",
                mb: 6,
                fontWeight: 400,
                fontSize: "1.25rem",
                lineHeight: 1.4,
              }}
            >
              A space to express, explore, and elevate your voice.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  if (navigate) navigate("/signin");
                }}
                sx={{
                  bgcolor: "#242424",
                  color: "#fff",
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#000",
                  },
                }}
              >
                Sign in
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  if (navigate) navigate("/signup");
                }}
                sx={{
                  color: "#242424",
                  borderColor: "#242424",
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                    borderColor: "#242424",
                  },
                }}
              >
                Sign up
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 6, sm: 0 },
              zIndex: 1,
              transform: "translateX(80px) translateY(-20px)",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={flower}
              alt="Decorative flower"
              sx={{
                maxWidth: "120%",
                maxHeight: "700px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

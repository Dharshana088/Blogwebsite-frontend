import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import InkedLogo from "../assets/inked-logo.png";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AvatarMenu from "./AvatarMenu";

const Navbar = () => {
  const navigate = useNavigate?.();
  const location = useLocation?.();
  const isLoggedIn = Boolean(localStorage?.getItem?.("token"));

  const showWriteButton = location?.pathname?.startsWith?.("/blogs");

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#faf9f8",
        boxShadow: 0,
        borderBottom: "1px solid #e5e5e5",
        py: 1,
        px: 2,
        overflowX: "hidden",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          width: "100%",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate?.("/")}
        >
          <img
            src={InkedLogo}
            alt="INKED"
            style={{ height: "50px", width: "auto" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mr: 4,
          }}
        >
          {showWriteButton && (
            <Button
              variant="outlined"
              onClick={() => navigate?.("/write")}
              startIcon={<EditNoteIcon />}
              sx={{
                fontWeight: "bold",
                borderColor: "#000",
                color: "#000",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#000",
                  color: "#fff",
                  borderColor: "#000",
                },
              }}
            >
              Write
            </Button>
          )}

          {isLoggedIn && <AvatarMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

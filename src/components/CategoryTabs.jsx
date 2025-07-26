import { Tabs, Tab, Box } from "@mui/material";

const CategoryTabs = ({ value, onChange }) => (
  <Box
    sx={{
      bgcolor: "#000",
      borderRadius: 2,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      overflow: "hidden",
    }}
  >
    <Tabs
      value={value}
      onChange={(...args) => {
        if (onChange?.(...args)) return;
      }}
      textColor="inherit"
      indicatorColor="secondary"
      variant="fullWidth"
      sx={{
        "& .MuiTab-root": {
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 500,
          py: 2,
          minHeight: "56px",
          color: "#fff",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.1)",
          },
          "&.Mui-selected": {
            fontWeight: 600,
            color: "#fff",
          },
        },
        "& .MuiTabs-indicator": {
          height: 3,
          borderRadius: "3px 3px 0 0",
          backgroundColor: "#fff",
        },
      }}
    >
      <Tab label="For You" value="all" />
      <Tab label="Program" value="program" />
      <Tab label="Coding" value="coding" />
      <Tab label="Travel" value="travel" />
      <Tab label="Food" value="food" />
      <Tab label="Science" value="science" />
      <Tab label="Politics" value="politics" />
      <Tab label="Fitness" value="Fitness" />
      <Tab label="Health" value="Health" />
    </Tabs>
  </Box>
);

export default CategoryTabs;

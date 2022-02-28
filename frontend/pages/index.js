import { Box, Tabs, Tab, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Homepage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabs = (evt, val) => {
    setTabValue(val);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        m="40px 0 15px 0"
        fontSize="3rem"
        borderRadius="10px"
        backgroundColor="background.primary"
      >
        <Typography variant="h3">Tryouts</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        m="10px 0 15px 0"
        fontSize="3rem"
        borderRadius="10px"
        backgroundColor="background.primary"
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: 1 }}>
          <Tabs
            value={tabValue}
            aria-label="basic tabs example"
            onChange={handleTabs}
            centered
            variant="fullWidth"
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Signup />
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Homepage;

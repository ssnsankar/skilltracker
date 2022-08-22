import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Grid, Typography, Button } from "@mui/material";
import logo from "./skill.PNG";

import "./App.css";
import Search from "./Search";
import { borderRadius } from "@mui/system";

function App() {
  return (
    <div className="App">
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar
              disableGutters
              style={{ paddingLeft: "10px", background: "#1abc9c" }}
            >
              <img
                style={{ height: "63px", marginLeft: "-10px" }}
                src={logo}
                alt="logo"
              />
              <Typography
                align="left"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <div style={{ marginRight: "16px" }}>
                <Button
                  color="inherit"
                  style={{ fontWeight: "bold", fontSize: "medium" }}
                >
                  Admin Panel
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <body>
        <Grid class="body-container" container xs={12}>
          <Grid item xs={12}>
            <Search />
          </Grid>
        </Grid>
      </body>
      <footer>
        <Typography
          style={{
            textAlign: "center",
            backgroundColor: "#ccc",
            paddingTop: "20px",
            paddingBottom: "20px",
            borderRadius: "4px",
            borderColor: "#4cb96b",
            color: "#4cb96b",

            fontWeight: "bold",
          }}
        >
          © 2022 All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}

export default App;

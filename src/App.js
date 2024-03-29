import React, { useState } from "react";
import Todolist from "./Todolist";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "./App.css";

const App = () => {
  //cd Documents/Koulu/Front end/todolist
  const [value, setValue] = useState(0);

    const handleChange = (event, value) => {
        setValue(value)
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="home" label="Home" />
                    <Tab value="todo" label="My todos" />
                </Tabs>
            </AppBar>
            {value === "home" && <div>Home page</div>}
            {value === "todo" && <Todolist />}
        </div>
    )
};

export default App;

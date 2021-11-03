import React, { useState } from "react";
import Todolist from "./Todolist";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const TabApp = () => {

    const [value, setValue] = useState("home");

    const handleChange = (event, value) => {
        setValue(value)
    }

    return (
        <div>
            <AppBar positions="static" onChange={handleChange}>
                <Tabs value={value}>
                    <Tab value="home" label="Home" />
                    <Tab value="todo" label="My todos" />
                </Tabs>
            </AppBar>
            {value === "home" && <div>Home page</div>}
            {value === "todo" && {Todolist}}
        </div>
    )
}

export default TabApp;
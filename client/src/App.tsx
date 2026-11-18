import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Bootstrap JS

import "./App.css";
import Admin from "./pages/Admin/Admin";
import Client from "./pages/Client/Client";

function App() {
  
  return (
    <div className="App">
     <Admin />
       {/*<Client />*/}
      
    </div>
  );
}

export default App;

import React, { FunctionComponent, useState } from "react";
import { navigate, Router } from "@reach/router";
import Main from "./Main";
import OnlinePlay from "./OnlinePlay";

const App: FunctionComponent = () => {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <React.StrictMode>
      <Router
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Main path="/">{isAuth ? navigate("/online/lobby") : null}</Main>
        <OnlinePlay path="online/*" />
      </Router>
    </React.StrictMode>
  );
};

export default App;

import React, { useContext, useEffect } from "react";
import Routing from "./Routing";
import { auth } from "./Components/Utility/firebase";
import { DataContext } from "./Components/StateProvider/StateProvider";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;

import { Login } from "./Pages/Login/Login";
import { AppProvider } from "./Context/AppContext";

function App() {
  return (
    <div className="">
      <AppProvider>
        <Registration />
      </AppProvider>
    </div>
  );
}

export default App;

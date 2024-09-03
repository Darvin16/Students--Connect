import { Registration } from "./Pages/Registration/Registration";
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

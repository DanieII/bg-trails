import { Route, Switch } from "wouter";
import NavBar from "./components/NavBar";
import Index from "./components/Index";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Explore from "./components/Explore";

function App() {
  return (
    <div className="flex flex-col min-h-lvh">
      <NavBar />
      <main>
        <Switch>
          <Route path="/" component={Index}></Route>
          <Route path="/login" component={LogIn}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/explore" component={Explore}></Route>
          <Route>
            <h1 className="text-black text-center text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2">
              <span className="font-extrabold">404!</span> No such page
            </h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

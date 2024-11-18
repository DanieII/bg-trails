import { Route, Switch } from 'wouter';
import NavBar from './components/NavBar';
import Index from './components/Index';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Explore from './components/Explore';
import TrailDetails from './components/TrailDetails';

function App() {
  return (
    <div className='flex min-h-lvh flex-col'>
      <NavBar />
      <main>
        <Switch>
          <Route path='/' component={Index}></Route>
          <Route path='/auth' nest>
            <Route path='/login' component={LogIn}></Route>
            <Route path='/register' component={Register}></Route>
          </Route>
          <Route path='/explore' component={Explore}></Route>
          <Route path='/explore/:id' component={TrailDetails}></Route>
          <Route>
            <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 text-center text-4xl font-bold text-black'>
              <span className='font-extrabold'>404!</span> No such page
            </h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

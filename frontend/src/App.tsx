import { Route, Switch } from 'wouter'
import NavBar from './components/NavBar'
import Index from './components/Index'

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/' component={Index}></Route>
        <Route>
          <h1 className='text-black text-center text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2'>
            <span className='font-extrabold'>404!</span> No such page
          </h1>
        </Route>
      </Switch>
    </>
  )
}

export default App

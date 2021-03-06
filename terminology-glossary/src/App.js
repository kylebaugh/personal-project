import './App.css';
import './phoneScreen.css'
import './home.css'
import './profile.css'
import './topic.css'
import './glossary.css'
import './unit.css'
import './login.css'

import Header from "./components/Header"

import routes from "./routes"
import {setUser} from './redux/authReducer'
import {useDispatch} from 'react-redux'

function App() {
  let dispatch = useDispatch()
  if(localStorage.getItem('user_id')){
    try{
      dispatch(setUser(JSON.parse(localStorage.getItem('user_id'))))
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="App">
      {/* <Header /> */}
      {routes}
    </div>
  );
}

export default App;

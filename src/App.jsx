import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomeContent from './components/HomeContent'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
const App = () => {
  return (
    
    <BrowserRouter>
<Routes>
<Route path='/' element={<HomeContent/>}/>
<Route path='/SignIn' element={<SignIn/>}/>
<Route path='/SignUp' element={<SignUp/>}/>

</Routes>
</BrowserRouter>
    
  );
}

export default App
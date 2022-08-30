import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import YourNotes from './components/pages/YourNotes'
import PublicNotes from './components/pages/PublicNotes'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import Edit from './components/pages/Edit'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Title from './components/layout/Title'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import MyProfile from './components/pages/MyProfile'


function App() {
  return (
    <Router>
      <div className="app-page">
        <Navbar/>
        <Title />
        <main className='app-container'>
          <Routes>
            <Route path='/publicnotes' element={<PublicNotes/>} /> 
            <Route path='/yournotes' element={<YourNotes/>} /> 
            <Route path='/about' element={<About />} />
            <Route path='/edit/:id' element={<Edit />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/me' element={<MyProfile />} />
            <Route path='/*' element={<NotFound />} />  
          </Routes>
        </main>
        <Footer container='app-footer'/>
      </div>
    </Router>
  );
}

export default App;

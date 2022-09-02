import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import YourNotes from './components/pages/YourNotes'
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
            <Route path='/notes/public' element={<YourNotes isPublic={true}/>} /> 
            <Route path='/notes/private' element={<YourNotes isPublic={false}/>} /> 
            <Route path='/about' element={<About />} />
            <Route path='/edit/public/:id' element={<Edit isPublic={true}/>}/>
            <Route path='/edit/private/:id' element={<Edit isPublic={false}/>}/>
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

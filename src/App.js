import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import Edit from './components/pages/Edit'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Title from './components/layout/Title'


function App() {
  return (
    <Router>
      <div className="app-page">
        <Navbar/>
        <Title />
        <main className='app-container'>
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/about' element={<About />} />
            <Route path='/edit/:id' element={<Edit />}/>
            <Route path='/*' element={<NotFound />} />  
          </Routes>
        </main>
        <Footer container='app-footer'/>
      </div>
    </Router>
  );
}

export default App;

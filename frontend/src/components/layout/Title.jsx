import {Route, Routes} from 'react-router-dom'
import './styles/Title.css'

function Title() {
  return (
    <div>
        <h1 className='title-h1'>
            <Routes>
              <Route path='/publicnotes' element='Public Notes' /> 
                <Route path='/yournotes' element='Your Notes' /> 
                <Route path='/about' element='About' /> 
                <Route path='/edit/*' element='Edit' /> 
                <Route path='/register' element='Register' /> 
                <Route path='/login' element='Login' /> 
                <Route path='/me' element='My Profile' /> 
                <Route path='/*' element='Not Found' /> 
            </Routes>
        </h1>
    </div>
  )
 }

export default Title
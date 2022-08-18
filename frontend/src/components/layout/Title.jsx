import {Route, Routes} from 'react-router-dom'
import './Title.css'

function Title() {
  return (
    <div>
        <h1 className='title-h1'>
            <Routes>
                <Route path='/' element='Home' /> 
                <Route path='/about' element='About' /> 
                <Route path='/edit/*' element='Edit' /> 
                <Route path='/*' element='Not Found' /> 
            </Routes>
        </h1>
    </div>
  )
}

export default Title
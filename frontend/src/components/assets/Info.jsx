import {AiOutlineInfoCircle} from 'react-icons/ai'
import {gsap} from 'gsap'
import {useRef, useEffect} from 'react'
import './styles/Info.css'

function Info({paragraph}) {

    const parent = useRef()

    useEffect(() => {
        gsap.from(parent.current, {y: "40vw"})
        gsap.to(parent.current, {duration: 1, y: "0vw", ease: "bounce"})
    }, [paragraph])

    return (
        <div ref={parent} className='info-parent'>
            <AiOutlineInfoCircle className='info-icon'/>
            {paragraph}
        </div>
    )
}
export default Info
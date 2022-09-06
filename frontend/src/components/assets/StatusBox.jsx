import './styles/StatusBox.css'
import {useRef, useEffect} from 'react'
import {gsap} from 'gsap'

function ErrorBox({statusMessage, isError}) {

    const parent = useRef()

    useEffect(() => {
      gsap.from(parent.current, {y: "15v"})
      gsap.to(parent.current, {y: "0vh", duration: 1, ease: "bounce"})
    }, [statusMessage])



    return (
        <div ref={parent} className={`statusbox-parent 
        ${(isError) ? 'statusbox-error' : 'statusbox-success'}
        ${(statusMessage) ? 'statusbox-visible' : 'statusbox-invisible'}
        `}>
          {statusMessage}
        </div>
    )
}
export default ErrorBox
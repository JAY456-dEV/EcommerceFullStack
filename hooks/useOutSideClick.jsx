'use client'
import  { useEffect } from 'react'

function UseOutSideClick(ref, closePopup) {

    useEffect(() => {

        function handleMouseDown(e) {
            if (ref.current && ref.current.contains(e.target)) {
                return
            }
            closePopup()
        }

        window.addEventListener('mousedown', handleMouseDown)

        return (() => window.removeEventListener('mousedown', handleMouseDown))
    }, [])
}

export default UseOutSideClick
'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { useRef } from 'react'
import { makeStore } from '../lib/store'

function StoreProvider({ children }) {

    const storeRef = useRef()

    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return (
        <>
            <Provider store={storeRef.current}>
                {children}
            </Provider>
        </>
    )
}

export default StoreProvider
'use client'

import { addMultipleItem } from '../../../cartSlice/addItemSlice'
import { useUser } from '@clerk/nextjs'
import { MinusIcon, PlusIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function QuantityBtns({ matchedProd }) {
    const dispatch = useDispatch()
    const { user } = useUser();

    const addedCartdata = useSelector((state) => state.addedItem)

    async function handleAddMultipleItem(productId, TypeOfBtn) {
        if (user) {
            try {
                dispatch(addMultipleItem({ productId, type: TypeOfBtn }))
                console.log(addedCartdata, productId)
                const response = await fetch('/api/add-multiple', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: productId,
                        TypeOfBtn
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Item added successfully:', data.message);
                    // setError(null); // Reset any previous error state
                } else {
                    console.error('Failed to add item:', data.error);
                    // setError(data.error || 'Failed to add item');
                }
            } catch (error) {
                console.error('Error while adding item:', error);
            }
        } else {
            console.warn('User is not authenticated');
        }
    }

    return (
        <>
            <MinusIcon className="cursor-pointer" onClick={() => handleAddMultipleItem(matchedProd.id, 'Decrease')} />
            <p>{addedCartdata.find(item => item.id == matchedProd.id)?.quantity || 0}</p>
            <PlusIcon className="cursor-pointer" onClick={() => handleAddMultipleItem(matchedProd.id, 'Increase')} />
        </>
    )
}

export default QuantityBtns
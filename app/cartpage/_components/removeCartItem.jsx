'use client'

import { removeProduct } from '../../../cartSlice/addItemSlice';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import { MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

function RemoveCartItem({ matchedProd, setProductsByUserId }) {
    const { user } = useUser();
    const dispatch = useDispatch()
    const reduxData = useSelector((state) => state.addedItem)

    async function handleDelete(productId, TypeOfBtn) {
        if (user) {
            try {
                dispatch(removeProduct(productId))
                setProductsByUserId((prev) => prev.filter((item) => item.id !== productId))
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
        }
    }

    return (
        <>
            <div className="flex gap-1 items-center text-gray-500 cursor-pointer" onClick={() => handleDelete(matchedProd.id, 'deleteItem')}>
                <MdCancel /> Remove
            </div>
        </>
    )
}

export default RemoveCartItem
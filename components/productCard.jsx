'use client';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@clerk/nextjs';
import { addToCart } from '../cartSlice/addItemSlice';
import { BsHeartFill } from 'react-icons/bs';
import { addItemToWishlist, addProductsFromdb, removeWishlist } from '../cartSlice/wishlist';

const ProductCard = ({ item }) => {
    const dispatch = useDispatch();
    const { user } = useUser();
    const [error, setError] = useState(null);
    const [addedItem, setAddedItem] = useState([])
    const [loading, setLoading] = useState(false)
    const wishlistItem = useSelector((state) => state.wishlistProduct)

    async function getAddedCartItem() {
        if (user) {
            try {
                const response = await fetch('/api/get-products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id
                    })
                })

                const { productsByUserId, getWishlistProducts } = await response.json()
                setAddedItem(productsByUserId)
                dispatch(addProductsFromdb(getWishlistProducts))
            } catch (error) {
                console.log('not Getting cartItem from db', error)
                setError('An error occurred while adding the item.');
            }
        }
    }

    useEffect(() => {
        getAddedCartItem()
    }, [user])

    async function handleAddItem() {
        if (user) {
            // Dispatch to local cart state (if necessary)
            dispatch(addToCart({ productId: item.id, quantity: 1, user: user.id }));
            // Call the API route to add item to the database
            setLoading(true)
            try {
                const response = await fetch('/api/add-item', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: item.id,
                        quantity: 1, // Adjust this if necessary
                        userId: user.id, // Ensure this is correct or remove if not needed
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Item added successfully:', data.message);
                    setError(null); // Reset error state
                } else {
                    console.error('Failed to add item:', data.error);
                    setError(data.error || 'Failed to add item');
                }
                setAddedItem(prev => [...prev, { product_id: item.id, quantity: 1, user: user.id }])
                // console.log('added data', data)
                setLoading(false)
            } catch (error) {
                console.error('Error adding item:', error);
                setLoading(false)
                setError('An error occurred while adding the item.');
            }
        } else {
            console.error('User is not authenticated');
            setLoading(false)
            setError('Please Login First');
        }
    }

    async function handleWishlistItem() {
        if (user) {
            try {
                dispatch(addItemToWishlist({ product_id: item.id, user: user.id }))
                const response = await fetch(`/api/add-wishlistItem`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: item.id,
                        userId: user.id,
                    })
                })

                const data = await response.json()

                if (response.ok) {
                    console.log('item added in wishlist')
                }
                setError(data.message)
                console.log('item added in wishlistt', data)
            } catch (error) {
                console.error('Error adding item in wishlist:', error);
                setLoading(false)
                setError('An error occurred while adding the item in wishlist');
            }
        } else {
            console.error('User is not authenticated');
            setLoading(false)
            setError('Please Login First');
        }
    }

    async function handleRemoveFromWishlist() {
        dispatch(removeWishlist({ product_id: item.id }))
        try {
            const response = await fetch('/api/remove-wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: item.id,
                    userId: user.id
                })
            })

            if (response.ok) {
                console.log('Item Deleted Great!')
            }
        } catch (error) {
            console.log('Error To remove Item to Wishlist')
        }
    }

    return (

        <div className="max-w-xl md:max-w-2xl mx-auto p-5">
            <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <div className='w-[265px] md:w-[250px] lg:w-[280px] h-[300px]'>
                    <img
                        className="rounded-t-lg p-8 w-full h-full object-cover"
                        src={item.imagesrc}
                        alt={item.imagealt}
                    />
                </div>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                            {item.title}
                        </h3>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        {
                            Array.from({ length: 5 }).map((_, idx) => {
                                if (idx < item.rating) {
                                    return (
                                        <svg
                                            key={idx}
                                            className="w-5 h-5 text-yellow-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    )
                                } else {
                                    return <svg
                                        key={idx}
                                        className="w-5 h-5 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                }
                            })
                        }
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            {item.rating}.0
                        </span>
                    </div>
                    {/* {error && <p className="text-red-500 text-end">{error}</p>} Error message display */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-small font-bold text-red-500 dark:text-white mr-1 line-through">${item.originalprice}</span>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">${item.discountedprice}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Button className={`${addedItem?.findIndex((prod) => prod.product_id == item.id) !== -1 ? 'bg-green-600' : 'bg-black'}`} onClick={handleAddItem}>
                                <p>{addedItem?.findIndex((prod) => prod.product_id == item.id) !== -1 ? 'Added Cart' : 'Add To Cart'}</p>
                            </Button>

                            {wishlistItem?.findIndex((prod) => prod.product_id == item.id) == -1 ? <BsHeartFill className={`cursor-pointer`} size={20} onClick={handleWishlistItem} /> : <BsHeartFill className={`cursor-pointer text-red-600`} size={20} onClick={handleRemoveFromWishlist} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProductCard;

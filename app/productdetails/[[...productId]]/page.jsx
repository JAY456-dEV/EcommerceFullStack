import React from 'react'
import { getProductsById } from '../../../actions/getProductById'
import { Button } from '../../../components/ui/button'
import Image from 'next/image'

async function ProductDetails({ params }) {
    const { productId } = params
    // console.log(productId[0])
    const productDetail = await getProductsById(productId[0])
    console.log(productDetail)

    return (
        <>
            <div className='search-main-page'>
                <div className='search-img'>
                    <Image src={productDetail.imagesrc} alt={productDetail.imagealt} width={400} height={400} />
                </div>

                <div className='product-detail-search'>
                    <h2 className='text-3xl font-semibold'>{productDetail.title}</h2>
                    <p className='desc-search text-lg'>{productDetail.description || 'asdsdasdsad'}</p>
                    <div className='price-sec-search'>
                        <h1 className='text-[2em] font-bold'>${productDetail.discountedprice}</h1>
                        <p className='text-lg'>({productDetail.originalprice}$ Off)</p>
                    </div>

                    <div className='rating-stock-search'>
                        <div className="star-rating">
                            <div className="stars-outer" >
                                <div className="stars-inner" style={{ width: `${(Number(productDetail.rating) / 5) * 100}px` }}></div>
                            </div>
                        </div>
                        <div className='instock-search'>
                            <p>inStock</p>
                        </div>
                    </div>

                    <div className='main-logo'>
                        <div className='common-logoSearch'>
                            <p>Free Delivery</p>
                        </div>

                        <div className='common-logoSearch'>
                            <p>Free Delivery</p>
                        </div>

                        <div className='common-logoSearch'>
                            <p>Secure Transaction</p>
                        </div>
                    </div>

                    <div className='btn-detailsearch'>
                        <Button>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
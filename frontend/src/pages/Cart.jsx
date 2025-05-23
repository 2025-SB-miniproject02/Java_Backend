import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets, dummyAddress } from '../assets/assets'

const Cart = ()  => {

    const {products, currency, cartItems, removeFromCart, getCartCount, navigate, getCartAmount} = useAppContext()
    const [cartArray, setCartArray] = useState([])
    const [selectedAddress] = useState(dummyAddress[0])
    const [paymentOption, setPaymentOption] = useState("COD")

    const getCart = () => {
        let tempArray = []
        for(const key in cartItems) {
            const product = products.find((item) => item._id === key)
            product.quantity = cartItems[key]
            tempArray.push(product)
        }
        setCartArray(tempArray)
    }

    const placeOrder = async () => {
        // 주문 처리 로직 작성 예정
    }

    useEffect(() => {
        if(products.length > 0 && cartItems) {
            getCart()
        }
    }, [products, cartItems])

    
    return products.length > 0 && cartItems  ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0)
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weigth : <span>{product.weigth || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        {/* Qty 선택박스 제거하고 고정 1로 표시 */}
                                        <p>Qty : 1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * 1}</p>
                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="remove" className='inline-block w-6 h-6' />
                        </button>
                    </div>
                ))}

                <button onClick={() => {navigate("/products"); scrollTo(0, 0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img className='group-hover:-translate-x-1 transition' src={assets.arrow_right_icon_colored} alt="arrow" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}</p>
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Free</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount : </span><span>{currency}{getCartAmount()}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {paymentOption === "COD" ? "Plaace Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null
}

export default Cart

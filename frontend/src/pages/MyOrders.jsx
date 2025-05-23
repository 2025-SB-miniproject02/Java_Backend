import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([])
    const { currency } = useAppContext()

    const fetchMyOrders = async () => {
        // 주문별 amount 계산 적용
        const calculatedOrders = dummyOrders.map(order => {
            const totalAmount = order.items.reduce((sum, item) => {
                return sum + item.product.offerPrice * item.quantity
            }, 0)
            return { ...order, amount: totalAmount }
        })
        setMyOrders(calculatedOrders)
    }

    useEffect(() => {
        fetchMyOrders()
        console.log(currency)
    }, [])

    return (
        <div className='mt-16 px-4 md:px-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            {myOrders.map((order, index) => (
                <div key={index} className='border border-gray-200 rounded-2xl shadow-sm mb-10 p-6 bg-white'>
                    {/* 주문 요약 정보 */}
                    <div className='flex flex-col md:flex-row md:justify-between md:items-center text-gray-600 text-sm mb-4 gap-2'>
                        <span><span className='font-semibold'>Order ID :</span> {order._id}</span>
                        <span><span className='font-semibold'>Payment :</span> {order.paymentType}</span>
                        <span><span className='font-semibold'>Total :</span> {currency}{order.amount.toLocaleString('ko-KR')}</span>
                    </div>

                    {/* 주문 상세 아이템 목록 */}
                    <div className='space-y-4'>
                        {order.items.map((item, index) => (
                            <div key={index}
                                className={`flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-xl 
                                ${order.items.length !== index + 1 ? "border-gray-200" : "border-gray-100"} bg-gray-50`}>
                                
                                {/* 상품 정보 */}
                                <div className='flex items-center mb-4 md:mb-0 md:w-1/3'>
                                    <div className='bg-white p-3 rounded-lg shadow'>
                                        <img src={item.product.image[0]} alt="" className='w-16 h-16 object-cover' />
                                    </div>
                                    <div className='ml-4'>
                                        <h2 className='text-lg font-semibold text-gray-800'>{item.product.name}</h2>
                                        <p className='text-sm text-gray-500'>Category : {item.product.category}</p>
                                    </div>
                                </div>

                                {/* 주문 상세 정보 */}
                                <div className='text-sm text-gray-600 md:text-center md:w-1/3'>
                                    <p>Quantity : <span className='font-medium'>{item.quantity || "1"}</span></p>
                                    <p>Status : <span className='font-medium'>{order.status}</span></p>
                                    <p>Date : <span className='font-medium'>{new Date(order.createdAt).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}</span></p>
                                </div>

                                {/* 개별 금액 */}
                                <div className='text-primary text-lg font-semibold md:text-right md:w-1/3 mt-4 md:mt-0'>
                                    Amount : {currency}{(item.product.offerPrice * item.quantity).toLocaleString('ko-KR')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyOrders

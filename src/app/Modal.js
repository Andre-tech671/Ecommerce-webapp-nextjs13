"use client";
import React from 'react';
import useCart from './(store)/store';
import Link from 'next/link';

export default function Modal() {
  const cartItems = useCart((state) => state.cart);
  const openModal = useCart((state) => state.openModal);
  const setOpenModal = useCart((state) => state.onCloseModal);

  async function checkout() {
    const lineItems = cartItems.map((cartItem) => {
      return {
        price: cartItem.price_id,
        quantity: cartItem.quantity,
      };
    });
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    });
    const data = await res.json();
    window.location.assign(data.session.url);
  }

  return openModal ? (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-transparent">
        {/* Backdrop */}
        <div
          onClick={setOpenModal}
          className="bg-black/80 absolute inset-0"
        ></div>
        {/* Modal */}
        <div className="flex justify-center items-center h-full">
          <div className="bg-white p-4 rounded-xl text-black w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 max-w-2xl">
            <h1 className="text-2xl font-bold mb-2">Cart Summary</h1>
            {cartItems.length > 0 ? (
              <>
                <div className="flex flex-col gap-4">
                  {cartItems.map((cartItem, itemIndex) => {
                    return (
                      <div key={itemIndex} className="flex items-center gap-4">
                        <img
                          src={cartItem.productInfo.images[0]}
                          alt={cartItem.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <h2 className="text-lg font-bold">
                            {cartItem.name}
                          </h2>
                          <p className="text-sm text-gray-600">
                            Quantity: {cartItem.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${(cartItem.cost / 100) * cartItem.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xl font-bold">
                    Total: $
                    {cartItems.reduce((acc, item) => {
                      return acc + (item.cost / 100) * item.quantity;
                    }, 0)}
                  </p>
                  <button
                    onClick={checkout}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <p>There is nothing in your cart :'(</p>
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
}

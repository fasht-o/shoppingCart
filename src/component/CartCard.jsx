import React from "react";

const CartCard = ({ cartItem }) => {
  return (
    <div>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={cartItem?.thumbnail}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {cartItem?.title}
            </h3>
            <button className="text-sm px-4 py-3 bg-black text-white font-extrabold mx-5 cursor-pointer mt-5">
              REMOVE
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${cartItem?.totalPrice.toFixed(2)}
          </h3>
          <div className="mt-3 gap-2">
            <button className="border border-[#000] px-4 py-4 rounded-md">
              +
            </button>
            <button className="border border-[#000] px-4 py-4 rounded-md">
              -
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500 mt-3" />
    </div>
  );
};

export default CartCard;

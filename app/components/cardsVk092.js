import React from 'react';

const CardComponent = ({ cardList }) => {
    return (
      <div className="container mx-auto py-36 px-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {cardList.map((card, index) => (
            <CardItem key={index} card={card} />
          ))}
        </div>
      </div>
    );
  };

const CardItem = ({ card }) => {
    return (
      <div className="shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl py-5">
        <div className="flex items-center justify-center">
          <img
            className="rounded-t-lg"
            src={card.img}
            alt={card.title}
          ></img>
        </div>
        <div className="p-5 text-center">
          <h3 className="text-3xl font-bold text-black mb-3">
            {card.title}
          </h3>
          <button className="w-32 h-11 text-lg bg-[#5D5FEF] border-2 border-[#5D5FEF] text-white rounded py-1 px-6 ">SeeMore</button>
        </div>
      </div>
    );
  };

  export default CardComponent;


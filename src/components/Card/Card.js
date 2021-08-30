import React from "react";
import "./card.scss";
export default function Card({ card }) {
  return (
    <div className="card">
      <img src={card.image} alt={card.name}></img>
      <div className="body">
        <div className="title">{card.name}</div>
        <div className="description">{card.description}</div>
      </div>
    </div>
  );
}

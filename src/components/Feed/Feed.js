import React from "react";
import { mockJson } from "../mockJson";
import "./feed.scss";
import Card from "../Card/Card";
export default function Feed() {
  return (
    <div className="feed_page">
      <div className="card_container">
        {mockJson.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>
    </div>
  );
}

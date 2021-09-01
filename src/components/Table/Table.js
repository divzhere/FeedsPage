import React from "react";
import "./table.scss";
export default function Table({ cards }) {
  return (
    <section className="table_section">
      <h1 className="heading">Tabular Disaply</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Date Last Edited</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr>
                <td>{card.name}</td>
                <td>{card.image}</td>
                <td>{card.description}</td>
                <td>{card.dateLastEdited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

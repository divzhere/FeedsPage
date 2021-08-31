import React, { useState, useEffect } from "react";
import { mockJson } from "../mockJson";
import "./feed.scss";
import Card from "../Card/Card";
import { useHistory } from "react-router-dom";

export default function Feed(props) {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [cards, setCards] = useState(mockJson);

  let history = useHistory();

  const handleInput = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      setInput(e.target.value);
    } else {
      setCards(mockJson);
    }
  };

  const handleSearch = (searchQuery) => {

    let searchResults = mockJson.filter(function search(val) {
      return (
        val.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        val.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (searchQuery.length) {
      history.push("/feed/search?q=" + searchQuery);
    } else {
      history.push("");
    }
    setCards(searchResults);
  };

  const handleSort = (sortBy) => {
    setSelect(sortBy);
    let sorted = cards;
    if (sortBy === "name") {
      sorted = cards.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      });
    }
    if (sortBy === "dateLastEdited") {
      sorted = cards.sort(
        (a, b) => new Date(a.dateLastEdited) - new Date(b.dateLastEdited)
      );
    }
    if (sortBy === "") {
      setCards(mockJson);
    }
    setCards(sorted);
  };

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const q = params.get("q");
    setInput(q ? q : "");
    if (q) {
      handleSearch(q);
    }
  }, []);
  return (
    <>
      <header className="header">
        <h1>Feed</h1>
        <div className="row">
          <div className="search_input">
            Search : <input value={input} onChange={handleInput} />
            <span onClick={() => handleSearch(input)} className="search_button">
              🔎
            </span>
          </div>
          <div className="sortby_select">
            Sort by :{" "}
            <select
              onChange={(e) => {
                handleSort(e.target.value);
              }}
              value={select}
            >
              <option value="" selected hidden>
                Choose here
              </option>
              <option value="name">Title</option>
              <option value="dateLastEdited">Last Edited Date</option>
            </select>
          </div>
        </div>
      </header>

      <section className="feed_page">
        <div className="card_container">
          {cards.length ? (
            cards.map((card, i) => <Card key={i} card={card} />)
          ) : (
            <div className="no_result">No search results found!</div>
          )}
        </div>
      </section>
    </>
  );
}

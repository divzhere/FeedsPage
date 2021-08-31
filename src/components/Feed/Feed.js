import React, { useState, useEffect } from "react";
import { mockJson } from "../mockJson";
import "./feed.scss";
import Card from "../Card/Card";
import { useHistory, useLocation } from "react-router-dom";

export default function Feed(props) {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [cards, setCards] = useState(mockJson);

  let history = useHistory();

  const handleInput = (e) => {
    if (e.target.value === "") {
      setCards(mockJson);
    }
    setInput(e.target.value);
  };

  const handleSearch = (searchQuery) => {
    let searchResults = cards.filter(function search(val) {
      return (
        val.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        val.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    if (searchQuery.length) {
      history.push("/feed/search?q=" + searchQuery);
    }
    setCards(searchResults);
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
            <span onClick={() => handleSearch(input)}>🔎</span>
          </div>
          <div className="sortby_select">
            Sort by :{" "}
            <select onChange={(e) => setSelect(e.target.value)} value={select}>
              <option value="" selected hidden>
                Choose here
              </option>
              <option value="name">Title</option>
              <option value="dateLastEdited">Last Edited Date</option>
              {select && <option value="">Unsort</option>}
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

// export default withRouter(Feed);

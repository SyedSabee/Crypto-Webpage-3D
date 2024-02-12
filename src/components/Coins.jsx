import React from "react";
import { useState, useEffect } from "react";
import { Baseurl } from "./BaseUrl";
import Loader from "./Loader";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";
import "../styles/Res.css";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("pkr");
  const [search, setSearch] = useState("");

  const currencySymbol = currency === "pkr" ? "Rs" : "$";

  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(
          `${Baseurl}/coins/markets?vs_currency=${currency}`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCoinsData();
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Your Coins"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setCurrency("pkr")}>PKR</button>
            <button onClick={() => setCurrency("usd")}>USD</button>
          </div>

          {coins
            .filter((data) => {
              if (data == "") {
                return data;
              } else if (
                data.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((coindata, index) => {
              return (
                <CoinCard
                  coindata={coindata}
                  id={coindata.id}
                  index={index}
                  currencySymbol={currencySymbol}
                />
              );
            })}
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, index, currencySymbol, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${id}`}
      style={{ color: "white", textDecoration: "none" }}>
      <div key={index} className="ex-cards">
        <div className="image">
          <img height={"80px"} src={coindata.image} alt="" />
        </div>
        <div className="name">{coindata.name}</div>
        <div className="price">
          {currencySymbol} {coindata.current_price.toFixed(0)}
        </div>
        <div
          style={profit ? { color: "green" } : { color: "red" }}
          className="rank">
          {profit
            ? "+" + coindata.price_change_percentage_24h.toFixed(2)
            : coindata.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;

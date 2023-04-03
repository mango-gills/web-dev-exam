import React, { useEffect, useState } from "react";
import LaunchCard from "./components/LaunchCard";
import { useInView } from "react-intersection-observer";

import loadingIcon from "./assets/loading_icon.gif";

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [limit, setLimit] = useState(4);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const fetchLaunchData = () => {
    fetch("https://api.spacexdata.com/v4/launches/")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setApiData(result);
      });
  };

  useEffect(() => {
    fetchLaunchData();

    if (inView) {
      setTimeout(() => {
        setLimit(limit + 4);
      }, 2000);
    }
  }, [inView]);

  return (
    <div className="app">
      <input className="search" type="text" placeholder="Enter keywords" />
      <div className="data-container">
        {apiData.slice(0, limit).map((data, index) => (
          <LaunchCard data={data} key={index} />
        ))}
      </div>

      <div className="loader" ref={ref}>
        {inView && limit < apiData.length ? (
          <img src={loadingIcon} alt="loading_icon" />
        ) : (
          <p>No more data to be fetched</p>
        )}
      </div>
    </div>
  );
};

export default App;

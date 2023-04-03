import React from "react";

const LaunchCard = ({ data }) => {
  const launchYear = data?.date_local.split("-")[0];

  return (
    <div className="launch-card">
      <div className="img-container">
        <img src={data?.links.patch.small} alt="" />
      </div>

      <div className="launch-card-details">
        <h2>
          {data?.flight_number} : {data?.name} ({launchYear})
        </h2>
        <p>
          Details: <span>{data?.details}</span>
        </p>
      </div>
    </div>
  );
};

export default LaunchCard;

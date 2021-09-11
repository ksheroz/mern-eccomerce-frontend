import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);

    let highest = length * 5;

    let result = (totalReduced * 5) / highest;

    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: "0.5rem",
          paddingBottom: "1.5rem",
        }}
      >
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
          />
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};

import React, { useEffect, useState } from "react";

const ProductReviews = ({ reviews }) => {
  const [ratingColor, setRatingColor] = useState([
    "text-gray-400",
    "text-gray-400",
    "text-gray-400",
    "text-gray-400",
    "text-gray-400",
  ]);

  const ratings = [
    { ratingValue: 1, ratingColor: ratingColor[0] },
    { ratingValue: 2, ratingColor: ratingColor[1] },
    { ratingValue: 3, ratingColor: ratingColor[2] },
    { ratingValue: 4, ratingColor: ratingColor[3] },
    { ratingValue: 5, ratingColor: ratingColor[4] },
  ];

  return (
    <>
      {reviews.map((review) => (
        <>
          <ul className>
            <li className="py-4 text-left  px-4 m-2">
              <div className="flex items-start">
                <div className="ml-6">
                  <div className="flex items-center">
                    {ratings.map((rating) => (
                      <svg
                        className={`block h-6 w-6 align-middle ${
                          review.stars >= rating.ratingValue
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          className
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-5 text-base text-gray-900">
                    {review.review}
                  </p>
                  <p className="mt-5 text-sm font-bold text-gray-900">
                    {review.user_name}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {review.updatedAt.slice(0, 10)}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="relative flex py-5 items-center px-8 m-2">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink  text-gray-400"></span>
            <div class="flex-grow border-t border-gray-400"></div>
          </div>
        </>
      ))}
      <div className="mb-32"></div>
    </>
  );
};

export default ProductReviews;

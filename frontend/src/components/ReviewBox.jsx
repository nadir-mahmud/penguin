import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewBox = ({ id, userId, userName }) => {
  const [showSuccessComponent, setShowSuccessComponent] = useState(false);
  const [showWarningComponent, setShowWarningComponent] = useState(false);
  const [reviewWarningComponent, setReviewWarningComponent] = useState(false);
  const [ratingColor, setRatingColor] = useState([
    "text-gray-400",
    "text-gray-400",
    "text-gray-400",
    "text-gray-400",
    "text-gray-400",
  ]);

  const [ratingFirst, setRatingFirst] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [initialText, setInitialText] = useState({});

  const ratings = [
    { ratingValue: 1, ratingColor: ratingColor[0] },
    { ratingValue: 2, ratingColor: ratingColor[1] },
    { ratingValue: 3, ratingColor: ratingColor[2] },
    { ratingValue: 4, ratingColor: ratingColor[3] },
    { ratingValue: 5, ratingColor: ratingColor[4] },
  ];

  const handleColor = (ratingValue) => {
    if (ratingValue === 1 && !ratingFirst) {
      setRatingColor([
        "text-blue-500",
        "text-gray-400",
        "text-gray-400",
        "text-gray-400",
        "text-gray-400",
      ]);
      handleReview(ratingValue);
      setRatingFirst(true);
    } else if (ratingValue === 1 && ratingFirst) {
      setRatingColor([
        "text-gray-400",
        "text-gray-400",
        "text-gray-400",
        "text-gray-400",
        "text-gray-400",
      ]);
      setRatingFirst(false);
    } else if (ratingValue === 2) {
      setRatingColor([
        "text-blue-500",
        "text-blue-500",
        "text-gray-400",
        "text-gray-400",
        "text-gray-400",
      ]);
      handleReview(ratingValue);
    } else if (ratingValue === 3) {
      setRatingColor([
        "text-blue-500",
        "text-blue-500",
        "text-blue-500",
        "text-gray-400",
        "text-gray-400",
      ]);
      handleReview(ratingValue);
    } else if (ratingValue === 4) {
      setRatingColor([
        "text-blue-500",
        "text-blue-500",
        "text-blue-500",
        "text-blue-500",
        "text-gray-400",
      ]);
      handleReview(ratingValue);
    } else if (ratingValue === 5) {
      setRatingColor([
        "text-blue-500",
        "text-blue-500",
        "text-blue-500",
        "text-blue-500",
        "text-blue-500",
      ]);
      handleReview(ratingValue);
    }
  };

  const handleReview = async (rating) => {
    if (review) {
      await axios.put("https://penguin-alpha.vercel.app/api/review/update", {
        product_id: id,
        user_id: userId,
        user_name: userName,
        review: review,
        stars: rating,
      });
      setRating(rating);
      setReview("");
    } else {
      await axios.put("https://penguin-alpha.vercel.app/api/review/update", {
        product_id: id,
        user_id: userId,
        user_name: userName,
        stars: rating,
      });
      setRating(rating);
    }
  };

  const handleReviewSuccess = () => {
    handleReview(rating);
  };

  useEffect(() => {
    if (showSuccessComponent) {
      const toRef = setTimeout(() => {
        setShowSuccessComponent(false);
        clearTimeout(toRef);
      }, 2000);
    }
  }, [showSuccessComponent]);
  useEffect(() => {
    if (showWarningComponent) {
      const toRef = setTimeout(() => {
        setShowWarningComponent(false);
        clearTimeout(toRef);
      }, 2000);
    }
  }, [showWarningComponent]);

  useEffect(() => {
    if (reviewWarningComponent) {
      const toRef = setTimeout(() => {
        setReviewWarningComponent(false);
        clearTimeout(toRef);
      }, 2000);
    }
  }, [reviewWarningComponent]);

  return (
    <>
      <h3 className="text-gray-900 text-lg mb-1/2 mx-10">Rate this product</h3>
      <p className="text-gray-500 text-sm font-thin mx-10">
        Tell others what you think
      </p>

      <div className="flex items-center mx-10 my-4">
        {ratings.map((rating) => (
          <>
            <button
              onClick={() =>
                handleColor(rating.ratingValue, rating.ratingColor)
              }
            >
              <svg
                className={`block h-6 w-6 align-middle ${rating.ratingColor}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  className
                />
              </svg>
            </button>
          </>
        ))}
      </div>

      <div className="mb-6 mx-10">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <textarea
          type="text"
          id="large-input"
          defaultValue=""
          required
          onChange={(e) => {
            setReview(e.target.value);
            setInitialText(e);
          }}
          className="block w-full h-28  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          onClick={(e) => {
            if (rating !== 0) {
              handleReview(rating);
              if (review !== "") {
                initialText.target.value = "";
                setShowSuccessComponent(true);
              } else {
                setReviewWarningComponent(true);
              }
            } else {
              setShowWarningComponent(true);
            }
          }}
          className="ml-auto mr-4 flex flex-end text-white bg-blue-500 border-0 py-2 px-6 mt-4 focus:outline-none hover:bg-blue-600 rounded"
        >
          Submit
        </button>
        {showSuccessComponent ? (
          <div
            class="p-4 mt-6 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {handleReviewSuccess()}
            <span class="font-medium">Successfully posted!</span>
          </div>
        ) : null}
        {showWarningComponent ? (
          <div
            class="p-4 mt-6 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <span class="font-medium">Please rate the product first!</span>
          </div>
        ) : null}

        {reviewWarningComponent ? (
          <div
            class="p-4 mt-6 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
          >
            <span class="font-medium">Please write a review!</span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ReviewBox;

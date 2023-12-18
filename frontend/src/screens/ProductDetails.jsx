import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import ProductReviews from "../components/ProductReviews";
import ReviewCounts from "../components/ReviewCounts";
import ReviewBox from "../components/ReviewBox";
import Product from "../components/Product";
import ScrollToTop from "../route/ScrollToTop";

const ProductDetails = () => {
  const [order, setOrder] = useState({});
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);

  const location = useLocation();
  const { state } = location;
  let authString = localStorage.getItem("auth");
  let auth = JSON.parse(authString);

  const getAllReviews = async () => {
    try {
      const { data } = await axios.post(
        "https://penguin-alpha.vercel.app/api/product/reviews",
        {
          product_id: state._id,
        }
      );

      setReviews(data.reviews);
      setOneStar(data.reviews.filter((review) => review.stars === 1).length);
      setTwoStar(data.reviews.filter((review) => review.stars === 2).length);
      setThreeStar(data.reviews.filter((review) => review.stars === 3).length);
      setFourStar(data.reviews.filter((review) => review.stars === 4).length);
      setFiveStar(data.reviews.filter((review) => review.stars === 5).length);

      setTotalReviews(data.reviews.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.post(
        "https://penguin-alpha.vercel.app/api/order",
        {
          product_id: state._id,
          user_id: auth?.user._id,
        }
      );

      console.log(data);

      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getAllReviews();
  }, [reviews.length < 0, reviews]);

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Product
          product_id={state._id}
          user_id={auth?.user._id}
          product_name={state.name}
          price={state.price}
          product_photo={state.photo}
          product_description={state.description}
          totalReviews={totalReviews}
          finalRating={Math.round(
            parseFloat(
              (1 * oneStar +
                2 * twoStar +
                3 * threeStar +
                4 * fourStar +
                5 * fiveStar) /
                totalReviews
            ).toPrecision(2)
          )}
        />
        <ReviewCounts
          totalReviews={totalReviews}
          oneStar={oneStar}
          twoStar={twoStar}
          threeStar={threeStar}
          fourStar={fourStar}
          fiveStar={fiveStar}
          product_id={state._id}
        />

        {auth?.token && order.success ? (
          <ReviewBox
            id={state._id}
            userId={auth?.user._id}
            userName={auth.user.name}
          />
        ) : null}

        <ProductReviews reviews={reviews} />
      </Layout>
    </>
  );
};

export default ProductDetails;

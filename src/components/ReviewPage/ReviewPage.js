import React, { useState, useEffect } from 'react';
import { ReviewList } from '../ReviewList/ReviewList';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { LoadingSpinner } from '../common/LoadingSpinner/LoadingSpinner';
import classes from './ReviewPage.module.css';

export const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAvatarURL = () => {
    return fetch('https://picsum.photos/80/80')
      .then((response) => {
        setIsLoading(false);
        return response.url;
      })
      .catch((error) => {
        setIsLoading(false);
        return console.error(error);
      });
  };

  useEffect(() => {
    const userReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    if (userReviews.length) {
      setReviews(userReviews);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReviewHandler = async ({ name, comment }) => {
    setIsLoading(true);
    const id = 'id' + Math.random().toString(16).slice(2);
    const avatar = await getAvatarURL();
    setReviews([{ name, comment, id, avatar }, ...reviews]);
  };

  const editReviewHandler = ({ id, name, comment }) => {
    const updatedReviews = reviews.map((review) => {
      return review.id === id ? { ...review, name, comment } : review;
    });
    setReviews(updatedReviews);
  };

  const deleteReviewHandler = (id) => {
    const newReviews = reviews.filter((review) => review.id !== id);
    setReviews(newReviews);
  };

  return (
    <div className={classes.container}>
      <h1>Users Reviews:</h1>
      {isLoading && <LoadingSpinner />}
      <ReviewList
        userReviews={reviews}
        onEditReview={editReviewHandler}
        onDeleteReview={deleteReviewHandler}
      />
      <ReviewCard onAddReview={addReviewHandler} isLoading={isLoading} />
    </div>
  );
};

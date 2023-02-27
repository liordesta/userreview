import React, { useState } from 'react';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import classes from './ReviewList.module.css';

export const ReviewList = ({ userReviews, onEditReview, onDeleteReview }) => {
  const [isEditReview, setIsEditReview] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const updateReview = (userReviews) => {
    setIsEditReview(false);
    onEditReview(userReviews);
  };

  return isEditReview ? (
    <ReviewCard id={selectedId} onAddReview={updateReview} />
  ) : (
    <>
      {userReviews.map((reviewer) => (
        <div className={classes.container} key={reviewer.id}>
          <div className={classes.wrapper}>
            <div className={classes.reviewDetails}>
              <img src={reviewer.avatar} alt='avatar' />
              <div className={classes.review}>
                <div>
                  <h4>{reviewer.name}</h4>
                </div>
                <div>
                  <p>{reviewer.comment}</p>
                </div>
              </div>
            </div>

            <div className={classes.actionIcons}>
              <img
                src={editIcon}
                alt='edit-icon'
                onClick={() => {
                  setIsEditReview(true);
                  setSelectedId(reviewer.id);
                }}
              />
              <img
                src={deleteIcon}
                alt='delete-icon'
                onClick={() => onDeleteReview(reviewer.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

import React, { useId, useRef } from 'react';
import classes from './ReviewCard.module.css';

export const ReviewCard = ({ onAddReview, id, isLoading }) => {
  const customId = useId();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const meetupData = {
      id: id,
      name: nameInputRef.current.value,
      comment: commentInputRef.current.value,
    };

    nameInputRef.current.value = '';
    commentInputRef.current.value = '';

    onAddReview(meetupData);
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.formEl} onSubmit={submitHandler}>
        <label htmlFor={customId + '-fullName'}>Full name:</label>
        <input
          id={customId + '-fullName'}
          placeholder='Enter Your Name'
          type='text'
          required
          ref={nameInputRef}
        ></input>
        <label htmlFor={customId + '-comment'}>Comment:</label>
        <textarea
          id={customId + '-comment'}
          placeholder='Write a Comment'
          rows='6'
          required
          ref={commentInputRef}
        ></textarea>
        <button
          className={`${classes.actionBtn} ${
            isLoading ? classes.disabled : ''
          }`}
        >
          {isLoading ? 'Posting...' : 'Post Review'}
        </button>
      </form>
    </div>
  );
};

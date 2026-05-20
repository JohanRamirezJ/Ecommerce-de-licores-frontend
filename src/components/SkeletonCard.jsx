import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="product skeleton">
      <div className="skeleton-image"></div>
      <div className="product-txt">
        <h4 className="skeleton-text"></h4>
        <p className="skeleton-text"></p>
        <div className="product-footer">
          <span className="price skeleton-text"></span>
          <button className="add-cart skeleton-button" disabled>
            <i className="ri-shopping-bag-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
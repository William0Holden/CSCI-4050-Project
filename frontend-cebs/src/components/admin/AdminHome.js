import React from 'react';

import './AdminHome.css';

const AdminHome = (props) => {
  // Update URLs to point to Django admin paths
  const manageMovies = () => {
    window.location.href = 'http://localhost:8000/admin/movie/movie/';
  };
  const manageUsers = () => {
    window.location.href = 'http://localhost:8000/admin/user_api/appuser/';
  };
  const managePromotions = () => {
    window.location.href = 'http://localhost:8000/admin/movie/discount/';
  };

  return (
    <div className="admin-home">
      <div className="admin-container">
        <h1>Admin Home</h1>
        <div className="admin-option">
          <label htmlFor="movieImageUrl">Manage Movies</label>
          <input
            type="text"
            id="movieImageUrl"
            className="hidden"
            value="https://png.pngtree.com/png-clipart/20210309/original/pngtree-movie-clip-art-movie-film-field-clapper-board-png-image_5862049.jpg"
          />
          <button onClick={manageMovies}>Manage Movies</button>
        </div>
        <div className="admin-option">
          <label htmlFor="userImageUrl">Manage Users</label>
          <input
            type="text"
            id="userImageUrl"
            className="hidden"
            value="https://cdn-icons-png.flaticon.com/512/33/33308.png"
          />
          <button onClick={manageUsers}>Manage Users</button>
        </div>
        <div className="admin-option">
          <label htmlFor="promotionImageUrl">Manage Promotions</label>
          <input
            type="text"
            id="promotionImageUrl"
            className="hidden"
            value="https://img.freepik.com/free-vector/marketing-promo-clipart-illustrated_52683-74351.jpg"
          />
          <button onClick={managePromotions}>Manage Promotions</button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

import React from 'react';

import './AdminHome.css';

const AdminHome = (props) => {
  const manageMovies = () => {
    window.location.href = '/admin/manage-movies';
  };
  const manageUsers = () => {
    window.location.href = '/admin/manage-users';
  };
  const managePromotions = () => {
    window.location.href = '/admin/manage-promos';
  };

  return (
    <div className="admin-home">
      <div className="admin-container">
        <h1>Admin Home</h1>
          <div className="admin-option">
              <label htmlFor="movieImageUrl">Manage Movies</label>
              <input type="text" id="movieImageUrl" className="hidden" value="https://png.pngtree.com/png-clipart/20210309/original/pngtree-movie-clip-art-movie-film-field-clapper-board-png-image_5862049.jpg"/>
              <button onClick={manageMovies}>Manage Movies</button>
          </div>
          <div className="admin-option">
              <label htmlFor="userImageUrl">Manage Users</label>
              <input type="text" id="userImageUrl" className="hidden" value="https://cdn-icons-png.flaticon.com/512/33/33308.png"/>
              <button onClick={manageUsers}>Manage Users</button>
          </div>
          <div className="admin-option"> 
              <label htmlFor="promotionImageUrl">Manage Promotions</label>
              <input type="text" id="promotionImageUrl" className="hidden" value="https://img.freepik.com/free-vector/marketing-promo-clipart-illustrated_52683-74351.jpg"/>
              <button onClick={managePromotions}>Manage Promotions</button>
          </div>
      </div>
    </div>
  );
}

export default AdminHome;
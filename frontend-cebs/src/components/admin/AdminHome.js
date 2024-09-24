import React from 'react';

import './AdminHome.css';

const AdminHome = (props) => {
  return (
    <div class="admin-container">
        <div class="admin-option">
            <label for="movieImageUrl">Manage Movies</label>
            <input type="text" id="movieImageUrl" class="hidden" value="https://png.pngtree.com/png-clipart/20210309/original/pngtree-movie-clip-art-movie-film-field-clapper-board-png-image_5862049.jpg"/>
            <button onclick="manageMovies()">Manage Movies</button>
        </div>
        <div class="admin-option">
            <label for="userImageUrl">Manage Users</label>
            <input type="text" id="userImageUrl" class="hidden" value="https://cdn-icons-png.flaticon.com/512/33/33308.png"/>
            <button >Manage Users</button>
        </div>
        <div class="admin-option">
            <label for="promotionImageUrl">Manage Promotions</label>
            <input type="text" id="promotionImageUrl" class="hidden" value="https://img.freepik.com/free-vector/marketing-promo-clipart-illustrated_52683-74351.jpg"/>
            <button >Manage Promotions</button>
        </div>
    </div>
  )
}

export default AdminHome;
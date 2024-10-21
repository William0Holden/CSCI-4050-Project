import React from 'react';

import './ManagePromos.css';

const ManagePromos = (props) => {
  return (
    <div className="manage-promos-container">

                    <h1>Theatre Admin</h1>

        <div class="container">
            <div class="main-content">
                <h2>Manage Promotions</h2>
                <form>
                    <div class="form-group">
                        <label for="promo-name">Promotion Name</label>
                        <input type="text" id="promo-name" name="promo-name"/>
                    </div>
                    <div class="form-group">
                        <label for="promo-description">Promotion Description</label>
                        <textarea id="promo-description" name="promo-description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="promo-code">Promotion Code</label>
                        <input type="text" id="promo-code" name="promo-code"/>
                    </div>
                    <div class="form-group">
                        <label for="promo-discount">Discount Percentage</label>
                        <input type="number" id="promo-discount" name="promo-discount" min="0" max="100"/>
                    </div>
                    <div class="form-group">
                        <button type="submit">Add Promotion</button>
                    </div>
                </form>
            </div>
        </div>
</div>
  )
};
export default ManagePromos;
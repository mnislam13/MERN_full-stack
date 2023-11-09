import React, { useState } from 'react';
import './product.style.css';

function Product({ id, name, description, price, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedPrice, setEditedPrice] = useState(price);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onUpdate(id, editedName, editedDescription, editedPrice);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <div className="product">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                    />
                    <button className='save-button' onClick={handleSaveClick}>Save</button>
                </>
            ) : (
                <>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p>Price: {price}</p>
                    <button className='edit-button' onClick={handleEditClick}>Edit</button>
                </>
            )}
            <button className='delete-button' onClick={handleDeleteClick}>Delete</button>
        </div>
    );
}

export default Product;
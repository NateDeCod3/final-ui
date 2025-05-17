import React from 'react';
import '../styles/DeleteConfirmation.css';

const DeleteConfirmation = ({ postId, onConfirm, onCancel }) => {
    return (
        <div className="delete-popup">
            <div className="delete-popup-content">
                <p className="delete-popup-text">Are you sure you want to delete this post?</p>
                <div className="delete-popup-buttons">
                    <button className="delete-popup-cancel" onClick={onCancel}>
                        CANCEL
                    </button>
                    <button className="delete-popup-confirm" onClick={() => onConfirm(postId)}>
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;

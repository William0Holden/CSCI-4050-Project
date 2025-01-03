import React, { useState } from 'react';
import Modal from 'react-modal';
import './TrailerModal.css'; // Make sure to create and style this CSS file

const TrailerModal = ({ trailer_url, synopsis }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (!trailer_url) return null;

    // Extract the video ID from the URL
    const videoId = new URL(trailer_url).searchParams.get('v');
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div>
            <button className="modal-button" onClick={openModal}>More Details</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Trailer Modal"
                ariaHideApp={false}
            >
                <button className="modal-button" onClick={closeModal}>Close</button>
                <div className="video-responsive">
                    <iframe
                        width="560"
                        height="315"
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    ></iframe>
                </div>
                {synopsis && (
                    <div className="synopsis">
                        <h4>Synopsis</h4>
                        <p>{synopsis}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TrailerModal;

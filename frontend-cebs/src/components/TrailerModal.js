import React, { useState } from 'react';
import Modal from 'react-modal';

const TrailerModal = ({ trailer_url }) => {
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
            <button onClick={openModal}>Watch Trailer</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Trailer Modal"
                ariaHideApp={false}
            >
                <button onClick={closeModal}>Close</button>
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
            </Modal>
        </div>
    );
};

export default TrailerModal;
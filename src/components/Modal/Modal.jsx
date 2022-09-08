import { Overlay, ModalStyle } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, images, id }) => {
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []); // eslint-disable-line

	const findImage = () => {
		if (id) {
			return images.find(image => image.id === id);
		}
	};

	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleKeyDown = e => {
		if (e.code === 'Escape') {
			onClose();
		}
	};

	const findedImage = findImage();
	return createPortal(
		<Overlay onClick={handleBackdropClick}>
			<ModalStyle>
				<img src={findedImage.largeImageURL} alt={findedImage.tags} />
			</ModalStyle>
		</Overlay>,
		modalRoot
	);
};

Modal.propTypes = {
	images: PropTypes.array,
	id: PropTypes.number,
	onClose: PropTypes.func.isRequired,
};

export default Modal;

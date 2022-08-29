import {
	ImageGalleryItemStyle,
	ImageGalleryImageStyle,
} from './ImageGalleryItem.styled';
import  {PropTypes}  from 'prop-types';

export const ImageGalleryItem = ({ src, alt, largeImageURL, openModal }) => {
	return (
		<ImageGalleryItemStyle onClick={() => openModal(largeImageURL)}>
			<ImageGalleryImageStyle src={src} alt={alt} />
	
					</ImageGalleryItemStyle>
	);
};

ImageGalleryItem.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	largeImageURL: PropTypes.string.isRequired,
	openModal: PropTypes.func.isRequired,
  };



export default ImageGalleryItem;


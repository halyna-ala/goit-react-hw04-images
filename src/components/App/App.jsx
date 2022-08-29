import { useState, useEffect }from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled';
// import { Notify } from "../../components/ImageGallery/ImageGallery.styled";
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Button from 'components/Button';
import Modal from 'components/Modal';
// import ImageErrorView from 'components/ImageErrorView';
import Loader from 'components/Loader';
import imagesAPI from '../../services/images-api';
import { animateScroll } from 'react-scroll';

export const App = () => {	
	const [searchQuery, setSearchQuery] = useState('');
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [loadMore, setLoadMore] = useState(false);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [largeImageURL, setLargeImageURL] = useState('');
	const perPage = 12;
	
	useEffect(() => {
		getPhotos(searchQuery, page);
	}, [searchQuery, page]);

	const getPhotos = async (searchQuery, page) => {
		if (!searchQuery) 
		return;
		setIsLoading(true);

		try {
			const { hits, totalHits } = await imagesAPI(searchQuery, page);
			if (hits.length === 0) {
				return alert('Sorry, nothing found');
			}
			setImages(prevImages => [...prevImages, ...hits]);
			setLoadMore(page < Math.ceil(totalHits / perPage));
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const handleFormSubmit = searchQuery => {
		setSearchQuery(searchQuery);
		setPage(1);
		setLoadMore(false);
		setImages([]);
		
	};

	const onloadMore = () => {
		setIsLoading(true);
		setPage(prevPage => prevPage + 1);
		scrollOnMoreButton();
	  };

	  const scrollOnMoreButton = () => {
		animateScroll.scrollToBottom({
		  duration: 1000,
		  delay: 10,
		  smooth: 'linear',
		});
	  };

	const openModal = largeImageURL => {
		setShowModal(true);
		setLargeImageURL(largeImageURL);
	};

	const closeModal = () => {
		setShowModal(false);
	  };

		return (
			<AppContainer>
				<Searchbar onSubmit={handleFormSubmit} />
				<ToastContainer position="top-center" autoClose={3000} />
				
				{isLoading ? ( <Loader />) : (<ImageGallery
					openModal={openModal}
					images={images}
				
				/>)}

                {error && <p>something went wrong</p>}
				
				{loadMore && <Button onloadMore={onloadMore} page={page} />}
				
				{showModal && (
					<Modal largeImageURL={largeImageURL} onClose={closeModal} />
				)}
			</AppContainer>
		);
	}

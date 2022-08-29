import { useState } from 'react';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

import {
	SearchForm,
	SearchButton,
	SearchLabel,
	SearchInput,
} from './SearchbarForm.styled';

const SearchbarForm = ({ onSubmit }) => {
	const [searchQuery, setSearchQuery] = useState('');

	

	const handleValueChange = event => {
		setSearchQuery ( event.currentTarget.value.toLowerCase() );
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (searchQuery.trim() === '') {
			toast.warn('Введіть слово для пошуку');
			return 
			// alert('Введіть слово для пошуку')
			;
		};

	// 	if (setSearchQuery !== searchQuery) { ({
	// 		searchQuery: searchQuery,
	// 		page: 1,
	// 		loadMore: false,
	// 		images: [],

	// 	});
	// return;}
		onSubmit(searchQuery);
		setSearchQuery('')
		
		// this.setState({ searchQuery: '' });
	};
	
		return (
			<SearchForm onSubmit={handleSubmit}>
				<SearchButton type="submit">
					<SearchLabel>Search</SearchLabel>
				</SearchButton>

				<SearchInput
					name="searchQuery"
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Пошук зображень та фотографій"
					value={searchQuery}
					onChange={handleValueChange}
				/>
			</SearchForm>
		);
	}


SearchbarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchbarForm;

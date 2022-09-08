import { PropTypes } from 'prop-types';
import { ImageErrorViewStyled } from "./ImageErrorView.styled";

export default function ImageErrorView({ message }) {
	return (
		<ImageErrorViewStyled role='alert'>
			<p>{ message}</p>
		</ImageErrorViewStyled>
	)
}

ImageErrorView.propTypes = {
  message: PropTypes.string,
};
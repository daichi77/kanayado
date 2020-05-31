import { connect } from 'react-redux';
import SearchBar from '../searchBar';
import { sendFilterText } from '../Actions/index';

const mapDispatchToProps = dispatch => ({
	sendFilterText(text) {
		dispatch(sendFilterText(text));
	},
});

export default connect(null, mapDispatchToProps)(SearchBar);

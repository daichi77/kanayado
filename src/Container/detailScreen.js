import { connect } from 'react-redux';
import DetailScreen from '../detailScreen';

const mapStateToProps = (state) => {
  return {
    hotelData: state.hotelData.hotelData,
  };
};

export default connect(mapStateToProps)(DetailScreen);

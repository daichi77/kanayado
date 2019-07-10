import { connect } from 'react-redux';
import { modalIsOpen, saveHotelData } from '../Actions/index';
import Map from '../Map';

const mapStateToProps = (state) => {
  return {
    tourdata: state.postTour.items,
    lodgingdata: state.postLodging.items,
  };
};

const mapDispatchToProps = dispatch => ({
  modalIsOpen() {
    dispatch(modalIsOpen());
  },
  saveHotelData(hotelData) {
    dispatch(saveHotelData(hotelData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

import { connect } from 'react-redux';
import { modalIsOpen } from '../Actions/index';
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

import { connect } from 'react-redux';
import Modal from '../modal';
import { toggelModalIsOpen } from '../Actions/index';

const mapStateToProps = state => {
  console.log(state.modalIsOpen.isOpen);
  return {
    isOpen: state.modalIsOpen.isOpen,
    hotelData: state.hotelData.hotelData,
  };
};

const mapDispatchToProps = dispatch => ({
  toggelModalIsOpen() {
    dispatch(toggelModalIsOpen());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

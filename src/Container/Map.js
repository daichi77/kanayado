import { connect } from 'react-redux';
import Map from '../Map';

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    tourdata: state.postTour.items,
    lodgingdata: state.postLodging.items,
  };
};

export default connect(mapStateToProps)(Map);

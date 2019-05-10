import { connect } from 'react-redux';
import Map from '../Map';

const mapStateToProps = (state) => {
  return {
    tourdata: state.postTour,
    lodgingdata: state.postLodging,
  };
};

export default connect(mapStateToProps)(Map);

import { connect } from 'react-redux';
import DrawerCustom from '../drawerCustom';

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    tourdata: state.postTour.items,
    filterText: state.filterText.text,
  };
};

export default connect(mapStateToProps)(DrawerCustom);

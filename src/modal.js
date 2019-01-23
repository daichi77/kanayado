import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import SearchIcon1 from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  yoko: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tate: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '8%',
  },
  text1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '15%',
  },
  marker1: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    backgroundColor: '#0B610B',
    bottom: 0,
    borderRadius: 20,
  },
  marker2: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    backgroundColor: '#81DAF5',
    bottom: 0,
    borderRadius: 20,
  },
});

// 写真がない時に問題が起こる。
// itemのPropTypes宣言
// 関数名や変数名の修正
const Modals = ({
  isOpen, toggleIsOpen, item, fetchToilet,
}) => (
  <Modal
    isOpen={isOpen}
    onClosed={toggleIsOpen}
    backdrop={false}
    style={[styles.modal]}
    position="bottom"
  >
    <View style={styles.yoko}>
      <View style={{ width: '40%', height: '100%' }}>
        <Image
          source={{ uri: item.PictureURL }}
          style={{ width: '100%', height: '100%' }}
        />

      </View>

      <View style={{ width: '60%', height: '100%' }}>
        <View style={styles.tate}>
          <View style={{
            width: '100%', height: '30%', borderColor: '#BDBDBD', borderStyle: 'solid', borderBottomWidth: 1, borderTopWidth: 5,
          }}
          >
            <Text style={styles.text}>{item.HotelName}</Text>
          </View>

          <View style={{ width: '100%', height: '40%' }}>
            <View style={styles.yoko}>
              <View style={{ width: '50%', height: '100%' }}>
                <View style={styles.tate}>
                  <View style={styles.marker1}>
                    <Text style={styles.text1}>{item.PlanSampleRateFrom}</Text>
                  </View>
                  
                </View>
              </View>

              <View style={{ width: '50%', height: '100%', position: 'relative' }}>
                <View style={styles.tate}>
                  <View style={styles.marker2}>
                    <SearchIcon1
                      name="arrowright"
                      size={30}
                      onPress={fetchToilet}
                      style={{
                        width: '100%', height: '100%', textAlign: 'center', marginTop: '10%', color: '#FFFFFF' 
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: '100%', height: '30%' }}>
            <View style={styles.yoko}>
              <View style={{ width: '50%', height: '100%' }}>
                <Text style={styles.text}>価格</Text>
              </View>

              <View style={{ width: '50%', height: '100%' }}>
                <Text style={styles.text}>詳細</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

Modals.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  fetchToilet: PropTypes.func.isRequired,
};

export default Modals;

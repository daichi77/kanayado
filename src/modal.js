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

  horizontal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  text1: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '8%',
  },
  text2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '15%',
  },

  background1: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    backgroundColor: '#0B610B',
    bottom: 0,
    borderRadius: 20,
  },
  background2: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    backgroundColor: '#81DAF5',
    bottom: 0,
    borderRadius: 20,
  },
});

const noPhotoImg = require('../assets/noPhoto.png');

const ModalScreen = ({
  isOpen, toggleIsOpen, data, detailScreen,
}) => (
  <Modal
    isOpen={isOpen}
    onClosed={toggleIsOpen}
    backdrop={false}
    style={[styles.modal]}
    position="bottom"
  >
    <View style={styles.horizontal}>
      <View style={{
        width: '40%',
        height: '100%',
      }}
      >
        <Image
          source={data.PictureURL === '' ? noPhotoImg : { uri: data.PictureURL }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <View style={{
        width: '60%',
        height: '100%',
      }}
      >
        <View style={styles.vertical}>
          <View style={{
            width: '100%',
            height: '30%',
            borderColor: '#BDBDBD',
            borderStyle: 'solid',
            borderBottomWidth: 1,
            borderTopWidth: 5,
          }}
          >
            <Text style={styles.text1}>{data.HotelName}</Text>
          </View>

          <View style={{
            width: '100%',
            height: '40%',
          }}
          >
            <View style={styles.horizontal}>
              <View style={{
                width: '50%',
                height: '100%',
              }}
              >
                <View style={styles.vertical}>
                  <View style={styles.background1}>
                    <Text style={styles.text2}>{data.PlanSampleRateFrom}</Text>
                  </View>
                </View>
              </View>

              <View style={{
                width: '50%',
                height: '100%',
                position: 'relative',
              }}
              >
                <View style={styles.vertical}>
                  <View style={styles.background2}>
                    <SearchIcon1
                      name="arrowright"
                      size={30}
                      onPress={detailScreen}
                      style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        marginTop: '10%',
                        color: '#FFFFFF',
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{
            width: '100%',
            height: '30%',
          }}
          >
            <View style={styles.horizontal}>
              <View style={{
                width: '50%',
                height: '100%',
              }}
              >
                <Text style={styles.text1}>価格</Text>
              </View>

              <View style={{
                width: '50%',
                height: '100%',
              }}
              >
                <Text style={styles.text1}>詳細</Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </View>
  </Modal>
);

ModalScreen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
  detailScreen: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default ModalScreen;

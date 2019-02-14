import React from 'react';
import {
  StyleSheet, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import {
  Container,
  Button,
  Text,
  Icon,
} from 'native-base';
import Reviewpng from '../assets/review.png';

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
  review: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  text1: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: '#0B0719',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  background1: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    bottom: 0,
  },
  background2: {
    width: '85%',
    height: '80%',
    position: 'absolute',
    // backgroundColor: '#81DAF5',
    bottom: 0,
  },
  detialbutton: {
    borderWidth: 2.0,
    borderColor: '#DEEDCB',
    borderRadius: 10,
    padding: 5,
    marginRight: 18,
    marginLeft: 'auto',
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
    <Container>
      <View style={styles.horizontal}>
        <View style={{ width: '40%', height: '100%' }}>
          <Image
            source={data.PictureURL === '' ? noPhotoImg : { uri: data.PictureURL }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View style={{ width: '60%', height: '100%' }}>
          <View style={styles.vertical}>
            <View style={{
              width: '100%', height: '30%', borderColor: '#BDBDBD', borderStyle: 'solid', borderBottomWidth: 1, borderTopWidth: 5,
            }}
            > 
              <Text style={styles.text1}>{data.HotelName}</Text>
            </View>

            <View style={styles.review}>
              <Image
                source={Reviewpng}
                style={styles.review}
              />
              <Text style={styles.text}>{ data.HotelReview}/5.0</Text>
            </View>

            <View style={{ width: '100%', height: '40%' }}>
              <View style={styles.horizontal}>
                <View style={{ width: '50%', height: '100%' }}>
                  <View style={styles.vertical}>
                    <View style={styles.background1}>
                      <Text style={styles.text2}>
                        ¥
                        {data.PlanSampleRateFrom}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ width: '50%', height: '100%', position: 'relative' }}>
                  <View style={styles.vertical}>
                    <View style={styles.background2}>
                      <Button iconRight info onPress={detailScreen} style={styles.detialbutton}>
                        <Text>Next</Text>
                        <Icon name="arrow-forward" />
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>
      </View>
    </Container>
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

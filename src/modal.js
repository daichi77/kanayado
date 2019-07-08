import React from 'react';
import {
  StyleSheet, View, Image,
} from 'react-native';
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

const ModalScreen = ({
  isOpen, toggelModalIsOpen,
}) => (
    <Modal
      isOpen={isOpen}
      onClosed={toggelModalIsOpen}
      backdrop={false}
      style={[styles.modal]}
      position="bottom"
    >
      <Text>hello</Text>
    </Modal>
  );

export default ModalScreen;

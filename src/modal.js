import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal4: {
    height: 200,
  },
});

const Modals = ({ isOpen, toggleIsOpen }) => (
  <Modal
    isOpen={isOpen}
    onClosed={toggleIsOpen}
    backdrop={false}
    style={[styles.modal, styles.modal4]}
    position="bottom"
  >
    <Text style={styles.text}>Modal with backdrop content</Text>
  </Modal>
);

Modals.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

export default Modals;

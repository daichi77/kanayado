import React from 'react';
import { withNavigation } from 'react-navigation';
import CalendarIcon from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

class TimePicker extends React.Component {
  state = {
    isDateTimePickerVisible: false,
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
  };

  render() {
    const { isDateTimePickerVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.showDateTimePicker}>
          <CalendarIcon
            name="calendar"
            size={35}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          titleIOS="日付を選択してください"
          cancelTextIOS="キャンセル"
          confirmTextIOS="決定"
        />
      </View>
    );
  }
}

export default withNavigation(TimePicker);

import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

class Input extends React.PureComponent {
	static defaultProps = {
    handleChange: () => {},
    handleBlur: () => {},
    form: {},
    field: {},
    rest: {}
	}

  render() {
    const {form, field, handleChange, handleBlur, ...rest} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={value => handleChange(value)}
          onBlur={value => handleBlur(value)}
          {...field}
          {...rest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  error: {
    position: 'absolute',
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 12,
  },
});

export default Input;

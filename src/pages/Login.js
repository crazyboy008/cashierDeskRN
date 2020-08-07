import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';
import Input from '@/components/Input';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      account: '',
      password: ''
    };
  }


  componentDidMount() {
  }

  onSubmit = () => {
    console.log('onSubmit')
  }


  render() {
     const {loading} = this.state
    return (
        <View>
            <Input />
            <Input />
            <Button
                disabled={loading}
                onPress={this.onSubmit}
                title="登录"
                color="#ff4000"
            />
        </View>
    );
  }
}

export default Login;
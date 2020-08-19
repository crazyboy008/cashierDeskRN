import React from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
  ToastAndroid,
  Platform
} from 'react-native';
import {connect} from "react-redux";
import { login } from "@/redux/actions/user_action";
import { isEmpty } from '@/utils/common'
import Input from '@/components/Input';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: ''
    };
  }


  componentDidMount() {
  }

  onInputValue(type, value) {
		this.setState({
			[`${type}`]: value
		}, () => {
			this.checkVerify();
		})
  }
  
  checkVerify() {
    const { username, password } = this.state
    if (!isEmpty(username) && !isEmpty(password)) {
      this.setState({loading: false})
    } else {
      this.setState({loading: true})
    }
  }

  onSubmit = async () => {
    const { username, password } = this.state
    const {dispatch, navigation} = this.props;

		if (isEmpty(username)) {
      if (Platform.OS === 'ios') Alert.alert('提示', '请输入账号')
			else ToastAndroid.show('请输入账号', ToastAndroid.SHORT)
			return
		}

		if (isEmpty(password)) {
      if (Platform.OS === 'ios') Alert.alert('提示', '请输入密码')
			else ToastAndroid.show('请输入密码', ToastAndroid.SHORT)
			return
		}
    
    await this.props.login({username, password})
    navigation.goBack();
  }


  render() {
     const {loading} = this.state
    return (
        <View>
            <Input handleChange={this.onInputValue.bind(this, 'username')} />
            <Input handleChange={this.onInputValue.bind(this, 'password')} />
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

export default connect(null, {login})(Login);
import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

class Collection extends React.PureComponent {
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

  onSubmit = () =>  {

  }


  render() {
    const {loading} = this.state
    return (
        <View>
            <Text>Collection</Text>
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

export default Collection;
import React from 'react'
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import { clearUserInfo } from "@/redux/actions/user_action";
import { getStorageAsync, removeStorageAsync, clearStorageAsync } from '@/utils/storage';
import { checkIsLogin } from '@/utils/common'

import IMG_USER_TOP from '@/assets/imgs/img_my_head.png'
import IC_AVATAR from '@/assets/imgs/img_photo_default.png'
import IC_PROBLEM from '@/assets/imgs/ic_dingdan.png'
import IC_ABOUT from '@/assets/imgs/ic_cypher.png'
import ICON_CHEVRON_ARROW from '@/assets/imgs/ic_chevron_right.png'

class Me extends React.PureComponent {
  constructor(props) {
    super(props),
    this.state = {
      isLogin: props.toten,
    }
  }


  async componentDidMount() {
  }

	async fetchUserInfo() {
		try {
		} catch (err) {
			console.log(err)
		}
	}


	listonPressOrderList = () => {
    // console.log('user::::', this.props.user)
    // console.log('toten::::', this.props.toten)
    console.log('state::::', this.props.state)
		if (this.props.isLogin) {
		} else {
			this.showModal()
		}
	}

	onPressUpdatePwd = () => {
    clearStorageAsync()
		if (this.props.isLogin) {
		} else {
			this.showModal()
		}
	}

	onPressLogout = () => {
    // const _this = this
    Alert.alert('温馨提示', '确定要退出登录吗？', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => {
        // clearStorageAsync().then(() => {
        //   this.setState({isLogin: false})
        // })
        this.props.clearUserInfo().then(() => {
          this.setState({isLogin: false})
        })
      }}
    ])
  }

	showModal = () => {
    Alert.alert('温馨提示', '您还未登录', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: '去登录', onPress: () => this.onPressLogin() }
    ])
	}

	onPressLogin = async () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
	}


  render() {
    const { user = {}, isLogin = false} = this.props
    
    return (
      <View style={styles.minepage}>
        <View style={styles.contentbox}>
          <Image style={styles.imgtop} source={IMG_USER_TOP} />
          <View style={[styles.userbox]}>
            <Image style={styles.avatar} source={IC_AVATAR} />
            <View style={styles.infobox}>
              <View style={styles.info}>
                <Text style={styles.nickname}>{user.username || `小西瓜`}</Text>
              </View>
              <Text style={styles.infodesc}>{user.name}</Text>
            </View>
          </View>
          <View style={styles.listbox}>
            <TouchableOpacity style={[styles.itembox, styles.start]} onPress={this.listonPressOrderList}>
              <Image style={styles.icon} source={IC_PROBLEM} />
              <Text style={[styles.desc, styles.flex1]}>订单记录</Text>
              <Image style={styles.icarrow} source={ICON_CHEVRON_ARROW} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itembox, styles.end]} onPress={this.onPressUpdatePwd}>
              <Image style={styles.icon} source={IC_ABOUT} />
              <Text style={[styles.desc, styles.flex1]}>修改密码</Text>
              <Image style={styles.icarrow} source={ICON_CHEVRON_ARROW} />
            </TouchableOpacity>
          </View>
          {isLogin ? 
            <Text title='退出登录' style={styles.btnlogout} onPress={this.onPressLogout}>退出登录</Text> :
            <Text title='登录' style={styles.btnlogout} onPress={this.onPressLogin}>登录</Text>}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({state: state})

export default connect(mapStateToProps, {clearUserInfo})(Me);

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  minepage: {
    position: 'relative',
    minHeight: height,
    backgroundColor: '#f4f2f0', 
  },
  contentbox: {
    position: 'relative',
    paddingTop: 24
  },
  imgtop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 145,
  },
  userbox: {
    position: 'relative',
    paddingLeft: 27,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 15,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  nickname: {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 29,
  },
  infodesc: {
    marginTop: 5,
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
  },
  listbox: {
    marginTop: 28,
    marginLeft: (width - 325) / 2,
    width: 325,
    borderRadius: 10,
  },
  itembox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    height: 59,
    borderTopWidth: 0.5,
    borderTopColor: '#eeeeee',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(219, 219, 219, 1)',
    shadowRadius: 10,
    shadowOffset: {
      width: 8,
      height: 15
    },
  },
  start: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  end: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  icon: {
    marginLeft: 10,
    marginRight: 13,
    width: 24,
    height: 24,
  },
  desc: {
    flex:1,
    color: 'rgba(81, 92, 111, 1)',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
  },
  red: {
    color: '#ff6969',
  },
  icarrow: {
    width: 7,
    height: 12,
    marginRight: 10,
  },
  icredpacket: {
    width: 13,
    height: 16,
  },
  txtredpacket: {
    marginRight: 10,
    marginLeft: 5,
    color: 'rgba(255, 105, 105, 1)',
    fontWeight: '400',
    fontSize: 12,
  },
  imginvitetip: {
    position: 'absolute',
    top: -10,
    left: 115,
    zIndex: 10,
    width: 110,
    height: 51,
  },
  btnlogout: {
    marginTop: 45,
    marginLeft: (width - 330) / 2,
    width: 330,
    height: 46,
    borderWidth: 1,
    borderColor: 'rgba(255, 105, 105, 1)',
    borderRadius: 23,
    backgroundColor: 'rgba(244, 242, 240, 1)',
    shadowColor: 'rgba(255, 105, 105, 0.4)',
    shadowRadius: 10,
    shadowOffset: {
      width: 5,
      height: 10
    },
    color: 'rgba(255, 105, 105, 1)',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 46,
    opacity: 1,
  }
})
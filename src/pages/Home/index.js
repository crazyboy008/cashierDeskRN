import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import Empty from '@/components/Empty';
import More from '@/components/More';
import End from '@/components/End';
import OrderItem from '@/components/OrderItem';
import { numFilter } from '@/utils/common'

import IMG_HOME_TOP from '@/assets/imgs/img_home_head.png'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      endReached: false,
      refreshing: false,
      salesList: [{
        paymentOrderId: '1229314',
        goodsOrderId: '561561229314',
        actualAmt: 100,
        created: 5156114151515,
        status: 'Doing'
      }, {
        paymentOrderId: '1223551',
        goodsOrderId: '561512293142',
        actualAmt: 100,
        created: 5156114151515,
        status: 'Canceled'
      }, {
        paymentOrderId: '1223661',
        goodsOrderId: '561122931453',
        actualAmt: 100,
        created: 5156114151515,
        status: 'Refund'
      }, {
        paymentOrderId: '1227731',
        goodsOrderId: '561122931454',
        actualAmt: 100,
        created: 5156114151515,
        status: 'PaymentSuccess'
      }, {
        paymentOrderId: '1288231',
        goodsOrderId: '561229314155',
        actualAmt: 100,
        created: 5156114151515,
        status: 'New'
      }],
      shopName: '测试门店',
      totalAmt: '0',
      totalNum: '0',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loading, hasMore} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (loading !== prevState.loading) {
      return {
        loading,
      };
    }
    if (hasMore !== prevState.hasMore) {
      return {
        hasMore,
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  componentDidMount() {
  }

  goCollection = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
  }

  goOrderDetail = (id) => {
    const {navigation} = this.props;
    navigation.navigate('OrderDetail', {id});
  }

  onScroll = (e) => {
    const scrollY = e.nativeEvent.contentOffset.y
    // alert(scrollY)
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY,
          },
        },
      },
    ], {useNativeDriver: true})
  };

  onRefresh = () => {
  };

  onEndReached = () => {
    const {hasMore, loading} = this.props;
    if (!hasMore || loading) {
      return;
    }
    this.setState({
      endReached: true,
    });

  };


  renderItem = ({item, index}) => {
    return <OrderItem item={item} index={index} onClick={this.goOrderDetail} />;
  };

  renderFooter = () => {
    const {endReached, hasMore} = this.state;
    if (endReached) {
      return <More />;
    }
    if (!hasMore) {
      return <End />;
    }
    return null;
  };

  renderEmpty = () => {
    const {loading} = this.state;
    if (loading !== undefined) {
      return <Empty />;
    }
    return null;
  };

  render() {
    const {shopName, totalAmt, totalNum, salesList, refreshing} = this.state;
    return (
      <View style={styles.homePage}>
        <View style={styles.headerBox}>
					<Image style={styles.imgTop} source={IMG_HOME_TOP} />
					<View style={styles.head}>
						<View style={styles.amountBox}>
							<Text style={styles.amountTitle}>{shopName}</Text>
						</View>

            <View style={styles.btnBox}>
              <Text style={styles.btnImprove} onPress={this.goCollection}>收款</Text>
            </View>

						<View style={styles.gridBox}>
							<Text style={styles.gridItem}>{numFilter(totalAmt)}元</Text>
							<Text style={styles.gridItem}>{totalNum}</Text>
							<Text style={[styles.gridItem, styles.rLine]}>今日收益</Text>
							<Text style={styles.gridItem}>交易笔数</Text>
						</View>
					</View>
				</View>
        <FlatList
          data={salesList}
          extraData={this.state}
          keyExtractor={item => `item-${item.paymentOrderId}`}
          renderItem={this.renderItem}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={this.renderFooter}
          onScroll={this.onScroll}
        />
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    minHeight: height,
    backgroundColor: '#f4f2f0', 
    paddingBottom: 80,
  },
  headerBox: {
    marginBottom: 60,
  },
  imgTop: {
    height: 200,
    backgroundColor: 'rgba(125,194,113,1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  head: {
    position: 'absolute',
    top: 40,
    left: width/2,
    marginLeft: -150,
    // transform: [{translateX: -Dimensions.get('window').width/2}],
    textAlign: 'center',
    zIndex: 100,
  },
  amountBox: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountTitle: {
    fontSize:16,
    fontWeight:'400',
    lineHeight:19,
    color: 'rgba(255,255,255,1)',
    letterSpacing: 2
  },
  btnBox: {
    marginTop: 20,
    marginBottom: 24,
    marginLeft: 43,
    width: 214,
    height: 46,
    backgroundColor: 'rgba(255, 105, 105, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.18)',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: {
      width: 5,
      height: 5
    },
    textAlign: 'center',
    borderRadius: 23,
  },
  btnImprove: {
    lineHeight: 46,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
  },
  gridBox: {
    width: 300,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    shadowColor: 'rgba(219,219,219,1)',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      width: 16,
      height: 30
    },
  },
  gridItem: {
    width: 150,
    marginTop: 25,
    textAlign: 'center',
    fontSize:16,
    fontWeight:'500',
    color:'rgba(81,92,111,1)',
  },
  rLine: {
    borderRightWidth: 1,
    borderRightColor: 'rgb(185,185,185)',
  }
});

export default Home;
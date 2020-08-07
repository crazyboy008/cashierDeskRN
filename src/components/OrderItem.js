import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { numFilter, formatTime } from '@/utils/common'

class OrderItem extends React.Component {
	static defaultProps = {
        item: {},
        index: null,
		onClick: () => { },
	}

	onClickItem(id) {
        this.props.onClick(id)
	}
  render() {
      const { item, index } = this.props
    return (
        <TouchableOpacity style={styles.grid} onPress={this.onClickItem.bind(this, item.paymentOrderId)}>
            <Text style={styles.gridItem}>{item.goodsOrderId}</Text>
            <Text style={[styles.gridItem,  styles.textAlignRight]}>{numFilter(item.actualAmt || 0)}元</Text>
            <Text style={styles.gridItem}>{formatTime(item.created)}</Text>
            <Text style={[styles.gridItem, styles.miniFont, styles.textAlignRight,
                item.status === 'Doing' ? 
                styles.loading : item.status === 'PaymentSuccess' ? 
                styles.fail : item.status === 'Canceled' ? 
                styles.close : styles.refund]
            }>
                {   
                    item.status === 'Doing' ?
                    '待用户支付' : item.status === 'New' ?
                    '待用户支付' : item.status === 'PaymentSuccess' ?
                    '已付款' : item.status === 'Canceled' ?
                    '已取消' : item.status === 'Refund' ?
                    '已退款' :  item.status === 'Reject' ?
                    '已拒绝' : '未知订单'
                }
            </Text>
        </TouchableOpacity>
    );
  }
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    grid: {
        width: width-20,
        height: 100,
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 1,
        shadowColor: 'rgba(219,219,219,1)',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
          width: 16,
          height: 30
        },
    },
    gridItem: {
        width: width/2-20,
        fontSize:17,
        fontWeight:'500',
        lineHeight:40,
        color:'rgba(81,92,111,1)',
        letterSpacing: 1,
    },
    textAlignRight: {
        textAlign: 'right',
    },
    miniFont: {
        fontSize:14,
        lineHeight:40,
        fontWeight: '300',
        color:'rgba(114,124,142,1)',
    },
    fail: {
        fontWeight: '400',
        color:'rgba(125,194,113,1)',
    },
    close: {
        fontWeight: '400',
        color:'rgba(185,185,185,1)',
    },
    loading: {
        fontWeight: '400',
        color: 'rgba(255,105,105,1)'
    },
    refund: {
        fontWeight: '400',
        color: 'rgba(255,105,105,1)'
    }
});

export default OrderItem;
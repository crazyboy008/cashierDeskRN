const Service = {
  LOGIN: '/rest/login', // 登录
  UPDTA_PWD: '/rest/login', // 修改密码
  SCAN_CODE: '/rest/login/code', // 发送验证码
  RESET_CODE: '/rest/login/reset', // 重置密码
  CALLBACK_PAYMENT_STATUS: '/rest/transaction/callbackPaymentStatus', // 商家扫码支付回调状态
  LIST_ORDER: '/rest/transaction/listOrder', // 订单列表
  ORDER_DETAIL: '/rest/transaction/orderDetail', // 订单详情
  SCAN_QR_CODE: '/rest/transaction/payment/scanQrCode', // 创建支付条形码
  PAYMENT_STATUS: '/rest/transaction/payment/status', // 支付状态
  REFUND_APPLY: '/rest/transaction/refund/apply', // 退款申请
  REFUND_STATUS: '/rest/transaction/refund/status', // 退款状态
  TODAY_ORDER_INFO: '/rest/transaction/todayOrderInfo' // 今日订单列表
};

export default Service;

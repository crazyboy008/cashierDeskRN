import Http from "./http";
import Service from "./service";

// 登录
export const requestLogin = data => Http.post(Service.LOGIN, data);

// 修改密码
export const updataPwd = data => Http.put(Service.UPDTA_PWD, data);

// 发送验证码
export const scanCode = data => Http.get(Service.SCAN_CODE, data);

// 重置密码
export const resetPwd = data => Http.put(Service.RESET_CODE, data);

 // 商家扫码支付回调状态
export const callbackPaymentStatus = data => Http.post(Service.CALLBACK_PAYMENT_STATUS, data);

// 订单列表
export const listOrder = data => Http.post(Service.LIST_ORDER, data);

// 订单详情
export const orderDetail = data => Http.get(Service.ORDER_DETAIL, data);

// 扫码二维码
export const scanQrCode = data => Http.post(Service.SCAN_QR_CODE, data);

// 支付状态
export const paymentStatus = data => Http.get(Service.PAYMENT_STATUS, data);

// 退款申请
export const refundApply = data => Http.post(Service.REFUND_APPLY, data);

// 退款状态
export const refundStatus = data => Http.get(Service.REFUND_STATUS, data);

// 今日订单列表
export const todayOrderInfo = data => Http.get(Service.TODAY_ORDER_INFO, data);

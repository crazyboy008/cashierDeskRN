
import moment from 'moment';

/**
 *
 * @param params
 * @returns {string}
 */
function constructUrl(params = "") {
	if (typeof params !== "object") {
		return "";
	}
	let url = "?";
	for (let key in params) {
		let value = params[key];
		if (
			typeof value === "object" &&
			!(key === "startDate" || key === "endDate")
		) {
			url += constructUrl(value).replace("?", "");
		} else if (value || value === 0) {
			url = `${url}${key}=${value}&`;
		}
	}
	return url;
}

/**
 *
 * @param params
 * @returns {string}
 */
export function constructQueryParams(params) {
	let url = constructUrl(params);
	return url.slice(0, url.length - 1);
}

/**
 *
 * @param imgURL
 * @returns {boolean}
 */
export function isPDF(imgURL) {
	return /(pdf|xls|xlsx|zip|rar|doc|docx)$/i.test(imgURL);
}

/**
 *
 * @param url
 * @returns {Object}
 */
export function getRequest(url) {
	let theRequest = new Object();
	if (url.indexOf("?") !== -1) {
		let str = url.split("?")[1];
		let strs = str.split("&");
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(
				strs[i].split("=")[1],
			);
		}
	}
	return theRequest;
}

/**
 * 判断值是否为空
 * @param  {String} str 参数
 * @return {Boolean} 判断结果
 */
export const isEmpty = str => {
	let _str = `${str}`.trim();
	return ["", "undefined", "null"].indexOf(_str) > -1;
};

/**
 * 检测卡号是否合法
 * @param {*} cardNo 
 */
export const validateBankCard = (cardNo) => {
	cardNo = ('' + cardNo).replace(/\s/gi, '')
	var len = cardNo.length
	if (!/\d+/.test(cardNo) || len < 9) {
		// 有小于9位的银行卡？
		return false
	}
	cardNo = cardNo.split('')
	var checkCode = parseInt(cardNo[len - 1])
	var sum = 0
	for (var i = len - 2, j = 0; i >= 0; i--, j++) {
		var it = parseInt(cardNo[i])
		if (j % 2 === 0) {
			it *= 2
			it = parseInt(it / 10) + parseInt(it % 10)
		}
		sum += parseInt(it)
	}

	if ((sum + checkCode) % 10 === 0) {
		return true
	} else {
		return false
	}
}

/**
 * validate mobile
 * @param mobile
 * @returns {boolean}
 */
export function validateMobile(mobile) {
	const re = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	// const re = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
	return re.test(mobile);
}

/**
 * validate CardId
 * @param CardId
 * @returns {boolean}
 */
export function validateCardId(CardId) {
	const re = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/; //验证身份证
	return re.test(CardId);
}

/**
 * 验证邮箱
 * @param {*} email
 * * @returns {boolean}
 */
export function validateEmail(email) {
	const re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	return re.test(email);
}

/**
 * 金额转换  分 -> 元
 * @param {*} num
 */
export const fen2Yuan = (num, decimal = 2) => {
	num = +num; // 防止出现字符串类型
	if (Number.isNaN(num) || isEmpty(num)) {
		return "";
	}
	let price = Number(num);
	price = +price;
	let yuan = price / 100;
	return yuan.toFixed(decimal);
};

/**
 * 转换成金额显示
 * @param {*} value 
 */
export function numFilter(value) {
	let realVal = ''
	if (!Number.isNaN(value) && value !== '' && value != null) {
		// 截取当前数据到小数点后两位
		realVal = parseFloat(value).toFixed(2)
	} else {
		realVal = ''
	}
	return realVal
}

/**
 *
 * @param val
 * @returns {string | number}
 */
export const limitFloatInput = (val, decimal = 2) => {
	let sNum = val.toString();
	if (sNum.indexOf(".") === 0) {
		//第一位就是 .
		sNum = "0" + sNum;
	}
	sNum = sNum.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
	sNum = sNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
	sNum = sNum
		.replace(".", "$#$")
		.replace(/\./g, "")
		.replace("$#$", ".");
	let re = decimal === 2 ? /^(\-)*(\d+)\.(\d\d).*$/ : /^(\-)*(\d+)\.(\d).*$/;
	sNum = sNum.replace(re, "$1$2.$3"); //只能输入两个小数
	// sNum = sNum.replace(/^\d{0,8}(\.\d{1,5})?$/, '$1$2.$3');//只能输入两个小数
	//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
	if (sNum.indexOf(".") < 0 && sNum !== "") {
		sNum = parseFloat(sNum);
	}

	return sNum;
};

/**
 * @description 如果数字不足两位，在前面加一个 `0`。例如 `1` => `01`
 * @param {Number} n
 */
export const fixNumber = n => {
	n = n.toString();
	return n[1] ? n : "0" + n;
};

/**
 * 将时间置为零点
 * @param date
 * @returns {*|number}
 */
export const getCurrentDate0 = date => {
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date.getTime();
};

/**
 * 处理图片路径，防止缓存不刷新 (图片路径后加上当天凌晨的时间戳)
 * @param { String } imagePath
 */
export const refreshImagePath = (imagePath = "") => {
	const timestamp = getCurrentDate0(new Date());
	return `${imagePath}?${timestamp}`;
};

/**
 * 阿拉伯数字转中文数字(5-五)
 * @param {*} num
 */
export function numToChinaNum(num) {
	const arr1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	const arr2 = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];

	if (!num || Number.isNaN(num)) {
		return "零";
	}
	const english = num.toString().split("");
	let result = "";
	for (var i = 0; i < english.length; i++) {
		var des_i = english.length - 1 - i; //倒序排列设值
		result = arr2[i] + result;
		var arr1_index = english[des_i];
		result = arr1[arr1_index] + result;
	} //将【零千、零百】换成【零】 【十零】换成【十】
	result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十"); //合并中间多个零为一个零
	result = result.replace(/零+/g, "零"); //将【零亿】换成【亿】【零万】换成【万】
	result = result.replace(/零亿/g, "亿").replace(/零万/g, "万"); //将【亿万】换成【亿】
	result = result.replace(/亿万/g, "亿"); //移除末尾的零
	result = result.replace(/零+$/, ""); //将【零一十】换成【零十】 //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十 //将【一十】换成【十】
	result = result.replace(/^一十/g, "十");
	return result;
}

/**
 * 格式化手机号 3 4 4
 * @param {*} phoneNumber 
 */
export const formatPhoneNumber = (phoneNumber) => {
	return phoneNumber.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3');
}

export const formatTime = (time, format = 'YYYY/MM/DD HH:mm:ss') => {
	return moment(time).format(format);
}
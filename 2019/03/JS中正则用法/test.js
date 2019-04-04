
const T = require('../../../test.js');

/**
 * 数字千位分隔符
 */

var cases = [
  {args: [123456], result: '123,456'},
  {args: [1123456], result: '1,123,456'},
  {args: [12123456], result: '12,123,456'},
  {args: [123123456], result: '123,123,456'},
  {args: [456], result: '456'},
  {args: [1456], result: '1,456'},
  // {args: [1456.123], result: '1,456.123'},
  // {args: [1456.123123], result: '1,456.123123'},
]

const num2currency = num => {
  let str = num.toString()

  return str.replace(/(?=\B)(?=(\d{3})+$)/g, ',')
}

T.test('数字千位分隔符', num2currency, cases);


/**
 * 密码验证
 * 数字、大写、小写组成，但必须包括两种。
 * 6-12位
 */

var cases = [
  {args: ['12345'], result: false},
  {args: ['1234567'], result: false},
  {args: ['abcde'], result: false},
  {args: ['abcdefg'], result: false},
  {args: ['ABC123123_'], result: false},
  {args: ['ABCDEF'], result: false},
  {args: ['ABCDEFGH'], result: false},
  {args: ['abcdefg123'], result: true},
  {args: ['abcdefgABC'], result: true},
  {args: ['ABC123123'], result: true}
]

const password = str => {
  // var reg = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9a-zA-Z]{6,12}$/

  var reg = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9a-zA-Z]{6,12}$/
  return reg.test(str)
}

T.test('密码校验', password, cases);

/**
 * 首字母大写转换
 * @example i am a girl
 */

var cases = [
  {args: ['i am a girl'], result: 'I Am A Girl'},
  {args: ['i am a boy'], result: 'I Am A Boy'},
  {args: ['I am a GoodBoy'], result: 'I Am A GoodBoy'},
]

const upFirst = str => {
  return str.replace(/(^|\s)\w/g, c => (c ? c.toUpperCase() : ''))
}

T.test('首字母大写转换', upFirst, cases)

/**
 * 驼峰化
 */

var cases = [
  {args: ['-webkit-animation'], result: 'WebkitAnimation'},
  {args: ['webkit-animation'], result: 'WebkitAnimation'},
  {args: ['-moz-animation'], result: 'MozAnimation'},
  {args: ['moz-animation'], result: 'MozAnimation'},
]

const camelize = str => str.replace(/(?:[-_\s]+|^)([a-z])?/g, (match, c) => {
  return c ? c.toUpperCase() : ''
})

T.test('驼峰化', camelize, cases)

/**
 * 中划线转换
 * @example MozAnimation => -moz-animation
 */

var cases = [
  {args: ['WebkitAnimation'], result: '-webkit-animation'},
  {args: ['MozAnimation'], result: '-moz-animation'},
]

const dasherize = str => str.replace(/([A-Z])/g, '-$1').toLowerCase()

T.test('中划线转换', dasherize, cases)
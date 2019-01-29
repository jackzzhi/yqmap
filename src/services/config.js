import axios from 'axios';
import { stringify } from 'qs';

let defaultHost = '',
    websoketHttpIp = '';

const NODE_ENV = process.env.NODE_ENV;
switch (NODE_ENV) {
  case 'development':
    defaultHost = 'http://172.18.101.118:10000'; // 开发地址（内部开发和测试的地址）
    websoketHttpIp = 'http://dev.bdc.jieyue.com' //开发地址
    break;
  case 'test ':
    // defaultHost = 'http://stg.bdc.jieyue.com/mapapi'; //准生产
    // websoketHttpIp = 'http://stg.bdc.jieyue.com/mapws' //准生产
    defaultHost = 'http://172.18.101.118:10000'; // 开发地址（内部开发和测试的地址）
    websoketHttpIp = 'http://dev.bdc.jieyue.com' //开发地址
    break;
  case 'production':
    defaultHost = 'http://bi.jieyuechina.com/api';
    websoketHttpIp = 'http://api.bdc.jieyue.com'
    break;
  default:
    defaultHost = ''
    websoketHttpIp = ''
}

// 自定义前缀，对应后端微服务
const apiUrlfun = val => {
  if (val) {
    return `${defaultHost}/${val}`;
  }
  return `${defaultHost}`;
};
const websoketUrlFun = val => {
  if (val) {
    return `${websoketHttpIp}/${val}`;
  }
  return `${websoketHttpIp}`;
};

export { stringify, axios, apiUrlfun, websoketUrlFun};

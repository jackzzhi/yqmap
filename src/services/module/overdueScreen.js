import {
  axios,
  apiUrlfun
} from '../config';

// 获取逾期地图数据 POST请求
export async function rtsGetPullData(params) {
  return axios(`${apiUrlfun('')}/galaxy-computing-http/pull`, {
    method: 'POST',
    data: {
      ...params
    }
  });
}
// 获取逾期地图数据 Top10
export async function rtsGetTopTen(params) {
  return axios(`${apiUrlfun('')}/galaxy-overmap-api/risk/org`, {
    method: 'POST',
    data: {
      ...params
    }
  });
}
// 获取逾期地图数据 今日预警最多Top3
export async function rtsGetTopThree(params) {
  return axios(`${apiUrlfun('')}/galaxy-overmap-api/warning/top`, {
    method: 'POST',
    data: {
      ...params
    }
  });
}
// 获取逾期地图数据 智能预警列表
export async function rtsGetWarningList(params) {
  return axios(`${apiUrlfun('')}/galaxy-overmap-api/warning/list`, {
    method: 'POST',
    data: {
      ...params
    }
  });
}
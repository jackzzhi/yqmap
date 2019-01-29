import { stringify, axios, apiUrlfun } from '../config';

// 获取学校列表信息 POST请求
export async function rtsGetVersion(params) {
  return axios(`${apiUrlfun('')}/mc-auth/sys/soft/version`, {
    method: 'POST',
    data: {
      ...params
    }
  });
}

// 获取学校列表信息 GET请求
export async function rtsGetSchoolList2(params) {
  return axios(`${apiUrlfun('')}/v1.0/schools?${stringify(params)}`);
}



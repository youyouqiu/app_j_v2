import {stringify} from "qs";
import request from "@/utils/request";

/**
 * @author: zxs
 * @date: 2020/6/29
 */

export const getAccessToken = async () => {
  const accessTokenUrlParams = {
    grant_type: 'client_credentials',
    client_id: 'a7ID3haelBsxiUF6oFHI4790',
    client_secret: '27y36nLDW5gULS4nDvB2VE3xKoY1iMbz'
  };
  const accessTokenUrl = 'https://aip.baidubce.com/oauth/2.0/token?' + stringify(accessTokenUrlParams);
  return new Promise(async (resolve, reject) => {
    const accessTokenRes = await request.getPure(accessTokenUrl).catch(err => {
      reject('token获取失败')
    });
    if (accessTokenRes.access_token) resolve(accessTokenRes.access_token)
  })
};

export const examineText = async (text: string) => {
  const accessToken = await getAccessToken();
  const requestData = {
    text: text,
    access_token: accessToken
  };
  const url = 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?' + stringify(requestData);
  return new Promise(async (resolve, reject) => {
    const res = await request.postFormUrlEncode(url, {method: 'POST', body: null});
    if (res.conclusionType === 1) {
      resolve(true)
    } else {
      reject('内容不合规，请重新输入');
    }
    console.log('saveUserInstr_res', res);
  });
};

export const examineImage = async (data: string, type: 'url' | 'base64') => {
  const accessToken = await getAccessToken();
  const requestData = {
    access_token: accessToken
  };
  const body: any = {};
  if (type === 'base64') {
    body.image = encodeURIComponent(data)
  } else {
    body.imgUrl = data.replace(/\\/g,"/")
  }
  const url = 'https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined?' + stringify(requestData);
  return new Promise(async (resolve, reject) => {
    const res = await request.postFormUrlEncode(url, {method: 'POST', body: body}, null, null);
    console.log('examineImage_res', res);
    if (res.conclusionType === 1) {
      resolve(true)
    } else {
      reject('内容不合规，请重新输入');
    }
  });
};

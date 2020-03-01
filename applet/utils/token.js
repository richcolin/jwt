var apiHost = "http://localhost:8000/";
var tokenKey = "token";
// 登录地址, 根据这个地址来设置token
var logInUrl = "http://127.0.0.1:8000/api/login/";
// 例外不用token的地址
var exceptionAddrArr = [
  'http://localhost:8080',
];

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function contole() {
  console.log('chengong')
}
function xibai(){
  console.log('shibai')
}
function getRequest(url, data, success, fail) {
  CreateHeader(url, function (header) {
    wx.request({
      url:  url,
      method: 'GET',
      data: data,
      header: header,
      success: function (res) {
        if (success && typeof success === "function") {
          success(res);
        }
      },
      fail: function (error) {
        if (fail && typeof fail === "function") {
          fail(error);
        } else {
          console.log(error);
        }
      }
    })
  });
}


/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function postRequest(url, data, success, fail) {
  CreateHeader(url, function (header) {
    wx.request({
      url: url,
      method: 'POST',
      data:data,
      header: header,
      success: function (res) {
        
          wx.setStorage({
            key: tokenKey,
            data: res.data.token
          })
       
        if (success && typeof success === "function") {
          success(res);
        }
      },
      fail: function (error) {
        if (fail && typeof fail === "function") {
          fail(error);
        } else {
          console.log(error);
        }
      }
    })
  });
}
/** 
 * @param url:String    请求地址(根据请求地址判断是否添加token)
 * @param complete:Function 回调函数
 */
function CreateHeader(url, complete) {
  var header = {
    'content-type': 'application/json'
  }
  if (exceptionAddrArr.indexOf(url) == -1) {  //排除请求的地址不需要token的地址
    wx.getStorage({
      key: tokenKey,
      success: function (res) {
        header.Authorization = 'jwt ' + res.data;
      },
      fail: function (error) {
        console.log(error);
      },
      complete: function () {
        complete(header)
      }
    });
  } else {
     complete(header)
  }
}



module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;

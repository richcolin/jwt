//index.js
//获取应用实例
const app = getApp()
const utils_jwt = require('../../utils/token.js')
function chenggong(res){
  console.log('chenggong',res.data)
}
function shibai(res){
  console.log('shibai', res.data)
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  primary:function(){
    var get_url = app.globalData.apiHost+'order/'
    utils_jwt.getRequest(get_url,'', chenggong,shibai)
  
  },
  warn:function(){
    wx.login({
      success: function (res) {
        var code = res.code
        var appId = app.globalData.appId
        var nickname = app.globalData.userInfo.nickName
        var get_url = app.globalData.logInUrl
        var user_info = {
          code: res.code,
          appId: app.globalData.appId,
          nickname: app.globalData.userInfo.nickName
        }
        utils_jwt.postRequest(get_url, user_info, chenggong,shibai)

      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

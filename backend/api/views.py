from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from utils.jwt_auth import create_token
from extensions.auth import JwtQueryParamAuthentication, JwtAuthorizationAuthentication
from utils.response import wrap_json_response, ReturnCode, CommonResponseMixin
from utils.auth import  c2s
from .models import User
import json
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        """ 用户登录 """
        response = {}
        post_data = request.body.decode('utf-8')
        print(post_data)
        post_data = json.loads(post_data)
        app_id = post_data.get('appId').strip()
        nickname = post_data.get('nickname').strip()
        code = post_data.get('code').strip()
        print(code)
        print(app_id)
        if not (app_id and code):
            response['result_code'] = ReturnCode.BROKEN_AUTHORIZED_DATA
            response['message'] = 'authorized failed. need entire authorization data.'
            return JsonResponse(response, safe=False)
        try:
            data = c2s(app_id, code)
        except Exception as e:
            print(e)
            response['result_code'] = ReturnCode.FAILED
            response['message'] = 'authorized failed.'
            return JsonResponse(response, safe=False)
        open_id = data.get('openid')
        if not open_id:
            response['result_code'] = ReturnCode.FAILED
            response['message'] = 'authorization error.'
            return JsonResponse(response, safe=False)
        request.session['open_id'] = open_id
        request.session['is_authorized'] = True

        print(open_id)
        # User.objects.get(open_id=open_id) # 不要用get，用get查询如果结果数量 !=1 就会抛异常
        # 如果用户不存在，则新建用户
        if not User.objects.filter(open_id=open_id):
            new_user = User(open_id=open_id, nickname=nickname)
            new_user.save()
        token = create_token({'code': code})
        print('token is',token)
        message = 'user authorize successfully.'
        response = wrap_json_response(data={}, code=ReturnCode.SUCCESS, message=message)
        return Response({'status': True, 'token': token})


        # # 检测用户和密码是否正确，此处可以在数据进行校验。
        # if user == 'wupeiqi' and pwd == '123':
        #     # 用户名和密码正确，给用户生成token并返回
        #     token = create_token({'username': 'wupeiqi'})
        #     return Response({'status': True, 'token': token})
        # return Response({'status': False, 'error': '用户名或密码错误'})


class OrderView(APIView):
    # 通过url传递token
    # authentication_classes = [JwtQueryParamAuthentication, ]

    # 通过Authorization请求头传递token
    authentication_classes = [JwtAuthorizationAuthentication, ]

    def get(self, request, *args, **kwargs):
        print(request.user, request.auth)
        return Response({'data': '订单列表'})

    def post(self, request, *args, **kwargs):
        print(request.user, request.auth)
        return Response({'data': '添加订单'})

    def put(self, request, *args, **kwargs):
        print(request.user, request.auth)
        return Response({'data': '修改订单'})

    def delete(self, request, *args, **kwargs):
        print(request.user, request.auth)
        return Response({'data': '删除订单'})

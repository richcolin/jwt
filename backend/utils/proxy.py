#!/usr/bin/python                                                                  
# -*-encoding=utf8 -*-                                                             
# @Author         : imooc
# @Email          : imooc@foxmail.com
# @Created at     : 2018/11/2
# @Filename       : proxy.py
# @Desc           :

import drf_jwt_demo.settings


def proxy():
    if drf_jwt_demo.settings.USE_PROXY:
        # add your proxy here
        return {}
    else:
        return {}

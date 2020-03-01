#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.conf.urls import url, include,re_path
from api import views

urlpatterns = [
    re_path('^login/$', views.LoginView.as_view()),
    re_path('^order/$', views.OrderView.as_view()),
]

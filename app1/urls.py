from django.urls import path 
from app1.views import Index,login_pag,create_account,Forget_password,otp,password,bot,chvoice,chatbot, voice, voicebot,Dashboard,logout,soon,coming

urlpatterns = [
    path('index/',Index),
    path('log/',login_pag,name='log'),
    path('acc/',create_account,name='crete'),
    path('for/',Forget_password,name='for'),
    path('bot/',bot,name='bot'),
    path('logout/',logout,name='logout'),
    path('otp/',otp,name='otp'),
    path('pass/',password,name='pwd'),
    path('chatvoice/',chvoice,name='chvice'),
    path('chatbot/',chatbot,name='chtbot'),
    path('Dashboard/',Dashboard,name='Dashboard'),
    path('voicebot/',voicebot,name='voice1'),
    path('soon/',soon,name='soon'),
    path('coming/',coming,name='coming'), 
    path('voice/',voice,name='voice')   
      
]
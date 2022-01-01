from app1.models import Home_page,Userbase
from django.http import request
from django.shortcuts import redirect, render
from django.http import HttpResponse

# Create your views here.
import smtplib
import email.message
from smtplib import SMTP 

import random
# import pyttsx3
# import speech_recognition as sr
# import datetime
# import playsound  
# from gtts import gTTS 
# import os 
# import wolframalpha 
# from selenium import webdriver 
# from selenium.webdriver.common.keys import Keys
from io import BytesIO
from io import StringIO


def Index(request):
    return HttpResponse('<h1> hello </h1>')



def login_pag(request):
    if request.method =="POST":
        print(request.POST.get('email'))
        print(request.POST['password1'])
        try:
            m = Home_page.objects.get(useremail = request.POST.get('email'))
            if m.password == request.POST['password1']:
                request.session['User'] = m.useremail
                return redirect('bot')
            else:
                return HttpResponse("<h2><a href=''>You have entered wrong password</a></h2>")
        except:
            return HttpResponse("<h2><a href=''>You have entered wrong email</a></h2>")
    return render(request,'login.html') 

def create_account(request):
    if request.POST:
        fname    =request.POST['fname']
        lname    = request.POST['lname']
        Email    = request.POST['Email']
        ph       = request.POST['ph']   
        password  = request.POST['password']
        cpassword   = request.POST['cpassword']
    
        obj = Home_page()
        obj.fname =  fname     
        obj.lname =  lname     
        obj.useremail = Email 
        obj.phone = ph     
        obj.password =  password  
        obj.cpassword  = cpassword 
        obj.save() 
        return redirect('log')
    return render(request,'create.html')
            
def Forget_password(request):
    if request.POST:
        email1 = request.POST.get('email')
        number1 = request.POST.get('phn')
            
        try:
            valid = Home_page.objects.get(Email=email1)
            if int(valid.phone) == int(number1):
                print(email1)
                request.session['useremail'] = email1
                numbers = [1,2,5,6,7,8,9]
                num = ""
                for i in range(4):
                    num += str(random.choice(numbers))
                
                num = int(num)
                print(num)
                # ============== Email ==============
                sender_email = "jenishmodh2108@gmail.com"  
                sender_pass = "jenish1213"
                receiver_email = email1 
                server = smtplib.SMTP('smtp.gmail.com',587)
                your_message =  "This Is Your OTP Number = "+str(num)
                print(your_message)
                msg = email.message.Message()
                msg['Subject'] = "Your OTP From Online Society Management System"
                msg['From'] = sender_email
                msg['To'] = receiver_email
                password = sender_pass
                msg.add_header('Content-Type','text/html')
                msg.set_payload(your_message)

                server.starttls()
                server.login(msg['From'],password)
                server.sendmail(msg['From'],msg['To'],msg.as_string())
                # ============== End Email ===========
                request.session['otp'] = num
                return render(request,'otp.html',{'otp':num})
                                    
        #     else:
        #         return redirect('for')
        # except:
        #     return render(request,'forget.html')
            else:
                return HttpResponse("<h2><a href=''>Mobile Number Is Not Registered</a></h2>")
        except:
            return HttpResponse("<h2><a href=''>Email Is Not Registered</a></h2>")
    return render(request,'forget.html')


    # if request.POST:
    #     email1 = request.POST['email']
    #     number1 = request.POST['phn']
            
    #     try:
    #         valid = Home_page.objects.get(useremail=email1)
    #         if int(valid.phone) == int(number1):
    #             print(email1)
    #             request.session['useremail'] = email1
                
    #             numbers = [1,2,4,5,6,8]
    #             num = ""
    #             for i in range(4):
    #                 num += str(random.choice(numbers))
                
    #             num = int(num)
    #             print(num)
                
    #             # ============== Email ==============
                
    #             sender_email = "jenishmodh2108@gmail.com"  
    #             sender_pass = "jenish1213"
    #             receiver_email = email1 

    #             server = smtplib.SMTP('smtp.gmail.com',587)

    #             your_message =  "This Is Your OTP Number = "+str(num)

    #             print(your_message)

    #             msg = email.message.Message()
    #             msg['Subject'] = "Your OTP"
    #             msg['From'] = sender_email
    #             msg['To'] = receiver_email
    #             password = sender_pass
    #             msg.add_header('Content-Type','text/html')
    #             msg.set_payload(your_message)

    #             server.starttls()
    #             server.login(msg['From'],password)
    #             server.sendmail(msg['From'],msg['To'],msg.as_string())
                
    #             # ============== End Email ===========
                
    #             request.session['otp'] = num
                
    #             return render(request,'otp.html',{'otp':num})
                                    
    #         else:
    #             return HttpResponse("<h2><a href=''>Mobile Number Is Not Registered</a></h2>")
    #     except:
    #         return HttpResponse("<h2><a href=''>Email Is Not Registered</a></h2>")
        
    # return render(request,'forget.html')

def otp(request):
    if request.session.has_key('otp'):
        if request.POST:
            otp = request.POST['otp']
            if int(request.session['otp']) == int(otp):
                del request.session['otp']
                return redirect('pwd')
            else:
                return HttpResponse("<h2><a href=""> You Have Entered Wrong OTP </a></h2>")
        else:
            return redirect('for')
    return redirect('log')
    
def password(request):
    if request.session.has_key('useremail'):
        if request.POST:
            pass_1 = request.POST['pass1']
            pass_2 = request.POST['pass2']
            
            if pass_1 == pass_2:
                valid = Home_page.objects.get(useremail=request.session['useremail'])
                valid.password = pass_2
                valid.save()
                del request.session['useremail']
                return redirect('log')
            else:
                return HttpResponse("<h2><a href=''>Passwords Are Not Same ...</a></h2>")
        return render(request,'newpass.html')
    return redirect('log')
    return render(request,'newpass.html')  
def bot(request):
    return render(request,'bot.html')

def logout(request):
    if 'User' in request.session.keys():
        del request.session['User']
        return redirect('log')
    else:
        return redirect('log')
    
def chvoice(request):
    return render(request,'card.html')


def Dashboard(request):
    if 'User' in request.session.keys():
        data = request.session['User']
        user = Home_page.objects.get(useremail = data)
        adds = Userbase.objects.filter(add_name = user)
        return render(request,'chatbot.html',{'add':adds,'new_user':user})
    else:
        return redirect('bot')
    
def chatbot(request):
    if 'User' in request.session.keys():
        data = request.session['User']
        user = Home_page.objects.get(useremail = data)
        if request.POST:
            obj = Userbase()
            obj.add_name = user
            obj.uname = request.POST['uname']
            obj.add_images = request.FILES['aimg']
            obj.save()
            return redirect('Dashboard')
    return render(request,'chatbot.html')
    # else:
    #     return redirect('bot')
    
    
def voicebot(request):
    
    # num = 1
    # def assistant_speaks(output):
    #     global num
    #     num +=1
    #     print("Bot : ", output)

    #     toSpeak = gTTS(text=output, lang='en-US', slow=False)
    #     file = str(num)+".mp3"
    #     toSpeak.save(file)
    #     playsound.playsound(file, True)
    #     os.remove(file)
        
    # def assistant_speaks(text):
    #     engine.say(text)
    #     engine.runAndWait()
    # engine = pyttsx3.init('sapi5')
    # voices = engine.getProperty('voices')
    # engine.setProperty('voice', voices[1].id)


    # def assistant_speaks(audio):
    #     engine.say(audio)
    #     engine.runAndWait()


    # def wishMe():
    #     hour = int(datetime.datetime.now().hour)
    #     assistant_speaks("Hello , I am Bot.")
    #     if hour>=0 and hour<12:
    #         assistant_speaks("Good Morning!")

    #     elif hour>=12 and hour<18:
    #         assistant_speaks("Good Afternoon!")   

    #     else:
    #         assistant_speaks("Good Evening!")  

    # def get_audio():
    #     r = sr.Recognizer()
    #     audio = ''
    #     with sr.Microphone() as source:
    #         print("Speak...")
    #         audio = r.listen(source, phrase_time_limit=5)
    #     print("Stop.")
    #     try:
    #         text = r.recognize_google(audio,language='en-in')
    #         print("You : ", text)
    #         return text
    #     except:
    #         assistant_speaks("Could not understand your audio, PLease try again!")
    #         return 
            
    # def search_web(input):
    #     driver = webdriver.Chrome(executable_path='C:\\Users\\Jenish Modh\\chromedriver_win32\\chromedriver.exe')
    #     driver.implicitly_wait(1)
    #     driver.maximize_window()
    #     if 'Youtube' in input.lower():
    #         assistant_speaks("Opening in youtube")
    #         indx = input.lower().split().index('Youtube')
    #         query = input.split()[indx+1:]
    #         driver.get("http://www.youtube.com/results?search_query=" + '+'.join(query))
    #         return

    #     elif 'wikipedia' in input.lower():
    #         assistant_speaks("Opening Wikipedia")
    #         indx = input.lower().split().index('wikipedia')
    #         query = input.split()[indx + 1:]
    #         driver.get("https://en.wikipedia.org/wiki/" + '_'.join(query))
    #         return
    #     else:
    #         if 'Google' in input:
    #             indx = input.lower().split().index('Google')
    #             query = input.split()[indx + 1:]
    #             driver.get("    search?q=" + '+'.join(query))
    #         elif 'search' in input:
    #             indx = input.lower().split().index('Google')
    #             query = input.split()[indx + 1:]
    #             driver.get("https://www.google.com/search?q=" + '+'.join(query))
    #         else:
    #             driver.get("https://www.google.com/search?q=" + '+'.join(input.split()))
    #         return


    # def open_application(input):
    #     if "chrome" in input:
    #         assistant_speaks("Google Chrome")
    #         return
    #     elif "word" in input:
    #         assistant_speaks("Opening Microsoft Word")
    #         os.startfile('C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE')
    #         return
    #     elif "excel" in input:
    #         assistant_speaks("Opening Microsoft Excel")
    #         os.startfile('C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE')
    #         return
    #     elif "WhatsApp " in input:
    #         assistant_speaks("Opening whatsapp")
    #         os.startfile('C:\\Users\\Jenish Modh\\Music\\Desktop\\Whatsapp Desktop.Ink')
    #         return
    #     else:
    #         assistant_speaks("Application not available")
    #         return


    # def process_text(input):
    #     try:
    #         if "who are you" in input or "define yourself" in input:
    #             speak = '''Hello, I am your Bot. Your personal Assistant.
    #             I am here to make your life easier. '''
    #             assistant_speaks(speak)
    #             return
    #         elif "Hello" in input or"Hii" in input or "How are you" in input or "how are you" in input:
    #             speak = "Hello" + name + "I'm fine"
    #         elif "who made you" in input or "created you" in input:
    #             speak = "I have been created by Jenish and Devarsh."
    #             assistant_speaks(speak)
                
                
    #             return
    #         elif "crazy" in input:
    #             speak = """Well,which are mental asylums in India."""
    #             assistant_speaks(speak)
    #             return
    #         elif "calculate" in input.lower():
    #             app_id= "E46YXW-T5LG6RT7K7"
    #             client = wolframalpha.Client(app_id)

    #             indx = input.lower().split().index('calculate')
    #             query = input.split()[indx + 1:]
    #             res = client.query(' '.join(query))
    #             answer = next(res.results).text
    #             assistant_speaks("The answer is " + answer)
    #             return
    #         elif 'open' in input:
    #             open_application(input.lower())
    #             return
    #         elif 'search' in input or 'play' in input:
    #             search_web(input.lower())
    #             return
    #         else:
    #             assistant_speaks("I can search the web for you, Do you want to continue?")
    #             ans = get_audio()
    #             if 'yes' in str(ans) or 'yeah' in str(ans):
    #                 search_web(input)
    #             else:
    #                 return
    #     except Exception as e:
    #         print(e)
    #         assistant_speaks("I don't understand, I can search the web for you, Do you want to continue?")
    #         ans = get_audio()
    #         if 'yes' in str(ans) or 'yeah' in str(ans):
    #             search_web(input)

    # wishMe()
    # query = get_audio()
    # if __name__ == "__main__":
    #     name ='Dj'
    #     assistant_speaks("Hello, " + name + '.')
    #     while(1):
    #         assistant_speaks("What can i do for you?")
    #         text = get_audio().lower()
    #         if text == 0:
    #             continue
    #         if "exit" in str(text) or "bye" in str(text) or "go " in str(text) or "sleep" in str(text) or "bhai" in str(text) or "get lost" in str(text):
    #             assistant_speaks("Good bye , "+ name+'.')
    #             break
    #         process_text(text) 
        
    
    return render(request,'voicebot.html')

def soon(request):
    return render(request,'soon.html')

def voice(request):
    return render(request,'voice.html')

def coming(request):
    return render(request,'coming.html')
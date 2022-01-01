

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import os


bot = ChatBot('Bot')

trainer = ListTrainer(bot)

for files in os.listdir('D:/college project/chatterbot-corpus-master/chatterbot_corpus/data/english/'):
    data=open('D:/college project/chatterbot-corpus-master/chatterbot_corpus/data/english/' + files, 'r').readlines()
    
    trainer.train(data)

print("ChatBot : Hello Sir!")
name=input("Enter Your Name :  ")
print("Welcome to the Bot Let's chat!")
while True:
    sentence = input(name + ":")
    if sentence.strip()!= 'Bye' :
        reply = bot.get_response(sentence)
        print('ChatBot :', reply)
        if sentence.strip() == 'Bye':
            print('ChatBot: Bye')
            break
    if sentence == "quit":
        print("Bye")
        break
    elif sentence == "bye":
        print("See you later, thanks for visiting")
        break
    elif sentence == "See you later":
        print("See you later, thanks for visiting")
        break
    elif sentence == "Goodbye":
        print("Bye! Come back again soon.")
        break
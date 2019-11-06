import string
import sys


def text_analyzer(text=None):
    """This function counts the number of upper characters, lower characters,
punctuation and spaces in a given text."""
    if text == None:
        text = input("please enter some text: ")
    if not type(text) == str:
        text = str(text)
    up_count = 0
    low_count = 0
    pun_count = 0
    sp_count = 0
    tot = len(text)
    for letter in text:
        if letter.isupper():
            up_count += 1
        elif letter.islower():
            low_count += 1
        elif letter.isspace():
            sp_count += 1
        elif letter in string.punctuation:
            pun_count += 1
    print("The text contains %d characters:\n- %d upper letters\n- %d lower "
          "letters\n- %d punctuation marks\n- %d spaces"
          % (tot, up_count, low_count, pun_count, sp_count))

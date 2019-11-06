import random as r



if __name__=='__main__':
    nb = r.randint(1, 99)
    nb_try = 0
    print("This is an interactive guessing game!\n"
          "You have to enter a number between 1 and 99 to find out the secret number.\n"
          "Type 'exit' to end the game.\n"
          "Good luck!")
    while True:
        print("What's your guess between 1 and 99?")
        try:
            inp = input('>>')
        except EOFError:
            exit("See you soon :)")
        nb_try += 1
        if inp == 'exit':
            exit('bye !')
        if inp.isnumeric():
            if int(inp) == nb:
                print("Congratulations, you've got it!")
                if nb == 42:
                    print("he answer to the ultimate question of\n"
                          "life, the universe and everything is 42.")
                print("You won in %d attempts!" % nb_try)
                if nb_try == 1:
                    print("So much display of talent, marvelous !!")
                exit()
            else:
                print("%s" % ('Too low!','Too hight!')[int(inp) > nb])
        else:
            print("That's not a number.")

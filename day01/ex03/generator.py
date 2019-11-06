from random import shuffle


def generator(text=None, sep=" ", option=None):
    '''Option is an optional arg, sep is mandatory'''
    if text == None or not type(text) == str:
        return 'ERROR'
    if not type(sep) == str:
        return 'ERROR'
    data = [a for a in text.split(sep)]
    if option == 'shuffle':
        shuffle(data)
    elif option == 'unique':
        data = list(dict.fromkeys(data))
    elif option == 'ordered':
        data.sort()
    elif not option == None:
        return 'ERROR'
    for elem in data:
        yield elem



if __name__ == '__main__':
    for elem in generator('jaime les fougere'):
        print('1'+elem)
    for elem in generator('jaime les fougere', option='shuffle'):
        print('2'+elem)
    for elem in generator('jaime les fougere', option='ordered'):
        print('3'+elem)
    for elem in generator('jaime les fougere les jaime', option='unique'):
        print('4'+elem)
    for elem in generator(6, option='unique'):
        print('5'+elem)



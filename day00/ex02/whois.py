import sys


def oddEven(num):
    if num == 0:
        print("I'm Zero.")
    else:
        print("I'm %s." % (('Even', 'Odd')[num % 2 != 0]))


if __name__ == '__main__':
    if len(sys.argv) != 2 or not sys.argv[1].isnumeric():
        print('ERROR')
    else:
        oddEven(int(sys.argv[1]))

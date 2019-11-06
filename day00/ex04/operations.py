import sys


def operations(arg1, arg2):
    sum = arg1 + arg2
    diff = abs(arg1 - arg2)
    prod = arg1 * arg2
    if arg2 == 0:
        quot = "ERROR (div by zero)"
        rem = "ERROR (modulo by zero)"
    else:
        quot = arg1 / arg2
        rem = arg1 % arg2
    print("Sum:\t\t%d\nDifference:\t%d\nProduct:\t%d" % (sum, diff, prod))
    print("Quotient:\t", quot, "\nRemainder:\t", rem, sep='')


if __name__ == '__main__':
    if len(sys.argv) == 1:
        print("Usage: Usage: python operations.py\nExample:\n"
              "\tpython operations.py 10 3")
    elif len(sys.argv) == 2:
        print("Input error: not enough arguments\nUsage: Usage: python"
              "operations.py\nExample:\n\tpython operations.py 10 3")
    elif len(sys.argv) > 3:
        print("Input error: too many arguments\nUsage: Usage: python "
              "operations.py\nExample:\n\tpython operations.py 10 3")
    elif not sys.argv[1].isnumeric() or not sys.argv[2].isnumeric():
        print("Input error: Only numbers\nUsage: Usage: python operations.py"
              "\nExample:\n\tpython operations.py 10 3")
    else:
        operations(int(sys.argv[1]), int(sys.argv[2]))

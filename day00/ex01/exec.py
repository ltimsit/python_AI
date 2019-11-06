import sys


def rev_args(argTuple, size):
    for i in range(size - 1, -1, -1):
        split = argTuple[i].split()
        for j in range(len(split) - 1, -1, -1):
            print(split[j].swapcase()+('', ' ')[j > 0 or i > 0], end='')


if __name__ == "__main__":
    args = tuple(sys.argv[i] for i in range(1, len(sys.argv)))
    rev_args(args, len(sys.argv) - 1)

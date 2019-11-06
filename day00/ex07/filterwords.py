import re
import sys


def filterwords(st, num):
    data = re.findall(r"[\w']+", st)
    result = []
    for elem in data:
        if len(elem) > int(num):
            result.append(elem)
    print(result)


if __name__ == '__main__':
    if len(sys.argv) != 3 or type(sys.argv[1]) != str
    or not sys.argv[2].isnumeric():
        print('ERROR')
    else:
        filterwords(sys.argv[1], sys.argv[2])

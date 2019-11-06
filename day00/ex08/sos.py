import sys
import re


MORSE_CODE_DICT = {'A': '.-', 'B': '-...',
                   'C': '-.-.', 'D': '-..', 'E': '.',
                   'F': '..-.', 'G': '--.', 'H': '....',
                   'I': '..', 'J': '.---', 'K': '-.-',
                   'L': '.-..', 'M': '--', 'N': '-.',
                   'O': '---', 'P': '.--.', 'Q': '--.-',
                   'R': '.-.', 'S': '...', 'T': '-',
                   'U': '..-', 'V': '...-', 'W': '.--',
                   'X': '-..-', 'Y': '-.--', 'Z': '--..',
                   '1': '.----', '2': '..---', '3': '...--',
                   '4': '....-', '5': '.....', '6': '-....',
                   '7': '--...', '8': '---..', '9': '----.',
                   '0': '-----', ' ': '/'}


def parse_arg(elem):
    st = []
    for i in elem:
        if i.upper() in MORSE_CODE_DICT:
            st.append(MORSE_CODE_DICT[i.upper()])
        else:
            exit('ERROR')
    return ' '.join(st)


if __name__ == '__main__':
    result = []
    if len(sys.argv) == 1:
        exit('ERROR')
    for elem in sys.argv[1:]:
        result.append(parse_arg(elem))
    print(' / '.join(result))

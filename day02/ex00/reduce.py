from functools import reduce

def ft_reduce(fct, inputs):
    if not callable(fct):
        exit(str(type(fct))+" object is not callable")
    result = 0
    try:
        if len(inputs) >= 2:
            result = fct(inputs[0], inputs[1])
        for inp in inputs[2:]:
            result = fct(result, inp)
    except TypeError:
        exit('ft_reduce() arg 2 must support iteration')
    return result


if __name__ == '__main__':
    print(ft_reduce(2, range(5)))
    print(reduce(2, range(4)))


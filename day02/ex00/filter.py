def ft_filter(fct, inputs):
    if not callable(fct):
        exit(str(type(fct))+" object is not callable")
    result = []
    try:
        for inp in inputs:
            if fct(inp):
                result.append(inp)
    except TypeError:
        exit('ft_filter() arg 2 must support iteration')
    return result

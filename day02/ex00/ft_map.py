def ft_map(fct, inputs):
    if not callable(fct):
        exit(str(type(fct))+" object is not callable")
    result = []
    try:
        for inp in inputs:
            result.append(fct(inp))
    except TypeError:
        exit('ft_map() arg 2 must support iteration')
    return result

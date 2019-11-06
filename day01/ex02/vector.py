import itertools

class Vector:
    def __init__(self, data):
        if type(data) == list\
        and all(type(x) == float for x in data):
            self.values = data
            self.length = len(data)
        elif type(data) == tuple\
        and all(type(x) == int for x in data):
            self.values = [float(x) for x in data]
            self.length = len(data)
        elif type(data) == int:
            self.values = [float(x) for x in range(data)]
            self.length = data
        else:
            exit('Vector data error (expected float list or int tuple or int size)')

    def zip_perso(param1, param2, fillvalue=0.0):
        iterators = [iter(param1), iter(param2)]
        len_max = (len(param2), len(param1))[len(param1) > len(param2)]
        i = len_max
        while iterators:
            if i >= 0:
                i -= 1
                if i < 0:
                    return
                result = []
                elem = next(iterators[0], fillvalue)
                elem2 = next(iterators[1], fillvalue)
                result.append(elem)
                result.append(elem2)
                yield tuple(result)



    def __add__(self, ad_vector):
        if isinstance(ad_vector, Vector):
            data = [x + y for x, y in Vector.zip_perso(self.values, ad_vector.values)]
        elif isinstance(ad_vector, (int, float)):
            data = [x + ad_vector for x in self.values]
        else:
            exit('invalid add operator')
        return Vector(data)

    def __rad__(self, ad_vector):
        return self.__add__(ad_vector)

    def __sub__(self, sub_vector):
        if isinstance(sub_vector, Vector):
            data = [x - y for x, y in Vector.zip_perso(self.values, sub_vector.values)]
        elif isinstance(sub_vector, (int, float)):
            data = [x - sub_vector for x in self.values]
        else:
            exit('invalid add operator')
        return Vector(data)

    def __rsub__(self, sub_vector):
        if isinstance(sub_vector, float):
            data = [sub_vector - x for x in self.values]
            return Vector(data)
        else:
            exit('invalid sub operator')

    def __mul__(self, x):
        if isinstance(x, (int, float)):
            data = [a * x for a in self.values]
        elif isinstance(x, Vector):
            data = [a * b for a, b in Vector.zip_perso(self.values, x.values)]
        else:
            exit('Invalid mul operator')
        return Vector(data)

    def __rmul__(self, x):
        return self.__mul__(x)

    def __div__(self, d):
        if isinstance(d, (int, float)):
            data = [a / d for a in self.values]
            return Vector(data)
        else:
            exit('Invalid div operator')

    def __truediv__(self, d):
        if isinstance(d, (int, float)):
            data = [a // d for a in self.values]
            return Vector(data)
        else:
            exit('Invalid div operator')

    def __rtruediv__(self, d):
        if isinstance(d, (int, float)):
            data = [d // a for a in self.values]
            return Vector(data)
        else:
            exit('Invalid div operator')


    def __str__(self):
        return "size: " + str(self.length) + "\nvalues: "\
                + str(self.values)

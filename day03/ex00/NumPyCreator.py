import numpy as np

class NumPyCreator:
    def __init__(self):
        pass
    def from_list(self, lst):
        return np.asarray(lst)
    def from_tuple(self, tup):
        return np.asarray(tup)
    def from_iterable(self, it):
        return np.asarray(it)
    def from_shape(self, shape, value=0):
        return np.full(shape, value)
    def random(self, shape):
        return np.random.random_sample(shape)
    def identity(self, n):
        return np.identity(n)

if __name__ == '__main__':
    nn = NumPyCreator()
    print(nn.from_list([[1, 2],[3, 4]]))
    print(nn.from_tuple(((1, 2),(3, 4))))
    print(nn.from_shape((5, 5, 5), value=5))
    print(nn.random((5, 5, 5)))
    print(nn.identity(5))


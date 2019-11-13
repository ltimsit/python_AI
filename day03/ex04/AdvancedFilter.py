from imageProcessor import ImageProcessor
import numpy as np

class AdvancedFilter:
    def mean_blur(self, array):
        temp_array = array.copy()
        for x in range(array.shape[0]):
            for y in range(array.shape[1]):
                for c in range(array.shape[2]):
                    kernel = array[x-1:x+2, y-1:y+2, c]
                    tot = np.sum(kernel) / 9
                    temp_array[x, y, c] = tot
        return temp_array
    
    def gaussian_blur(self, array, kernel_size=3):
        if not kernel_size % 2:
            kernel_size -= 1
        array_gaus = np.full((kernel_size, kernel_size), 2**(kernel_size - 1))
        c = kernel_size // 2
        for i in range(1, c + 1):
            # print(i)
            # print(array_gaus[:c - i + 1, :])
            # print('a')
            # print(array_gaus[c - i + 1:c + i, :].reshape(1 + 2 * (i - 1), kernel_size))
            # print('a')
            # print(array_gaus[c + i:, :])

            array_gaus = np.concatenate((array_gaus[:c - i + 1, :] / 2, array_gaus[c-i+1:c+i, :].reshape(1 + 2 * (i - 1), kernel_size), array_gaus[c + i:, :] / 2), axis = 0)
            # print('Gausx = \n', array_gaus)
            array_gaus = np.concatenate((array_gaus[:, :c - i + 1] / 2, array_gaus[:, c-i+1:c+i].reshape(kernel_size, 1 + 2 * (i - 1)), array_gaus[:, c + i:] / 2), axis = 1)
            # print('Gausy = \n', array_gaus)
        # array_gaus = np.array([[1, 2, 1], [2, 4, 2], [1, 2, 1]])
        # print(array_gaus)
        temp_array = array.copy()
        # print(array_gaus.shape)
        ec = kernel_size // 2
        print(ec)
        div = array_gaus.sum()
        for x in range(ec, array.shape[0] - ec):
            for y in range(ec, array.shape[1] - ec):
                for c in range(array.shape[2]):
                    kernel = array[x-ec:x+ec+1, y-ec:y+ec+1, c] * array_gaus
                    tot = np.sum(kernel) / div
                    temp_array[x, y, c] = tot
        return temp_array


if __name__=='__main__':
    af = AdvancedFilter()
    ip = ImageProcessor()
    img = ip.load('../ex01/42AI.png')
    # m_b = af.mean_blur(img)
    g_b = af.gaussian_blur(img, kernel_size=15)
    # ip.display(m_b)
    ip.display(g_b)

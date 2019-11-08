from imageProcessor import ImageProcessor
import numpy as np

class AdvancedFilter:
    def mean_blur(self, array):
        for x in range(array.shape[0]):
            for y in range(array.shape[1]):
                for c in range(array.shape[2]):
                    kernel = array[x-1:x+2, y-1:y+2, c]
                    tot = np.sum(kernel) / 9
                    array[x, y, c] = tot
        return array
    
    def gaussian_blur(self, array):
        array_gaus = np.array([[1, 2, 1], [2, 4, 2], [1, 2, 1]])
        print(array_gaus.shape)
        for x in range(1, array.shape[0] - 1):
            for y in range(1, array.shape[1] -1):
                for c in range(array.shape[2]):
                    kernel = array[x-1:x+2, y-1:y+2, c] * array_gaus
                    tot = np.sum(kernel) / 16
                    array[x, y, c] = tot
        return array

if __name__=='__main__':
    af = AdvancedFilter()
    ip = ImageProcessor()
    img = ip.load('../ex01/42AI.png')
    m_b = af.mean_blur(img)
    g_b = af.gaussian_blur(img)
    ip.display(m_b)
    ip.display(g_b)

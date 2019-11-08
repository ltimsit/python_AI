from imageProcessor import ImageProcessor
import numpy as np

class ColorFilter:
    def invert(self, array):
        array = array[:,:,1:]
        return 1.0 - array

    def to_blue(self, array):
        zero = np.zeros(array.shape)
        zero[:, :, 2] = array[:, :, 2]
        zero[:, :, 3] = array[:, :, 3]
        return zero

    def to_green(self, array):
        zero = np.zeros(array.shape)
        zero[:, :, 1] = array[:, :, 1]
        zero[:, :, 3] = array[:, :, 3]
        return zero

    def to_red(self, array):
        zero = np.zeros(array.shape)
        zero[:, :, 0] = array[:, :, 0]
        zero[:, :, 3] = array[:, :, 3]
        return zero
    
    def celluloid(array):
        pass

    def to_grayscale(self, array, filter=='weighted'):
        if filter == 'weighted' or filter == 'w'
            zero = np.zeros(array.shape)
            zero[:, :, 0] = array[:, :, 0]*0.299+array[:, :, 1]*0.587+array[:, :, 2]*0.114
            zero[:, :, 1] = array[:, :, 0]*0.299+array[:, :, 1]*0.587+array[:, :, 2]*0.114
            zero[:, :, 2] = array[:, :, 0]*0.299+array[:, :, 1]*0.587+array[:, :, 2]*0.114
            zero[:, :, 3] = array[:, :, 3]
        return zero

if __name__ == '__main__':
    ip = ImageProcessor()
    cf = ColorFilter()
    img = ip.load('../ex01/42.png')
    #N_img = cf.invert(img)
    #ip.display(N_img)
    b_img = cf.to_blue(img)
    g_img = cf.to_grayscale(img, 'ff')
    ip.display(g_img)

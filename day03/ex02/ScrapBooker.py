import numpy as np
from imageProcessor import ImageProcessor

class ScrapBooker:
    def crop(self, array, dimension, position=(0, 0)):
        for sh, di in zip(array.shape, dimension):
            if di > sh:
                exit('Error dimension bigger than argument array')
        Anew = array[position[1]:position[1]+dimension[1],position[0]:position[0]+dimension[0]]
        return Anew

    def thin(self, array, n, axis):
        array_slice = np.asarray(tuple(i for i in range(0, array.shape[axis], n)))
        array = np.delete(array, array_slice, axis)
        return array
    
    def juxtapose(self, array, n, axis):
        seq = []
        for i in range(n):
            seq.append(array)
        array = np.concatenate(tuple(seq), axis)
        return array
    
    def mosaic(self, array, dimension):
        array = self.juxtapose(array, dimension[0], 0)
        array = self.juxtapose(array, dimension[1], 1)
        return array


if __name__=='__main__':
    ip = ImageProcessor()
    img_array = ip.load('../ex01/42.png')
    sb = ScrapBooker()
    img_croped = sb.crop(img_array, (50, 50))
    img_thin = sb.thin(img_array, 2, 0)
    img_conc = sb.juxtapose(img_array, 2, 0)
    img_mos = sb.mosaic(img_array, (3, 2))
    ip.display(img_mos)
    #ip.display(img_conc)
    #ip.display(img_croped)
    #ip.display(img_thin)

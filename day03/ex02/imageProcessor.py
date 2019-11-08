import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np

class ImageProcessor:
    def load(self, path):
        img = mpimg.imread(path)
        print("size: %d x %d" % (img.shape[0], img.shape[1]))
        return img 

    def display(self, array):
        plt.imshow(array)
        plt.show()


if __name__ == '__main__':
    ip = ImageProcessor()
    img = ip.load('42.png')
    ip.display(img)

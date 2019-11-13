import pandas as pd

class FileLoader:
    def load(self, path):
        data = pd.read_csv(path)
        print('[%d row x %d collumn]' % (data.shape[0], data.shape[1]))
        return data

    def display(self, data, n):
        if n > 0:
            print(data.head(n=n))
        elif n < 0:
            print(data.tail(n=-n))


if __name__=='__main__':
    fl = FileLoader()
    data = fl.load('athlete_events.csv')
    # fl.display(data, 5)
    # fl.display(data, -5)



class CsvReader():
    def __init__(self, file_name, sep=',', header=False, skip_top=0, skip_bottom=0):
        if type(file_name) == str:
            self.file_name = file_name
        self.sep = sep
        self.header=header
        self.skip_top = skip_top
        self.skip_bottom = skip_bottom
        self.data = ''
        pass
    def __enter__(self):
        try:
            self.f = open(self.file_name, 'r')
        
            csv_list_form = []
            file_data = self.f.readlines()
            self.file_size = len(file_data)
            line_data = []
            size_line = -1
            for elem in file_data:
                line_data = self._get_line_list(elem)
                if size_line == -1:
                    size_line = len(line_data)
                elif not len(line_data) == size_line:
                    return None
                self.csv_list_form.append(line_data)
            return self
        except:
            exit('file not found')


    def __exit__(self, type, value, traceback):
        try:
            self.f.close()
        except:
            print('Error closing file')

    def _get_key(self, line, sep):
        line = line.strip('\n')
        ret = [elem for elem in line.split(sep)]
        print(ret)
        return ret

    def _get_line_dic(self, line, keys):
        dic = {}
        for elem, key in zip(line.strip('\n').split(self.sep), keys):
            dic[key] = elem
        return dic

    def _get_line_list(self, line):
        lst = []
        for elem in line.strip('\n').split(self.sep):
            lst.append(elem)
        return lst


    def getdata(self):
        self.csv_dic = []
        if getheader():
            self.skip_top += 1
        if self.header:
            for elem in self.csv_list_form[self.skip_top:file_size - self.skip_bottom]:
                self.csv_dic.append(self._get_line_dic(elem, self.data_key))
        else:
            return self.csv_list_form[self.skip_top:file_size - self.skip_bottom]

    def getheader(self):
        if self.header:
            self.data_key = self.csv_list_form[0]
            return self.data_key
        return None


if __name__ == '__main__':
    with CsvReader('test.csv', sep=';', header=False, skip_top=0, skip_bottom = 1) as data:
        print(data.getdata())

from FileLoader import FileLoader

class SpacioTemporalData:
    def __init__(self, dataFrame):
        self.dataFrame = dataFrame
    
    def when(self, location):
        df = self.dataFrame[self.dataFrame['City'] == location]
        list_year = list(df.loc[:, 'Year'].drop_duplicates())
        return list_year
    
    def where(self, year):
        df = self.dataFrame[self.dataFrame['Year'] == year]
        list_year = list(df.loc[:, 'City'].drop_duplicates())
        return list_year

if __name__=='__main__':
    fl = FileLoader()
    df = fl.load('../ex00/athlete_events.csv')
    st = SpacioTemporalData(df)
    print(st.when('Athina'))
    print(st.where(2016))

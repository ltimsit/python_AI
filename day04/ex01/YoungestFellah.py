from FileLoader import FileLoader

def youngestFellah(df, year):
    df_year = df['Year'] == year
    ddf = df[df_year]
    m_df = ddf[ddf['Sex'] == 'M']
    f_df = ddf[ddf['Sex'] == 'F']
    val = {'M': m_df['Age'].min(), 'F': f_df['Age'].min()}
    return val


if __name__=='__main__':
    ld = FileLoader()
    data = ld.load('../ex00/athlete_events.csv')
    print(youngestFellah(data, 2004))
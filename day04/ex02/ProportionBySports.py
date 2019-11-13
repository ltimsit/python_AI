from FileLoader import FileLoader

def __proportionBySport__(dataFrame, year, sport, gender):
    y_df = dataFrame[dataFrame['Year'] == year]
    g_df = y_df[y_df['Sex'] == gender]
    non_dup_tot = g_df.drop_duplicates('Name')
    nb_tot = len(non_dup_tot.index)
    sport_g_df = g_df[g_df['Sport'] == sport]
    non_dup_sport = sport_g_df.drop_duplicates('Name')
    nb_sport = len(non_dup_sport.index)
    print(non_dup_sport.head(20))
    print(nb_tot, nb_sport)
    return nb_sport * 100 / nb_tot


if __name__=='__main__':
    ld = FileLoader()
    dt = ld.load('../ex00/athlete_events.csv')
    print(__proportionBySport__(dt, 2004, 'Tennis', 'F'))


from FileLoader import FileLoader
import numpy as np
import pandas as pd

def howManyMedals(dataFrame, name):
    name_df = dataFrame[dataFrame['Name'] == name]
    
    won_md = name_df[pd.notnull(name_df['Medal'])]
    year_arr = won_md.loc[:, 'Year'].drop_duplicates()
    dico2 = {}
    for year in year_arr:
        dico2[year] = {}
        b_y = won_md[won_md['Year'] == int(year)]
        gold_nb = len(b_y[b_y['Medal'] == 'Gold'])
        silv_nb = len(b_y[b_y['Medal'] == 'Silver'])
        bro_nb = len(b_y[b_y['Medal'] == 'Bronze'])
        dico2[year]['Gold'] = gold_nb
        dico2[year]['Silver'] = silv_nb
        dico2[year]['Bronze'] = bro_nb
    return dico2



if __name__=='__main__':
    fl = FileLoader()
    df = fl.load('../ex00/athlete_events.csv')
    dico = howManyMedals(df, 'Kjetil Andr Aamodt')
#%%

import os
import pandas as pd 
import datetime

path = r'/Users/harishsai/Desktop/Padhai/2. University of Chicago/4. Quarter 4/Data Visualizations/CAPP30239_FA22/week_06/Homework/Data'
fname = 'a3cleanedonly2015.csv'

data = pd.read_csv(os.path.join(path, fname))
data['Date'] = pd.to_datetime(data.Date)
data['month'] = pd.DatetimeIndex(data['Date']).month

races = data.groupby(['Race']).size()
races = races.to_frame(name = 'Size').reset_index()
races['Population_Percentages'] = [0.061, 0.136, 0.189, 0.016, 0.029, 0.593]
races['Population_Percentages'] = round(races['Population_Percentages']*100,3)
races['Proportions'] = round((races['Size']/sum(races['Size']))*100, 3)
races.to_csv(os.path.join(path, 'Races_Data.csv'), index=False)

states = data.groupby(['State']).size()
states = states.to_frame(name = 'Counts').reset_index()
states.to_csv(os.path.join(path, 'States_Data.csv'), index=False)

dates = data.groupby(['month']).size()
dates = dates.to_frame(name = 'Counts').reset_index()
dates
dates.to_csv(os.path.join(path, 'Dates_Data.csv'), index=False)

gender = data.groupby(['month', 'Gender']).size()
gender = gender.to_frame(name = 'Counts').reset_index()
# gender = gender[gender['month'] == 1]
gender.to_csv(os.path.join(path, 'Gender_by_Month.csv'), index=False)

death = data.groupby(['Manner_of_death']).size()
death = death.to_frame(name = 'Counts').reset_index()
death.to_csv(os.path.join(path, 'death.csv'), index=False)

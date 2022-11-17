

#%%

import pandas as pd
import os
import datetime

path = r'/Users/harishsai/Desktop/Padhai/2. University of Chicago/4. Quarter 4/Data Visualizations/CAPP30239_FA22/week_03/Final Project Data'

f_proj_name = "projects.csv"
f_transactions_name = "transactions.csv"
f_locations_name = "locations.csv"

projects = pd.read_csv(os.path.join(path, f_proj_name))
transacitons = pd.read_csv(os.path.join(path, f_transactions_name))
locations = pd.read_csv(os.path.join(path, f_locations_name))


pd.set_option('display.float_format', lambda x: '%.2f' % x)

df = projects.merge(transacitons, on='project_id', how='left')
df = df.drop(['start_actual_isodate', 'start_actual_type', 'end_actual_isodate', 'end_actual_type', 'transaction_id', 'transaction_isodate', 'transaction_value_code'], axis=1)
# df['transaction_year'] = df['transaction_year'].astype('int')
df = df[df['transaction_year'] > 2003]
df.sort_values(by=['transaction_year'])

df['primary_sectors'], df['aditional_sectors'] = df['ad_sector_names'].str.split('|', 1).str

df = df.drop('aditional_sectors', axis = 1)

df = df.replace('Health, general', 'Health')
df = df.replace({'primary_sectors':{'Agriculture':'Agriculture, forestry, fishing',
                                    'Forestry':'Agriculture, forestry, fishing'}})
df = df.replace({'primary_sectors':{'Post-secondary education':'Education',
                                    'Secondary education':'Education',
                                    'Education, level unspecified':'Education',
                                    'Basic Education': 'Education'}})


# Disbursements and Commitments each Year

investments_year = df.groupby('transaction_year').sum()
investments_year = investments_year.drop(['is_geocoded', 'transactions_start_year', 'transactions_end_year'], axis = 1)
investments_year = investments_year.reset_index()
investments_year['transaction_year'] = investments_year['transaction_year'].astype(int)
investments_year

investments_year_sector = df.groupby(['transaction_year', 'primary_sectors']).sum()
investments_year_sector = investments_year_sector.drop(['is_geocoded', 'transactions_start_year', 'transactions_end_year'], axis = 1)
investments_year_sector = investments_year_sector.reset_index()
investments_year_sector['transaction_year'] = investments_year_sector['transaction_year'].astype(int)
# projects_year
# investments_year_sector = investments_year_sector.pivot(index = 'transaction_year', columns='primary_sectors', values='total_commitments')
# investments_year_sector = investments_year_sector.reset_index()


sector = df.groupby('primary_sectors').size()
sector = sector.to_frame(name = 'size').reset_index()

projects_year_sector = df.groupby(['transaction_year', 'primary_sectors']).size()
projects_year_sector = projects_year_sector.to_frame(name = 'size').reset_index()
projects_year_sector['transaction_year'] = projects_year_sector['transaction_year'].astype('int')
projects_year_sector = projects_year_sector.pivot(index='transaction_year', columns='primary_sectors', values='size')
projects_year_sector = projects_year_sector.reset_index()

ids = df['project_id'].unique()
locations = locations[locations['project_id'].isin(ids)]

investment_country = df.groupby(['transaction_year', 'recipients', 'recipients_iso3', 'total_commitments']).sum()
investment_country = investment_country.drop(['is_geocoded', 'transactions_start_year', 'transactions_end_year', 'total_disbursements',	'transaction_value'], axis = 1)
investment_country = investment_country.reset_index()
investment_country['transaction_year'] = investment_country['transaction_year'].astype(int)



send_path = r'/Users/harishsai/Desktop/Padhai/2. University of Chicago/4. Quarter 4/Data Visualizations/CAPP30239_FA22/Data'

df.to_csv(os.path.join(send_path, 'projects_transactions.csv'), index=False)
locations.to_csv(os.path.join(send_path,'wbg_locations.csv'), index=False)
investments_year.to_csv(os.path.join(send_path,'total_money_year.csv'), index=False)
sector.to_csv(os.path.join(send_path,'sectors_counts.csv'), index=False)
projects_year_sector.to_csv(os.path.join(send_path,'sector_year_counts.csv'), index=False)
investments_year_sector.to_csv(os.path.join(send_path,'investments_sector_years.csv'), index=False)
investment_country.to_csv(os.path.join(send_path,'investment_country.csv'), index=False)

#%%

recs = df.groupby('recipients').size()
recs = recs.to_frame(name = 'counts').reset_index()


#%%

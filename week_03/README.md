# CAPP 30239 - Final Project
## 'Investing in the East'

### Data source

Title: World Bank Geocoded Research <br />
Agency: AidData, William and Mary's Global Research Institute <br />
Location: United States of America <br />
Link: https://www.aiddata.org/data/world-bank-geocoded-research-release-level-1-v1-4-2 <br />

### Description of data: 

AidData's data is an extentive collection of all the projects approved from 1995-2014 in the World Bank (specifially International Bank for Reconstruction and Development and International Development Association). According to the description on the website, the data togethers tracks more than $630 billion in commitments for 5,684 projects across 61,243 locations. 

Of interest are four datasets: 
1. locations.csv, which contains the locations for each project.
2. projects.csv, has more details on all the projects.
3. projects_ancillary.csv, which contains information about some of the ancillary projects at the Bank.
4. transactions.csv, which contains information on all the transactions for each project.

### Why you are interested in this topic?

This past summer, I worked at IBRD as a Strategy Consultant with the Global Health, Nutrition and Population verticle. My work primarily entailed implementing programs (primarily surveys and RCTs) in different developing countries to improve health outcomes. However, through this work, it was inevitable to think about the ethics and costs of such undertakings stemming from the traditional West:
1. Some programs gave treatments only to specific people, depriving others of potential benefits. 
2. Often, the outcome from such heavy investments weren't tangible.
3. People in these nations, even though they needed help, are reduced to mere data points. 

In many ways, I am interested in this data to try and answer some preliminary questions: 
1. How much money is invested in internaitonal develpoment on a yearly basis?
2. What are the costs and benefits of these investments? 
3. Which areas are targetted more than others?

### Thoughts on how you would hope to use this data:

A lot of the answers to the questions I am interested in probing are in these datasets. I am hoping to put these four datastes together to visualize the flow of money and development interventions across the globe, and see how that alters over time. 

### Potential data points

Some potential data points: 
- transaction_value: <br />
    - looks at the value of the transaction.
    - type: numeric
- transaction_year: <br />
    - a general numeric column that looks at the time of the transaction
    - type: numeric
- donors: <br />
    - the donor or funder of the project, primarly the World Bank or some governments.
    - type: character / string
- recipients
    - the countries receiving the aid.
    - type: character / string
- project_title
    - the intervetion.
    - type: character / string
- status
    - the status of the intervetion, i.e. whether it is complete or not. 
    - type: character / string


### Any concerns about the data

Some concerns I have about the data: 
1. The time frame captured in all four datsets doesn't contain one of the biggest phenomenons of our time -- the COVID-19 pandemic. 
2. Having had a preliminary look at the datasets, it is evident that all the information for each project doesn't exist. In fact, the dimensions across the four datasets also differ based on the availability of information. I am worried that I might not be able to merge and match the four data sets to procure robust information. 

### Identify if source is primary or secondary

Secondary. 

### If secondary data, how you envision this data working with the primary source?

I envision this interacting with primary data from the World Bank that has information on similar indicators, and some different indicators. For instance, it might be interesting to see lending lines in tandem with natual disasters across the globe. 
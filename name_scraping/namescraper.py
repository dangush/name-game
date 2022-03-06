import requests 
from bs4 import BeautifulSoup 
import pandas as pd
import sys

#Header to avoid looking like a bot
headers = {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"}

#All letters available on forebears.io
alphabet = "aáåâäàæãbcçčćdđďeéèfghiíjklłľmnñňoöøóőõðpqrřsşšșśtţþțťuüúūvwxyzžż"

#Load existing table to continue from (could be empty) 
data = {}
df = pd.read_csv('names.csv')


#Website sometimes blocked my ip as I was test running code, so the script keeps track of which letters its gone through already
#and picks up where it left off on a rerun

#Read in list of completed scrapes
file = open("completion.txt", 'r')
already_completed = file.readline()
file.close()

#Open file to append with scrapes that have been completed
progress = open("completion.txt", 'a')

for char in alphabet:
    if (char in already_completed): 
        continue;

    print("Scraping: " + char)

    #Get URL page with list of names
    URL = "https://forebears.io/surnames/begining-with/" + char
    webpage = requests.get(URL, headers=headers)
    soup = BeautifulSoup(webpage.content, 'html5lib') 
    
    #Scrape the webpage for names
    names = [row.text for row in soup.findAll('h4', attrs = {'class':'name'})]
    incidences = [row.text for row in soup.findAll('h5', attrs = {'class':'detail-value'})]

    print("Length: " + str(len(names)))

    #Check that request was not an error
    if (len(names) == 0):
        sys.exit("403 detected, stopping")

    #Pad to length 1000
    if (len(names) < 1000):
        names = names + ["" for i in range(1000 - len(names))]
        incidences = incidences + ["" for i in range(1000 - len(incidences))]
        
    #Was having some issues earlier and was being paranoid about properly slicing the tables so... this is stupid as hell and very unnecessary, though I haven't tested without        
    if (len(names) == 1000):
        df[char] = names
        df[char + "_incidences"] = incidences
    else:
        df[char] = names[:1000]
        df[char + "_incidences"] = incidences[:1000]

    # Write dataframe to csv
    df.to_csv("names.csv", index=False)
    #Update progress
    progress.write(char)

print(df)
print("Done!")




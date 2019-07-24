# Interactive Frontend Development Project

## Milestone Project 2: Pizza Company Staff Dashboard.
A single page dashboard that gives an overview on staff performance. It can show:
- How many members of staff of each rank.
- Average length of service for each rank.
- Average pizza making time for each rank.
- Correlation between years of service and length of time to make a pizza.
- An overview of some results. 
- Who are the fastest and slowest pizza maker are.
- Percentage of staff who can make pizzas under/over 40s.
- Who the longest and shortest serving workers are.

Deployed on [GitHub Pages](https://kennedydmb.github.io/Pizza-Efficenciency-Dashboard/)

## UX
![Device Responsiveness Display](https://i.imgur.com/ZQibSMq.png "Device displays")

### Users
Intended users of the website are Operation Directors, Store Managers, and Trainers
of a pizza company. This could be extended in future to include the entire staff 
hierarchy.

### User Stories.
- As an Operations Director, I want to see how my employees are performing so that I can see if our training is effective.
- As a Trainer, I want to see how quickly each member of staff can make pizza against how long they’ve worked for the company. Then I can see clearly who may be in need of additional training, and give praise to those working well.
- As a Store Manager, I want to see an overview of my store. Who is the quickest, who has served the longest, how many employees do I have, what percentage of my workers are performing to the standard I have set.

### Wireframe
![Wireframe](https://i.imgur.com/elsnDVc.png "Original Web App Wireframe")

#### Difference To Deployed Version
The final result differs from the orginal wireframe. This is for a number
of reasons. The technology used to render the charts is not intended to be responsive,
while the containers for them are, it was difficult to fit 3 charts in a row without 
it causing hassle on mobile devices. So the decision was made for it to be 2 containers 
side by side, then all on top of each other on smaller devices.

There is also an additional chart, this shows the number of people who have 
completed each course. It however has limitations that could be better utilised
in the future. At the moment each member only has the highest course they have passed,
not every course they have passed. For example, everyone that has passed the **AMC** 
course will have also passed the **BMC** and **Intro** course. For our purposes 
this isn't much of an issue, but if it were to be used in a real setting this would need 
updated.

The overview section has now also been split into separate containers, one for performance
and one for staff numbers. During the implementation process, this seemed like a 
more appropriate way to display the information.

### Design
For the color palate I used this [color scheme website](http://colorschemedesigner.com/csd-3.5/)

First I picked a color that was suitable.
![Color Scheme 1](https://i.imgur.com/USiw1Uq.png "Color Scheme 1")

Then used all the corresponding complementary colors.
![Color Scheme ](https://i.imgur.com/ebeKPky.png "Color Scheme 2")

The colors were then used for a subtle gradient in the background and for the 
containers.

## Features

### Existing Features

#### Graphs
There are five graphs.
1. Rank Balance: A bar chart showing how many employees there are by rank.
2. Average Years Service: A bar chart showing  the average amount of service by rank.
3. Average Pizza Making Time: A bar chart showing the average amount of time to make a
pizza in seconds by rank.
4. Average Time vs Years Service: A scatter plot showing **Average Pizza Time** vs **Years Service**
color coded by rank.
5. Course Balance: Shows the number of people who have passed each course.

#### Data Manipulation
The user can manipulate the data by clicking on any of the bar chart items. If a 
user clicks on the bar for **Manager** they will then see the only information for 
members of staff who are **Manager**. The charts react to one another.

#### Reset button
If a user would like to reset the graphs after manipulation and reset them, they can do
so with the **Reset Graphs** button

#### Results
Overview results are shown in the **Staff Numbers** and **Performance** section.
The numbers for  **Managers**, **MITs**, **Instores** **Under 40s**, and **Over 40s**
are calculated dynamically with chart manipulation.

### Future Features

#### Multiple Store Data
Option to have the data of multiple stores and the ability to select between them
or view all at once.

#### Multiple Month Data
Similarly to multiple stores, but with multiple months.

#### User Login and Leaderboards
Ability for staff to login, and see their own details, access training material
and see ranking on leaderboards within the company.

#### Upload Data
Allow managers login the ability to upload new data.

#### Staff Names & Location
Increase the **JSON** fields to include surnames and store location.

#### Donut Graph
In addition to displaying the  **Under/Over 40s** as numbers, display as a donut
graph.

## Technologies Used
The project makes use of:
 - [HTML](https://www.w3schools.com/html/)
 -- To build the structure of the content.
 - [CSS](https://www.w3schools.com/css/default.asp) 
 -- To style the content.
 - [JavaScript](https://www.w3schools.com/js/default.asp)  
 -- An object-oriented computer programming language commonly used to create interactive effects within web browsers.
 - [Chrome](https://www.google.co.uk/chrome/?brand=CHBD&gclid=CjwKCAjwg-DpBRBbEiwAEV1_-HRKc5kuXoGrUIbi1QWzng3ZEvw3Obv1qmhUoXJa2iqrfZ4IxfgntRoC_hYQAvD_BwE&gclsrc=aw.ds)
 -- A cross-platform web browser developed by Google. Used as the main browser for dev tools, and to test responsiveness.
 - [Bootstrap](https://getbootstrap.com/)
 -- A CSS and JavaScript framework, to simplify and empower the CSS.
 - [Bootswatch theme](https://bootswatch.com/4/simplex/bootstrap.min.css)
 -- Bootstrap theme used for further styling of CSS.
 - [AWS cloud9](https://aws.amazon.com/cloud9/)
 -- An online IDE.
 - [GitHub](https://github.com/)
 -- Provides hosting for software development version control using Git.
 - [GitHub Pages](https://pages.github.com/)
 -- A static web hosting service offered by GitHub
 - [Responsive Design](http://ami.responsivedesign.is/)
 -- Used to screenshot web application on different devices.
 - [Excel](https://www.microsoft.com/en-gb/p/excel/cfq7ttc0k7dx?=&OCID=AID2000136_SEM_q6I3TxCm&MarinID=sq6I3TxCm%7c340667898678%7cexcel%7ce%7cc%7c%7c62273227620%7ckwd-11653021&lnkd=Google_O365SMB_NI&gclid=CjwKCAjwg-DpBRBbEiwAEV1_-KFpCe_n6GhCc3sKSKqsbuxBFVWHObf-AHluE8QCG9QqiAsTTlGjZhoC44UQAvD_BwE&activetab=pivot%3aoverviewtab) To produce the .csv file
 -- Microsoft spreadsheet program, used to generate .csv data.
 - [Convertcsv](http://www.convertcsv.com/csv-to-json.htm)
 -- Used to convert .csv file to .JSON file.
 - [D3.js](https://d3js.org/)
 -- a JavaScript library for manipulating documents based on data.
 - [DC.js](https://dc-js.github.io/dc.js/)
 -- a javascript charting library with native crossfilter support, allowing highly efficient exploration on large multi-dimensional datasets
 - [Crossfilter](https://square.github.io/crossfilter/)
 -- a JavaScript library for exploring large multivariate datasets in the browser. 
 - [Google Fonts](https://fonts.google.com/)
 -- Used for 'Nunito' font.

## Testing

### Responsiveness
[Chrome](https://www.google.co.uk/chrome/?brand=CHBD&gclid=CjwKCAjwg-DpBRBbEiwAEV1_-HRKc5kuXoGrUIbi1QWzng3ZEvw3Obv1qmhUoXJa2iqrfZ4IxfgntRoC_hYQAvD_BwE&gclsrc=aw.ds)
Was used to test:
- Galaxy S5
- Pixel 2
- Pixel 2XL
- iPhone 5/SE
- iPhone 6/7/8
- iPhone 6/7/8 Plus
- iPhone X
- iPad
- iPad Pro
- Desktop

[Responsive Design](http://ami.responsivedesign.is/) was used to check viewports:

- Desktop
1600x992px scaled down to scale(0.3181)
- Laptop
1280x802px scaled down to scale(0.277)
- Tablet
768x1024px scaled down to scale(0.219)
- Mobile
320x480px scaled down to scale(0.219)

Page is fully responsive, however the charts and _not_ and do not display correctly 
on mobile devices. Although measures have been taken to make this minimal. Charts using D3.js
are intended for large screens.

### Code Testing
[HTML Validator](https://www.freeformatter.com/html-validator.html) -- No issues.

[CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input) -- No issues.

[JavaScript Validator](https://jshint.com/) -- Missing semicolons and extra commas, removed. Now no issues.

### User Testing
User testing amongst a small group of 2-3 people showed that pressing some data 
leads to it disappearing. Refresh button added to fix this issue.

### Known Bugs
'Newest/Oldest member' and 'Slowest/Fastest Pizza time' results are not yet 
responsive to user interaction with the charts.

## Deployment
This project was developed locally using VS Code. A repository was created on github and named 'GoT-Dashboard.' Regular commits were made and pushed to my Github repository.

Very early on, I hosted the website on Github Pages. It was then regularly updated with my commits.

To initially deploy the project on Github Pages, the following steps were taken:

Log into Github
Select the repository synnea/GoT-Dashboard.
Select the 'Settings' tab, which is the last tab in the top row.
Use Cmd + F to open up a search window. Type in "GitHub Pages" and scroll automatically to the relevant section.
Under Source, click the drop-down menu labelled None and select the master branch.
Upon selecting the master branch, t the page refreshes automatically. The website is now deployed.

### Content
Data created using current pizza shop knowledge. All names and times are ficticious, but typical of a real environment.

## Acknowledgements
- Seun Owonikoko -- Helped point me in the right direction, particualrly in giving 
a detailed README file.
- Carina Pöll (Interactive Frontend Lead) -- Helped out with some issues with the 
dashboard and provided useful resources for dashboards.
- Gordon on Stack Overflow -- Helped out tremendously with some issues tackling
D3.js and DC.js [Topic 1](https://stackoverflow.com/questions/56926004/why-does-this-code-work-for-counting-one-item-in-a-list-but-not-the-others)
[Topic 2](https://stackoverflow.com/questions/56817074/how-to-find-the-highest-attribute-in-a-dataset-then-display-the-name-associat)
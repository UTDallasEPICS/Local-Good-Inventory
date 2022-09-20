# Local-Good-Inventory

The Local Good Center is a non-profit organization dedicated to serving the community through their
various programs for education, wellness, job readiness etc. The goal of the project is to develop a web-based self check-in
for the community members coming to the food pantry of Local Good Center. The team is divided into two subteams, each dedicated
to working on the front-end and back-end side of the website. The Spring 2022 team will focus on documenting all the requirements
for the project through discussing with the Local Good Center representative and consulting the EPICS advisors. Then the team will
create a basic UI/UX design of the website for the front end, and a database design for the backend. The team will finally implements
aspects of the design to construct a basic prototype of the website by the end of the semester.

[Screenshots](screenshots.md#Screenshots)

# Instructions

#### Prerequesites
- Node.js installed. The link can be found [here.](https://nodejs.org/en/download/)  

#### Building
Download the repository either from the website or with `
git clone https://github.com/UTDallasEPICS/Local-Good-Inventory.git` and then navigate into the project directory with `cd Local-Good-Inventory`

Next we need to install the node packages for the front end. Navigate into the *app* directory with `cd app` and install the necessary packages by running `npm install`.

Now we need to install the packages for the back end. Navigate into the *client* folder with `cd ../client` and run `npm install` again.

The project should now be ready for use.

## Usage


### Front End

To see the front end, from the `Local-Good-Inventory` directory,
```
cd client
ng serve
```

Then navigate to [http://localhost:4200](http://localhost:4200), and you should see the website being served.

**Note:** The back end server must be running in order for the front end website to be fully functional.

### Back End

To run the back-end of this app, which just connects to the database and displays no website or graphical interface, in your terminal from the `Local-Good-Inventory` directory, you want to
```
cd app
node index.js 
```


---
## Fall '22 Team
Michael Ross - Project Leader\
Gabe Puente - Financial Officer\
Isabelle Villegas - Project Partner Liaison\
Aarian Ahsan - Document Manager\
Kian Hakim - Project Webmaster

## Spring '22 Team

Sagar Dhaduk - Financial Officer\
Veeren Patel - Project Partner Liaison\
Nikhil Dasari - Project Webmaster\
Adwaith Moothezhath - Project Leader\
Michael Ross - Project Webmaster\
Al Wasee Mahmood - Document Manager

### Software Tools Used

Figma\
MongoDB\
Node.js\
Angular.js\
Express

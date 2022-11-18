# Overlook Hotel

## Abstract
This project is a web application designed to emulate a hotel website for customer use, with additional functionality for hotel staff ("admin view"). Users will find a thoughtfully-designed UI that takes them through the step-by-step process of signing into their account, viewing past and upcoming bookings, and creating a new booking. User input is updated dynamically via the Fetch API, utilizing a locally-hosted endpoint. Aesthetically, the design takes inspiration from the many midcentury-modern boutique hotels of New York City.

From the admin view, a user can search all guests by name, remove a future booking, and create a new booking for that guest. Information on occupancy rates, total daily revenue, and all available rooms for the current day are also dynamically presented here.

The app also features a Mocha/Chai testing suite for all class properties and methods.

## Technology/Project Context

This project was my final solo project of the 2nd module (2 of 4) of the front-end software engineering program at Turing School of Software and Design. My peers and I were expected to create a dynamic, object-oriented application that utilized the all of the skills and tech we'd learened up to this point, being approximately halfway through the program. My vision for this project was to build an application that could be a final representation of my fundamental HTML/CSS/JavaScript skills. As such, this app uses all "vanilla" JavaScript, with no frameworks or third-party packages.

## Design

### Guest View
![guest-overlook](https://user-images.githubusercontent.com/108169988/202590796-41440024-d8b5-446a-8900-e28146a13e98.gif)

### Admin View
![admin-overlook](https://user-images.githubusercontent.com/108169988/202590767-2472c90e-8730-43ef-b84e-251b1929ef6d.gif)

### Wireframe
![Overlook-wireframe](https://user-images.githubusercontent.com/108169988/202585214-06d9efcb-b0b0-4e56-820b-ef54e09e3625.png)

### Technologies
- Fetch API 
- Lighthouse and WAVE accessibility tools 
- Webpack module bundler
- Git/GitHub
- JavaScript
- CSS 
- HTML 
- Mocha JavaScript testing framework
- Chai assertion library 
- Node.JS
- Excalidraw 

### Methodologies
- Test-driven development 
- Error handling 
- Ensure accessiblity through WAI ARIA states, roles, and properties 
- Implement ES6 classes which support a complex data model
- Use object and array prototype methods to perform data manipulation
- Create a user interface that is easy to use and clearly displays information
- Write modular, reusable code that follows SRP (Single Responsibility Principle)
- Implement a robust testing suite using TDD
- Make network requests to retrieve data
- Demonstrate DRY principles

### Installation Instructions
1. Fork this repository.
2. Clone your new, forked repository to your local machine.
3. Clone [this API repository](https://github.com/turingschool-examples/overlook-api) to your machine.
4. `cd` into the API repository on your local machine and run `npm install`, then `npm start` to launch the API's server.
5. In a seperate tab, `cd` into the main project repository on your local machine and run `npm install`, then `npm start` to launch the application's server.
6. Open the link to your local server (listed in your terminal) in your web browser to view the live page.

### Using the Application

To use the admin interface, use the following credentials to log in:\
username: `manager`\
password: `overlook2021`

To use the guest interface, use the following credentials to log in:\
username: `customer1`\
password: `overlook2021`\
note: The number in the customer's username represents the customer's id number coming from the endpoint. Any number between 1 and 50 can be used.

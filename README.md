# Overlook Hotel

<p align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown" />
  <img src="https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red" />
</p>

## Abstract

This project is a single-page web application designed to emulate a hotel website for customer use, with additional functionality for hotel staff ("admin view"). Users will find a thoughtfully-designed UI that takes them through the step-by-step process of signing into their account, viewing past and upcoming bookings, and creating a new booking. User input is updated dynamically via the Fetch API, utilizing a locally-hosted endpoint. 

From the admin view, a user can search all guests by name, remove a future booking, and create a new booking for that guest. Business statistics for the current day are also dynamically presented here.

Aesthetically, the design takes inspiration from the midcentury-modern, boutique hotels of New York City.

## Project Context

This project was my final solo project of the 2nd module (2 of 4) of the Front-End Software Engineering Program at Turing School of Software & Design. I was tasked with creating a dynamic, accessible, object-oriented application that utilizes the tech we'd learened up to this point, being approximately halfway through the program. My vision for the project was to build something that could be representative of my fundamental HTML/CSS/JavaScript skills. As such, this app uses all "vanilla" JavaScript, with no frameworks or third-party packages.

The project also includes a Mocha/Chai testing suite for all classes/class methods.

### Technologies

- JavaScript ES6
- CSS3
- HTML5
- Fetch API 
- Lighthouse and WAVE accessibility tools 
- Webpack module bundler
- Mocha JavaScript testing framework
- Chai assertion library 

### Methodologies/Goals

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

## Screenshots

### Guest View
![guest-overlook](https://user-images.githubusercontent.com/108169988/202590796-41440024-d8b5-446a-8900-e28146a13e98.gif)

### Admin View
![admin-overlook](https://user-images.githubusercontent.com/108169988/202590767-2472c90e-8730-43ef-b84e-251b1929ef6d.gif)

### Wireframe
![Overlook-wireframe](https://user-images.githubusercontent.com/108169988/202585214-06d9efcb-b0b0-4e56-820b-ef54e09e3625.png)

## Installation
1. Fork this repository.
2. Clone your new, forked repository to your local machine.
3. Clone [this API repository](https://github.com/turingschool-examples/overlook-api) to your machine.
4. `cd` into the API repository on your local machine and run `npm install`, then `npm start` to launch the API's server.
5. In a seperate tab, `cd` into the main project repository on your local machine and run `npm install`, then `npm start` to launch the application's server.
6. Open the link to your local server (listed in your terminal) in your web browser to view the live page.

## Using the Application

To use the admin interface, use the following credentials to log in:\
username: `manager`\
password: `overlook2021`

To use the guest interface, use the following credentials to log in:\
username: `customer1`\
password: `overlook2021`\
note: The number in the customer's username represents the customer's id number coming from the endpoint. Any number between 1 and 50 can be used.

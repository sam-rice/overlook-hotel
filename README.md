# Overlook Hotel

### Abstract
This project is meant to emulate a hotel's client-side website with additional functionality intended for hotel staff ("admin view"). Users will find a thoughtfully-designed UI that takes them through the step-by-step process of signing into their account, viewing past and upcoming bookings, and creating a new booking. 

From the admin view, a user can search all guests by name, remove a future booking, and create a new booking for that guest. Information on occupancy rates for the given day are also dynamically presented here.

To use the admin interface, use the following credentials to log in:\
username: `manager`\
password: `overlook2021`

To use the guest interface, use the following credentials to log in:\
username: `customer1`\
password: `overlook2021`\
note: The number in the customer's username represents the customer's id number coming from the endpoint. Any number between 1 and 50 can be used.

### Guest View
![user-view-gif](https://user-images.githubusercontent.com/108169988/202003087-a0d0559c-e9ee-4567-8092-511ed2b3bc32.gif)

### Admin View
![manager-view-gif](https://user-images.githubusercontent.com/108169988/202003273-1efce384-9727-42b3-af69-872e2f6a0a9c.gif)

### Contributors
[Sam Rice](https://github.com/sam-rice)

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

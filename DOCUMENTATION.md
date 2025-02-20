# Lilly Technical Challenge Documentation Template

*This documentation template serves as a place for you to discuss how you approached this challenge, any issues you faced & how you overcame them, or any other points that you feel would be relevant for the interviewers to know. The text in italics is here to guide you - feel free to remove it once you fill out each section!*

***Not every section in this document is required. This is just a template to help get you started. Feel free to add or remove sections as you feel necessary.***

## Approach
*How did you approach this challenge? Did you work through the objectives in any particular order? If so, why? Did you utilize any external resources, such as tutorials, guides, or other materials?*

## Objectives - Innovative Solutions
*For the challenge objectives, did you do anything in a particular way that you want to discuss? Is there anything you're particularly proud of that you want to highlight? Did you attempt some objectives multiple times, or go back and re-write particular sections of code? If so, why? Use this space to document any key points you'd like to tell us about.*

## Problems Faced
*Use this space to document and discuss any issues you faced while undertaking this challenge and how you solved them. We recommend doing this proactively as you experience and resolve the issues - make sure you don't forget! (Screenshots are helpful, though not required)*.

## Evaluation
*How did you feel about the challenge overall? Did some parts go better than others? Did you run out of time? If you were to do this again, and were given more time, what would you do differently?*

-----------------------------------------------------------------------------------------------------
## Approach
+ I'll start by looking at every objective and breaking them down into smaller steps with psuedo(ish) code.
    + This'll make prioritising objectives easier and may allow me to complete later objectives by building onto the earlier ones (for example, objective 2 can be completed most easily by building on objective 1.) 
    + Difficulties / problems are labelled with '-'

# Objective 1: Fetch data from backend and send it to the front end, displaying in a user-friendly way.
+ Need to fetch data using javascript:
    + fetch data by sending GET request to endpoint in python script 
    + convert response to JSON
    + display it on front-end (preferably some other function does this) with a loop by changing elements on the html
+ pt 1: Will start by making a button that displays all medicines with their prices in a list. 
    - Set up a live server with VS code to view index and medicine list not showing up. 
        
        - Inspecting the page on a live server, console logs show this. Server definitely running:
        "GET http://0.0.0.0:8000/medicines net::ERR_ADDRESS_INVALID"
            + On browser, http://localhost:8000/medicines works but http://0.0.0.0:8000/medicines doesn't. Changing to localhost in JS works. 

        - Now showing this error:
        "Error fetching medicines: TypeError: Cannot read properties of undefined (reading 'forEach')
        at displayAllMedicines (script.js:10:20)
        at script.js:21:23"
            - Adding console logs to view what it's working on. Loop doesn't start so probably problem with response from fetchMedicine
            - console.log(data) before loop doesn't show expected json object -> problem definitely in fetching function
            - Adding log before passing data to displayAllMedicines shows empty json
            + Found it: response.json needed to be response.json().

+ pt 2: Can make a simple form that sends the name of the medicine to the get_single_med endpoint. 
    - Can reuse displayAllMedicines but only send an array containing a single object. Will rename it to displayMedicines for clarity. 
    (since I'm spending a lot of time on this I'll leave it there and move on)


# Objective 2: A data engineer had some issues migrating data, leaving some gaps in our database. How can you ensure that the frontend handles missing/invalid data returned from the APIs without crashing?
+ All I need is some error handling / data filtering on the response from objective 1.
+ If I have a function to fetch and a function to display, I can add another function in between to filter. 
+ It'll be a bit hard to test since data.json is out of scope and contains no gaps, so I'll copy it into a new file and use that instead temporarily (see dummyData.json) - nevermind missed the gap.
    + I'll reuse the /delete logic + forEach loop in JS because we want the error handling done on frontend.
    + I'll loop through all returned json objects and omit those that contain empty strings for names or no prices with an if condition.
        + This link has everything I need: https://stackoverflow.com/questions/5310304/remove-json-element (using very last answer)
        

# Objective 3: You can send data to the backend via the available API(s), however it is not particularly user-friendly. How will you create a user-friendly solution that allows users to input data on the site and send it to the backend?
+ Let's say a user wants to add a medicine. We have an endpoint for that already called create_med. We can use html and/or javascript to send data directly to that enpoint via a form visible on the html.
    + Form would need two fields - medicine name and price - and would need to send a python dict-type object (or JSON, not sure yet) to the enpoint for processing. 
    + If user enters a medicine name that already exists, we can give them back an error message saying this already exists and abort the request. Uses the POST-REDIRECT-GET pattern potentially.
        + need a function that checks presence of item. 
+ Similarly for /update and /delete, I can just add two more forms under different headings on the same page. 
    + Will have forms underneath one another.
    + /update form will look similar to /create but if user enters a non-existent item they'll get the custom error message
    + /delete will not differ. I'll choose to keep the price field so that it's a little more difficult to delete an item, giving them time to ensure they aren't making a mistake. 
+ I could be fancy and use an AJAX form, for which I'd need to override the onsubmit property of the html form and set it to return a javascript function instead. I'll do this after trying out the easier solution above. 

# Objective 4: The frontend site's design leaves a lot to be desired. Can you make any improvements to the overall design and user experience? (this one is open-ended; feel free to be creative here!)
+ Will leave this till last after all elements are on the page and working. 
+ Could use WAY more colour but not too much. Perhaps some rounded corners on buttons to make them stand out.
+ Page layout should be central in the following order of functionality.
    + retrieve a medicine or a list of all of them. 
    + 3 forms side by side under different headings for post requests

# Objective 5: The boss has asked me for a quarterly report. Can you create a backend function for averaging prices of all our medicines?
+ Could use a similar structure to the get_single_med function to return all of the prices in a list. Averaging should be easy from there if I sum all the items (sum()) and divide its length (len()) by it. 
+ For example: 
    + For every med item in data["medicines"], append med['price'] to a list called prices (could also use comprehension to directly create prices).
    + Return len(prices) / sum(prices)
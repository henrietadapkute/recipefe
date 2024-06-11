# Co.okBook

## Description

A REST application, designed for users to search and create recipes. The project showcases a mix of Django Auth for authorisation, Tailwind CSS, DaisyUI, and Lucide React Icons for an aesthetically pleasing and user-friendly frontend UI. I have integrated an external API, which allows users to search thousands of recipes fetched from different websites, standout features include an efficient category sorting system and a bookmark functionality for users to save recipes for future reference. 

## Deployment link

Project: [Co.okBook](https://recipefe-production.up.railway.app/)
Backend: [Link here](https://github.com/henrietadapkute/recipebe)

To view the features of the app, please create an account.

## Timeframe
7 days 

## Goal

A solo project to design a full-stack React app using Python, Django, and PostgreSQL.

## Technologies Used
React 
Python
Django
PostgreSQL
Rest_framework
Axios
Git/Github

## Planning

I created a recipe application for my final project, which I knew I would enjoy building. 

To organise my project efficiently, I created a Trello board to keep note of wireframes, and potential APIs. A Trello board was used to plan and track each day of the project.

Below, you can see a rough sketch using Exalidraw of what the project was designed to look like. I kept in mind the Bookmarking system and API search views.

![image](https://github.com/henrietadapkute/recipefe/assets/112635209/e3a561f0-6573-4500-ae35-0531712e476c)

![image](https://github.com/henrietadapkute/recipefe/assets/112635209/59594ef5-3cec-4959-9943-c4544e1249ab)

## Process

I first planned out the ERD and wireframes to then move on to what models, controllers and routes would look like. I talk more about relationships and models later on.

![image](https://github.com/henrietadapkute/recipefe/assets/112635209/4f9da955-89b5-4875-b4e9-a667044e2d90)

### Backend (Day 1-2)

On day 1, I started implementing the logic for my models. This has taken a few changes since I created the ERD. Due to the timeframe, I was not able to integrate the reviews, as well as implement a Schema for ingredients, however, these are features I would like to implement later on. Please read below for a breakdown. 

### Models 
The finalised project includes two main models ‘Category’ and ‘Recipe’. The ‘Category’ model holds different recipe categories, with a character limit. Meanwhile, the ‘Recipe’ model serves as the core element. 

In the context of the models, the User model is connected to the Recipe model through a one-to-many relationship, where each user can have multiple recipes. Additionally, the Recipe model is linked to the Category model through a many-to-one relationship, as multiple recipes can belong to a single category.

![image](https://github.com/henrietadapkute/recipefe/assets/112635209/fb7468ca-1b0e-438f-a948-ff1ef3976ce0)

### Serializers 
The ‘RecipeSerializer’ showcases recipes in Django REST Framework API. There is a special field ‘category_name’, to display the name of the recipe’s category. 

For the ‘CategorySerializer’, I made sure to add a unique ID for each recipe category, to then later use it for easier intergration in the frontend. 

![image](https://github.com/henrietadapkute/recipefe/assets/112635209/cc74bd5c-91f5-430d-a4b3-d7c64aaa78e7)

### ViewSet
The ‘RecipeViewSet’ manages recipe CRUD operations and allows the recipes to be filtered by category. It uses RecipeSerializer to format responses and ensures the associated user is recorded when creating a recipe. 

Category views also manages standard CRUD operations, as it includes a custom action to retrieve recipes for a specific category.

![image](https://github.com/henrietadapkute/recipefe/assets/112635209/52ca2892-bce1-48ca-a83a-faf717e4d16b)

I chose to use Django’s built-in authentication. I have implemented permissions isAuthenticated class, which helps to simplify permission checks. JWT tokens were also used to handle the user authentication securely.  

### Frontend (Day 3-5)
The frontend was built using React.js, which I started to work on during day three. Once I had started working on my frontend, I was able to tweak things in my backend if needed. For example, I realised that to display a tied category to the recipe, I would need the category ID. This has made the process of implementing CRUD easier later on. 

I opted for a minimalist design with a touch of colour, using Tailwind CSS, Daisy UI, and Lucide-React icons for styling. My familiarity with Tailwind CSS from a previous project made it a preferred choice; allowed me to create a visually appealing user interface I envisioned. 

I also integrated an API to retrieve recipes from various websites. This provides users with additional functionalities, including the ability to search for recipes, view detailed information, and seamlessly navigate to the original recipe source.

## Challenges

### Planning
While creating the Entity-Relationship Diagram (ERD), I initially envisioned incorporating more relationships for the application. Unfortunately, due to time constraints, I couldn't implement them as planned. One key aspect I aimed to include was a many-to-many relationship, allowing recipes to have multiple ingredients, and ingredients to be associated with various recipes.

### Categorising recipes
When attempting to sort recipes by category, I encountered an issue where the results were unidentified.The root cause was my omission of the category ID in the logic, leading to an ineffective categorization approach. 

![image](https://github.com/henrietadapkute/recipefe/assets/112635209/de43e7fc-3832-4a15-9444-d877efb639a7)

### Django Auth
One significant challenge I encountered was related to the refreshment of user tokens, as they were not refreshing as expected. To tackle this issue, I successfully resolved it by adjusting the token expiration time. Another aspect that proved challenging was establishing a smooth and secure authorization connection between the frontend and backend. It took careful consideration and adjustments to ensure a reliable communication link between these two application layers.

## Wins

**Recipe Search API**: I successfully integrated an API, enabling users to search for recipes sourced from various websites, which has elevated my application.

**Bookmarking System**: Developed a bookmarking system, providing users with the capability to save and view their preferred recipes effortlessly, adding more to the existing functionality. 

**Styling**: Adopted a minimalist design approach with a vibrant touch, ensuring a visually appealing and mobile-friendly user interface.

**Dynamic Category-based Recipe Display**: Overcame challenges to create a feature that dynamically displays recipes based on the selected category. While initially challenging, this task has been an enjoyable and rewarding aspect of the project. 

## Key Learnings 

- Completing this project has significantly deepened my understanding of the Django framework, enhancing my proficiency in Python web development.
- The project has solidified my knowledge of entity relationships, reinforcing my ability to model and structure database relationships effectively.
- Working with PostgreSQL for this project has provided valuable hands-on experience.

## Future Improvements

### Expanded Bookmarking and Favourites
I plan to continue developing the project by enhancing bookmarking features for recipes fetched from external websites from the API that I have used. Additionally, I want to incorporate a “favourites” system similar to bookmarking.

### Featured Recipes Homepage Section
I would like to include a featured recipes section on the homepage, showcasing the most viewed and popular recipes.

### Star Ratings Logic Completion
To conclude, I aim to finish the star ratings, a feature that would add a layer of user interaction and feedback. Time constraints prevented the full implementation during the project phase.

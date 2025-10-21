# Overview

{Important! Do not say in this section that this is college assignment. Talk about what you are trying to accomplish as a software engineer to further your learning.}

{Provide a description of the software that you wrote and how it integrates with a SQL Relational Database. Describe how to use your program.}
    This software provides a team section for an imaginary company's website. It contains and displays all the team members in the company, with information such as: name, title, and when they were hired. For this assignment, I decided to add an admin view that lets the admin/user modify all the information stored in the database- adding members, updating current members, and deleting members. This connects to my database and uses SQL code to interact with it. I spent 20 hours on this project! 

{Describe your purpose for writing this software.}
I wrote this software because I am currently creating a website for the company I work for! This was one of the owner's requests- that there was a page dedicated to showing all the team members at our company. Several other companies within our industry have done the same on their websites, so we had to have it! This version is a very simplified version of the one that will go on the website, but I have included enough to showcase the functionality of this software.

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running, a walkthrough of the code, and a view of how created the Relational Database.}

[Software Demo Video] https://youtu.be/Rzqk01SZzqk

# Relational Database

{Describe the relational database you are using.}
I am using a PostgreSQL relational database. This database collects data into tables and supports SQL querying. 

{Describe the structure (tables) of the relational database that you created.}
I created a "team" table that had columns like: id, name, title, photo_url, sort_order, hired_at, created_at and updated_at. 

# Development Environment

{Describe the tools that you used to develop the software}
I used: VSCode as my code editor, pgAdmin 4 to display my PostgreSQL database, Node.js, and npm. 

{Describe the programming language that you used and any libraries.}
The programming language I used was JavaScript. The main libraries I used were: express, pg, dotenv, morgan, cors and ejs. 

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [Web Site Name](https://www.postgresql.org/docs/)
- [Web Site Name](https://www.w3schools.com/sql/)

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}

- Item 1:
The first thing that needs work is improving the frontend view! Everything works flawlessly on the backend, but the frontend is definitely lacking. I will spend some time stylizing the frontend view so that it matches the theme of the rest of my project! 
- Item 2:
I will implement admin authentication with a login page for all admin. If you do not have an account, you can't access the admin view! This is an industry standard and allows the developer to step away once they've finished the project and allow the admin at the business to continue to modify information on the website without having to ever code a single thing! 
- Item 3:
One thing I could do to meet another stretch goal is to add another table and use a JOIN query to connect this table to my team table. This could be a "roles" table that stores information about what the team member does during a workday. 

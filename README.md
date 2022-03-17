## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
-   This project is about creating a REST API that converts currency rates between EUR, USD and CHF (all ways).
-   In **main brahch** the user is able to convert with no need to singup or login.
-   In **currency_converter_with_authentication branch**, the user should has a registered account to be able to convert currencies. 
	
## Technologies
Project is created with:
* Nodejs v14.15.0
* mongoose v6.2.6
* node-fetch v2.6.7 (if you want to import this library and the other libraries using [require] you have to use this version)


## Setup
1.   To run this project, you can clone it or download the zip file and use any IDE that supports javascript.
2.   To run the project without authentication you can use the **main branch** or use **currency_converter_with_authentication branch** to run it with authentication.
3.   In the main folder where all the files exists, you run **npm install** in the terminal to install all the libraries required.
4.   After that you run **nodemon** to exucte the code.
5.   You have 4 "endpoints". **/convert**, **/history**, **/signup**, and **/login**
6.   As testing environment you can use **Postman**
7.   You should add a **.env** where you will add **API_KEY** to fetch currencies rates, **DB_Connection** for mongodb, **JWT_KEY** for Authentication.

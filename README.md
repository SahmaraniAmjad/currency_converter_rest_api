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
5.   As a result you should get **Server is running on port xxxx** and **Connected to DB**
6.   You have 4 "endpoints". **/convert**, **/history**, **/signup**, and **/login**
7.   As testing environment you can use **Postman**
8.   You should add a **.env** where you will add **API_KEY** to fetch currencies rates, **DB_Connection** for mongodb, **JWT_KEY** for Authentication.

## Test cases

* EUR to CHF Conversion
![EUR to CHF conversion](https://user-images.githubusercontent.com/44136023/158785200-43e66dc5-9541-404d-8cda-e05ae3162f6d.PNG)

* USD to CHF Conversion
![USD to CHF conversion](https://user-images.githubusercontent.com/44136023/158785388-c97ad825-4c99-4e38-af4d-cddcd6f5f76a.PNG)

* Currency's parameter restrictions
![length of currency From is less than 3 char](https://user-images.githubusercontent.com/44136023/158785510-895c97a3-6fe6-447a-a3cc-cb5e74c8df12.PNG)

![currency is not allwoed to be empty](https://user-images.githubusercontent.com/44136023/158785623-3c0655a6-d13b-474c-a286-e434ec5c247c.PNG)

* Intial amount restriction
![number must be positive](https://user-images.githubusercontent.com/44136023/158785775-8281e043-cae0-4540-846c-60ec8a01305d.PNG)

* Get all the conversions from DB
![get all the value history endpoint](https://user-images.githubusercontent.com/44136023/158785860-b2d80f37-9550-4b31-a3f4-96fb41fee12c.PNG)

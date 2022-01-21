How to use app

step 1- When User enter to home page it describes how to use the application

step 2- If user wants to add the item, user will navigate to todo page when he click on add item.

step 3- In todo page user can add list of item with name, price and image. User can also remove the item if it is not required. And the uploaded image will store in AWS cloud. User can check the items to complete by clicking 'Yes' when modal appear, If he click on 'No' the item will left on same page. When item was checked as complete then the item is stored locally with the help of 'React-cookie', We can increase time of the cookie if we want to store completed Item for long time. In this there are two links navigate to home page or to view completed Item.

step 4- If User navigate to View completed Item he can see all items that are completed and Items will appear in this page until the cookie time given by user if time is end the items will be deleted automatically, from this page user can go back to home or to pending items(todo page).

To run the Application following prerequisites should be installed before.

1. Node JS
2. Chrome/edge browser/safari

Execute the given commands in the order.

1. npm install --save react-hook-use-state
2. npm i --save react-drag-drop-files
3. npm i react-hook-use-state
4. npm i react-router-dom
5. npm i react-router
6. npm install react-scripts@latest
7. npm install react-scripts --save --force
8. npm install react-cookie
9. npm install react-bootstrap bootstrap
10. npm i aws-sdk

Once all this commands are executed user needs to run command

1. npm start

After execution of this command app will be up and running on

1. http://localhost:3000/

Note:- This app will run on default 3000 port if any other application is already using this port then nodeJS will ask user to change the port no while starting the application. So, user has to change the port no in the url.

Deployment

The application is deployed by using firebase. You can run directly using web link.

https://todolist-77eae.web.app

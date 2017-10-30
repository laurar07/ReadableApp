# Readable App

This web app created with ReactJS and Redux will be your one stop shop for social media. Submit posts about your interests, find relevant content based on helpful categories, and engage with other users by posting and voting on other people's comments. The home page displays the entire lists of posts, optionally filtered by category, and sorted by timestamp, voteScore, author or title. Vote for your favorite posts, or submit a new one by clicking on the '+' at the bottom right of the screen. To see more details on a specific post, click on the title, and you will be able to view, add, edit or vote for your favorite comments. Keep on posting!

## How to run

You will need to have installed [npm](https://www.npmjs.com/) in your machine.
1. Clone this repository and navigate to the root folder of the app
2. Run 'npm install' to download all the packages needed
3. Run 'node server' to stand up the server instance
4. Run 'npm start' to start up the application
5. Navigate to [http://localhost:3000](http://localhost:3000) in your browser. Happy posting!

## Home Page

This page contains the list of all the posts made on the site.

<img alt="homepage" src="https://user-images.githubusercontent.com/1109471/32157271-b0c32048-bcff-11e7-828f-882df04329da.png">

To filter by a specific category, click on any of the links at the top of the page. To go back to the list of all the posts, simple click 'all'.

<img alt="categorypage" src="https://user-images.githubusercontent.com/1109471/32157333-16150718-bd00-11e7-82ac-89f5f636177c.png">

## Post Detail Page

To get more details on a specific post, simply click on its title. You will be able to edit or delete the post, get details on when and who submitted it, and view the list of comments associated with it. You can also add, edit, vote and delete any comment for the post.

<img alt="postdetailpage" src="https://user-images.githubusercontent.com/1109471/32157407-774f7932-bd00-11e7-851d-71718a2b3ce1.png">

## Post Edit Page

To edit a specific post, you can click on its 'Edit' icon in the Post Detail Page. You will be taken to a pre-populated form where you will be able to make edits and save.

<img alt="posteditpage" src="https://user-images.githubusercontent.com/1109471/32157446-dabfa6cc-bd00-11e7-80ee-b9267b3bb183.png">

## Post Add Page

To make a new post, simply click on the '+' icon in the Home Page.

<img alt="postnewpage" src="https://user-images.githubusercontent.com/1109471/32157547-617384fe-bd01-11e7-8ab3-f32a0f55cb9b.png">

## Invalid Page

In the unlikely event you end up in an invalid page, we provide a helpful way to find your way back to the Home Page.

<img alt="invalidpage" src="https://user-images.githubusercontent.com/1109471/32157594-94e9e6ca-bd01-11e7-9caf-c94fed422fd1.png">

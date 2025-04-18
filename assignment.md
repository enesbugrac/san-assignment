# Senior Front-end Developer: ASSIGNMENT

### Before jumping into this assignment, we want to tell you that we’re so happy you made it to this stage. Well done!

### We think you should do this assignment in 5~6 hours maximum.

# Assignment

### We want to build a basic client-side-only SPA that has a clean and easy-to-understand architecture. Now, for this

### assignment, you will use the following libraries:

### Vite

### TypeScript

### React version 18.x

### React Router version 6.x

### TanStack’s React Query version 5.x

### You’re not allowed to use any UI and Form external libraries.

### We won’t focus on the look of the application, but if you like to, you’ll get extra points. If you’re in, we want you to use:

### Tailwind CSS

### For simulating backend API, use https://jsonplaceholder.typicode.com/ site.

### Okay, let’s see what’s here for you!

## Routing

### We would like you to design and develop the architecture of a client-side web application that supports user access

### control and internationalization (i18n). Our main focus will be the routing.

### We prefer to have all the route definitions inside a single file. Each route has the following information:

### Name (required): Each route must have a unique name that later on will be used for navigating to that route, for

### example.

### Path (required): Obviously, the path for the route.

### Renderer (required): What will the route render to the page? Each route can decide whether it wants to render a lazy-

### loaded component or a normal element:

### Element : Pass a React element bundled with the main JS file (no lazy load).

### Lazy-load : Use import() functionality to lazy-load a React component.

### Permissions : A list of permissions that will be checked before rendering the page. If the user cannot visit the page,

### redirect to the separate page (maybe /403).

### Translations : A list of remote resources that must be prefetched and ready before the routes start to render to the

### page. To begin, each route has a language file that must be pre-fetched before rendering the route (you don’t have to

### load the file, just returning an empty promise will suffice).

## Authentication / Authorization

### All the possible permissions are as follows:

#### 1 VIEW_POSTS

#### 2 VIEW_COMMENTS

#### 3 EDIT_POST

### When logging the user in, put this object in our React Query state as the current user data:

## Navigation

### Based on the routes config, we need a navigator object that lets us easily navigate from one route to another cleanly.

### Just so you know, we want to create this nav object automatically from the route config without having to repeat each

### route info in the navigator object.

### Nice to have:

### While the get method returns the URL for the preferred route, we love to have another method that navigates the user

### to the route without returning anything.

### When using the go method, we will first check if the user has permission to go to that route. If not, we will alert the user

### that he/she can’t access the page.

## Pages

### We expect the following pages from you:

### Login : Just add a single button and log a dummy user in manually (Store user data in the React Query state).

### Home / Dashboard : A basic dashboard with two cards, the first card will display recent 5 posts and the second one

### will display 5 recent comments.

#### 4 CREATE_POST

```
1 const USER: {
2 name: string;
3 permissions: string[];
4 } = {
5 name: 'John Doe',
6 permissions: [
7 'VIEW_POSTS',
8 'VIEW_COMMENTS'
9 ]
10 }
```

```
1 import { Link } from 'react-router-dom'
2 import nav from '@/nav'
3
4 function App() {
5 return (
6 <Link to={nav.editPost.get({ id: 42 })}>
7 Posts
8 </Link>
9 )
10 }
```

```
1 import { Link } from 'react-router-dom'
2 import nav from '@/nav'
3
4 function App() {
5 return (
6 <button onClick={() => nav.editPost.go({ id: 42 })}>
7 Posts
8 </Link>
9 )
10 }
```

### Posts : Display a list of posts that the user can edit or delete each item.

### Post : Let the user view a single post by its ID and access the following two tabs which are navigated via the URL:

### Edit Post : The user can edit and save the post data in this tab.

### Post Comments : In this tab, the user can only view the comments for the post.

### Create Post : A page to create a new post.

### Not to forget that adding a basic top header with a logout button will make us happy indeed.

## Final Notes

### Please use a git repository for the project and write clean and concise commit messages. After finishing the

### assignment, send us the repository link.

### There is no need to write any tests for this project.

### Looking forward to hearing from you,

### Octofront, the Octopus Front-end Team.

# Auth0 plugin

To start setting-up Auth0 plugin in WeWeb , there are two pre-requisites: 

✅ 1- you already have an account with Auth0, it’s free for up to 7,000 active users

✅ 2- you are logged into your Auth0 account

Once that’s done, you can follow these 4 steps to start using Auth0 functionalities in WeWeb:

1. Connect your Auth0 account
2. Define on what page logged in and logged out users land
3. Define user groups to gate content
4. Change page settings to gate content

# Step 1 – Connect your Auth0 account

To connect your Auth0 account to WeWeb, you’ll need to copy/paste 2 pieces of information from Auth0 in WeWeb:

## 1- Your Auth0 domain

👉 In Auth0, go to “Applications” > “APIs” and copy the URL for your API audience and paste it in WeWeb.

## 2- Your Auth0 token

👉 Back on the “APIs” screen in Auth0, click on “Auth0 Management API” > “API explorer” and copy/paste your token in WeWeb.

<iframe src="https://www.youtube.com/embed/T9tL3AFF0FY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Step 2 – Define User Redirections

👉 Select what pages you want users to see when:

- they are logged out – for example a login page
- they are signed in – for example a profile page

![Redirections](https://weweb-changelog.ghost.io/content/images/2022/11/step2.png))

# Step 3 – Define User Groups

👉 To define user groups in WeWeb, you first need to create user roles in Auth0 > “User Management” > “Roles” > “Create Role”

![Create role](https://weweb-changelog.ghost.io/content/images/2022/11/step3a.png)

👉 Then, you can assign roles to users in “User Management” > “Users” > “Assign Roles”

![Assign role](https://weweb-changelog.ghost.io/content/images/2022/11/step3b.png)

Once you have user roles in Auth0, you can define user groups in WeWeb in two steps:

👉  1- Name your WeWeb user group

👉  2- Select Auth0 user role(s) that will be added to your WeWeb user group

![User group](https://weweb-changelog.ghost.io/content/images/2022/11/step3c.png)

# Step 4 – Manage Access To Pages Based on Login Status and User Roles

By default, when you add a new empty page in your WeWeb app, everybody can access it, even users who have not signed in.

You can limit access to your WeWeb app at page level. 

![Access](https://weweb-changelog.ghost.io/content/images/2022/11/step4a.png)

👉 Go to the page settings > “Private access”

👉 Select if you need users to be authenticated to access the page

👉 Select which authenticated user group(s) can access the page

<iframe src="https://www.youtube.com/embed/39svXaRgtm8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

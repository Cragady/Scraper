# **Purpose**

The purpose of this project was to build a web-scraper that scrapes the latest news articles from a chosen site. I chose TechCrunch to do this with, so it pulls the latest tech news that TechCrunch has to offer. This web app has a commenting system, user authorization, and a saved articles mechanic.

# **Functionality**

**Navigation**

There is a nav bar at the top of the page that contains the login and logout buttons under the drop down `Accounts`. From this nav bar users can navigate to the latest articles, all articles, or their saved articles.

**Users**

* On creation, the user is logged in and their credentials are stored and hashed using Mongoose.

* On login, the given password is compared against the stored hashed version befor the user is allowed to login.

**Commenting**

Users can leave and delete comments. The comments are associated with the articles they are left on so that the articles are populated with the comments when they are rendered to the page.

**Scraping articles**

There is a `Scrape Articles` button that the user can click. The page will then be populated with the newest articles available if there are any.

**Saving articles**

The user can save, or delete articles from their saved lists. The list of saved articles can be viewed on a different page.
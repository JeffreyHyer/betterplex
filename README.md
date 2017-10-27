# BetterPlex

## EDGE Project Process

__Research__

Originally I has planned to use a data source such as Google Movies,
Rotten Tomatoes, Fandango, or a similar data source to display showtimes
for specific theatres near the current location of the user but after
researching several sources I found that either
    
    1) the data was unavailable due to licensing restrictions or
    2) was prohibitively expensive

This forced me to reevaluate the scope of my project and limit it
to showing newly released or soon to be released films within a
broad region (i.e. the United States)

With this new information I decided that given the limitations
of the data sources I would not need the additional features
that a mobile application would provide (e.g. the users location,
etc) so I decided to build the application as a web application instead.
This would still provide the functionality I wanted but would allow
me to offer the application to a broader range of users on both mobile
devices and desktop/laptops as well through a web browser.

In the end I decided to use [The Movie DB](https://www.themoviedb.org/)
as the data source as they had very few restrictions on the way the data
could be used and offered all the data I needed in once place (as opposed
to combining multiple data sources).

I decided to build the application using the [Vue.js](https://vuejs.org)
JavaScript framework and I wrote a custom SDK to interface with the TMDB
API.


__Design__

When I developed the proposal for this project (over two years ago now)
I designed the application to be used on a mobile phone using the current
best practices and design guidelines. Since then I changed the platform
and the design guidelines have been updated and revised a number of times.

As a result I redesigned the application slightly to conform to the
updated best practices and also to support the additional platforms the
application would run on.

[Original Design Screenshot]

[Final Design Screenshot]


__Code__

I built this application using the Vue JavaScript framework. It is a
popular framework used by many large companies to build modern web
applications. I decided to use this framework due to it's popularity
and real-world application with the intent of better learning a technology
that could serve to bolster my resume and help me stand out as a job
candidate in the future.

I also used HTML and CSS as well as a CSS preprocessor (Sass) to build
out and realize the aesthetic and design of the application.
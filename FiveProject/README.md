# frontend-nanodegree-map-project

> Frontend Nanodegree Project 5 - Neighborhood Map

* [Overview](#overview)
* [Links](#links)
* [Resources](#resources)
* [Project First Steps](#project-first-steps)
* [License and Copyright](#license-and-copyright)


## Overview
This is a map web site showing places that I like to go. This web site uses the Google Maps, Google Street View Image and Foursquare APIs.  It also uses Bootstrap and Knockout.js for styling and showing a dynamic list of links.

On desktop computer on the left side showing main menu
On smaller screens the side panel mobing to the top.
Using main menu you can find places using Foursquare API or look at my favorite places 

Error handling. If the Google API cannot load then a splash screen telling user to check internet connection appears.
If the web page cannot connect with Foursquare to perform a search then an alert box appears saying it is unavailable.

##### Features:
- **Clickable map markers** display images and short descriptions.
- **Google Street View images** displayed for non-Flickr locations.
- **Foursquare search** box for finding other locations like a "coffee shop".
- Clickable **list view of markers** that pan the map to a selected marker.
- List view and map markers update during search using Knockout.js' `observableArray`.

##### `src` Files:
- **main.js** - Main program.

##### Build tools:
- **Bootstrap** for css styling.
- **KnockoutJS** for dynamically updating list of markers during search.
- **Grunt** for creating minified *build* css and js files, and creating the README.

## Resources
- [developers.google.com](https://developers.google.com)
    - [Adding a Google Map to your website]
    - [Creating custom map markers]
    - [API reference: Map 'panTo' and other methods]
    - [Legend box overlay example]
    - [How to use "Info Windows"](https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple)
- [Knockoutjs tutorial](http://learn.knockoutjs.com/#/?tutorial=intro)
    - [Knockoutjs "css" binding](http://knockoutjs.com/documentation/css-binding.html)
    - [How to data-bind to image path with KnockoutJS](http://stackoverflow.com/questions/10659665/knockout-template-using-data-bind-to-image-src-property-not-working)
- [How to add scrollbar to div](http://stackoverflow.com/questions/9707397/making-a-div-vertically-scrollable-using-css)
- [How to style placeholder text in input field](http://coolestguidesontheplanet.com/styling-placeholder-text-input-fields-forms-css/)
- [Bootstrap Documentation](http://getbootstrap.com/components/)
    - [Jumbotron implementation](http://getbootstrap.com/components/#jumbotron)
- [How to monitor XMLHttpRequest progress and add event listeners](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- [How to test connection errors (link and instructions in Udacity project feedback)](http://www.rackspace.com/knowledge_center/article/how-do-i-modify-my-hosts-file#Windows_Vista)



[Adding a Google Map to your website]:https://developers.google.com/maps/tutorials/fundamentals/adding-a-google-map
[Creating custom map markers]:https://developers.google.com/maps/tutorials/customizing/custom-markers
[API reference: Map 'panTo' and other methods]:https://developers.google.com/maps/documentation/javascript/reference
[Various sports icons]:http://mapicons.nicolasmollet.com/category/markers/sports/?style=dark
[Demonstration of flickr.people.getPublicPhotos request]:https://www.flickr.com/services/api/explore/flickr.people.getPublicPhotos
[Flickr API Methods]:https://www.flickr.com/services/api/
[Legend box overlay example]:https://google-developers.appspot.com/maps/tutorials/customizing/js/legend



[Notepad++]:http://notepad-plus-plus.org/
[grunt]: http://gruntjs.com/

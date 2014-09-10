LinkViewer
==========
LinkViewer is an extension for Chrome built as an open source experiment. LinkViewer enables you to see the most important information about a page without having to click on the link. Depending on what link it is that information could be different!

**Some examples:**
 - An Ebay Auction might show the name of the auction, image, current price, and time remaining. 
 - An Imgur Album might show the first few images
 - Hovering on the comments link on Reddit could show the top rated comment



The Open Source Experiment
------------- 
Unlike most open source projects, we are giving ourselves a two week deadline before launching the extension publicly. The plan is to target the audience that would attend hackathons as contributors and work together to put something useful together. At the end of the two weeks we will launch on ProductHunt and see how we did.

What can you do?
-------------
If you are a developer, designer, writer, new to open source, or a seasoned veteran, there is plenty that you can help with. 

**Documentation**
As all open source projects say, documentation is incredibly important. We need to make sure the README is clear for developers to get started, and know how the code is structured. 

**Design**
We have two weeks (probably less when you are reading this) to make a user friendly Chrome extension. That means it needs to be as beautiful and consistent as possible. Do you have ideas for the user experience for certain websites? Great! Do you want to help make the user experiences share design elements for different websites? Even better! 

**Development**
The obvious one. So much development work needs to be done. Here are some features that come to mind.

 - Domain plugins - Choose the website you use the most and take part in developing that functionality. This is probably the best entry point to the project as these pieces are fairly stand alone.
 - A settings menu to enable and disable different domains. Perhaps a blacklist of domains that shouldn't render.
 - Cache the display for URLs so we aren't making requests on every hover if we don't need to.
 - CSS and HTML elements the views can share to be consistent.
 - A JSHint file
 - So much more.

Contribute
-------------
LinkViewer aims to be as easy as possible for new contributors to get in and get started. 

In order to build a development version, follow the steps below 

 1. Clone this repository
 2. Open a command terminal in the root
 3. Execute `npm install` in order to get all the dependencies
 4. Execute `grunt` to create a build and listen for file changes to rebuild
 6. Open Chrome and go to `Menu->Tools->Extensions` and tick the `Developer Mode` checkbox
 7. Choose `Load unpacked extension` 
 8. Any time a file inside of `%ROOT%/src/frame` is modified you must go back to the `Menu->Tools->Extensions` page and `Reload` the extension.

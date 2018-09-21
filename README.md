# Static-Live-Server

<img src="src/assets/img/wifi.png" alt="wifi" style="width: 150px; display:inline-block"/>

### A simple static development live server that compares npm scripts, gulp, and webpack doing the same job. Built for my learning and for you to use.

Static-Live-Server (SLS) is a boilerplate project I created to learn and compare npm scripts, gulp, and webpack as task runners and build tools. SLS was created to optimize the creation of static sites, SLS will watch changes to your html, css, scss, js, and images and reload the browser. Using BrowserSync, SLS allows you to compile your site to a production build, test across multiple devices on your network, and test dependencies that require HTTPS. SLS will compile SASS to CSS, concatenate and minify CSS, concatenate and minify JS, compile ES6 to ES5, and minify images.

Clone the repo and run ```npm install``` from there you can remove my HTML, SASS, and Javascript files and insert your own. The server will compile, rebuild the dist folder, and reload the browser with your changes. The default configuration runs the browser over HTTPS and allows you to test your site across devices on your local network using BrowserSync.

##### Note: There is a bug for Windows users using npm scripts to run the server. BrowserSync will finish reloading the browser before the build is complete, in order to view your changes, save the file twice.

##### Note 2: For those using Webpack, the CSS and JS files do not need to be linked in the head of index.html as webpack will inject them, remove those tags or your CSS and JS will be included twice.
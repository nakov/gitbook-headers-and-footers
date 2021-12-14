# GitBook Plugin to Add Headers and Footers

This plugin allows adding **headers** and **footers** in the book (statically, during the book build process):
 - **Navigation header** (above the search box on the left)
 - **Navigation footer** (replaces the last navigation link "Published with GitBook")
 - **Page header** (at the top of the page section)
 - **Page footer** (at the bottom of the page section)

The plugin is designed for `gitbook cli` toolchain. 

## Warning 
TODO: This plugin is **unfinished**! It inserts the header and footer HTML correctly, but the Gitbook runtume JS scripts give console errors. I should investigate how to fix these issues.

## Installation

TODO: upload the plugin to https://npmjs.com.

```
npm install gitbook-plugin-headers-and-footers
```

## Usage

Specify the HTML templates for the headers and footers in the `book.json` config:

```
{
  "plugins": [
    "headers-and-footers"
  ],
  "pluginsConfig": {
    "layout": {
	  "navHeaderFileName" : "./assets/nav-header.html",
	  "navFooterFileName" : "./assets/nav-footer.html",
	  "pageHeaderFileName" : "./assets/page-header.html",
	  "pageFooterFileName" : "./assets/page-footer.html"
    }
  }
}
```

## Screenshots

TODO

var fs = require('fs');
var cheerio = require('cheerio');
var url = require('url');

var bookFiles = [];

module.exports = {
    hooks: {		
        "page": function(page) {
			// Collect the book HTML file names into the `bookFiles` array
			
            if (this.output.name != 'website')
				return page;

            var lang = this.isLanguageBook() ? this.config.values.language : '';
            if (lang)
				lang = lang + '/';

            var outputUrl = this.output.toURL('_book/' + lang + page.path);

            bookFiles.push(outputUrl + (outputUrl.substr(-5, 5) !== '.html' ? 'index.html' : ''));

            return page;
        },
		
        "finish": function () {
			// Process each file from the `bookFiles` array -> insert header and footer in it
			
			this.log.debug.ln("Inserting headers and footers in the book HTML files...");
			
			var layoutConfig = this.config.get("pluginsConfig.layout");
			if (!layoutConfig) {
				this.log.error.ln("Cannot find `pluginsConfig.layout` settings");
				return;
			}
				
			var navHeaderHtmlFragment = readFileContent(layoutConfig.navHeaderFileName, this.log);
			var navFooterHtmlFragment = readFileContent(layoutConfig.navFooterFileName, this.log);
			var pageHeaderHtmlFragment = readFileContent(layoutConfig.pageHeaderFileName, this.log);
			var pageFooterHtmlFragment = readFileContent(layoutConfig.pageFooterFileName, this.log);

            bookFiles.forEach(bookFileName => {
                var bookFileHtml = readFileContent(bookFileName, this.log);
                var $ = cheerio.load(bookFileHtml);
				$('div.book-summary').prepend(navHeaderHtmlFragment);
				$("ul.summary li a").last().replaceWith(navFooterHtmlFragment);
                $('div.book-header').prepend(pageHeaderHtmlFragment);
				$('div.book-body').append(pageFooterHtmlFragment);
                saveContentToFile(bookFileName, $.root().html(), this.log);
            });
			this.log.debug.ln("Successfully inserted headers and footers in all book HTML files.");
        }
    }
}

function readFileContent(fileName, log) {
	if (fileName) {
		try {
			var fileContents = fs.readFileSync(fileName, {encoding: 'utf-8'});
			log.debug.ln("Loaded file:", fileName);
			return fileContents;
		} catch(err) {
			log.error.ln("Cannot read file:", fileName);
		}
	}
	return "";
}

function saveContentToFile(fileName, content, log) {
	try {
		fs.writeFileSync(fileName, content, {encoding: 'utf-8'});
		log.debug.ln("Saved content to file:", fileName);
	} catch(err) {
		log.error.ln("Cannot save content to file:", fileName);
	}
}

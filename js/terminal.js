$(function () {

    var files = {
        'skills.txt': 'I am a JVM enthusiast with Java and Scala as my main languages. ' +
            'I have an interest in concurrency, code generation and functional ' +
            'programming. I believe in microservice architectures, strong typing ' +
            'and writing clean, modular code. I still enjoy dynamic languages ' +
            'when it comes to web development.',
        'life.txt': 'I am born and was raised in Germany where I started coding in high school. ' +
            'Today, I live in Oslo, Norway where I work as a software engineer. ' +
            'I am holding two Master\'s degrees, once in economics and one in ' +
            'computer science. I remain quite interested in economic theory and ' +
            'still read my share of scientific literature in economics. However, ' +
            'coding is my biggest passion and I am invovled in several open source ' +
            'projects.',
        'projects.txt': 'Check out my GitHub profile for some general overview. My biggest ' +
            'involvement in open source software is my project Byte Buddy, ' +
            'a runtime code generator for the JVM. Other than that, I blog about ' +
            'programming on various webpages and speak at conferences.'
    };

    $('#term').terminal({
        ls: function () {
            var fileNames = [];
            for (var file in files) {
                fileNames.push(file);
            }
            this.echo(padded(fileNames.sort()));
        },
        less: function (fileName) {
            var file = files[fileName];
            if (file) {
                this.echo(breakLines(file));
            } else {
                this.error('Cannot locate file: ' + fileName);
            }
        },
        whoami: function () {
            this.echo('Rafael Winterhalter, born in 1986, from Munich area');
        },
        help: function () {
            this.echo(padded(['ls', 'less', 'whoami', 'help'].sort()));
        }
    }, {
        prompt: '$ ',
        greetings: 'Welcome. Enter \'help\' for a list of commands.',
        history: true,
        exit: false,
        width: 460,
        height: 210
    });

    var PADDING_LIMIT = 15;

    function padded(arguments) {
        var value = '';
        for (var i = 0; i < arguments.length; i++) {
            if (i % 3 == 0 && i != 0) {
                value += '\n';
            }
            var word = arguments[i];
            if (word.length > PADDING_LIMIT) {
                word = word.substring(0, PADDING_LIMIT - 3) + '...';
            } else {
                word = word + new Array(PADDING_LIMIT - word.length).join(' ');
            }
            value += word + ' ';
        }
        return value;
    }

    var LINE_BREAK_LIMIT = 45;

    function breakLines(text) {
        var result = '', currentIndex = 0;
        while (currentIndex < text.length) {
            var last = Math.min(text.length, currentIndex + LINE_BREAK_LIMIT);
            result += '|' + text.substring(currentIndex, last) + '\n';
            currentIndex += LINE_BREAK_LIMIT;
        }
        return result;
    }
});

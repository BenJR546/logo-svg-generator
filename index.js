const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

// Regular expression for validating hex color codes
const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

// List of valid CSS color keywords (you can expand this list as needed)
const colorKeywords = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 
    'cornsilk', 'crimson', 'cyan','darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 
    'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue','firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow','honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 
    'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 
    'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen','magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 
    'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy',
    'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 
    'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue',
    'tan', 'teal', 'thistle', 'tomato', 'turquoise','violet', 'wheat', 'white', 'whitesmoke','yellow', 'yellowgreen'
];

// Function to validate color input
const validateColor = (input) => {
    return hexColorRegex.test(input) || colorKeywords.includes(input.toLowerCase()) 
        ? true 
        : 'Please enter a valid color keyword or hex code';
};

(async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Enter up to three characters:',
                validate: input => input.length <= 3 || 'Text should be up to three characters long.'
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'Enter text color (keyword or hex code):',
                validate: validateColor
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape:',
                choices: ['circle', 'triangle', 'square']
            },
            {
                type: 'input',
                name: 'shapeColor',
                message: 'Enter shape color (keyword or hex code):',
                validate: validateColor
            }
        ]);

        let ShapeClass, textY;
        const fontSize = "40";  // More conservative font size to ensure fitting within shapes

        switch (answers.shape) {
            case 'triangle':
                ShapeClass = Triangle;
                textY = "150"; // Adjust Y position for better fit within the triangle
                break;
            case 'circle':
                ShapeClass = Circle;
                textY = "105"; // Centralize Y position for the circle
                break;
            case 'square':
                ShapeClass = Square;
                textY = "150"; // Centralize Y position for the square
                break;
        }

        const shape = new ShapeClass(answers.shapeColor);

        const svgContent = `
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                ${shape.render()}
                <text x="150" y="${textY}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle" fill="${answers.textColor}">
                    ${answers.text}
                </text>
            </svg>
        `.trim();

        fs.writeFileSync('logo.svg', svgContent);
        console.log('Generated logo.svg');
    } catch (error) {
        console.error('Error generating logo:', error);
    }
})();
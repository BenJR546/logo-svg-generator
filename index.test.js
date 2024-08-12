const inquirer = require('inquirer');
const fs = require('fs');
const { Circle } = require('./lib/shapes');

jest.mock('inquirer');
jest.mock('fs');

describe('SVG Logo Generator', () => {
    test('Generates correct SVG file', async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({
            text: 'ABC',
            textColor: 'black',
            shape: 'circle',
            shapeColor: 'red'
        });

        const expectedSvgContent = `
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="100" r="80" fill="red" />
                <text x="150" y="105" font-size="40" text-anchor="middle" dominant-baseline="middle" fill="black">
                    ABC
                </text>
            </svg>
        `.trim();

        // Mock fs.writeFileSync
        const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

        // Import the script after mocking is set up
        await require('./index');

        expect(writeFileSyncMock).toHaveBeenCalledWith('logo.svg', expectedSvgContent);
    });
});
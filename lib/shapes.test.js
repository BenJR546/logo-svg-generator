const { Triangle, Circle, Square } = require('./shapes');

describe('Shape Classes', () => {
    test('Triangle renders correctly', () => {
        const triangle = new Triangle('red');
        const expectedSvg = `
            <polygon points="150,18 244,182 56,182" fill="red" />
        `.trim();
        expect(triangle.render().trim()).toBe(expectedSvg);
    });

    test('Circle renders correctly', () => {
        const circle = new Circle('blue');
        const expectedSvg = `
            <circle cx="150" cy="100" r="80" fill="blue" />
        `.trim();
        expect(circle.render().trim()).toBe(expectedSvg);
    });

    test('Square renders correctly', () => {
        const square = new Square('green');
        const expectedSvg = `
            <rect x="50" y="50" width="200" height="200" fill="green" />
        `.trim();
        expect(square.render().trim()).toBe(expectedSvg);
    });
});
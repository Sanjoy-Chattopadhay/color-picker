document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('colorPicker');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const colorPalette = document.getElementById('colorPalette');
    const generatePalette = document.getElementById('generatePalette');
    const clock = document.getElementById('clock');

    function updateColorInfo(color) {
        hexValue.textContent = color;
        rgbValue.textContent = hexToRgb(color);
    }

    function hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function generateColorPalette(baseColor) {
        colorPalette.innerHTML = '';
        let colors = [baseColor];
        for (let i = 1; i < 5; i++) {
            colors.push(adjustColorBrightness(baseColor, i * 20));
        }
        colors.forEach(color => {
            let colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;

            let colorHex = document.createElement('div');
            colorHex.className = 'color-hex';
            colorHex.textContent = color;
            colorBox.appendChild(colorHex);

            colorPalette.appendChild(colorBox);
        });
    }

    function adjustColorBrightness(color, amount) {
        let r = parseInt(color.slice(1, 3), 16) + amount;
        let g = parseInt(color.slice(3, 5), 16) + amount;
        let b = parseInt(color.slice(5, 7), 16) + amount;
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    colorPicker.addEventListener('input', (event) => {
        const color = event.target.value;
        updateColorInfo(color);
    });

    generatePalette.addEventListener('click', () => {
        const color = colorPicker.value;
        generateColorPalette(color);
    });

    setInterval(updateClock, 1000);

    // Initialize with default color and clock
    updateColorInfo(colorPicker.value);
    generateColorPalette(colorPicker.value);
    updateClock();
});

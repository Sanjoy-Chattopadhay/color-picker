document.addEventListener("DOMContentLoaded", function() {
    const colorPicker = document.getElementById('colorPicker');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const paletteContainer = document.getElementById('palette');
    const clock = document.getElementById('clock');

    // Function to update color information
    colorPicker.addEventListener('input', function() {
        const color = colorPicker.value;
        const rgb = hexToRgb(color);
        hexValue.textContent = color.toUpperCase();
        rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    });

    // Function to generate a color palette
    document.getElementById('generatePalette').addEventListener('click', function() {
        const color = colorPicker.value;
        const shades = generateColorShades(color);
        paletteContainer.innerHTML = ''; // Clear previous palette
        shades.forEach(shade => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = shade.hex;
            colorBox.innerHTML = `<div class="color-hex">${shade.hex}</div>`;
            paletteContainer.appendChild(colorBox);
        });
    });

    // Function to generate shades of a color
    function generateColorShades(hex) {
        const baseColor = hexToRgb(hex);
        const shades = [];
        for (let i = -4; i <= 4; i++) {
            shades.push({
                hex: rgbToHex(
                    Math.min(255, Math.max(0, baseColor.r + i * 10)),
                    Math.min(255, Math.max(0, baseColor.g + i * 10)),
                    Math.min(255, Math.max(0, baseColor.b + i * 10))
                )
            });
        }
        return shades;
    }

    // Function to convert hex to RGB
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        return { r, g, b };
    }

    // Function to convert RGB to hex
    function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join('').toUpperCase();
    }

    // Function to update the clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to set the clock immediately
});

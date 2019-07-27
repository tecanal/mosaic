var table = document.getElementById("mosaic");

/**
 * The class that allows for color interaction.
 */
class Color {
    static getComponents(color) {
        // Set hidden pixel to be our color to test
        var colorTest = document.getElementById("colorTest");
        colorTest.style.backgroundColor = color;

        // Get the computed color
        var color = window.getComputedStyle(colorTest).getPropertyValue("background-color");
        color = color.replace("rgb(", "").replace(")", "");

        // Split into array and convert to integers
        let colorValues = color.split(", ").map(function(x) { 
            return parseInt(x, 10);
        }); 

        return colorValues;
    }

    /**
    * Generates a random color.
    */
    static random() {
        let letters = "0123456789ABCDEF";
        let color = "#";

        for (var i = 0; i < 6; i++) 
            color += letters[Math.floor(Math.random() * 16)];
                
        return color;
    };

    /**
     * Invert the color.
     */
   static invert(color) {
        // Set hidden pixel to be our color to test
        var colorTest = document.getElementById("colorTest");
        colorTest.style.backgroundColor = color;

        // Get the computed color
        var color = window.getComputedStyle(colorTest).getPropertyValue("background-color");
        color = color.replace("rgb(", "").replace(")", "");

        // Split into array and convert to integers
        let colorValues = color.split(", ").map(function(x) { 
            return parseInt(x, 10);
        });

        // Invert red, green, and blue color values
        colorValues[0] = 255 - colorValues[0];
        colorValues[1] = 255 - colorValues[1];
        colorValues[2] = 255 - colorValues[2];

        // Return the new color in rgb() format
        return "rgb(" + colorValues.join(", ") + ")";
    };
}

/**
 * The Mosaic class.
 */
class Mosaic {
    constructor(height, width) {
        // Set the height and width
        this._height = height;
        this._width = width;

        // Clear any leftover table HTML
        table.innerHTML = "";

        // Create table with height and width parameters
        for (var i = 0; i < height; i++) {
            var row = table.insertRow(i);

            for (var j = 0; j < width; j++) 
                row.insertCell(j);
        }
    };
                
    /**
     * Set the height of the Mosaic object.
     */
    set height(height) {
        this._height = height;
    }

    /**
     * Get the width of the Mosaic object.
     */
    set width(width) {
        this._width = width;
    }
                
    /**
     * Get the height of the Mosaic object.
     */
    get height() {
        return this._height;
    }

    /**
     * Get the width of the Picture object.
     */
    get width() {
        return this._width;
    }

    /**
     * Get the raw DOM element from the table in case the user wants to do something 
     * outside of the normal Mosaic API.
     */
    getTile(x, y) {
        return table.rows[this._height - 1 - y].children[x];
    }
                
    /**
     * Set the tile color at x, y.
     */
    setTileColor(x, y, color) {
        // Get rid of any gradient it has
        table.rows[this._height - 1 - y].children[x].style.backgroundImage = "";

        // Set the tile color
        table.rows[this._height - 1 - y].children[x].style.backgroundColor = color;
    };

    /**
     * Set the tile color components at x, y.
     */
    setTileColorComponents(x, y, r, g, b) {
        var colorValues = [r, g, b];

        table.rows[this._height - 1 - y].children[x].style.backgroundColor = "rgb(" + colorValues.join(", ") + ")";
    }

    /**
     * Get the tile color at x, y.
     */
    getTileColor(x, y) {
        return table.rows[this._height - 1 - y].children[x].style.backgroundColor;
    };

    /**
     * Get the tile color components at x, y.
     */
    getTileColorComponents(x, y) {
        // Get color from tile
        var color = this.getTileColor(x, y);
    
        // Get components of color and return
        return Color.getComponents(color);
    }

    /*
     * Give the pixel a color gradient.
     */
    setTileGradient(x, y, colorOne, colorTwo) {
        // Get rid of any color it has
        table.rows[this._height - 1 - y].children[x].style.backgroundColor = "";

        // Set the pixel gradient
        table.rows[this._height - 1 - y].children[x].style.backgroundImage = '-webkit-linear-gradient(' + colorOne + ' , ' + colorTwo + ')';
    }

    /*
    * Give the pixel a color gradient.
    */
    getTileGradient(x, y) {
        // Get gradient and remove -webkit-linear-gradient('') text
        let gradient = table.rows[this._height - 1 - y].children[x].style.backgroundImage;
        gradient = gradient.replace("-webkit-linear-gradient(top, ", "").replace(")", "");

        // Return the two colors
        return gradient.split(", ");
    }

    /**
     * Set the tile border color at x, y.
     */
    setTileBorderColor(x, y, color) {
        table.rows[this._height - 1 - y].children[x].style.borderColor = color;
    }

    /**
     * Get the tile border color at x, y.
     */
    getTileBorderColor(x, y) {
        return table.rows[this._height - 1 - y].children[x].style.borderColor;
    }

    /**
     * Set the tile border width at x, y.
     */
    setTileBorderWidth(x, y, width) {
        var tile = table.rows[this._height - 1 - y].children[x];

        // If there is no border style, then default to solid otherwise border width means nothing
        if (!tile.borderStyle)
            tile.style.borderStyle = "solid";

        tile.style.borderWidth = width;
    };

    /**
     * Set the tile border color at x, y.
     */
    getTileBorderWidth(x, y) {
        return table.rows[this._height - 1 - y].children[x].style.borderWidth;
    }

    /**
     * Set the tile border style at x, y.
     */
    setTileBorderStyle(x, y, style) {
        table.rows[this._height - 1 - y].children[x].style.borderStyle = style;
    }

    /**
     * Get the tile border style at x, y.
     */
    getBorderStyle(x, y) {
        return table.rows[this._height - 1 - y].children[x].style.borderStyle;
    }

    /**
     * Set tile border properties at x, y.
     */
    setTileBorder(x, y, color, width, style) {
        setTileBorderColor(x, y, color);
        setTileBorderWidth(x, y, width);
        setTileBorderStyle(x, y, style);
    }

    /**
     * Set tile inner text.
     */
    setTileText(x, y, text) {
        table.rows[this._height - 1 - y].children[x].innerText = text;
    }

    /**
     * Get tile inner text.
     */
    getTileText(x, y) {
        return table.rows[this._height - 1 - y].children[x].innerText;
    }

    /**
     * Set the tile click function.
     */
    setTileOnClick(x, y, func) {
        table.rows[this._height - 1 - y].children[x].addEventListener("click", func);
    };

    /**
     * Set the tile mouseover function.
     */
    setTileOnMouseOver(x, y, func) {
        table.rows[this._height - 1 - y].children[x].addEventListener("mouseover", func);
    }

    /**
     * A wrapper function to allow animation looping.
     */
    static loop(func, time) {
        setInterval(func, time);
    };

    /**
     * Clear the Mosaic's tile color values.
     */
    clear() {
        for (var i = 0; i < this._width; i++) 
            for (var j = 0; j < this._height; j++) 
                this.setTileColor(i, j, '#eeeeee');
    };
}
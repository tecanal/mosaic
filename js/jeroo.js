const NORTH = 360;
const SOUTH = 180;
const EAST = 90;
const WEST = 270;

class Jeroo {
    constructor(x, y) {
        // create game board
        this.mosaic = new Mosaic(15, 15);

        this.islandMap = {};
        this._pouchFlowers = 0;
		
        // create Jeroo if in bounds
        if (this.isInBounds(x, y)) {
            this._x = x;
            this._y = y;
            this._direction = 90;
        }
		
        // show the map
        this.paintMap();
    }
    
    /**
     * Check if a coordinate is within the boundary of the map.
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean} inBounds
     */
    isInBounds(x, y) {
        return x >= 0 && x <= this.mosaic.width - 1 && y >= 0 && y <= this.mosaic.height - 1;
    }
    
    /**
     * Hop implicitly once if no arguments or hop n times if one argument.
     * Do nothing if more than one argument.
     * @param  {...Number} args 
     */
    hop(...args) {
        // x or y axis movement and how many hops
        let axis  = 0;
        let delta = 0;

        // if there is more than one argument, do not do anything
        if (args.length > 1) return;
		
        if (this._direction == EAST) {
            axis = 0;
            delta = 1;
        }
        else if (this._direction == WEST) {
            axis = 0;
            delta = -1;
        }
        else if (this._direction == NORTH) {
            axis = 1;
            delta = 1;
        }
        else if (this._direction == SOUTH) {
            axis = 1;
            delta = -1;
        }
		
        // if numHops was passed as argument
        if (args.length) {
            delta *= args[0];
        }
        // if no hops defined, implicitly hop 1
        else {
            delta *= 1;
        }
		
        // if moving along y axis, change y by delta
        if (axis) {
            if (this.isInBounds(this._x, this._y + delta)) {
                // clear any rotations on this tile before moving
                this.mosaic.tiles[this._x][this._y].transform = "";
				
                this._y += delta;
            }
        }
        // if moving along x axis, change x by delta
        else {
            if (this.isInBounds(this._x + delta, this._y)) {
                // clear any rotations on this tile before moving
                this.mosaic.tiles[this._x][this._y].transform = "";
				
                this._x += delta;
            }
        }
		
        this.paintMap();
    }
    
    /**
     * Change the direction that the Jeroo is facing.
     * @param {String} direction left or right
     */
    turn(direction) {
        if (direction.toLowerCase() == "left") {
            this._direction -= 90;
        }
        else if (direction.toLowerCase() == "right") {
            this._direction += 90;
        }
		
        // normalize values to keep in 90-360 range
        if (this._direction <= 0)
            this._direction += 360;
        else if (this._direction > 360)
            this._direction -= 360;
		
        this.paintPlayer();
    }

    /**
     * Take a flower from the map and put it into the Jeroo's pouch.
     */
    pick() {
        // if there are flowers on the map to pick
        if (this.islandMap.flowers) {
            // find the flower from map at Jeroo current position
            const flower = this.islandMap.flowers.filter(obj => obj.x == this._x && obj.y == this._y);

            // if flower is at position, remove it from the island map object
            if (flower.length) {
                this.islandMap.flowers.splice(this.islandMap.flowers.indexOf(flower), 1);

                // keep the flower in your pouch
                this._pouchFlowers++;
            }
        }

        // update the map
        this.paintMap();
    }

    /**
     * Plant a flower from the Jeroo's pouch onto the map.
     */
    plant() {
        if (this._pouchFlowers > 0) {
            if (this.islandMap.flowers) {
                this.islandMap.flowers.push({ x: this._x, y: this._y });
            }

            // remove the flower from your pouch
            this._pouchFlowers--;
        }
        
        // update the map
        this.paintMap();
    }

    /**
     * Toss a flower from the Jeroo's pouch in order to disarm a net.
     */
    toss() {
        if (this._pouchFlowers > 0) {
            // if there are nets to search through
            if (this.islandMap.nets) {
                // x or y axis and in what direction
                let axis = 0;
                let delta = 0;

                if (this._direction == EAST) {
                    axis = 0;
                    delta = 1;
                }
                else if (this._direction == WEST) {
                    axis = 0;
                    delta = -1;
                }
                else if (this._direction == NORTH) {
                    axis = 1;
                    delta = 1;
                }
                else if (this._direction == SOUTH) {
                    axis = 1;
                    delta = -1;
                }
		
                // if moving along y axis, change y by delta
                let net = [];
                if (axis) {
                    net = this.islandMap.nets.filter(obj => obj.x == this._x && obj.y == this._y + delta);
                }
                // if moving along x axis, change x by delta
                else {
                    net = this.islandMap.nets.filter(obj => obj.x == this._x + delta && obj.y == this._y);
                }

                // if net in tossing direction
                if (net.length) {
                    // remove the net from map
                    this.islandMap.nets.splice(this.islandMap.nets.indexOf(net), 1);
                }
            }

            // remove the flower from your pouch
            this._pouchFlowers--;
        }
        
        // update the map
        this.paintMap();
    }

    /**
     * Loads a map file with the name provided from the maps folder.
     * @param {String} name 
     */
    async loadMap(name) {
        // GET request the map file
        const response = await fetch("data/maps/" + name + ".json");
        const data = await response.text();

        // parse the map file and store as JSON object
        this.islandMap = JSON.parse(data);

        // update the map
        this.paintMap();
    }
	
    paintPlayer() {
        const PLAYER_IMG_URL = "https://clipartart.com/images/arrow-clipart-going-up-4.png";
		
        // set the tile image to be the Jeroo sprite
        this.mosaic.tiles[this._x][this._y].backgroundImage = PLAYER_IMG_URL;
		
        // rotate the Jeroo sprite in the direction necessary
        let heading = this._direction;
        this.mosaic.tiles[this._x][this._y].transform = "rotate(" + heading + "deg)";
    }
	
    paintMap() {
        const GRASS_COLOR = "#19A23A";
        const WATER_COLOR = "blue";
        
        const FLOWER_IMG = "https://www.pinclipart.com/picdir/middle/107-1079582_yellow-flower-clipart-clip-art-yellow-flower-png.png";
        const NET_IMG = "https://us.123rf.com/450wm/lumyaisweet/lumyaisweet1804/lumyaisweet180400068/99746247-stock-vector-black-chrome-steel-grating-seamless-structure-chainlink-isolated-on-white-background-vector-illustra.jpg?ver=6";
        
        // clear the mosaic
        this.mosaic.clear();
		
        // paint the grass
        for (let x = 0; x < this.mosaic.width; x++) {
            for (let y = 0; y < this.mosaic.height; y++) {
                this.mosaic.setTileColor(x, y, GRASS_COLOR);
            }
        }

        // paint flowers
        if (this.islandMap.flowers) {
            for (const flower of this.islandMap.flowers) {
                this.mosaic.setTileBackgroundImage(flower.x, flower.y, FLOWER_IMG);
            }
        }
		
        // paint nets
        if (this.islandMap.nets) {
            for (const net of this.islandMap.nets) {
                this.mosaic.setTileBackgroundImage(net.x, net.y, NET_IMG);
            }
        }

        // paint water
        if (this.islandMap.water) {
            for (const tile of this.islandMap.water) {
                this.mosaic.setTileColor(tile.x, tile.y, WATER_COLOR);
            }
        }
		
        // paint the player
        this.paintPlayer();
    }
}
const NORTH = 360;
const SOUTH = 180;
const EAST = 90;
const WEST = 270;

class Jeroo {
    constructor(x, y) {
        // create Jeroo if in bounds
        if (this.isInBounds(x, y)) {
            this._x = x;
            this._y = y;
            this._direction = 90;
            this._pouchFlowers = 0;

            Jeroo.prototype.instances.push(this);

            // show the map
            Jeroo.prototype.paintMap();
        }
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    
    get direction() {
        return this._direction;
    }

    get pouchFlowers() {
        return this._pouchFlowers;
    }

    set pouchFlowers(x) {
        this._pouchFlowers += x;
    }
    
    /**
    * Check if a coordinate is within the boundary of the map.
    * @param {Number} x 
    * @param {Number} y 
    * @returns {Boolean} inBounds
    */
    isInBounds(x, y) {
        return x >= 0 && x <= Jeroo.prototype.mosaic.width - 1 
                && y >= 0 && y <= Jeroo.prototype.mosaic.height - 1;
    }

    canMoveTo(x, y) {
        // check if there is already a Jeroo at that position
        let jeroo = [];
        jeroo = Jeroo.prototype.instances.filter(obj => obj.x == x && obj.y == y);

        // check if there is a net in the way
        let nets = [];
        if (Jeroo.prototype.islandMap.nets) {
            nets = Jeroo.prototype.islandMap.nets.filter(obj => obj.x == x && obj.y == y);
        }

        // check if there is water in the way
        let water = [];
        if (Jeroo.prototype.islandMap.water) {
            water = Jeroo.prototype.islandMap.water.filter(obj => obj.x == x && obj.y == y);
        }

        return this.isInBounds(x, y) && !jeroo.length && !nets.length && !water.length;
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

        // if numHops is zero, stop recursing
        if (args.length && args[0] === 0) return;
		
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
		
        // // if numHops was passed as argument
        // if (args.length) {
        //     delta *= args[0];
        // }
        // // if no hops defined, implicitly hop 1
        // else {
        //     delta *= 1;
        // }

        // if moving along y axis, change y by delta
        if (axis) {
            if (this.canMoveTo(this._x, this._y + delta)) {
                // clear any rotations on this tile before moving
                Jeroo.prototype.mosaic.tiles[this._x][this._y].transform = "";
				
                this._y += delta;
            }
        }
        // if moving along x axis, change x by delta
        else {
            if (this.canMoveTo(this._x + delta, this._y)) {
                // clear any rotations on this tile before moving
                Jeroo.prototype.mosaic.tiles[this._x][this._y].transform = "";
				
                this._x += delta;
            }
        }
		
        Jeroo.prototype.paintMap();

        // recurse if have more hops to go
        if (args.length)
            this.hop(args[0] - 1);
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
		
        Jeroo.prototype.paintMap();
    }

    /**
    * Take a flower from the map and put it into the Jeroo's pouch.
    */
    pick() {
        // if there are flowers on the map to pick
        if (Jeroo.prototype.islandMap.flowers) {
            // find the flower from map at Jeroo current position
            const flower = Jeroo.prototype.islandMap.flowers.filter(obj => obj.x == this._x && obj.y == this._y);

            // if flower is at position, remove it from the island map object
            if (flower.length) {
                Jeroo.prototype.islandMap.flowers.splice(this.islandMap.flowers.indexOf(flower), 1);

                // keep the flower in your pouch
                this._pouchFlowers++;
            }
        }

        // update the map
        Jeroo.prototype.paintMap();
    }

    /**
    * Plant a flower from the Jeroo's pouch onto the map.
    */
    plant() {
        if (this._pouchFlowers > 0) {
            if (Jeroo.prototype.islandMap.flowers) {
                Jeroo.prototype.islandMap.flowers.push({ x: this._x, y: this._y });
            }

            // remove the flower from your pouch
            this._pouchFlowers--;
        }
        
        // update the map
        Jeroo.prototype.paintMap();
    }

    /**
    * Toss a flower from the Jeroo's pouch in order to disarm a net.
    */
    toss() {
        if (this._pouchFlowers > 0) {
            // if there are nets to search through
            if (Jeroo.prototype.islandMap.nets) {
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
                    net = Jeroo.prototype.islandMap.nets.filter(obj => obj.x == this._x && obj.y == this._y + delta);
                }
                // if moving along x axis, change x by delta
                else {
                    net = Jeroo.prototype.islandMap.nets.filter(obj => obj.x == this._x + delta && obj.y == this._y);
                }

                // if net in tossing direction
                if (net.length) {
                    // remove the net from map
                    Jeroo.prototype.islandMap.nets.splice(Jeroo.prototype.islandMap.nets.indexOf(net), 1);
                }
            }

            // remove the flower from your pouch
            this._pouchFlowers--;
        }
        
        // update the map
        Jeroo.prototype.paintMap();
    }

    give() {
        if (this._pouchFlowers > 0) {
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
            
            // if checking along y axis, change y by delta
            let jeroo = [];
            if (axis) {
                jeroo = Jeroo.prototype.instances.filter(obj => obj.x == this._x && obj.y == this._y + delta);
            }
            // if checking along x axis, change x by delta
            else {
                jeroo = Jeroo.prototype.instances.filter(obj => obj.x == this._x + delta && obj.y == this._y);
            }

            // if net in tossing direction
            if (jeroo.length) {
                jeroo[0].pouchFlowers++;

                this._pouchFlowers--;
            }
        }
    }

    /**
    * Loads a map file with the name provided from the maps folder.
    * @param {String} name 
    */
    static async loadMap(name) {
        // GET request the map file
        const response = await fetch("data/maps/" + name + ".json");
        const data = await response.text();

        // parse the map file and store as JSON object
        Jeroo.prototype.islandMap = JSON.parse(data);

        // update the map
        Jeroo.prototype.paintMap();
    }
}

Jeroo.prototype.islandMap = {};
Jeroo.prototype.instances = [];
Jeroo.prototype.mosaic = new Mosaic(15, 15);
Jeroo.prototype.paintMap = function() {
    const GRASS_COLOR = "#19A23A";
    const WATER_COLOR = "blue";
        
    const FLOWER_IMG = "https://www.pinclipart.com/picdir/middle/107-1079582_yellow-flower-clipart-clip-art-yellow-flower-png.png";
    const NET_IMG = "https://us.123rf.com/450wm/lumyaisweet/lumyaisweet1804/lumyaisweet180400068/99746247-stock-vector-black-chrome-steel-grating-seamless-structure-chainlink-isolated-on-white-background-vector-illustra.jpg?ver=6";
        
    // clear the mosaic
    Jeroo.prototype.mosaic.clear();
		
    // paint the grass
    for (let x = 0; x < Jeroo.prototype.mosaic.width; x++) {
        for (let y = 0; y < Jeroo.prototype.mosaic.height; y++) {
            Jeroo.prototype.mosaic.setTileColor(x, y, GRASS_COLOR);
        }
    }

    // paint flowers
    if (Jeroo.prototype.islandMap.flowers) {
        for (const flower of Jeroo.prototype.islandMap.flowers) {
            Jeroo.prototype.mosaic.setTileBackgroundImage(flower.x, flower.y, FLOWER_IMG);
        }
    }
		
    // paint nets
    if (Jeroo.prototype.islandMap.nets) {
        for (const net of Jeroo.prototype.islandMap.nets) {
            Jeroo.prototype.mosaic.setTileBackgroundImage(net.x, net.y, NET_IMG);
        }
    }

    // paint water
    if (Jeroo.prototype.islandMap.water) {
        for (const tile of Jeroo.prototype.islandMap.water) {
            Jeroo.prototype.mosaic.setTileColor(tile.x, tile.y, WATER_COLOR);
        }
    }

    // paint the Jeroos
    if (Jeroo.prototype.instances) {
        for (const jeroo of Jeroo.prototype.instances) {
            const PLAYER_IMG_URL = "https://clipartart.com/images/arrow-clipart-going-up-4.png";
		
            // set the tile image to be the Jeroo sprite
            Jeroo.prototype.mosaic.tiles[jeroo.x][jeroo.y].backgroundImage = PLAYER_IMG_URL;
		
            // rotate the Jeroo sprite in the direction necessary
            let heading = jeroo.direction;
            Jeroo.prototype.mosaic.tiles[jeroo.x][jeroo.y].transform = "rotate(" + heading + "deg)";
        }
    }
}
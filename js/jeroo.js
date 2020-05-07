const NORTH = 360;
const SOUTH = 180;
const EAST = 90;
const WEST = 270;

class Jeroo {
    /**
     * Create a Jeroo at position x, y facing east.
     * @param {...any} args
     */
    constructor(...args) {
        let x, y, direction, pouchFlowers;

        // if Jeroo needs to create shared Mosaic
        if (!Jeroo.prototype.mosaic) {
            Jeroo.prototype.mosaic = new Mosaic(15, 15);
        }

        if (args.length === 0) {
            // instantiate Jeroo object properties
            x = 0;
            y = 0;
            direction = EAST;
            pouchFlowers = 0;
        }
        else if (args.length == 1) {
            const numFlowers = args[0];

            // if number of flowers is not a number, invalid
            if (isNaN(numFlowers)) return;

            x = 0;
            y = 0;
            direction = EAST;
            pouchFlowers = numFlowers;
        }
        // if given x, y
        else if (args.length == 2 || args.length == 3) {
            const potentialX = args[0];
            const potentialY = args[1];

            // if x or y is not a number, invalid
            if (isNaN(potentialX) || isNaN(potentialY)) return;

            // create Jeroo if in bounds
            if (this.isInBounds(potentialX, potentialY)) {
                // instantiate Jeroo object properties
                x = potentialX;
                y = potentialY;
                direction = EAST;
                pouchFlowers = 0;

                if (args.length == 3) {
                    // if is string, is cardinalDirection
                    if (isNaN(args[2])) {
                        let cardinalDirection = args[2];

                        if (cardinalDirection.toLowerCase() == "north")
                            direction = NORTH;
                        else if (cardinalDirection.toLowerCase() == "south")
                            direction = SOUTH;
                        else if (cardinalDirection.toLowerCase() == "east")
                            direction = EAST;
                        else if (cardinalDirection.toLowerCase() == "west")
                            direction = WEST;
                        else
                            return;

                        pouchFlowers = 0;
                    }
                    // if is number, is numFlowers
                    else {
                        direction = EAST;
                        pouchFlowers = args[2];
                    }
                }
            }
            // invalid coordinates, do not create Jeroo
            else {
                return;
            }
        }
        else if (args.length == 4) {
            const potentialX = args[0];
            const potentialY = args[1];

            // if x or y is not a number, invalid
            if (isNaN(potentialX) || isNaN(potentialY)) return;

            // create Jeroo if in bounds
            if (this.isInBounds(potentialX, potentialY)) {
                // instantiate Jeroo object properties
                x = potentialX;
                y = potentialY;
                direction = EAST;
                pouchFlowers = 0;
                
                // if the third argument is a number, invalid
                if (!isNaN(args[2])) return;

                let cardinalDirection = args[2];

                if (cardinalDirection.toLowerCase() == "north")
                    direction = NORTH;
                else if (cardinalDirection.toLowerCase() == "south")
                    direction = SOUTH;
                else if (cardinalDirection.toLowerCase() == "east")
                    direction = EAST;
                else if (cardinalDirection.toLowerCase() == "west")
                    direction = WEST;
                else
                    return;

                // if the fourth argument is a string, invalid
                if (isNaN(args[3])) return;

                pouchFlowers = args[3];
            }
            else {
                return;
            }
        }
        else {
            return;
        }

        // find if there is another Jeroo at that position
        if (Jeroo.prototype.instances.find(jeroo => jeroo.x == x && jeroo.y == y)) {
            throw new Error("You cannot have two Jeroos at the same position.");
        }
        
        // set Jeroo properties
        this._x = x;
        this._y = y;
        this._direction = direction;
        this._pouchFlowers = pouchFlowers;

        // keep track of extant Jeroo instances
        Jeroo.prototype.instances.push(this);

        // show the map
        Jeroo.prototype.paintMap();
    }

    /**
     * The getter for x coordinate.
     */
    get x() {
        return this._x;
    }

    /**
     * The getter for y coordinate.
     */
    get y() {
        return this._y;
    }
    
    /**
     * The getter for direction Jeroo is facing.
     */
    get direction() {
        return this._direction;
    }

    /**
     * The getter for the number of flowers in the Jeroo's pouch.
     */
    get pouchFlowers() {
        return this._pouchFlowers;
    }

    /**
     * The setter for the number of flowers in the Jeroo's pouch.
     */
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

    /**
     * Check if the Jeroo can move to a given coordinate, or if it is blocked by an obstacle.
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean} canMoveTo
     */
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

        // if moving along y axis, change y by delta
        if (axis) {
            if (this.canMoveTo(this._x, this._y + delta)) {
                // clear any rotations on this tile before moving
                Jeroo.prototype.mosaic.tiles[this._x][this._y].transform = "";
				
                this._y += delta;
            }
            else {
                return;
            }
        }
        // if moving along x axis, change x by delta
        else {
            if (this.canMoveTo(this._x + delta, this._y)) {
                // clear any rotations on this tile before moving
                Jeroo.prototype.mosaic.tiles[this._x][this._y].transform = "";
				
                this._x += delta;
            }
            else {
                return;
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
        // if Jeroo has flower in pouch to toss
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

    /**
     * Give another Jeroo a flower from your pouch.
     */
    give() {
        // if Jeroo has flowers in pouch to give
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
     * Checks whether this Jeroo has flowers or not.
     */
    hasFlowers() {
        return this._pouchFlowers > 0;
    }

    /**
     * Check if there are no nets, flowers, water, or Jeroos in the relative direction of the Jeroo.
     * @param {String} relativeDirection 
     */
    isClear(relativeDirection) {
        let direction;

        if (relativeDirection.toLowerCase() == "left") {
            direction = this._direction - 90;
        }
        else if (relativeDirection.toLowerCase() == "right") {
            direction = this._direction + 90;
        }
        else if (relativeDirection.toLowerCase() == "ahead") {
            direction = this._direction;
        }

        // normalize values to keep in 90-360 range
        if (direction <= 0)
            direction += 360;
        else if (direction > 360)
            direction -= 360;

        // x or y axis and in what direction
        let axis = 0;
        let delta = 0;

        if (direction == EAST) {
            axis = 0;
            delta = 1;
        }
        else if (direction == WEST) {
            axis = 0;
            delta = -1;
        }
        else if (direction == NORTH) {
            axis = 1;
            delta = 1;
        }
        else if (direction == SOUTH) {
            axis = 1;
            delta = -1;
        }

        if (axis) {
            // find the flower from map at Jeroo relative position
            const flower = Jeroo.prototype.islandMap.flowers.filter(obj => obj.x == this._x && obj.y == this._y + delta);

            return this.canMoveTo(this._x, this._y + delta) && flower.length === 0;
        }
        // if checking along x axis, change x by delta
        else {
            // find the flower from map at Jeroo relative position
            const flower = Jeroo.prototype.islandMap.flowers.filter(obj => obj.x == this._x + delta && obj.y == this._y);

            return this.canMoveTo(this._x + delta, this._y) && flower.length === 0;
        }
    }

    /**
     * Check if the Jeroo is facing the cardinal direction that is passed in.
     * @param {String} direction 
     */
    isFacing(direction) {
        if (direction.toLowerCase() == "north")
            return this._direction == NORTH;
        else if (direction.toLowerCase() == "south")
            return this._direction == SOUTH;
        else if (direction.toLowerCase() == "east")
            return this._direction == EAST;
        else if (direction.toLowerCase() == "west")
            return this._direction == WEST;
    }

    /**
     * Check if the Jeroo is next to the flower in the cardinal direction that is passed in.
     * @param {String} relativeDirection 
     */
    isFlower(relativeDirection) {
        // if there are flowers on the map to pick
        if (Jeroo.prototype.islandMap.flowers) {
            if (relativeDirection.toLowerCase() == "here") {
                // find the flower from map at Jeroo current position
                const flower = Jeroo.prototype.islandMap.flowers.find(obj => obj.x == this._x && obj.y == this._y);

                if (flower) return true;
            }

            let direction;

            if (relativeDirection.toLowerCase() == "left") {
                direction = this._direction - 90;
            }
            else if (relativeDirection.toLowerCase() == "right") {
                direction = this._direction + 90;
            }
            else if (relativeDirection.toLowerCase() == "ahead") {
                direction = this._direction;
            }

            // normalize values to keep in 90-360 range
            if (direction <= 0)
                direction += 360;
            else if (direction > 360)
                direction -= 360;

            // x or y axis and in what direction
            let axis = 0;
            let delta = 0;

            if (direction == EAST) {
                axis = 0;
                delta = 1;
            }
            else if (direction == WEST) {
                axis = 0;
                delta = -1;
            }
            else if (direction == NORTH) {
                axis = 1;
                delta = 1;
            }
            else if (direction == SOUTH) {
                axis = 1;
                delta = -1;
            }

            if (axis) {
                // find the flower from map at Jeroo relative position
                const flower = Jeroo.prototype.islandMap.flowers.filter(obj => obj.x == this._x && obj.y == this._y + delta);

                return flower.length == 1;
            }
            // if checking along x axis, change x by delta
            else {
                // find the flower from map at Jeroo relative position
                const flower = Jeroo.prototype.islandMap.flowers.filter(obj => obj.x == this._x + delta && obj.y == this._y);

                return flower.length == 1;
            }
        }

        return false;
    }

    /**
     * Check if there is Jeroo in the relative direction that is passed in.
     * @param {String} relativeDirection 
     */
    isJeroo(relativeDirection) {
        let direction;

        if (relativeDirection.toLowerCase() == "left") {
            direction = this._direction - 90;
        }
        else if (relativeDirection.toLowerCase() == "right") {
            direction = this._direction + 90;
        }
        else if (relativeDirection.toLowerCase() == "ahead") {
            direction = this._direction;
        }

        // normalize values to keep in 90-360 range
        if (direction <= 0)
            direction += 360;
        else if (direction > 360)
            direction -= 360;

        // x or y axis and in what direction
        let axis = 0;
        let delta = 0;

        if (direction == EAST) {
            axis = 0;
            delta = 1;
        }
        else if (direction == WEST) {
            axis = 0;
            delta = -1;
        }
        else if (direction == NORTH) {
            axis = 1;
            delta = 1;
        }
        else if (direction == SOUTH) {
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
            return true;
        }

        return false;
    }

    /**
     * Check if there is a net in the relative direction that is passed in.
     * @param {String} relativeDirection 
     */
    isNet(relativeDirection) {
        if (!Jeroo.prototype.islandMap.nets) return;

        let direction;

        if (relativeDirection.toLowerCase() == "left") {
            direction = this._direction - 90;
        }
        else if (relativeDirection.toLowerCase() == "right") {
            direction = this._direction + 90;
        }
        else if (relativeDirection.toLowerCase() == "ahead") {
            direction = this._direction;
        }

        // normalize values to keep in 90-360 range
        if (direction <= 0)
            direction += 360;
        else if (direction > 360)
            direction -= 360;

        // x or y axis and in what direction
        let axis = 0;
        let delta = 0;

        if (direction == EAST) {
            axis = 0;
            delta = 1;
        }
        else if (direction == WEST) {
            axis = 0;
            delta = -1;
        }
        else if (direction == NORTH) {
            axis = 1;
            delta = 1;
        }
        else if (direction == SOUTH) {
            axis = 1;
            delta = -1;
        }
            
        // if checking along y axis, change y by delta
        let net = [];
        if (axis) {
            net = Jeroo.prototype.islandMap.nets.filter(obj => obj.x == this._x && obj.y == this._y + delta);
        }
        // if checking along x axis, change x by delta
        else {
            net = Jeroo.prototype.islandMap.nets.filter(obj => obj.x == this._x + delta && obj.y == this._y);
        }

        // if net in tossing direction
        if (net.length) {
            return true;
        }

        return false;
    }

    /**
     * Check if there is water in the relative direction that is passed in.
     * @param {String} relativeDirection 
     */
    isWater(relativeDirection) {
        if (!Jeroo.prototype.islandMap.water) return;

        let direction;

        if (relativeDirection.toLowerCase() == "left") {
            direction = this._direction - 90;
        }
        else if (relativeDirection.toLowerCase() == "right") {
            direction = this._direction + 90;
        }
        else if (relativeDirection.toLowerCase() == "ahead") {
            direction = this._direction;
        }

        // normalize values to keep in 90-360 range
        if (direction <= 0)
            direction += 360;
        else if (direction > 360)
            direction -= 360;

        // x or y axis and in what direction
        let axis = 0;
        let delta = 0;

        if (direction == EAST) {
            axis = 0;
            delta = 1;
        }
        else if (direction == WEST) {
            axis = 0;
            delta = -1;
        }
        else if (direction == NORTH) {
            axis = 1;
            delta = 1;
        }
        else if (direction == SOUTH) {
            axis = 1;
            delta = -1;
        }
            
        // if checking along y axis, change y by delta
        let water = [];
        if (axis) {
            water = Jeroo.prototype.islandMap.water.filter(obj => obj.x == this._x && obj.y == this._y + delta);
        }
        // if checking along x axis, change x by delta
        else {
            water = Jeroo.prototype.islandMap.water.filter(obj => obj.x == this._x + delta && obj.y == this._y);
        }

        // if net in tossing direction
        if (water.length) {
            return true;
        }

        return false;
    }

    /**
    * Loads a map file with the name provided from the maps folder.
    * @param {String} name 
    */
    static async loadMap(name) {
        // GET request the map file
        try {
            const response = await fetch("data/maps/" + name + ".json");
            const data = await response.text();

            // parse the map file and store as JSON object
            Jeroo.prototype.masterMap = JSON.parse(data);
            Jeroo.prototype.islandMap = JSON.parse(data);

            // update the map
            Jeroo.prototype.paintMap();
        }
        catch(e) {
            console.error("Map name not found.");
        }
    }
}

// create shared Jeroo class state properties and map rendering function
Jeroo.prototype.masterMap = {}; // this does not get changed by Jeroo execution only editing
Jeroo.prototype.islandMap = {};
Jeroo.prototype.instances = [];
Jeroo.prototype.mosaic;
Jeroo.prototype.islandEditorTile = "";
Jeroo.prototype.paintMap = () => {
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

Jeroo.prototype.enableIslandEditingMode = enable => {
    // if user wants to enable island editing mode
    if (enable) {
        if (!Jeroo.prototype.mosaic)
            Jeroo.prototype.mosaic = new Mosaic(15, 15);
        
        document.getElementById("island_editor").style.display = "";

        for (let x = 0; x < Jeroo.prototype.mosaic.width; x++) {
            for (let y = 0; y < Jeroo.prototype.mosaic.height; y++) {
                // on click create new item in island map
                Jeroo.prototype.mosaic.setTileOnClick(x, y, () => {
                    // get all island map obstacles and go through them
                    const obstacles = Object.values(Jeroo.prototype.masterMap);
                    obstacles.forEach(arr => {
                        // find any obstacles at same position as click
                        const obstacle = arr.find(item => item.x == x && item.y == y);

                        // if obstacle is found at same position, remove it
                        if (obstacle) {
                            arr.splice(arr.indexOf(obstacle), 1);
                        }
                    });

                    // if obstacles category array is already defined
                    if (Jeroo.prototype.masterMap[Jeroo.prototype.islandEditorTile]) {
                        Jeroo.prototype.masterMap[Jeroo.prototype.islandEditorTile].push({ "x": x, "y": y });
                    }
                    // if obstacles category array is undefined
                    else {
                        Jeroo.prototype.masterMap[Jeroo.prototype.islandEditorTile] = [{ "x": x, "y": y }];
                    }

                    Jeroo.prototype.islandMap = JSON.parse(JSON.stringify(Jeroo.prototype.masterMap));
                    
                    // update map
                    Jeroo.prototype.paintMap();
                });
            }
        }
    }
    else {
        // remove click listeners
        for (let x = 0; x < Jeroo.prototype.mosaic.width; x++) {
            for (let y = 0; y < Jeroo.prototype.mosaic.height; y++) {
                Jeroo.prototype.mosaic.setTileOnClick(x, y, () => {});
            }
        }

        // hide island editor
        document.getElementById("island_editor").style.display = "none";
    }
}

Jeroo.prototype.setIslandEditorTile = value => {
    Jeroo.prototype.islandEditorTile = value;
}
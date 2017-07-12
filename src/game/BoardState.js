import { Terain, TerainPassable, Accessible, Unstopable, Unpassable } from './constants';

class BoardState {
    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.terain = [];
        for (let i = width * height - 1; i >= 0; i--) {
            this.terain[i] = Terain.Sea;
        }
        this.permanents = {};
        this.passage = {};
    }
    coord2index (xy) {
        const [x, y] = xy;
        return y * this.width + x;
    }
    index2coord (index) {
        const y = Math.floor(index / this.width);
        const x = index - y * this.width;
        return [x, y];
    }
    adjacent (xy) {
        const [x, y] = xy;
        let tiles;
        if (x & 1) {
            tiles = [[x, y - 1], [x - 1, y], [x + 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]];
        } else {
            tiles = [[x, y + 1], [x - 1, y], [x + 1, y], [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]];
        }
        tiles = tiles.filter(([x, y]) => x >= 0 && x < this.width && y >= 0 && y < this.height);
        return tiles;
    }
    setTerain (xy, type) {
        this.terain[this.coord2index(xy)] = type;
    }
    movableTiles (xy, steps, opt) {
        const isIndex = !Array.isArray(xy);
        let tiles = [];
        if (isIndex) {
            xy = this.index2coord(xy);
        }
        const portals = [];
        this.terain.forEach((v, index) => {
            if (v === Terain.Portal) {
                portals.push(this.index2coord(index));
            }
        });
        this._movableTiles(xy, steps, opt, tiles, portals);
        tiles = tiles.map((v, index) => v === 1 ? index : -1).filter(v => v !== -1);
        if (!isIndex) {
            tiles = tiles.map(v => this.index2coord(v));
        }
        return tiles;
    }
    _movableTiles (xy, steps, opt, tiles, portals) {
        const [minSteps, maxSteps] = steps;
        if (maxSteps <= 0) {
            return;
        }
        const nextSteps = [Math.max(0, minSteps - 1), Math.max(0, maxSteps - 1)];
        const nextPortalSteps = [Math.max(1, minSteps - 2), Math.max(0, maxSteps - 1)];
        let adjs = this.adjacent(xy);
        const passage = this.passage[xy];
        if (passage) {
            adjs = adjs.concat(passage);
        }
        for (const adj of adjs) {
            const index = this.coord2index(adj);
            if (tiles[index]) {
                continue;
            }
            tiles[index] = 2;
            const terain = this.terain[index];
            if (terain === Terain.Portal && maxSteps >= 3) {
                for (const pdest of portals) {
                    this._movableTiles(pdest, nextPortalSteps, opt, tiles, portals);
                }
            } else {
                switch (TerainPassable[terain](opt)) {
                    case Accessible:
                        if (minSteps === 0) {
                            tiles[index] = 1;
                        }
                    case Unstopable:
                        this._movableTiles(adj, nextSteps, opt, tiles, portals);
                        break;
                    case Unpassable:
                        break;
                }
            }
        }
    }
}

export default BoardState;

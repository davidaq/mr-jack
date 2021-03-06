
// 可控人物类型
export const Characters = {
    lamp          : 0,
    house         : 1,
    swap          : 2,
    control       : 3,
    ship          : 4,
    block         : 5,
    park          : 6,
    portal        : 7,
};

// 地形类型
export const Terain = {
    OpenSpace     : 0,
    StreetLamp    : 1,
    House         : 2,
    Park          : 3,
    Portal        : 4,
    Sea           : 5,
    RoadBlock     : 6,
};

export const Role = {
    Jack        : 1,
    Detective   : 2,
};

// 地形可通过性
export const Unpassable = 0;      // 不可通过
export const Unstopable = 1;      // 不可停留
export const Accessible = 2;      // 可通过、停留

const passableOptAware = terain => opt => opt.passable[terain] || Unpassable;

export const TerainPassable = {
    [Terain.OpenSpace]      : opt => Accessible,
    [Terain.StreetLamp]     : opt => Unpassable,
    [Terain.House]          : passableOptAware(Terain.House),
    [Terain.Park]           : opt => Accessible,
    [Terain.Portal]         : opt => Unpassable,
    [Terain.Sea]            : opt => Unpassable,
    [Terain.RoadBlock]      : opt => Unpassable,
};


// 任务类型
export const NPC = {

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

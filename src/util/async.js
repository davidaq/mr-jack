
export const sleep = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

export const until = async (condition, interval = 0.3) => {
    while (!await condition()) {
        await sleep(interval);
    }
};

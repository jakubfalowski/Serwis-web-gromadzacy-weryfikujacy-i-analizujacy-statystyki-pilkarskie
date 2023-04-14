export function sortByTime(a, b) {
    if (a.START_TIME === b.START_TIME) {
        return (a.START_TIME < b.START_TIME) ? -1 : 1;
    }
    else {
        return (a.START_TIME > b.START_TIME) ? -1 : 1;
    }
}
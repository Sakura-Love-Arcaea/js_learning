function counter(start) {
    const a = {
        getCount: () => {
            return start;
        },
        increase: () => {
            console.log(++start);
            return a;
        },
        decrease: () => {
            console.log(--start);
            return a;
        }
    }
    return a;
}

export { counter };
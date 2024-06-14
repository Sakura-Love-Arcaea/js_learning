function flat(...parameters) {
    const result = [];
    parameters.forEach(p => {
        if (Array.isArray(p)) {
            result.push(...flat(...p));
        } else if (typeof p === 'object') {
            // Object.keys(p).forEach(key => {
            //     result.push(...flat(p[key]));
            // });
            for (const key in p) {
                result.push(key, ...flat(p[key]));
            }
        } else {
            result.push(p);
        }
    });
    return result;
}

export {flat};
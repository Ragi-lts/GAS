function isType(x) {
    return (x != x) ? "NaN" : (x === Infinity || x === -Infinity) ? "Infinity" : Object.prototype.toString.call(x).slice(8, -1);
}

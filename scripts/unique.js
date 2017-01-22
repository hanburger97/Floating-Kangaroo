function uniq(a) {
    return Array.from(new Set(a));
}
var a1 = ['ss','aa','ss','bb'];
var a2 = uniq(a1);
console.log(a2);
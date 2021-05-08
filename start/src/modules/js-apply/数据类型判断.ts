function typeOf(target: any) {
  // [object Object]
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

console.log(typeOf([]));
console.log(typeOf(null));

// date也可以判断出来，[object Date]
console.log(typeOf(new Date()));
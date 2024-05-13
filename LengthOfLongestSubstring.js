/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length <= 1) return s.length;
    let longest = 0, start = 0;
    let lastSeen = new Map();
    for (let end = 0; end < s.length; end++) {
        let char = s[end];
        if (lastSeen.has(char)) {
            seenAt = lastSeen.get(char);
            if (seenAt >= start) start = seenAt + 1;
        }
        lastSeen.set(char, end);
        sublength = end - start + 1
        if (sublength > longest)
            longest = sublength;
    }
    return longest;
};

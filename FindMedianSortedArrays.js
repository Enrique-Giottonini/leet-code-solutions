/*
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*/
var findMedianSortedArrays = function (nums1, nums2) {
    let na = nums1.length
    let nb = nums2.length
    let n = na + nb

    if (n % 2 == 0) {
        return (
            solve(nums1, nums2, 0, na - 1, 0, nb - 1, Math.floor(n / 2 - 1)) +
            solve(nums1, nums2, 0, na - 1, 0, nb - 1, Math.floor(n / 2))
        ) / 2.0
    }
    return solve(nums1, nums2, 0, na - 1, 0, nb - 1, Math.floor(n / 2))
};

function solve(A, B, startA, endA, startB, endB, k) {

    if (startA > endA) return B[k - startA];
    if (startB > endB) return A[k - startB];

    let indexA = Math.floor((startA + endA) / 2);
    let indexB = Math.floor((startB + endB) / 2);
    let valueA = A[indexA];
    let valueB = B[indexB];

    if (k > (indexA + indexB)) {
        if (valueA <= valueB) return solve(A, B, indexA + 1, endA, startB, endB, k);
        else                  return solve(A, B, startA, endA, indexB + 1, endB, k);
    }
    if (valueA <= valueB) return solve(A, B, startA, endA, startB, indexB - 1, k);
    else                  return solve(A, B, startA, indexA - 1, startB, endB, k);
};

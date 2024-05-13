class Solution {

    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int na = nums1.length;
        int nb = nums2.length;
        int n = na + nb;
        if (n % 2 == 0) {
            return (solve(nums1, nums2, 0, na - 1, 0, nb - 1, (int) Math.floor(n / 2 - 1)) +
                    solve(nums1, nums2, 0, na - 1, 0, nb - 1, (int) Math.floor(n / 2))) / 2.0;
        }
        return solve(nums1, nums2, 0, na - 1, 0, nb - 1, (int) Math.floor(n / 2));
    }

    private int solve(int[] A, int[] B, int startA, int endA, int startB, int endB, int k) {
        if (startA > endA)
            return B[k - startA];
        if (startB > endB)
            return A[k - startB];

        int indexA = (int) Math.floor((startA + endA) / 2);
        int indexB = (int) Math.floor((startB + endB) / 2);
        int valueA = A[indexA];
        int valueB = B[indexB];

        if (k > (indexA + indexB)) {
            if (valueA <= valueB)
                return solve(A, B, indexA + 1, endA, startB, endB, k);
            else
                return solve(A, B, startA, endA, indexB + 1, endB, k);
        }
        if (valueA <= valueB)
            return solve(A, B, startA, endA, startB, indexB - 1, k);
        else
            return solve(A, B, startA, indexA - 1, startB, endB, k);
    }
}

class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s.length() <= 1) return s.length();
        int longest = 0, start = 0;
        int[] lastSeen = new int[128]; Arrays.fill(lastSeen, -1);
        for (int end = 0; end < s.length(); end++) {
            char c = s.charAt(end);
            int idx = (int) c;
            if (lastSeen[idx] != -1) {
                int seenAt = lastSeen[idx];
                if (seenAt >= start) 
                    start = seenAt + 1;
            }
            lastSeen[idx] = end;
            int sublength = end - start + 1;
            if (sublength > longest)
                longest = sublength;
        }
        return longest;
    }
}

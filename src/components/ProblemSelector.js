import React, { useState } from "react";
import { SqlProblems } from "../data/SqlProblems";

const languages = ["Java", "Python", "JavaScript", "C++", "SQL"];

const problemsByDifficulty = {
  beginner: [
    "Sum of Two Numbers",
    "Factorial of a Number (Recursion)",
    "Reverse a String",
    "Find Maximum in an Array",
    "Fibonacci Sequence",
  ],
  easy: [
    "Two Sum",
    "Palindrome Number",
    "Roman to Integer",
    "Valid Parentheses",
    "Merge Two Sorted Lists",
    "Climbing Stairs",
    "Search Insert Position",
    "Maximum Subarray",
    "Plus One",
    "Sqrt(x)",
    "Best Time to Buy and Sell Stock",
    "Symmetric Tree",
    "Path Sum",
    "Single Number",
    "Linked List Cycle",
    "Remove Duplicates from Sorted Array",
    "Implement strStr()",
    "Divide Two Integers",
    "Valid Palindrome",
    "Merge Sorted Array",
    "Convert Sorted Array to BST",
    "Pascal's Triangle II",
    "Contains Duplicate",
    "Reverse Linked List",
    "Intersection of Two Linked Lists",
  ],
  medium: [
    "3Sum",
    "Add Two Numbers",
    "Array and Strings",
    "Backtracking",
    "Binary Tree Inorder Traversal",
    "Binary Tree Level Order Traversal",
    "Binary Tree Right Side View",
    "Binary Tree Zigzag Level Order Traversal",
    "Bitwise AND of Numbers Range",
    "Clone Graph",
    "Coin Change",
    "Combination Sum",
    "Construct Binary Tree from Preorder and Inorder Traversal",
    "Container With Most Water",
    "Count Primes",
    "Count and Say",
    "Course Schedule",
    "Decode Ways",
    "Design",
    "Design Tic-Tac-Toe",
    "Divide Two Integers",
    "Dynamic Programming",
    "Evaluate Reverse Polish Notation",
    "Excel Sheet Column Number",
    "Factorial Trailing Zeroes",
    "Find Minimum in Rotated Sorted Array",
    "Find Peak Element",
    "Find the Celebrity",
    "Flatten 2D Vector",
    "Flatten Binary Tree to Linked List",
    "Fraction to Recurring Decimal",
    "Generate Parentheses",
    "Group Anagrams",
    "Happy Number",
    "Increasing Triplet Subsequence",
    "Inorder Successor in BST",
    "Insert Delete GetRandom O(1)",
    "Intersection of Two Linked Lists",
    "Jump Game",
    "Kth Largest Element in an Array",
    "Kth Smallest Element in a BST",
    "Largest Number",
    "Letter Combinations of a Phone Number",
    "Linked List",
    "Longest Common Prefix",
    "Longest Increasing Subsequence",
    "Longest Palindromic Substring",
    "Longest Substring Without Repeating Characters",
    "Majority Element",
    "Math",
    "Maximum Product Subarray",
    "Meeting Rooms II",
    "Merge Intervals",
    "Minimum Path Sum",
    "Minimum Size Subarray Sum",
    "Missing Ranges",
    "Next Permutation",
    "Number of Islands",
    "Odd Even Linked List",
    "Others",
    "Permutations",
    "Populating Next Right Pointers in Each Node",
    "Pow(x, n)",
    "Product of Array Except Self",
    "Remove Nth Node From End of List",
    "Reverse Linked List II",
    "Reverse Words in a String",
    "Rotate Image",
    "Same Tree",
    "Search a 2D Matrix",
    "Search a 2D Matrix II",
    "Search for a Range",
    "Search in Rotated Sorted Array",
    "Serialize and Deserialize Binary Tree",
    "Set Matrix Zeroes",
    "Sort Colors",
    "Sort List",
    "Sorting and Searching",
    "Spiral Matrix",
    "Spiral Matrix II",
    "Sqrt(x)",
    "String to Integer (atoi)",
    "Subsets",
    "Sum of Two Integers",
    "Top K Frequent Elements",
    "Trapping Rain Water",
    "Trees and Graphs",
    "Unique Paths",
    "Valid Sudoku",
    "Validate Binary Search Tree",
    "Word Break",
    "Word Ladder",
    "Word Search",
  ],
  hard: [
    "Median of Two Sorted Arrays",
    "Regular Expression Matching",
    "Merge k Sorted Lists",
    "Reverse Nodes in k-Group",
    "Sudoku Solver",
    "Wildcard Matching",
    "Jump Game II",
    "N-Queens",
    "Largest Rectangle in Histogram",
    "Maximal Rectangle",
    "Interleaving String",
    "Word Ladder II",
    "Binary Tree Maximum Path Sum",
    "Best Time to Buy and Sell Stock III",
    "Longest Consecutive Sequence",
    "Word Break II",
    "Valid Number",
    "Text Justification",
    "Edit Distance",
    "Minimum Window Substring",
    "Alien Dictionary",
    "Integer to English Words",
    "Basic Calculator",
    "Sliding Window Maximum",
    "Serialize and Deserialize Binary Tree",
    "Palindrome Pairs",
    "House Robber III",
    "Russian Doll Envelopes",
    "Burst Balloons",
    "Design Twitter",
    "Expression Add Operators",
    "Count of Range Sum",
    "Rearrange String k Distance Apart",
    "Peeking Iterator",
    "Find Median from Data Stream",
    "Binary Tree Longest Consecutive Sequence",
    "Count of Smaller Numbers After Self",
  ],
};

const ProblemSelector = ({ onProblemSelect }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [language, setLanguage] = useState("Java");

  const handleGetProblem = () => {
    if (language === "SQL") {
      problems = SqlProblems[difficulty]; // Get SQL problems
    } else {
      problems = problemsByDifficulty[difficulty]; // Get coding problems
    }
    if (!problems || problems.length === 0) return;

    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    console.log(
      "🎯 Selected Problem:",
      randomProblem,
      "📝 Language:",
      language
    );
    onProblemSelect(randomProblem, language);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
      {/* 🏆 Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Get a Coding Problem
      </h2>

      {/* 🔽 Difficulty Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Choose Difficulty
        </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="beginner">Beginner</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* 💻 Language Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Choose Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* 🚀 Get Problem Button */}
      <button
        onClick={handleGetProblem}
        className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        🔍 Get Problem
      </button>
    </div>
  );
};

export default ProblemSelector;

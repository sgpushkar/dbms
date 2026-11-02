/**
 * Analysis of Algorithms (AOA) Laboratory Practicals Dataset
 * Complete academic record of all 9 Experiments
 * Includes C Source Code, Theory, Complexities, Terminal Console Outputs, and Original Lab Document Pages
 */

const EXPERIMENTS_DATA = [
  {
    id: "exp-1",
    number: "01",
    title: "Insertion Sort Algorithm",
    subtitle: "Incremental In-Place Comparison Sorting",
    category: "Sorting & Searching",
    paradigm: "Incremental / In-Place",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to implement the Insertion Sort algorithm for sorting an array of elements in ascending order.",
    theory: "Insertion sort is a simple, intuitive, and comparison-based in-place sorting algorithm. It builds the final sorted array one item at a time by repeatedly taking the next unsorted element ('key') and inserting it into its correct relative position within the already sorted subarray to its left. At step i (1 to n-1), elements in a[0..i-1] that are strictly greater than key are shifted one position to the right (a[j+1] = a[j]). When an element less than or equal to key or the array boundary is reached, the key is inserted into position a[j+1]. It is adaptive and exhibits linear time O(n) performance when the array is already sorted or nearly sorted.",
    complexities: {
      bestTime: "O(n)",
      avgTime: "O(n²)",
      worstTime: "O(n²)",
      space: "O(1) (In-place)",
      recurrence: "T(n) = T(n-1) + O(n)"
    },
    learningOutcomes: [
      "Understand the mechanics of shift-based in-place sorting without extra memory.",
      "Analyze best-case linear O(n) efficiency for presorted inputs.",
      "Verify algorithmic stability: duplicate keys preserve their original relative order."
    ],
    fullPages: [
      { page: 1, title: "Exp 1 - C Program Source Code", image: "assets/images/aoa/pages/page_1.png" },
      { page: 2, title: "Exp 1 - Execution Terminal Output", image: "assets/images/aoa/pages/page_2.png" }
    ],
    items: [
      {
        id: "exp1-item1",
        title: "Insertion Sort Implementation in C",
        type: "C Program",
        description: "Prompts the user for array length n, inputs unsorted integers, executes incremental shift-based insertion sort, and outputs the sorted array in ascending order.",
        code: `#include <stdio.h>
#include <conio.h>
void main()
{
    int a[50], n, i, j, key;
    clrscr();
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements:\\n", n);
    for(i = 0; i < n; i++)
    {
        scanf("%d", &a[i]);
    }
    /* Insertion Sort */
    for(i = 1; i < n; i++)
    {
        key = a[i];
        j = i - 1;
        while(j >= 0 && a[j] > key)
        {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
    printf("\\nSorted array in ascending order:\\n");
    for(i = 0; i < n; i++)
    {
        printf("%d ", a[i]);
    }
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp1_output_insertion_sort.png",
        imageCaption: "Turbo C Console - Insertion Sort execution for 6 elements [9, 3, 6, 1, 7, 2]",
        status: "Execution Successful (Exit Code 0)",
        terminalOutput: `Enter the number of elements: 6
Enter 6 elements:
9
3
6
1
7
2

Sorted array in ascending order:
1 2 3 6 7 9 `
      }
    ]
  },
  {
    id: "exp-2",
    number: "02",
    title: "Binary Search Algorithm",
    subtitle: "Logarithmic Search on Monotonically Sorted Data",
    category: "Sorting & Searching",
    paradigm: "Decrease and Conquer / Divide & Conquer",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to implement the Binary Search algorithm for searching a target element in a sorted array.",
    theory: "Binary Search is an exceptionally efficient search algorithm designed for monotonically ordered arrays. It operates on the decrease-and-conquer principle: comparing the target key against the middle element a[mid] where mid = (low + high) / 2. If a[mid] == key, the element is located at position mid + 1. If key < a[mid], the target can only reside in the left sub-array, so high is updated to mid - 1. Conversely, if key > a[mid], low is updated to mid + 1. Each iteration discards half of the remaining search space, yielding O(log n) worst-case time complexity.",
    complexities: {
      bestTime: "O(1) (Found at mid)",
      avgTime: "O(log n)",
      worstTime: "O(log n)",
      space: "O(1) (Iterative)",
      recurrence: "T(n) = T(n/2) + O(1)"
    },
    learningOutcomes: [
      "Recognize sorted order as an essential prerequisite for binary search.",
      "Differentiate logarithmic O(log n) efficiency from linear O(n) scan.",
      "Implement iterative boundary adjustments (low, high, mid) without off-by-one errors."
    ],
    fullPages: [
      { page: 3, title: "Exp 2 - C Program Source Code (Part 1)", image: "assets/images/aoa/pages/page_3.png" },
      { page: 4, title: "Exp 2 - C Code (Part 2) & Execution Output", image: "assets/images/aoa/pages/page_4.png" }
    ],
    items: [
      {
        id: "exp2-item1",
        title: "Binary Search Implementation in C",
        type: "C Program",
        description: "Reads n sorted integers, accepts the search key, performs iterative binary search using low, high, and mid pointers, and reports the 1-based index or a not-found message.",
        code: `#include <stdio.h>
#include <conio.h>
void main()
{
    int a[50], n, i, key;
    int low, high, mid, found = 0;
    clrscr();
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements in sorted order:\\n", n);
    for(i = 0; i < n; i++)
    {
        scanf("%d", &a[i]);
    }
    printf("Enter the element to search: ");
    scanf("%d", &key);
    low = 0;
    high = n - 1;
    while(low <= high)
    {
        mid = (low + high) / 2;
        if(a[mid] == key)
        {
            found = 1;
            break;
        }
        else if(key < a[mid])
        {
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
    }
    if(found)
        printf("\\nElement found at position %d", mid + 1);
    else
        printf("\\nElement not found.");
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp2_output_binary_search.png",
        imageCaption: "Turbo C Console - Binary Search finding key 50 at position 4 in array [10, 20, 30, 50, 60, 80]",
        status: "Element Found (Position 4)",
        terminalOutput: `Enter the number of elements: 6
Enter 6 elements in sorted order:
10
20
30
50
60
80
Enter the element to search: 50

Element found at position 4`
      }
    ]
  },
  {
    id: "exp-3",
    number: "03",
    title: "Merge Sort Algorithm",
    subtitle: "Divide, Conquer, and Combine Recursive Sorting",
    category: "Divide & Conquer",
    paradigm: "Divide and Conquer",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to implement Merge Sort using the Divide and Conquer strategy.",
    theory: "Merge Sort is a classic recursive divide-and-conquer algorithm. It systematically divides the array of n elements into two halves of size n/2 around mid = (low + high) / 2. Each sub-array is sorted recursively using mergeSort(). Once the base case of single-element arrays (low >= high) is reached, the combine step merge() merges the two adjacent sorted sub-arrays a[low..mid] and a[mid+1..high] into an auxiliary buffer temp[50] in non-decreasing order using a two-pointer merge procedure, and then copies them back into a[low..high]. Because the division is always balanced, Merge Sort guarantees strict O(n log n) running time across best, average, and worst cases.",
    complexities: {
      bestTime: "O(n log n)",
      avgTime: "O(n log n)",
      worstTime: "O(n log n)",
      space: "O(n) (Auxiliary buffer temp[])",
      recurrence: "T(n) = 2T(n/2) + Θ(n)"
    },
    learningOutcomes: [
      "Master recursive decomposition and post-order combine processing.",
      "Understand why Merge Sort guarantees O(n log n) predictability regardless of initial data order.",
      "Analyze the trade-off of auxiliary O(n) memory allocation."
    ],
    fullPages: [
      { page: 5, title: "Exp 3 - Merge Routine & MergeSort Prototype", image: "assets/images/aoa/pages/page_5.png" },
      { page: 6, title: "Exp 3 - Main Driver & Execution Terminal Output", image: "assets/images/aoa/pages/page_6.png" }
    ],
    items: [
      {
        id: "exp3-item1",
        title: "Merge Sort Implementation in C",
        type: "C Program",
        description: "Recursive divide-and-conquer implementation: splits array at mid, sorts subarrays recursively, and combines them using two-way merge into temp buffer.",
        code: `#include <stdio.h>
#include <conio.h>
void merge(int a[ ], int low, int mid, int high)
{
    int temp[50];
    int i, j, k;
    i = low;
    j = mid + 1;
    k = low;
    while(i <= mid && j <= high)
    {
        if(a[i] < a[j])
            temp[k++] = a[i++];
        else
            temp[k++] = a[j++];
    }
    while(i <= mid)
        temp[k++] = a[i++];
    while(j <= high)
        temp[k++] = a[j++];
    for(i = low; i <= high; i++)
        a[i] = temp[i];
}
void mergeSort(int a[], int low, int high)
{
    int mid;
    if(low < high)
    {
        mid = (low + high) / 2;
        mergeSort(a, low, mid);
        mergeSort(a, mid + 1, high);
        merge(a, low, mid, high);
    }
}
void main()
{
    int a[50], n, i;
    clrscr();
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements:\\n", n);
    for(i = 0; i < n; i++)
    {
        scanf("%d", &a[i]);
    }
    mergeSort(a, 0, n - 1);
    printf("\\nSorted array using Merge Sort:\\n");
    for(i = 0; i < n; i++)
    {
        printf("%d ", a[i]);
    }
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp3_output_merge_sort.png",
        imageCaption: "Turbo C Console - Merge Sort result for 6 elements [13, 24, 56, 76, 45, 56]",
        status: "Sorted with Merge Sort (O(n log n))",
        terminalOutput: `Enter the number of elements: 6
Enter 6 elements:
13
24
56
76
45
56

Sorted array using Merge Sort:
13 24 45 56 56 76 `
      }
    ]
  },
  {
    id: "exp-4",
    number: "04",
    title: "Quick Sort Algorithm",
    subtitle: "Divide and Conquer Partition-Exchange In-Place Sorting",
    category: "Divide & Conquer",
    paradigm: "Divide and Conquer",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to implement Quick Sort using the Partitioning technique.",
    theory: "Quick Sort is a highly practical divide-and-conquer sorting algorithm based on partitioning. An element is designated as the pivot (here, the leftmost element a[low]). The algorithm partitions the array by advancing an index i from the left until an element strictly greater than the pivot is found, and decreasing an index j from the right until an element less than or equal to the pivot is found. As long as i < j, a[i] and a[j] are swapped. When i >= j, the pointers cross; the pivot a[low] is placed in its permanent position by swapping with a[j]. Quick Sort is then called recursively on sub-arrays quicksort(a, low, j - 1) and quicksort(a, j + 1, high). Its average-case time is O(n log n) with minimal memory overhead.",
    complexities: {
      bestTime: "O(n log n)",
      avgTime: "O(n log n)",
      worstTime: "O(n²) (Unbalanced partitions)",
      space: "O(log n) (Call stack)",
      recurrence: "T(n) = 2T(n/2) + Θ(n) [Best], T(n) = T(n-1) + Θ(n) [Worst]"
    },
    learningOutcomes: [
      "Understand two-pointer partitioning and pivot placement mechanics.",
      "Compare average-case O(n log n) cache efficiency with Merge Sort.",
      "Analyze worst-case degradation when partitions are highly skewed."
    ],
    fullPages: [
      { page: 7, title: "Exp 4 - Partition & QuickSort Function", image: "assets/images/aoa/pages/page_7.png" },
      { page: 8, title: "Exp 4 - Driver Main & Execution Output", image: "assets/images/aoa/pages/page_8.png" }
    ],
    items: [
      {
        id: "exp4-item1",
        title: "Quick Sort Implementation in C",
        type: "C Program",
        description: "Recursive partition-exchange sort choosing a[low] as pivot, using two-pointer scanning to segment elements, and recursing on both partitions.",
        code: `#include <stdio.h>
#include <conio.h>
void quicksort(int a[], int low, int high)
{
    int i, j, pivot, temp;
    if(low < high)
    {
        pivot = a[low];
        i = low + 1;
        j = high;
        while(i <= j)
        {
            while(i <= high && a[i] <= pivot)
                i++;
            while(a[j] > pivot)
                j--;
            if(i < j)
            {
                temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
        a[low] = a[j];
        a[j] = pivot;
        quicksort(a, low, j - 1);
        quicksort(a, j + 1, high);
    }
}
void main()
{
    int a[50], n, i;
    clrscr();
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("Enter %d elements:\\n", n);
    for(i = 0; i < n; i++)
    {
        scanf("%d", &a[i]);
    }
    quicksort(a, 0, n - 1);
    printf("\\nSorted array using Quick Sort:\\n");
    for(i = 0; i < n; i++)
    {
        printf("%d ", a[i]);
    }
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp4_output_quick_sort.png",
        imageCaption: "Turbo C Console - Quick Sort output on 6 elements [23, 443, 12, 4, 56, 78]",
        status: "Sorted with Quick Sort (O(n log n) average)",
        terminalOutput: `Enter the number of elements: 6
Enter 6 elements:
23
443
12
4
56
78

Sorted array using Quick Sort:
4 12 23 56 78 443 `
      }
    ]
  },
  {
    id: "exp-5",
    number: "05",
    title: "Fractional Knapsack Problem",
    subtitle: "Profit-to-Weight Ratio Maximization via Greedy Method",
    category: "Greedy Method",
    paradigm: "Greedy Strategy",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to solve the Fractional Knapsack problem using the Greedy approach to maximize total profit.",
    theory: "In the Fractional Knapsack problem, an agent has a container with maximum weight capacity W and n items, each having profit p[i] and weight w[i]. Unlike the 0/1 knapsack where items are indivisible, fractional knapsack allows taking arbitrary fractions x[i] (0 <= x[i] <= 1) of any item. The greedy choice criterion dictates sorting items in descending order of profit-to-weight ratio (ratio[i] = p[i] / w[i]). The algorithm greedily packs whole items as long as remaining capacity >= w[i]. When remaining capacity is less than the next item's weight, it takes exactly the fraction (capacity / w[i]), adding proportional profit, completely filling the knapsack to yield an optimal solution.",
    complexities: {
      bestTime: "O(n log n) with Quicksort / O(n²) with Bubble sort",
      avgTime: "O(n log n)",
      worstTime: "O(n²)",
      space: "O(n) (Item struct array)",
      recurrence: "Greedy Choice Optimization"
    },
    learningOutcomes: [
      "Understand greedy choice property and optimal substructure in combinatorial optimization.",
      "Implement struct data types in C to bundle multiple properties (weight, profit, ratio).",
      "Contrast Fractional Knapsack (greedy solvable) with 0/1 Knapsack (requires dynamic programming)."
    ],
    fullPages: [
      { page: 12, title: "Exp 5 - Knapsack Struct & Ratio Sorting", image: "assets/images/aoa/pages/page_12.png" },
      { page: 13, title: "Exp 5 - Greedy Selection Logic & Main Termination", image: "assets/images/aoa/pages/page_13.png" },
      { page: 14, title: "Exp 5 - Execution Output & Profit Calculation", image: "assets/images/aoa/pages/page_14.png" }
    ],
    items: [
      {
        id: "exp5-item1",
        title: "Fractional Knapsack Implementation in C",
        type: "C Program",
        description: "Uses struct Item to store weight, profit, and ratio. Sorts items in descending order of ratio, greedily selects full or fractional items, and calculates maximum profit.",
        code: `#include <stdio.h>
#include <conio.h>
struct Item
{
    int weight;
    int profit;
    float ratio;
};
void main()
{
    struct Item item[10], temp;
    int i, j, n, capacity;
    float totalProfit = 0.0;
    clrscr();
    printf("Enter number of items: ");
    scanf("%d", &n);
    for(i = 0; i < n; i++)
    {
        printf("\\nEnter Profit and Weight of item %d: ", i + 1);
        scanf("%d%d", &item[i].profit, &item[i].weight);
        item[i].ratio = (float)item[i].profit / item[i].weight;
    }
    printf("\\nEnter Knapsack Capacity: ");
    scanf("%d", &capacity);
    /* Sort items by Profit/Weight ratio in descending order */
    for(i = 0; i < n - 1; i++)
    {
        for(j = i + 1; j < n; j++)
        {
            if(item[i].ratio < item[j].ratio)
            {
                temp = item[i];
                item[i] = item[j];
                item[j] = temp;
            }
        }
    }
    printf("\\nSelected Items:\\n");
    for(i = 0; i < n; i++)
    {
        if(capacity >= item[i].weight)
        {
            printf("Take Item %d completely\\n", i + 1);
            capacity = capacity - item[i].weight;
            totalProfit = totalProfit + item[i].profit;
        }
        else
        {
            printf("Take %.2f fraction of Item %d\\n",
                (float)capacity / item[i].weight, i + 1);
            totalProfit = totalProfit +
                item[i].profit *
                ((float)capacity / item[i].weight);
            break;
        }
    }
    printf("\\nMaximum Profit = %.2f", totalProfit);
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp5_output_fractional_knapsack.png",
        imageCaption: "Turbo C Console - Fractional Knapsack (Capacity: 60, Items: 3, Max Profit: 36.67)",
        status: "Optimal Solution Found (Profit: 36.67)",
        terminalOutput: `Enter number of items: 3

Enter Profit and Weight of item 1: 20 30

Enter Profit and Weight of item 2: 10 100

Enter Profit and Weight of item 3: 50 90

Enter Knapsack Capacity: 60

Selected Items:
Take Item 1 completely
Take 0.33 fraction of Item 2

Maximum Profit = 36.67`
      }
    ]
  },
  {
    id: "exp-6",
    number: "06",
    title: "Kruskal's Algorithm for Minimum Spanning Tree",
    subtitle: "Greedy Edge Selection with Disjoint Set Union (DSU)",
    category: "Greedy Method",
    paradigm: "Greedy Strategy",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to find the Minimum Spanning Tree (MST) of a weighted connected undirected graph using Kruskal's algorithm.",
    theory: "A Minimum Spanning Tree (MST) is a subset of edges from a connected, edge-weighted undirected graph that connects all V vertices together without cycles and with the minimum possible total edge weight. Kruskal's algorithm solves this using a greedy strategy: it repeatedly searches for the edge with the absolute lowest cost in the cost adjacency matrix. To ensure no cycles are formed, it maintains a Disjoint Set Union (DSU) structure using parent[] array with find() and uni() functions. If the endpoints u and v of the candidate edge have different root representatives (find(u) != find(v)), the edge is accepted into the MST, mincost is accumulated, and the sets are merged. The process repeats until exactly n - 1 edges are selected.",
    complexities: {
      bestTime: "O(E log E) or O(V²)",
      avgTime: "O(E log E)",
      worstTime: "O(V²) with adjacency matrix",
      space: "O(V) (parent array and cost matrix)",
      recurrence: "Greedy Edge-Cost Minimization"
    },
    learningOutcomes: [
      "Understand the cut property and cycle prevention in greedy graph algorithms.",
      "Implement the Union-Find / Disjoint Set data structure with path exploration.",
      "Compute total minimal weight for network routing and circuit design applications."
    ],
    fullPages: [
      { page: 9, title: "Exp 6 - Find, Union & Matrix Input", image: "assets/images/aoa/pages/page_9.png" },
      { page: 10, title: "Exp 6 - Edge Selection Loop & Output", image: "assets/images/aoa/pages/page_10.png" },
      { page: 11, title: "Exp 6 - Execution Terminal Output", image: "assets/images/aoa/pages/page_11.png" }
    ],
    items: [
      {
        id: "exp6-item1",
        title: "Kruskal's MST Implementation in C",
        type: "C Program",
        description: "Finds minimum cost edge in adjacency matrix, verifies acyclic condition using find() and uni() functions, and displays the n-1 chosen edges and total minimum cost.",
        code: `#include <stdio.h>
#include <conio.h>
#define MAX 20
int parent[MAX];
int find(int i)
{
    while(parent[i] != i)
        i = parent[i];
    return i;
}
void uni(int i, int j)
{
    parent[i] = j;
}
void main()
{
    int cost[MAX][MAX];
    int i, j, n;
    int min, a, b, u, v;
    int ne = 1;
    int mincost = 0;
    clrscr();
    printf("Enter the number of vertices: ");
    scanf("%d", &n);
    printf("Enter the cost adjacency matrix:\\n");
    for(i = 1; i <= n; i++)
    {
        parent[i] = i;
        for(j = 1; j <= n; j++)
        {
            scanf("%d", &cost[i][j]);
            if(cost[i][j] == 0)
                cost[i][j] = 999;
        }
    }
    printf("\\nEdges in the Minimum Spanning Tree:\\n");
    while(ne < n)
    {
        min = 999;
        for(i = 1; i <= n; i++)
        {
            for(j = 1; j <= n; j++)
            {
                if(cost[i][j] < min)
                {
                    min = cost[i][j];
                    a = u = i;
                    b = v = j;
                }
            }
        }
        u = find(u);
        v = find(v);
        if(u != v)
        {
            printf("%d Edge (%d,%d) = %d\\n", ne++, a, b, min);
            mincost += min;
            uni(u, v);
        }
        cost[a][b] = cost[b][a] = 999;
    }
    printf("\\nMinimum Cost = %d", mincost);
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp6_output_kruskal_mst.png",
        imageCaption: "Turbo C Console - Kruskal's MST for 4 vertices: Minimum Cost = 17",
        status: "MST Created (3 Edges, Cost: 17)",
        terminalOutput: `Enter the number of vertices: 4
Enter the cost adjacency matrix:
0 12 5 10
9 10 0 0
6 0 5 7
10 5 16 15

Edges in the Minimum Spanning Tree:
1 Edge (1,3) = 5
2 Edge (4,2) = 5
3 Edge (3,4) = 7

Minimum Cost = 17`
      }
    ]
  },
  {
    id: "exp-7",
    number: "07",
    title: "4-Queen Problem",
    subtitle: "Constraint Satisfaction via Recursive Backtracking",
    category: "Backtracking",
    paradigm: "Backtracking / State Space Search",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to solve the 4-Queen problem using Backtracking and display all non-attacking chessboard solutions.",
    theory: "The N-Queens problem asks to place N non-attacking queens on an N x N chessboard such that no two queens share the same row, column, or diagonal. The backtracking algorithm systematically explores the state space tree row by row. An integer array x[4] records queen placements, where x[k] represents the column position of the queen in row k. The function place(k, i) validates whether placing a queen at row k, column i creates conflicts: x[j] == i tests column conflict, while abs(x[j] - i) == abs(j - k) evaluates diagonal conflict against all previously placed queens j < k. If safe, queen is placed and recursion advances to row k + 1. When k == 3, a complete valid configuration is found, drawn as an ASCII board, and counter is incremented. Otherwise, the algorithm backtracks to try remaining column choices.",
    complexities: {
      bestTime: "O(N!)",
      avgTime: "O(N!)",
      worstTime: "O(N!)",
      space: "O(N) (Recursion stack and column array)",
      recurrence: "T(N) = N * T(N-1) + O(N) [Pruned]"
    },
    learningOutcomes: [
      "Understand systematic state space tree generation with branch pruning.",
      "Formulate mathematical slope/diagonal conflict detection (delta X == delta Y).",
      "Render ASCII chessboards representing combinatorial solutions."
    ],
    fullPages: [
      { page: 15, title: "Exp 7 - Place Validity Check & Board Display", image: "assets/images/aoa/pages/page_15.png" },
      { page: 16, title: "Exp 7 - N-Queen Recursive Backtracking Driver", image: "assets/images/aoa/pages/page_16.png" },
      { page: 17, title: "Exp 7 - Execution Output: Solutions 1 & 2", image: "assets/images/aoa/pages/page_17.png" }
    ],
    items: [
      {
        id: "exp7-item1",
        title: "4-Queen Backtracking Implementation in C",
        type: "C Program",
        description: "Solves the 4-Queen problem recursively. Validates row/column/diagonal constraints using place(), visualizes valid chessboards with ASCII grid, and reports total solutions.",
        code: `#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
int x[4];
int count = 0;
/* Check whether queen can be placed */
int place(int k, int i)
{
    int j;
    for (j = 0; j < k; j++)
    {
        if (x[j] == i || abs(x[j] - i) == abs(j - k))
            return 0;
    }
    return 1;
}
/* Display chess board */
void display()
{
    int i, j;
    printf("\\nSolution %d:\\n", count);
    for (i = 0; i < 4; i++)
    {
        printf("+---+---+---+---+\\n");
        for (j = 0; j < 4; j++)
        {
            if (x[i] == j)
                printf("| Q ");
            else
                printf("|   ");
        }
        printf("|\\n");
    }
    printf("+---+---+---+---+\\n");
}
/* 4-Queen Backtracking */
void nqueen(int k)
{
    int i;
    for (i = 0; i < 4; i++)
    {
        if (place(k, i))
        {
            x[k] = i;
            if (k == 3)
            {
                count++;
                display();
            }
            else
            {
                nqueen(k + 1);
            }
        }
    }
}
void main()
{
    clrscr();
    printf("4-QUEEN PROBLEM");
    printf("\\n================");
    nqueen(0);
    printf("\\nTotal Solutions = %d", count);
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp7_output_4_queen.png",
        imageCaption: "Turbo C Console - 4-Queen Problem showing 2 valid chessboard configurations",
        status: "All Solutions Found (Total: 2)",
        terminalOutput: `4-QUEEN PROBLEM
================
Solution 1:
+---+---+---+---+
|   | Q |   |   |
+---+---+---+---+
|   |   |   | Q |
+---+---+---+---+
| Q |   |   |   |
+---+---+---+---+
|   |   | Q |   |
+---+---+---+---+

Solution 2:
+---+---+---+---+
|   |   | Q |   |
+---+---+---+---+
| Q |   |   |   |
+---+---+---+---+
|   |   |   | Q |
+---+---+---+---+
|   | Q |   |   |
+---+---+---+---+

Total Solutions = 2`
      }
    ]
  },
  {
    id: "exp-8",
    number: "08",
    title: "Graph Coloring Problem (m-Coloring)",
    subtitle: "Vertex Coloring via Backtracking & Adjacency Constraints",
    category: "Backtracking",
    paradigm: "Backtracking / State Space Search",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to solve the m-Coloring problem for an undirected graph using Backtracking.",
    theory: "The Graph Coloring (m-Coloring) problem requires assigning one of m available colors (numbered 1 through m) to each of the n vertices of an undirected graph G such that no two adjacent vertices share the identical color. The backtracking function graphColoring(v) begins with vertex 0 and systematically tries color c from 1 to m. The safety function isSafe(v, c) verifies whether any vertex i adjacent to v (graph[v][i] == 1) currently holds color c. If safe, color[v] is assigned c and recursion proceeds to vertex v + 1. If v reaches n, all vertices have received valid colors and a solution is achieved. If no color from 1 to m is admissible for vertex v, color[v] is reset to 0 (uncolored) and the algorithm backtracks to previous vertex.",
    complexities: {
      bestTime: "O(V)",
      avgTime: "O(m^V) [Heavily pruned]",
      worstTime: "O(m^V)",
      space: "O(V) (Color array & recursion stack)",
      recurrence: "T(V) = m * T(V-1) + O(V)"
    },
    learningOutcomes: [
      "Formulate vertex coloring as a constraint satisfaction problem on graph structures.",
      "Check adjacency constraints dynamically against an adjacency matrix.",
      "Recognize real-world applications in compiler register allocation and map coloring."
    ],
    fullPages: [
      { page: 18, title: "Exp 8 - isSafe() & graphColoring() Functions", image: "assets/images/aoa/pages/page_18.png" },
      { page: 19, title: "Exp 8 - Main Driver & Adjacency Matrix Input", image: "assets/images/aoa/pages/page_19.png" },
      { page: 20, title: "Exp 8 - Execution Output & Vertex Color Assignment", image: "assets/images/aoa/pages/page_20.png" }
    ],
    items: [
      {
        id: "exp8-item1",
        title: "Graph m-Coloring Implementation in C",
        type: "C Program",
        description: "Backtracking algorithm to assign m colors to n vertices without adjacent collisions. Uses isSafe() constraint check and outputs per-vertex color assignments.",
        code: `#include <stdio.h>
#include <conio.h>
#define MAX 10
int graph[MAX][MAX];
int color[MAX];
int n, m;
/* Function to check whether a color can be assigned */
int isSafe(int v, int c)
{
    int i;
    for (i = 0; i < n; i++)
    {
        if (graph[v][i] == 1 && color[i] == c)
            return 0;
    }
    return 1;
}
/* Function to solve graph coloring */
int graphColoring(int v)
{
    int c;
    if (v == n)
        return 1;
    for (c = 1; c <= m; c++)
    {
        if (isSafe(v, c))
        {
            color[v] = c;
            if (graphColoring(v + 1))
                return 1;
            color[v] = 0;
        }
    }
    return 0;
}
void main()
{
    int i, j;
    clrscr();
    printf("Enter number of vertices: ");
    scanf("%d", &n);
    printf("Enter number of colors: ");
    scanf("%d", &m);
    printf("\\nEnter the adjacency matrix:\\n");
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            scanf("%d", &graph[i][j]);
        }
    }
    for (i = 0; i < n; i++)
        color[i] = 0;
    if (graphColoring(0))
    {
        printf("\\nGraph can be colored using %d colors.\\n", m);
        printf("\\nVertex\\tColor\\n");
        for (i = 0; i < n; i++)
        {
            printf("%d\\t%d\\n", i + 1, color[i]);
        }
    }
    else
    {
        printf("\\nGraph cannot be colored using %d colors.", m);
    }
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp8_output_graph_coloring.png",
        imageCaption: "Turbo C Console - Graph Coloring for 4 vertices with 3 colors: Vertex-to-Color mappings",
        status: "Colored Successfully (3 Colors)",
        terminalOutput: `Enter number of vertices: 4
Enter number of colors: 3

Enter the adjacency matrix:
0 1 1 1
1 0 1 0
1 1 0 1
1 0 1 0

Graph can be colored using 3 colors.

Vertex	Color
1	1
2	2
3	3
4	2`
      }
    ]
  },
  {
    id: "exp-9",
    number: "09",
    title: "Longest Common Subsequence (LCS)",
    subtitle: "Bottom-Up 2D Dynamic Programming Tabulation & Reconstruction",
    category: "Dynamic Programming",
    paradigm: "Dynamic Programming",
    badgeColor: "blue",
    environment: "Turbo C / GCC Compiler (C99)",
    aim: "To write, analyze, and execute a C program to determine the length and print the Longest Common Subsequence (LCS) of two strings using Dynamic Programming.",
    theory: "Given two character sequences X = <x1, x2, ..., xm> and Y = <y1, y2, ..., yn>, a subsequence is a sequence that appears in the same relative order, but not necessarily contiguous. Dynamic programming solves LCS in O(m * n) by avoiding recomputation of overlapping subproblems using a 2D table L[m+1][n+1]. The recurrence relation is: L[i][j] = 0 when i == 0 or j == 0; if X[i-1] == Y[j-1], then L[i][j] = L[i-1][j-1] + 1; otherwise, L[i][j] = max(L[i-1][j], L[i][j-1]). After computing table L, the LCS string itself is reconstructed by tracing backwards from L[m][n]: if characters match, prepend to string and move diagonally (i--, j--); otherwise, follow the maximum neighbor.",
    complexities: {
      bestTime: "O(m * n)",
      avgTime: "O(m * n)",
      worstTime: "O(m * n)",
      space: "O(m * n) (DP lookup table L[][])",
      recurrence: "L[i][j] = L[i-1][j-1]+1 if match, else max(L[i-1][j], L[i][j-1])"
    },
    learningOutcomes: [
      "Understand bottom-up dynamic programming tabulation versus memoization.",
      "Traceback through a 2D cost matrix to reconstruct optimal sequence solutions.",
      "Appreciate bioinformatics applications in DNA/protein sequence alignment and git diff."
    ],
    fullPages: [
      { page: 21, title: "Exp 9 - LCS DP Table Formulation", image: "assets/images/aoa/pages/page_21.png" },
      { page: 22, title: "Exp 9 - LCS String Reconstruction & Terminal Output", image: "assets/images/aoa/pages/page_22.png" }
    ],
    items: [
      {
        id: "exp9-item1",
        title: "Longest Common Subsequence Implementation in C",
        type: "C Program",
        description: "Builds a 2D dynamic programming table of dimensions (m+1) x (n+1), determines the maximum LCS length, and prints the exact reconstructed LCS string.",
        code: `#include <stdio.h>
#include <conio.h>
#include <string.h>
#define MAX 50
void main()
{
    char X[MAX], Y[MAX];
    int L[MAX][MAX];
    int i, j;
    int m, n;
    clrscr();
    printf("Enter first string: ");
    scanf("%s", X);
    printf("Enter second string: ");
    scanf("%s", Y);
    m = strlen(X);
    n = strlen(Y);
    /* Build LCS table */
    for (i = 0; i <= m; i++)
    {
        for (j = 0; j <= n; j++)
        {
            if (i == 0 || j == 0)
                L[i][j] = 0;
            else if (X[i - 1] == Y[j - 1])
                L[i][j] = L[i - 1][j - 1] + 1;
            else
            {
                if (L[i - 1][j] > L[i][j - 1])
                    L[i][j] = L[i - 1][j];
                else
                    L[i][j] = L[i][j - 1];
            }
        }
    }
    printf("\\nLength of LCS = %d", L[m][n]);
    /* Print LCS */
    {
        char lcs[MAX];
        int index = L[m][n];
        lcs[index] = '\\0';
        i = m;
        j = n;
        while (i > 0 && j > 0)
        {
            if (X[i - 1] == Y[j - 1])
            {
                lcs[index - 1] = X[i - 1];
                i--;
                j--;
                index--;
            }
            else if (L[i - 1][j] > L[i][j - 1])
                i--;
            else
                j--;
        }
        printf("\\nLCS = %s", lcs);
    }
    getch();
}`,
        outputType: "terminal",
        image: "assets/images/aoa/exp9_output_lcs.png",
        imageCaption: "Turbo C Console - LCS for 'ABCDEF' & 'ACEAF': Length = 4, LCS = ACEF",
        status: "LCS Computed (Length: 4, String: 'ACEF')",
        terminalOutput: `Enter first string: ABCDEF
Enter second string: ACEAF

Length of LCS = 4
LCS = ACEF

...Program finished with exit code 255
Press ENTER to exit console.`
      }
    ]
  }
];

// Presets for the Interactive Algorithm Simulator / Playground
const ALGORITHM_PRESETS = {
  "exp-1": {
    name: "Insertion Sort",
    description: "In-place shift insertion sort",
    defaultInput: "9, 3, 6, 1, 7, 2",
    inputLabel: "Array elements (comma-separated):"
  },
  "exp-2": {
    name: "Binary Search",
    description: "Logarithmic binary search on sorted data",
    defaultInput: "10, 20, 30, 50, 60, 80",
    defaultKey: "50",
    inputLabel: "Sorted array elements:",
    keyLabel: "Search key element:"
  },
  "exp-3": {
    name: "Merge Sort",
    description: "Recursive divide and conquer merge sort",
    defaultInput: "13, 24, 56, 76, 45, 56",
    inputLabel: "Array elements (comma-separated):"
  },
  "exp-4": {
    name: "Quick Sort",
    description: "Partition-exchange divide and conquer quicksort",
    defaultInput: "23, 443, 12, 4, 56, 78",
    inputLabel: "Array elements (comma-separated):"
  },
  "exp-5": {
    name: "Fractional Knapsack",
    description: "Greedy profit-to-weight ratio maximization",
    capacity: 60,
    items: [
      { profit: 20, weight: 30 },
      { profit: 10, weight: 100 },
      { profit: 50, weight: 90 }
    ]
  },
  "exp-6": {
    name: "Kruskal's MST",
    description: "Greedy edge selection with Disjoint Set Union",
    vertices: 4,
    matrix: [
      [0, 12, 5, 10],
      [9, 10, 0, 0],
      [6, 0, 5, 7],
      [10, 5, 16, 15]
    ]
  },
  "exp-7": {
    name: "4-Queen Problem",
    description: "Recursive backtracking on 4x4 chessboard",
    n: 4
  },
  "exp-8": {
    name: "Graph m-Coloring",
    description: "Vertex coloring with adjacency matrix via backtracking",
    vertices: 4,
    colors: 3,
    matrix: [
      [0, 1, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 1],
      [1, 0, 1, 0]
    ]
  },
  "exp-9": {
    name: "Longest Common Subsequence",
    description: "2D dynamic programming table & traceback",
    str1: "ABCDEF",
    str2: "ACEAF"
  }
};

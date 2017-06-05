# assignment_knights_travails_js
Do not go gentle into that good knight.

QUESTIONS:
What data structure is used to implement DFS?
Tree (or graph)

What data structure is typically used to implement BFS?
Graph (or tree)

Which one can be done recursively? (the clue should be the data structure)
DFS - as long as a node has children, can dig deeper into those children

Which one would you use to print a list of all the nodes in a tree or graph, starting with depth 1, then depth 2, then
depth 3 etc.?
BFS

What is the difference between a tree and a graph?
Trees start with a root node, graphs are a collection of vertices without a root

PSEUDOCODE:
Searching a simple tree of nodes where each Node has an array of child nodes (someNode.children) using DFS.
For each node (starting from parent node), call recursive function to check if there are children, return when you have your desired result.

Searching the same tree using BFS.
Starting from parent node, check if any children are the node you're searching for. If no match, check all of their children to see if they match (push them into an array to check?), if no match continue in same fashion (push all children's children into array, check for match)


root            0
depth1     1   2    3      4     5
depth2    6 7 8 9  10 11  12 13  14 15


Searching a graph (represented however you feel most comfortable -- Edge List, Adjacency List or Adjacency Matrix) using DFS.

*****Same as doing it with a tree, but you're just looping through your matrix/list instead of a children array

(if adjacency matrix)
Start from selected vertex instead of root
Go through matrix to find first connecting edge, check node for match
If no match, go through matrix to find first connecting edge for that node

(if edge list)
Start from selected vertex
Loop through edge list looking for an entry that has current node as "From"
Go to node connected in edge list as "To"
Check data for match
If no match, loop through edge list again


1 [2]
2 [4,5]
3
4 []
5


Searching the same graph using BFS.

similar to tree, except the next array of search will contain x vertices then the iteration will find all the edges for those x vertices

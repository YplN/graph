# Graph Drawer !

### How to use it

-   Left-click : Create a new vertex
-   Left-click + dragging : Create a new edge, and possibly one or two vertices if the extremities do not exist.
-   Right-click (on a vertex) : select the vertex
-   Right-click + dragging (from a selected vertex) : move the selected Vertices
-   Right-click + dragging : create a selection area
-   Ctrl + Right-click (on a vertex) : add/remove a vertex from the selection
-   Shift + Left-click + dragging (from a vertex) : create new edges from the initial vertex and the selected vertices to a new vertex (created if needed)
-   Mouse-wheel : rotate the selected vertices (the centre of rotation is its centroid)
-   Key 'o' : switch to oriented graphs (needs debug)
-   Key 'g' : toggle the magnetic grid
-   Key 'm' : toggle the menu
-   Key Delete or Backspace : delete selection
-   Key Ctrl + 'C' : copy selection, Left-click to paste
-   Key Spacebar : switch to another selection mode (Edges + Vertices = selection area triggers on both vertices and edges, Edges : only on edges, Vertices : only on Vertices)
-   Click on "Generate LaTeX" and activate the console to get the string of the .tex file

### TODO

-   Improve LaTeX : colors, no console...
-   Merging vertices
-   Snap vertex to an edge
-   curving edges!
-   select edge by right-click
-   copy/paste subgraph (do some additional tests...)
-   undo
-   loop/noLoop
-   improve animations
-   switch grid on/off
-   grid gap value slider

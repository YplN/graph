# Graph Drawer !

 Go to <https://ypln.github.io/graph/>

### How to use it

-   Left-click : Create a new vertex
-   Left-click + dragging : Create a new edge, and possibly one or two vertices if the extremities do not exist.
-   Right-click (on a vertex) : select the vertex
-   Right-click + dragging (from a selected vertex) : move the selected Vertices
-   Right-click + dragging : create a selection area
-   Ctrl + Right-click (on a vertex) : add/remove a vertex from the selection
-   Shift + Left-click + dragging (from a vertex) : create new edges from the initial vertex and the selected vertices to a new vertex (created if needed)
-   Middle-click + dragging : translate all the vertices
-   Mouse-wheel : Zoom in/out according to your mouse position
-   Shift + Mouse-wheel : rotate the selected vertices (the centre of rotation is its centroid)
-   Key 'o' : switch to oriented graphs (needs debug)
-   Key 'g' : toggle the magnetic grid
-   Key 'b' : toggle the bending mode
-   Key 'm' : toggle the menu
-   Key Delete or Backspace : delete selection
-   Key Ctrl + 'C' : copy selection, Left-click to paste
-   Key Spacebar : switch to another selection mode (Edges + Vertices = selection area triggers on both vertices and edges, Edges : only on edges, Vertices : only on Vertices)
-   Click on "Generate LaTeX" to get the string of the .tex file
-   Key Alt + 's' : Shuffle the graph. Because why not?
-   Share graph codes ! : Click on "Share or Import Graph". If you want to share your beautiful graph, just copy the code shown and give it to the ones you love. To use a code, paste it in the same window (be sure you remove everything before.)

### New !

Bending edges ! Press 'b' to toggle bending modes. It creates a new point for each edge that allows you to bend them.

### TODO

#### Improve :

-   improve LaTeX : oriented...
-   improve bending edge selection
-   Labels : move, size
-   copy/paste subgraph (do some additional tests...) + bending edges

#### To add :

-   merging vertices
-   snap vertex to an edge
-   select edge by right-click
-   undo
-   loop/noLoop
-   improve animations
-   switch grid on/off
-   grid gap value slider
-   shortcuts helper

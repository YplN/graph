# Graph Drawer !

 Go to <https://ypln.github.io/graph/>

## How to use it

### Vertex/Edge Creation

-   Left-click : Create a new vertex
-   Left-click + dragging : Create a new edge, and possibly one or two vertices if the extremities do not exist.
-   Shift + Left-click + dragging (from a vertex) : create new edges from the initial vertex and the selected vertices to a new vertex (created if needed)
-   Key 'O' : switch to oriented graphs (needs debug)
-   Key 'B' : toggle the bending mode for the edges
-   Key 'M' : toggle the menu

### Selection

-   Right-click (on a vertex) : select the vertex
-   Ctrl + Right-click (on a vertex) : add/remove a vertex from the selection
-   Right-click + dragging : create a selection area
-   Key Spacebar : switch to another selection mode (Edges + Vertices = selection area triggers on both vertices and edges, Edges : only on edges, Vertices : only on Vertices)

### Modify

-   Key 'L' : toggle the labels
-   Click on a label : change the label. Press Enter or somewhere else to confirm it, or Escape to cancel.
-   Mouse-wheel on a label : rotate the label around its anchor point
-   Key Delete or Backspace : delete selection
-   Key Ctrl + 'C' : copy selection, Left-click to paste
-   Right or Left-click on a bending point : bend the corresponding edge

### Moving Vertex/Edge

-   Right-click + dragging (from a selected vertex) : move the selected Vertices
-   Shift + Mouse-wheel : rotate the selected vertices (the centre of rotation is its centroid)
-   Key 'G' : toggle the magnetic grid
-   Key Alt + 'S' : Shuffle the graph. Because why not?

### Zoom/Change Canvas

-   Mouse-wheel : Zoom in/out according to your mouse position
-   Middle-click + dragging : translate all the vertices

### Export/Share

-   Click on "Generate LaTeX" to get the string of the .tex file
-   Click on "Share or Import Graph" : If you want to share your beautiful graph, just copy the code shown and give it to the ones you love. To use a code, paste it in the same window (be sure you remove everything before.)

### New !

Editable Labels : First, be sure the labels are shown (press 'L' to turn them on/off). By default, the labels are just incremented automatically. You can edit them by right clicking on it, it creates a text area where you can put the name of you dreams. Press Enter or click somewhere else to confirm. If you want to cancel, press Escape instead.

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

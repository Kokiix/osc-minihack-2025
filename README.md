# Canvas All-In-One

Version A             |  Version B
:-------------------------:|:-------------------------:
![Version A](./readme/versionA.png)  |  ![Version B](./readme/versionB.png)

### Project Overview

The current Canvas dashboard often requires multiple clicks to access assignments and modules within each course. Our goal was to streamline this workflow by reducing time and effort spent navigating to essential content.

## Our Solution

We developed a new dashboard layout that greatly increases the information density of module pages on Canvas.

![image info](./readme/wasted_space.png)

### Version A:
Lists assignments and modules within scrollable cells for each class.

Allows independent scrolling per column, so users can browse without losing context.

Automatically wraps to a new row after four columns to maintain readability.

Includes a toggle button on the right side of the screen to switch to the original Canvas UI.
(Though this could be added to version B)

### Version B:
Cleaner, more space efficient aesthetic, where classes are purely divided into columns.

Collapsable subheadings for each module.

# Setup
Clone the repo (or download ZIP) and use: 
**Version A** : `main` branch
**Version B** : 


## Dependencies

Chrome Extension (Injected into Canvas pages)

HTML / CSS / JavaScript

Axios for API Fetching (Canvas REST API)
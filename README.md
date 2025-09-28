# Canvas All-In-One

Version A             |  Version B
:-------------------------:|:-------------------------:
![](./readme/versionA.png)  |  ![](./readme/versionB.png)

### Project Overview

The current Canvas dashboard often requires multiple clicks to access assignments and modules within each course. Our goal was to streamline this workflow by reducing time and effort spent navigating to essential content.

## Our Solution

We developed a new dashboard layout greatly increases the information density of module pages on Canvas.

![image info](./readme/wasted_space.png)

### Version A:
Lists assignments and modules directly inside each column.

Allows independent scrolling per column, so users can browse without losing context.

Automatically wraps to a new row after four columns to maintain readability.

Includes a toggle button on the right side of the screen to switch between the original Canvas UI and our redesigned interface for comparison.

### Version B:
Lists assignments and modules directly inside each column.

Easier functionality but less UI desing involved.

## Why This Matters

Students spend hundreds of cumulative hours navigating Canvas each semester. Our redesign focuses on:

Speed - One click to access all content
Clarity - No more nested menus
Usability - Familiar layout, but smarter

### Preview

# Setup
### Version A:
Clone the repo (or download ZIP) and use the main branch.

Load the extension into Chrome via Developer Mode → Load unpacked.

Open https://canvas.instructure.com/ and sign in to Canvas.

Visit your Canvas dashboard — Use the toggle button (on the right side of the screen) to display the redesigned UI.

### Version B:
Clone the repo (or download ZIP) and use the main branch.

Switch to the get-data branch.

Load the extension into Chrome via Developer Mode → Load unpacked.

Open https://canvas.instructure.com/ and sign in to Canvas.

Visit your Canvas dashboard — The new UI is automatically displayed.

## Dependencies

Chrome Extension (Injected into Canvas pages)

HTML / CSS / JavaScript

Axios for API Fetching (Canvas REST API)
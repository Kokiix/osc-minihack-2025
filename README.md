# Canvas All-In-One

*A streamlined dashboard for Canvas that brings all your assignments and modules into a single, easy-to-navigate page.*

https://github.com/user-attachments/assets/ff5bcf4f-07e9-49e3-943d-af04d912a847

## The Problem

The standard Canvas dashboard requires users to navigate through multiple pages to access essential course information like lessons and assignments.

This process can be time-consuming and inefficient, especially for students managing multiple courses. As illustrated below, much of the modules page is not utilized effectively :(

![Wasted space on the default Canvas dashboard](./readme/wasted_space.png)

## Our Solution

"Canvas All-In-One" is a browser extension that redesigns the Canvas dashboard to maximize information density and provide a more intuitive(?) user experience.

We have developed two distinct versions to cater to different user preferences.

### Features

#### Version A: The Cellular Dashboard

Version A organizes each course into its own scrollable column, allowing you to view all your assignments and modules at a glance.

![Version A Screenshot](./readme/versionA.png)
*Version A, with independent scrolling for each course.*

*   **Scrollable Course Cells:** Each course's assignments and modules are contained within their own scrollable cell.
*   **Independent Scrolling:** Browse through one course's content without losing your place in others.
*   **Responsive Layout:** The layout automatically wraps to a new row after four courses to maintain readability.
*   **UI Toggle:** A convenient button on the right side allows you to switch back to the original Canvas UI.
*   **Ideal for more courses**

#### Version B: The Clean & Collapsible View

Version B offers a more minimalist aesthetic, with courses neatly organized into columns and modules that can be expanded or collapsed.

![Version B Screenshot](./readme/versionB.png)
*Version B, featuring a clean, column-based layout with collapsible modules.*

*   **Space-Efficient Design:** A cleaner look that dedicates more screen real estate to your content.
*   **Collapsible Modules:** Expand and collapse subheadings for each module to focus on what's important.
*   **Ideal for 5 or less courses** (Unless you got a really wide screen)

## Setup

1.  **Download the Extension:**
    *   Clone this repository: `git clone https://github.com/your-username/canvas-all-in-one.git`
    *   Or, download the ZIP and extract it.

2.  **Select Your Preferred Version:**
    *   For **Version A**, stay on the `main` branch: `git checkout main`
    *   For **Version B**, switch to the `versionB` branch: `git checkout versionB`

3.  **Install in Chrome:**
    *   Open the Chrome extensions page by navigating to [chrome://extensions](chrome://extensions).
    *   Enable **Developer mode** in the top-right corner.
    *   Click the **Load unpacked** button in the top-left corner.
    *   Select the `osc-minihack-2025` project folder.

4.  **Get Started:**
    *   Navigate to [https://ufl.instructure.com/](https://ufl.instructure.com/) and log in if prompted. The new dashboard should be active.
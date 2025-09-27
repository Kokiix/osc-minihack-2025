// Canvas Dashboard Extension - Fixed Version
console.log('Canvas Extension Loading...');

class CanvasDashboard {
  constructor() {
    this.studentData = { courses: [] };
    this.dashboardId = 'canvas-dashboard-extension';
    this.isLoading = false;
    
    console.log('Canvas Dashboard constructor called');
    this.init();
  }

  async init() {
    console.log('1. Init starting...');
    
    try {
      this.injectStyles();
      console.log('2. Styles injected...');
      
      this.createToggleButton();
      console.log('3. Toggle button created...');
      
      // Load data in background
      setTimeout(async () => {
        try {
          console.log('4. Starting data load...');
          await this.loadStudentData();
          console.log('5. Data loaded successfully...');
          
          this.renderDashboard();
          console.log('6. Dashboard rendered successfully!');
        } catch (error) {
          console.error('Data loading failed:', error);
          this.showError('Failed to load Canvas data');
        }
      }, 1000);
      
    } catch (error) {
      console.error('Dashboard initialization failed:', error);
    }
  }

  injectStyles() {
    if (document.querySelector('#canvas-dashboard-styles')) return;

    const style = document.createElement('style');
    style.id = 'canvas-dashboard-styles';
    style.textContent = `
      #${this.dashboardId} {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        position: fixed;
        top: 0;
        left: 110px;
        right: 0;
        height: 100vh;
        background: white;
        border-left: 3px solid #0021A5;
        box-shadow: -6px 0 20px rgba(0,0,0,0.2);
        z-index: 999999;
        overflow: hidden;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      #${this.dashboardId}.active {
        transform: translateX(0);
      }
      
      .canvas-toggle {
        position: fixed;
        top: 50%;
        right: 0;
        background: linear-gradient(135deg, #0021A5, #FA4616);
        color: white;
        border: none;
        padding: 16px 12px;
        border-radius: 12px 0 0 12px;
        cursor: pointer;
        z-index: 9999999;
        transform: translateY(-50%);
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        line-height: 1.3;
        min-height: 70px;
        transition: all 0.3s ease;
        box-shadow: -3px 0 15px rgba(0,0,0,0.3);
      }
      
      .canvas-toggle:hover {
        background: linear-gradient(135deg, #FA4616, #0021A5);
        transform: translateY(-50%) translateX(-4px);
        box-shadow: -6px 0 25px rgba(0,0,0,0.4);
      }
      
      .dashboard-header {
        background: linear-gradient(135deg, #0021A5, #FA4616);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .dashboard-close {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        font-size: 22px;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.2s;
        font-weight: bold;
      }
      
      .dashboard-close:hover {
        background: rgba(255,255,255,0.3);
        transform: scale(1.1);
      }
      
      .dashboard-content {
        height: calc(100vh - 80px);
        overflow-y: auto;
        padding: 0;
        background: #f8f9fa;
      }
      
      .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        padding: 20px;
        height: 100%;
        overflow-y: auto;
      }
      
      .course-column {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border: 1px solid #e9ecef;
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 120px);
      }
      
      .course-column-header {
        background: linear-gradient(135deg, #0021A5, #FA4616);
        color: white;
        padding: 16px 20px;
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        flex-shrink: 0;
      }


      
      .course-modules {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
      }
      
      .module-card {
        background: #f8f9fa;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #e9ecef;
      }
      
      .module-card-title {
        background: #343a40;
        color: white;
        padding: 10px 15px;
        font-weight: 500;
        font-size: 14px;
        border-radius: 8px 8px 0 0;
      }
      
      .module-assignments {
        padding: 10px;
      }
      
      .assignment-card {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        border-left: 3px solid #0021A5;
      }
      
      .no-content-message {
        padding: 15px;
        text-align: center;
        color: #666;
        font-style: italic;
        background: #f8f9fa;
        border-radius: 8px;
        margin: 15px;
      }

      .assignment-card:hover {
        background: #e3f2fd;
        border-left-color: #FA4616;
        transform: translateX(3px);
        box-shadow: 0 3px 8px rgba(0,0,0,0.15);
      }
      
      .assignment-card:last-child {
        margin-bottom: 0;
      }
      
      .assignment-card-title {
        font-weight: 500;
        color: #2c3e50;
        font-size: 13px;
        margin-bottom: 4px;
        line-height: 1.3;
      }
      
      .assignment-due {
        font-size: 11px;
        color: #FA4616;
        font-weight: 500;
      }
      
      .loading-state {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 300px;
        color: #666;
        padding: 40px;
      }
      
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #0021A5;
        border-radius: 50%;
        animation: spin 1.2s linear infinite;
        margin-bottom: 20px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .error-state {
        background: #fff5f5;
        color: #c53030;
        padding: 25px;
        border-radius: 10px;
        border-left: 5px solid #c53030;
        margin: 20px;
      }
      
      .empty-state {
        text-align: center;
        color: #999;
        padding: 50px 20px;
        font-style: italic;
      }
      
      .due-badge {
        background: #FA4616;
        color: white;
        padding: 3px 10px;
        border-radius: 15px;
        font-size: 11px;
        font-weight: 600;
      }
      
      .retry-button {
        background: #0021A5;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 15px;
        transition: all 0.2s;
      }
      
      .retry-button:hover {
        background: #FA4616;
        transform: translateY(-2px);
      }
    `;
    
    document.head.appendChild(style);
  }

  createToggleButton() {
    // Remove existing button
    const existing = document.querySelector('.canvas-toggle');
    if (existing) existing.remove();

    const button = document.createElement('button');
    button.className = 'canvas-toggle';
    button.innerHTML = 'Canvas<br>+';
    button.title = 'Open Canvas Dashboard';
    button.addEventListener('click', () => this.toggleDashboard());
    document.body.appendChild(button);
  }

  async loadStudentData() {
    try {
      console.log('Loading Canvas data...');
      
      // Use fetch instead of axios for better compatibility
      const response = await fetch('/api/v1/courses?enrollment_state=active&state[]=available&per_page=50');
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const courses = await response.json();
      console.log('Courses loaded:', courses.length);
      
      if (!courses || courses.length === 0) {
        this.studentData = { courses: [] };
        return;
      }

      // Load modules, grades, and assignments for each course
      const coursePromises = courses.map(async (course) => {
        try {
          const [moduleResponse, assignmentResponse] = await Promise.all([
            fetch(`/api/v1/courses/${course.id}/modules?include[]=items&per_page=30`),
            fetch(`/api/v1/courses/${course.id}/assignments?per_page=30`)
          ]);


          
          let processedModules = [];
          let courseAssignments = [];
          
          if (moduleResponse.ok) {
            const modules = await moduleResponse.json();
            processedModules = modules.map(module => ({
              name: module.name,
              assignments: (module.items || [])
                .filter(item => 
                  item.type === 'Assignment' || 
                  item.type === 'Quiz' || 
                  item.type === 'Discussion'
                )
                .map(item => ({
                  id: item.id,
                  title: item.title || 'Untitled',
                  url: item.html_url,
                  type: item.type,
                  dueDate: item.due_at
                }))
            })).filter(module => module.assignments.length > 0);
          }

          if (assignmentResponse.ok) {
            const assignments = await assignmentResponse.json();
            courseAssignments = assignments.map(assignment => ({
              id: assignment.id,
              title: assignment.name || 'Untitled',
              url: assignment.html_url,
              type: 'Assignment',
              dueDate: assignment.due_at
            }));
          }

          return {
            id: course.id,
            name: course.name,
            modules: processedModules,
            assignments: courseAssignments
          };
          
        } catch (error) {
          console.error(`Error loading ${course.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(coursePromises);
      const validCourses = results.filter(course => course !== null);
      
      // Sort courses alphabetically
      validCourses.sort((a, b) => a.name.localeCompare(b.name));
      
      this.studentData = { courses: validCourses };
      console.log('Final student data:', this.studentData);
      
    } catch (error) {
      console.error('Failed to load Canvas data:', error);
      this.studentData = { courses: [] };
      throw error;
    }
  }

  renderDashboard() {
    console.log('renderDashboard called');
    
    let container = document.getElementById(this.dashboardId);
    
    if (!container) {
      container = document.createElement('div');
      container.id = this.dashboardId;
      document.body.appendChild(container);
    }

    try {
      container.innerHTML = `
        <div class="dashboard-header">
          <h2 style="margin: 0; font-size: 18px; font-weight: 600;">Canvas Dashboard</h2>
          <button class="dashboard-close" data-action="close-dashboard">×</button>
        </div>
        
        <div class="dashboard-content">
          ${this.renderCoursesGrid()}
        </div>
      `;
      
      // Add event listener for the close button
      const closeButton = container.querySelector('.dashboard-close');
      if (closeButton) {
        closeButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleDashboard();
        });
      }
      
      window.canvasDashboard = this;
      console.log('Dashboard HTML set successfully');
      
    } catch (error) {
      console.error('Error in renderDashboard:', error);
      container.innerHTML = `
        <div class="dashboard-header">
          <h2 style="margin: 0;">Canvas Dashboard</h2>
          <button class="dashboard-close" data-action="close-dashboard">×</button>
        </div>
        <div class="error-state">
          <strong>Rendering Error:</strong> ${error.message}
        </div>
      `;
      
      // Add event listener for error state close button too
      const closeButton = container.querySelector('.dashboard-close');
      if (closeButton) {
        closeButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleDashboard();
        });
      }
    }
  }

  renderCoursesGrid() {
    if (!this.studentData.courses || this.studentData.courses.length === 0) {
      return `
        <div class="empty-state">
          No courses with assignments found.<br>
          Make sure you're logged into Canvas.
        </div>
      `;
    }

    return `
      <div class="courses-grid">
        ${this.studentData.courses.map(course => `
          <div class="course-column">
            <div class="course-column-header">
              ${course.name}
            </div>
            <div class="course-modules">
              ${course.modules && course.modules.length > 0 ? 
                course.modules.map(module => `
                  <div class="module-card">
                    <div class="module-card-title">${module.name}</div>
                    <div class="module-assignments">
                      ${module.assignments.map(assignment => `
                        <div class="assignment-card" onclick="window.open('${assignment.url}', '_blank')">
                          <div class="assignment-card-title">${assignment.title}</div>
                          ${assignment.dueDate ? `<div class="assignment-due">Due: ${new Date(assignment.dueDate).toLocaleDateString()}</div>` : ''}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('') 
                : course.assignments && course.assignments.length > 0 ?
                `<div class="module-card">
                  <div class="module-card-title">Course Assignments</div>
                  <div class="module-assignments">
                    ${course.assignments.map(assignment => `
                      <div class="assignment-card" onclick="window.open('${assignment.url}', '_blank')">
                        <div class="assignment-card-title">${assignment.title}</div>
                        ${assignment.dueDate ? `<div class="assignment-due">Due: ${new Date(assignment.dueDate).toLocaleDateString()}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>`
                : '<div class="no-content-message">No assignments available</div>'
              }
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getAllAssignmentsSorted() {
    if (!this.studentData || !this.studentData.courses) {
      return [];
    }

    const assignments = [];
    
    try {
      this.studentData.courses.forEach(course => {
        if (course.modules && Array.isArray(course.modules)) {
          course.modules.forEach(module => {
            if (module.assignments && Array.isArray(module.assignments)) {
              module.assignments.forEach(assignment => {
                assignments.push({
                  ...assignment,
                  courseName: course.name,
                  moduleName: module.name
                });
              });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error processing assignments:', error);
    }

    return assignments.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return a.title.localeCompare(b.title);
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  toggleDashboard() {
    const dashboard = document.getElementById(this.dashboardId);
    const button = document.querySelector('.canvas-toggle');
    
    if (dashboard) {
      const isActive = dashboard.classList.toggle('active');
      if (button) {
        button.style.display = isActive ? 'none' : 'block';
      }
      console.log(isActive ? 'Dashboard opened' : 'Dashboard closed');
    }
  }

  showError(message) {
    const container = document.getElementById(this.dashboardId) || this.createContainer();
    container.innerHTML = `
      <div class="dashboard-header">
        <h2 style="margin: 0;">Canvas Dashboard</h2>
        <button class="dashboard-close" data-action="close-dashboard">×</button>
      </div>
      <div class="error-state">
        <strong>Error:</strong> ${message}<br>
        <button class="retry-button" onclick="window.canvasDashboard && window.canvasDashboard.retry()">
          Try Again
        </button>
      </div>
    `;
    
    // Add event listener for close button in error state
    const closeButton = container.querySelector('.dashboard-close');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleDashboard();
      });
    }
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = this.dashboardId;
    document.body.appendChild(container);
    return container;
  }

  async retry() {
    try {
      const container = document.getElementById(this.dashboardId);
      if (container) {
        container.innerHTML = `
          <div class="dashboard-header">
            <h2 style="margin: 0;">Canvas Dashboard</h2>
          </div>
          <div class="loading-state">
            <div class="spinner"></div>
            <div>Reloading...</div>
          </div>
        `;
      }
      
      await this.loadStudentData();
      this.renderDashboard();
    } catch (error) {
      this.showError('Failed to reload. Please refresh the page.');
    }
  }
}

// Initialize function
function initCanvasDashboard() {
  const hostname = window.location.hostname;
  console.log('Checking hostname:', hostname);
  
  if (hostname.includes('instructure.com') || hostname.includes('canvas')) {
    console.log('Canvas detected, initializing...');
    
    // Wait for page to stabilize
    setTimeout(() => {
      try {
        window.canvasDashboard = new CanvasDashboard();
        console.log('Canvas Dashboard initialized');
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    }, 2500);
  } else {
    console.log('Not on Canvas, skipping');
  }
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCanvasDashboard);
} else {
  initCanvasDashboard();
}

console.log('Canvas Extension script loaded completely');
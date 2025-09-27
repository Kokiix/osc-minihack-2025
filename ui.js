// Canvas Dashboard UI - ui.js
class CanvasDashboard {
  constructor() {
    this.studentData = null;
    this.maxColumns = 4;
    this.init();
  }

  async init() {
    this.injectBulmaCSS();
    await this.loadStudentData();
    this.renderDashboard();
  }

  injectBulmaCSS() {
    // Inject Bulma CSS if not already present
    if (!document.querySelector('#bulma-css')) {
      const bulmaLink = document.createElement('link');
      bulmaLink.id = 'bulma-css';
      bulmaLink.rel = 'stylesheet';
      bulmaLink.href = 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
      document.head.appendChild(bulmaLink);
    }

    // Add custom styles
    this.injectCustomStyles();
  }

  injectCustomStyles() {
    const customStyles = `
      <style id="canvas-dashboard-styles">
        .dashboard-container {
          height: 100vh;
          overflow: hidden;
        }
        
        .dashboard-sidebar {
          background: #f8f9fa;
          border-right: 1px solid #e9ecef;
          height: 100vh;
          overflow-y: auto;
          width: 150px;
          min-width: 150px;
          max-width: 150px;
          position: relative;
        }
        
        .dashboard-content {
          height: 100vh;
          overflow-y: auto;
          padding: 1rem;
        }
        
        .class-column {
          height: calc(100vh - 2rem);
          overflow-y: auto;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          background: white;
        }
        
        .class-header {
          background: #3273dc;
          color: white;
          padding: 1rem;
          text-align: center;
          border-radius: 6px 6px 0 0;
          margin-bottom: 0;
        }
        
        .module-section {
          padding: 0.75rem;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .module-section:last-child {
          border-bottom: none;
        }
        
        .module-title {
          color: #363636;
          font-weight: 600;
          margin-bottom: 0.5rem;
          padding-bottom: 0.25rem;
          border-bottom: 2px solid #3273dc;
        }
        
        .assignment-item {
          padding: 0.5rem 0;
          border-left: 3px solid #dbdbdb;
          padding-left: 0.75rem;
          margin: 0.25rem 0;
          background: #fafafa;
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
        }
        
        .assignment-item:hover {
          border-left-color: #3273dc;
          background: #f0f7ff;
        }
        
        .assignment-title {
          font-weight: 500;
          color: #363636;
        }
        
        .sidebar-section {
          padding: 0.75rem;
        }
        
        .sidebar-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #363636;
          margin-bottom: 0.75rem;
          text-align: center;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 0.5rem;
        }
        
        .assignment-link {
          display: block;
          padding: 0.4rem 0.5rem;
          color: #3273dc;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.2s;
          font-size: 0.8rem;
          line-height: 1.2;
          margin-bottom: 0.25rem;
          border-left: 3px solid transparent;
        }
        
        .assignment-link:hover {
          background-color: #f0f7ff;
          color: #2366d1;
          border-left-color: #3273dc;
          transform: translateX(2px);
        }
        
        .extension-hidden {
          display: none !important;
        }
      </style>
    `;
    
    if (!document.querySelector('#canvas-dashboard-styles')) {
      document.head.insertAdjacentHTML('beforeend', customStyles);
    }
  }

  async loadStudentData() {
    let data = {};
    let courseIDs = {};
    await axios.get("/api/v1/courses")
    .then(function (response) {
        // Pair course name to course id in courseIDs
        for (i in response.data) {
            courseIDs[response.data[i].name] = response.data[i].id;
            // Pair course name to object w course modules/assign
            data[response.data[i].name] = {};
        }
        console.log("Get course IDs and names");
        
        // Use courseIDs to get modules/assignments
        for (let courseName in courseIDs) {
            axios.get(`/api/v1/courses/${courseIDs[courseName]}/modules?include[]=items`)
                .then(function (response) {
                    let moduleData = response.data;
                    for (let module_i in moduleData) {
                        // Under each course name,
                        // pair each module name to an array w assignment objects
                        data[courseName][moduleData[module_i].name] = []
                        for (let assignment_i in moduleData[module_i].items) {
                            data[courseName][moduleData[module_i].name][assignment_i] = moduleData[module_i].items[assignment_i]
                        }
                    }
            })
        }
        console.log("Get modules");
        console.log(data)
    })
  }

  renderDashboard() {
    // Clear existing content
    document.body.innerHTML = '';
    
    // Create main dashboard container
    const dashboardHTML = `
      <div class="dashboard-container">
        <div class="columns is-gapless">
          <!-- Dashboard Sidebar -->
          <div class="dashboard-sidebar">
            ${this.renderSidebar()}
          </div>
          
          <!-- Main Content Area -->
          <div class="column dashboard-content">
            <div class="columns is-multiline">
              ${this.renderClassColumns()}
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.innerHTML = dashboardHTML;
    document.title = "Canvas+ Dashboard";
  }

  renderSidebar() {
    const allAssignments = this.getAllAssignmentsSorted();
    
    return `
      <div class="sidebar-section">
        <div class="sidebar-title">Upcoming Assignments</div>
        ${allAssignments.map(assignment => `
          <a href="${assignment.url || '#'}" class="assignment-link" target="_blank">
            ${assignment.title}
          </a>
        `).join('')}
      </div>
    `;
  }

  renderClassColumns() {
    const courses = this.studentData.courses.slice(0, this.maxColumns);
    const columnClass = this.getColumnClass(courses.length);
    
    return courses.map(course => `
      <div class="${columnClass}">
        <div class="class-column">
          <h2 class="class-header title is-5">${course.name}</h2>
          ${this.renderModules(course.modules)}
        </div>
      </div>
    `).join('');
  }

  getColumnClass(numColumns) {
    const columnClasses = {
      1: 'column is-full',
      2: 'column is-half',
      3: 'column is-one-third',
      4: 'column is-one-quarter'
    };
    return columnClasses[numColumns] || 'column is-one-quarter';
  }

  renderModules(modules) {
    if (!modules || modules.length === 0) {
      return '<div class="module-section"><p class="has-text-grey">No modules available</p></div>';
    }

    return modules.map(module => `
      <div class="module-section">
        <h3 class="module-title is-size-6">${module.name}</h3>
        ${this.renderAssignments(module.assignments)}
      </div>
    `).join('');
  }

  renderAssignments(assignments) {
    if (!assignments || assignments.length === 0) {
      return '<p class="has-text-grey is-size-7">No assignments</p>';
    }

    return assignments.map(assignment => `
      <div class="assignment-item">
        <div class="assignment-title is-size-7">
          ${assignment.title}
        </div>
      </div>
    `).join('');
  }

  getAllAssignmentsSorted() {
    if (!this.studentData || !this.studentData.courses) {
      return [];
    }

    const allAssignments = [];
    
    this.studentData.courses.forEach(course => {
      course.modules.forEach(module => {
        module.assignments.forEach(assignment => {
          allAssignments.push({
            ...assignment,
            courseName: course.name,
            moduleName: module.name,
            url: assignment.url || `#assignment-${assignment.title.replace(/\s+/g, '-').toLowerCase()}`
          });
        });
      });
    });

    // Sort by due date
    return allAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  // Method to refresh data (call this when you want to update from Canvas API)
  async refresh() {
    await this.loadStudentData();
    this.renderDashboard();
  }

  // Method to integrate with actual Canvas API
  async fetchCanvasData(apiUrl, accessToken) {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Canvas API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Canvas API fetch error:', error);
      throw error;
    }
  }
}

// Initialize the dashboard when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new CanvasDashboard();
});

// Export for use in Chrome extension
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CanvasDashboard;
}
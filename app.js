const appData = {
  organizationInfo: {
    name: "JANSONS INSTITUTE OF TECHNOLOGY (AUTONOMOUS)",
    shortName: "JIT",
    address: "Karumathampatty, Somaur, Coimbatore District - 641659",
    upiId: "dharanikaviya0607@okhdfcbank"
  },
  adminCredentials: {
    email: "dharanikaviya0607@gmail.com",
    password: "dharani2006",
    displayName: "Administrator",
    role: "admin"
  },
  alumniCredentials: [
    {email: "arundhtathi0509@gmail.com", password: "arun2004", name: "Arundhathi T", id: 1, role: "alumni"},
    {email: "somesh.thiagu@gmail.com", password: "somesh2006", name: "Someshwar H T", id: 2, role: "alumni"},
    {email: "diana.gopikrishnan@gmail.com", password: "diana2005", name: "Diana G", id: 3, role: "alumni"},
    {email: "g2021r15@gmail.com", password: "gowri2006", name: "Gowri S", id: 4, role: "alumni"},
    {email: "aravindram2307@gmail.com", password: "aravind2005", name: "Aravind Ram", id: 5, role: "alumni"}
  ],
  sampleJobs: [
    {
      id: "job1",
      title: "Junior Software Developer",
      company: "Tech Solutions Ltd",
      location: "Chennai",
      salary: "₹3-6 LPA",
      deadline: "2025-10-30",
      description: "Join our dynamic team as a Junior Software Developer.",
      requirements: "B.Tech/M.Tech in Computer Science, Java/Python knowledge",
      status: "active"
    },
    {
      id: "job2",
      title: "Web Developer Intern",
      company: "Digital Innovations",
      location: "Coimbatore",
      salary: "₹15k-25k/month",
      deadline: "2025-10-15",
      description: "Great opportunity for fresh graduates in web development.",
      requirements: "HTML, CSS, JavaScript, React knowledge",
      status: "active"
    }
  ],
  sampleEvents: [
    {
      id: "event1",
      title: "Annual Alumni Meet 2025",
      date: "2025-12-25",
      time: "10:00 AM",
      venue: "JIT Main Auditorium",
      capacity: 300,
      registered: 156,
      description: "Join us for networking, cultural programs, and career sessions."
    },
    {
      id: "event2",
      title: "YUVA-Techfest' 25",
      date: "2025-09-27",
      time: "09:00 AM",
      venue: "Thanam Hall",
      capacity: 500,
      registered: 234,
      description: "Technical festival with competitions and industry interactions."
    },
    {
      id: "event3",
      title: "Career Guidance Workshop",
      date: "2025-10-15",
      time: "02:00 PM",
      venue: "Conference Hall",
      capacity: 150,
      registered: 89,
      description: "Professional development and career advancement workshop."
    }
  ],
  fundraisingStats: {
    totalDonations: 125000,
    averageDonation: 5000,
    activeCampaigns: 3,
    totalDonors: 25
  },
  documents: [
    {
      id: "doc1",
      userId: "diana.gopikrishnan@gmail.com",
      title: "Degree Certificate",
      fileName: "degree_cert.pdf",
      category: "Academic Certificates",
      status: "approved",
      uploadDate: "2024-09-15",
      size: "2.3 MB",
      comments: "Document approved successfully"
    },
    {
      id: "doc2",
      userId: "arundhtathi0509@gmail.com",
      title: "Resume",
      fileName: "arundhathi_resume.pdf",
      category: "Resumes & CVs",
      status: "pending",
      uploadDate: "2024-09-20",
      size: "1.8 MB",
      comments: ""
    },
    {
      id: "doc3",
      userId: "somesh.thiagu@gmail.com",
      title: "Nativity Certificate",
      fileName: "nativity_cert.pdf",
      category: "Identity Documents",
      status: "pending",
      uploadDate: "2024-09-21",
      size: "1.2 MB",
      comments: ""
    }
  ],
  chatbotResponses: {
    "How do I upload documents?": "To upload a document, go to Documents section, click 'Upload Document', enter a title, choose your file (PDF or JPG), and click 'Upload File'.",
    "What file types are supported?": "We accept PDF and JPG files only. Maximum file size is 10MB per document.",
    "How do I check document approval status?": "You can check your document approval status in the Documents section. Approved documents show green status, pending ones show yellow, and rejected ones show red.",
    "Where can I find my certificates?": "Click on any approved document in the Documents section to download it to your device.",
    "How to contact admin?": "You can contact the admin through the Communication section using our messaging system."
  },
  messages: [
    {
      id: 1,
      from: "admin",
      to: "all",
      message: "Welcome to JIT Alumni Connect! 🎓 Feel free to reach out if you need any assistance.",
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      status: "delivered",
      isRead: false
    }
  ],
  jobApplications: []
};

// Global state
let currentUser = null;
let currentRole = null;
let selectedDocument = null;
let activeChat = null;

/***********************************
 * 2. CRITICAL PAGE MANAGEMENT     *
 * NO OVERLAP - SINGLE PAGE ONLY   *
 ***********************************/
function showPage(pageId) {
  console.log(`Showing page: ${pageId}`);
  
  // CRITICAL: Hide ALL pages first
  const allPages = document.querySelectorAll('.page');
  allPages.forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });
  
  // Show ONLY the target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.style.display = 'block';
    targetPage.classList.add('active');
    
    // Reset any view states within dashboards
    if (pageId === 'admin-dashboard-page') {
      showView('admin-dashboard');
    } else if (pageId === 'alumni-dashboard-page') {
      showView('alumni-dashboard');
    }
  } else {
    console.error(`Page not found: ${pageId}`);
  }
}

function showView(viewId) {
  const container = currentRole === 'admin' ? '#admin-dashboard-page' : '#alumni-dashboard-page';
  
  // Hide all views in the current dashboard
  const allViews = document.querySelectorAll(`${container} .view`);
  allViews.forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
  });
  
  // Show target view
  const targetView = document.querySelector(`#${viewId}-view`);
  if (targetView) {
    targetView.style.display = 'block';
    targetView.classList.add('active');
  }
}

// Make showPage globally available
window.showPage = showPage;

/***********************************
 * 3. UTILITY FUNCTIONS            *
 ***********************************/
function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB');
}

function generateId() {
  return 'id' + Date.now() + Math.random().toString(36).substr(2, 9);
}

/***********************************
 * 4. AUTHENTICATION SYSTEM        *
 ***********************************/
function initAuth() {
  // Admin login form
  const adminForm = qs('#admin-login-form');
  if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleAdminLogin();
      return false;
    });
  }
  
  // Alumni login form
  const alumniForm = qs('#alumni-login-form');
  if (alumniForm) {
    alumniForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleAlumniLogin();
      return false;
    });
  }
  
  // Logout handlers
  const adminLogout = qs('#admin-logout');
  const alumniLogout = qs('#alumni-logout');
  
  if (adminLogout) {
    adminLogout.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
  
  if (alumniLogout) {
    alumniLogout.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
}

function handleAdminLogin() {
  const errorEl = qs('#admin-login-error');
  if (errorEl) {
    errorEl.classList.add('hidden');
  }
  
  const emailEl = qs('#admin-email');
  const passwordEl = qs('#admin-password');
  
  if (!emailEl || !passwordEl) {
    console.error('Admin login form elements not found');
    return;
  }
  
  const email = emailEl.value.trim();
  const password = passwordEl.value;
  
  if (!email || !password) {
    showError('admin-login-error', 'Please enter both email and password.');
    return;
  }
  
  if (email === appData.adminCredentials.email && password === appData.adminCredentials.password) {
    currentUser = { email, displayName: appData.adminCredentials.displayName };
    currentRole = 'admin';
    
    // Clear form
    emailEl.value = '';
    passwordEl.value = '';
    
    // Navigate to admin dashboard
    showPage('admin-dashboard-page');
    initNavigation();
    loadAdminView('admin-dashboard');
  } else {
    showError('admin-login-error', 'Invalid admin credentials. Please check your email and password.');
  }
}

function handleAlumniLogin() {
  const errorEl = qs('#alumni-login-error');
  if (errorEl) {
    errorEl.classList.add('hidden');
  }
  
  const emailEl = qs('#alumni-email');
  const passwordEl = qs('#alumni-password');
  
  if (!emailEl || !passwordEl) {
    console.error('Alumni login form elements not found');
    return;
  }
  
  const email = emailEl.value.trim();
  const password = passwordEl.value;
  
  if (!email || !password) {
    showError('alumni-login-error', 'Please enter both email and password.');
    return;
  }
  
  const alumni = appData.alumniCredentials.find(a => a.email === email && a.password === password);
  
  if (alumni) {
    currentUser = alumni;
    currentRole = 'alumni';
    
    // Clear form
    emailEl.value = '';
    passwordEl.value = '';
    
    // Set welcome message
    const welcomeEl = qs('#alumni-welcome');
    if (welcomeEl) {
      welcomeEl.innerHTML = `
        <div style="text-align: center; font-size: 12px;">
          Welcome back,<br>
          <strong>${alumni.name}</strong>
        </div>
      `;
    }
    
    // Navigate to alumni dashboard
    showPage('alumni-dashboard-page');
    initNavigation();
    loadAlumniView('alumni-dashboard');
  } else {
    showError('alumni-login-error', 'Invalid alumni credentials. Please check your email and password.');
  }
}

function showError(elementId, message) {
  const errorEl = qs(`#${elementId}`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    
    setTimeout(() => {
      errorEl.classList.add('hidden');
    }, 5000);
  }
}

function logout() {
  // Reset all global state
  currentUser = null;
  currentRole = null;
  selectedDocument = null;
  activeChat = null;
  
  // Clear any active menu items
  qsa('.menu-item').forEach(item => item.classList.remove('active'));
  
  // Reset forms
  const forms = qsa('form');
  forms.forEach(form => {
    if (form.reset) form.reset();
  });
  
  // Show landing page
  showPage('landing-page');
  
  console.log('User logged out successfully');
}

/***********************************
 * 5. NAVIGATION SYSTEM            *
 ***********************************/
function initNavigation() {
  qsa('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const role = item.dataset.role;
      const view = item.dataset.view;
      
      if (role !== currentRole || !view) return;
      
      // Update active menu item
      const sidebar = item.closest('.sidebar');
      if (sidebar) {
        sidebar.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
        item.classList.add('active');
      }
      
      // Show corresponding view
      showView(view);
      
      // Load view data
      if (currentRole === 'admin') {
        loadAdminView(view);
      } else {
        loadAlumniView(view);
      }
      
      return false;
    });
  });
}

/***********************************
 * 6. ADMIN APPLICATION            *
 ***********************************/
function loadAdminView(view) {
  switch(view) {
    case 'admin-dashboard':
      updateAdminDashboard();
      break;
    case 'admin-documents':
      loadAdminDocuments();
      break;
    case 'admin-events':
      loadAdminEvents();
      break;
    case 'admin-jobs':
      loadAdminJobs();
      break;
    case 'admin-fundraising':
      loadAdminFundraising();
      break;
    case 'admin-communications':
      loadAdminCommunications();
      break;
    case 'admin-ai-assistant':
      loadAdminAI();
      break;
  }
}

function updateAdminDashboard() {
  const totalAlumni = appData.alumniCredentials.length;
  const pendingDocs = appData.documents.filter(d => d.status === 'pending').length;
  const upcomingEvents = appData.sampleEvents.length;
  const totalDonations = appData.fundraisingStats.totalDonations;
  
  if (qs('#total-alumni')) qs('#total-alumni').textContent = totalAlumni;
  if (qs('#pending-documents')) qs('#pending-documents').textContent = pendingDocs;
  if (qs('#active-events')) qs('#active-events').textContent = upcomingEvents;
  if (qs('#total-donations')) qs('#total-donations').textContent = `₹${totalDonations.toLocaleString()}`;
}

function loadAdminDocuments() {
  renderAdminDocumentsList();
  setupDocumentFilters();
  setupBulkActions();
}

function renderAdminDocumentsList() {
  const container = qs('#admin-documents-list');
  if (!container) return;
  
  const filterEl = qs('#document-filter');
  const filter = filterEl ? filterEl.value : 'all';
  
  let filteredDocs = appData.documents;
  if (filter !== 'all') {
    filteredDocs = appData.documents.filter(d => d.status === filter);
  }
  
  if (filteredDocs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📄</div>
        <p>No ${filter === 'all' ? '' : filter} documents found.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredDocs.map(doc => `
    <div class="document-item ${selectedDocument?.id === doc.id ? 'selected' : ''}" 
         onclick="selectDocument('${doc.id}')">
      <div class="document-title">${doc.title}</div>
      <div class="document-meta">
        ${doc.fileName} • ${doc.category} • ${doc.size}
        <br>
        Uploaded by: ${doc.userId} • ${formatDate(doc.uploadDate)}
      </div>
      <span class="status-badge status-${doc.status}">${doc.status.toUpperCase()}</span>
    </div>
  `).join('');
}

function selectDocument(docId) {
  selectedDocument = appData.documents.find(d => d.id === docId);
  renderAdminDocumentsList();
  showDocumentDetails();
}

function showDocumentDetails() {
  const container = qs('#document-details-content');
  if (!container) return;
  
  if (!selectedDocument) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📄</div>
        <p>Select a document from the list to view details and take actions</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="document-details">
      <h4>${selectedDocument.title}</h4>
      <div class="detail-row"><strong>File Name:</strong> ${selectedDocument.fileName}</div>
      <div class="detail-row"><strong>Category:</strong> ${selectedDocument.category}</div>
      <div class="detail-row"><strong>Size:</strong> ${selectedDocument.size}</div>
      <div class="detail-row"><strong>Uploaded by:</strong> ${selectedDocument.userId}</div>
      <div class="detail-row"><strong>Upload Date:</strong> ${formatDate(selectedDocument.uploadDate)}</div>
      <div class="detail-row"><strong>Status:</strong> <span class="status-badge status-${selectedDocument.status}">${selectedDocument.status.toUpperCase()}</span></div>
      
      ${selectedDocument.status === 'pending' ? `
        <div class="document-actions" style="margin-top: 20px;">
          <button class="btn btn--primary" onclick="approveDocument('${selectedDocument.id}')">✅ Approve</button>
          <button class="btn btn--secondary" onclick="rejectDocument('${selectedDocument.id}')">❌ Reject</button>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label class="form-label">Comments:</label>
          <textarea class="form-control" id="doc-comments" rows="3" placeholder="Add comments for the alumni...">${selectedDocument.comments}</textarea>
        </div>
      ` : `
        <div class="detail-row"><strong>Comments:</strong> ${selectedDocument.comments || 'No comments'}</div>
      `}
    </div>
  `;
}

function approveDocument(docId) {
  const doc = appData.documents.find(d => d.id === docId);
  if (doc) {
    doc.status = 'approved';
    const commentsEl = qs('#doc-comments');
    doc.comments = commentsEl ? commentsEl.value || 'Document approved successfully' : 'Document approved successfully';
    
    addMessage('admin', doc.userId, `Your document "${doc.title}" has been approved! 🎉`);
    
    renderAdminDocumentsList();
    showDocumentDetails();
    updateAdminDashboard();
    alert('Document approved successfully!');
  }
}

function rejectDocument(docId) {
  const doc = appData.documents.find(d => d.id === docId);
  if (doc) {
    doc.status = 'rejected';
    const commentsEl = qs('#doc-comments');
    doc.comments = commentsEl ? commentsEl.value || 'Document rejected. Please resubmit.' : 'Document rejected. Please resubmit.';
    
    addMessage('admin', doc.userId, `Your document "${doc.title}" needs revision. Please check comments and resubmit.`);
    
    renderAdminDocumentsList();
    showDocumentDetails();
    updateAdminDashboard();
    alert('Document rejected.');
  }
}

function setupDocumentFilters() {
  const filterEl = qs('#document-filter');
  if (filterEl) {
    filterEl.addEventListener('change', renderAdminDocumentsList);
  }
}

function setupBulkActions() {
  const bulkBtn = qs('#bulk-approve-btn');
  if (bulkBtn) {
    bulkBtn.addEventListener('click', () => {
      const pendingDocs = appData.documents.filter(d => d.status === 'pending');
      pendingDocs.forEach(doc => {
        doc.status = 'approved';
        doc.comments = 'Bulk approved by admin';
        addMessage('admin', doc.userId, `Your document "${doc.title}" has been approved! 🎉`);
      });
      
      renderAdminDocumentsList();
      updateAdminDashboard();
      alert(`${pendingDocs.length} documents approved!`);
    });
  }
}

function loadAdminEvents() {
  const container = qs('#admin-events-grid');
  if (!container) return;
  
  container.innerHTML = appData.sampleEvents.map(event => `
    <div class="event-card">
      <h4>${event.title}</h4>
      <p><strong>📅 Date:</strong> ${formatDate(event.date)} at ${event.time}</p>
      <p><strong>📍 Venue:</strong> ${event.venue}</p>
      <p><strong>👥 Capacity:</strong> ${event.registered}/${event.capacity} registered</p>
      <p>${event.description}</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(event.registered/event.capacity)*100}%"></div>
      </div>
    </div>
  `).join('');
}

function loadAdminJobs() {
  const container = qs('#admin-jobs-grid');
  if (!container) return;
  
  container.innerHTML = appData.sampleJobs.map(job => `
    <div class="job-card">
      <h4>${job.title}</h4>
      <p><strong>🏢 Company:</strong> ${job.company}</p>
      <p><strong>📍 Location:</strong> ${job.location}</p>
      <p><strong>💰 Salary:</strong> ${job.salary}</p>
      <p><strong>⏰ Deadline:</strong> ${formatDate(job.deadline)}</p>
      <p>${job.description}</p>
      <p><strong>Requirements:</strong> ${job.requirements}</p>
      <span class="status-badge status-${job.status}">${job.status.toUpperCase()}</span>
    </div>
  `).join('');
}

function loadAdminFundraising() {
  console.log('Admin Fundraising view loaded');
}

function loadAdminCommunications() {
  renderAdminChatList();
  setupAdminChat();
}

function renderAdminChatList() {
  const container = qs('#admin-chat-list');
  if (!container) return;
  
  container.innerHTML = appData.alumniCredentials.map(alumni => {
    const initials = alumni.name.split(' ').map(n => n[0]).join('');
    
    return `
      <div class="chat-list-item ${activeChat === alumni.email ? 'active' : ''}" 
           onclick="selectAdminChat('${alumni.email}')">
        <div class="chat-user">
          <div class="avatar">${initials}</div>
          <div class="user-info">
            <h4>${alumni.name}</h4>
            <p class="status online">Online</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectAdminChat(userEmail) {
  activeChat = userEmail;
  renderAdminChatList();
  
  const user = appData.alumniCredentials.find(a => a.email === userEmail);
  if (!user) return;
  
  const initials = user.name.split(' ').map(n => n[0]).join('');
  const headerEl = qs('#current-chat-header');
  
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="chat-user">
        <div class="avatar">${initials}</div>
        <div class="user-info">
          <h3>${user.name}</h3>
          <span class="status online">Online</span>
        </div>
      </div>
    `;
  }
  
  renderAdminChatMessages();
  
  const inputEl = qs('#admin-chat-input');
  const sendBtn = qs('#admin-send-btn');
  
  if (inputEl) inputEl.disabled = false;
  if (sendBtn) sendBtn.disabled = false;
}

function renderAdminChatMessages() {
  const container = qs('#admin-chat-messages');
  if (!container) return;
  
  const messages = appData.messages.filter(m => 
    (m.from === 'admin' && m.to === activeChat) || 
    (m.from === activeChat && m.to === 'admin') ||
    (m.from === 'admin' && m.to === 'all')
  );
  
  container.innerHTML = messages.map(msg => `
    <div class="chat-message ${msg.from === 'admin' ? 'sent' : 'received'}">
      <div class="message-content">${msg.message}</div>
      <div class="message-meta">${msg.timestamp}</div>
    </div>
  `).join('');
  
  container.scrollTop = container.scrollHeight;
}

function setupAdminChat() {
  const input = qs('#admin-chat-input');
  const sendBtn = qs('#admin-send-btn');
  
  if (sendBtn) {
    sendBtn.addEventListener('click', sendAdminMessage);
  }
  
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendAdminMessage();
      }
    });
  }
}

function sendAdminMessage() {
  const input = qs('#admin-chat-input');
  if (!input) return;
  
  const message = input.value.trim();
  
  if (!message || !activeChat) return;
  
  addMessage('admin', activeChat, message);
  input.value = '';
  renderAdminChatMessages();
}

function loadAdminAI() {
  console.log('Admin AI Assistant view loaded');
}

/***********************************
 * 7. ALUMNI APPLICATION           *
 ***********************************/
function loadAlumniView(view) {
  switch(view) {
    case 'alumni-dashboard':
      updateAlumniDashboard();
      break;
    case 'alumni-documents':
      loadAlumniDocuments();
      break;
    case 'alumni-events':
      loadAlumniEvents();
      break;
    case 'alumni-jobs':
      loadAlumniJobs();
      break;
    case 'alumni-fundraising':
      loadAlumniFundraising();
      break;
    case 'alumni-communications':
      loadAlumniCommunications();
      break;
    case 'alumni-ai-assistant':
      loadAlumniAI();
      break;
  }
}

function updateAlumniDashboard() {
  if (!currentUser) return;
  
  const userDocs = appData.documents.filter(d => d.userId === currentUser.email);
  const pendingDocs = userDocs.filter(d => d.status === 'pending');
  const upcomingEvents = appData.sampleEvents.length;
  const userApplications = appData.jobApplications.filter(a => a.userId === currentUser.email);
  
  if (qs('#my-documents')) qs('#my-documents').textContent = userDocs.length;
  if (qs('#pending-approvals')) qs('#pending-approvals').textContent = pendingDocs.length;
  if (qs('#upcoming-events')) qs('#upcoming-events').textContent = upcomingEvents;
  if (qs('#job-applications')) qs('#job-applications').textContent = userApplications.length;
}

function loadAlumniDocuments() {
  renderAlumniDocumentsList();
  setupDocumentUpload();
  setupAlumniDocumentFilters();
}

function renderAlumniDocumentsList() {
  const container = qs('#alumni-documents-list');
  if (!container || !currentUser) return;
  
  const filterEl = qs('#alumni-document-filter');
  const filter = filterEl ? filterEl.value : 'all';
  
  let userDocs = appData.documents.filter(d => d.userId === currentUser.email);
  
  if (filter !== 'all') {
    userDocs = userDocs.filter(d => d.category === filter);
  }
  
  if (userDocs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📄</div>
        <p>No documents have been uploaded yet.</p>
        <p class="empty-subtitle">Upload your first document using the form on the right.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = userDocs.map(doc => `
    <div class="document-item">
      <div class="document-title">${doc.title}</div>
      <div class="document-meta">
        ${doc.fileName} • ${doc.category} • ${doc.size}
        <br>
        Uploaded: ${formatDate(doc.uploadDate)}
        ${doc.comments ? `<br>Comments: ${doc.comments}` : ''}
      </div>
      <span class="status-badge status-${doc.status}">${doc.status.toUpperCase()}</span>
      ${doc.status === 'approved' ? '<button class="btn btn--sm btn--outline" style="margin-top: 8px;">📥 Download</button>' : ''}
    </div>
  `).join('');
}

function setupAlumniDocumentFilters() {
  const filterEl = qs('#alumni-document-filter');
  if (filterEl) {
    filterEl.addEventListener('change', renderAlumniDocumentsList);
  }
}

function setupDocumentUpload() {
  const form = qs('#document-upload-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleDocumentUpload();
      return false;
    });
  }
}

function handleDocumentUpload() {
  if (!currentUser) return;
  
  const titleEl = qs('#document-title');
  const categoryEl = qs('#document-category');
  const fileInput = qs('#document-file');
  
  if (!titleEl || !categoryEl || !fileInput) return;
  
  const title = titleEl.value.trim();
  const category = categoryEl.value;
  
  if (!title || !category || !fileInput.files[0]) {
    alert('Please fill in all fields and select a file.');
    return;
  }
  
  const file = fileInput.files[0];
  
  // Validate file type
  const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    alert('Please select a PDF or JPG file only.');
    return;
  }
  
  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB.');
    return;
  }
  
  // Show progress
  showUploadProgress();
  
  // Simulate upload
  setTimeout(() => {
    const newDoc = {
      id: generateId(),
      userId: currentUser.email,
      title: title,
      fileName: file.name,
      category: category,
      status: 'pending',
      uploadDate: new Date().toISOString().split('T')[0],
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      comments: ''
    };
    
    appData.documents.push(newDoc);
    
    // Reset form
    qs('#document-upload-form').reset();
    hideUploadProgress();
    
    // Update UI
    renderAlumniDocumentsList();
    updateAlumniDashboard();
    
    addMessage(currentUser.email, 'admin', `I have uploaded a new document: "${title}" for your review.`);
    
    alert('Document uploaded successfully! It will be reviewed by the admin shortly.');
  }, 2000);
}

function showUploadProgress() {
  const progressEl = qs('#upload-progress');
  if (!progressEl) return;
  
  progressEl.classList.remove('hidden');
  const progressFill = qs('#progress-fill');
  const progressText = qs('#progress-text');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressText) progressText.textContent = `Uploading... ${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      if (progressText) progressText.textContent = 'Upload complete!';
    }
  }, 200);
}

function hideUploadProgress() {
  setTimeout(() => {
    const progressEl = qs('#upload-progress');
    if (progressEl) progressEl.classList.add('hidden');
    if (qs('#progress-fill')) qs('#progress-fill').style.width = '0%';
    if (qs('#progress-text')) qs('#progress-text').textContent = 'Uploading...';
  }, 1000);
}

function loadAlumniEvents() {
  const container = qs('#alumni-events-grid');
  if (!container) return;
  
  container.innerHTML = appData.sampleEvents.map(event => `
    <div class="event-card">
      <h4>${event.title}</h4>
      <p><strong>📅 Date:</strong> ${formatDate(event.date)} at ${event.time}</p>
      <p><strong>📍 Venue:</strong> ${event.venue}</p>
      <p><strong>👥 Registered:</strong> ${event.registered}/${event.capacity}</p>
      <p>${event.description}</p>
      <button class="btn btn--primary" onclick="registerForEvent('${event.id}')">Register Now</button>
    </div>
  `).join('');
}

function registerForEvent(eventId) {
  const event = appData.sampleEvents.find(e => e.id === eventId);
  if (event && event.registered < event.capacity) {
    event.registered++;
    alert(`Successfully registered for ${event.title}!`);
    loadAlumniEvents();
  } else {
    alert('Event is full or not found.');
  }
}

function loadAlumniJobs() {
  const container = qs('#alumni-jobs-grid');
  if (!container) return;
  
  container.innerHTML = appData.sampleJobs.map(job => `
    <div class="job-card">
      <h4>${job.title}</h4>
      <p><strong>🏢 Company:</strong> ${job.company}</p>
      <p><strong>📍 Location:</strong> ${job.location}</p>
      <p><strong>💰 Salary:</strong> ${job.salary}</p>
      <p><strong>⏰ Deadline:</strong> ${formatDate(job.deadline)}</p>
      <p>${job.description}</p>
      <p><strong>Requirements:</strong> ${job.requirements}</p>
      <button class="btn btn--primary" onclick="applyForJob('${job.id}')">Apply Now</button>
    </div>
  `).join('');
}

function applyForJob(jobId) {
  if (!currentUser) return;
  
  const job = appData.sampleJobs.find(j => j.id === jobId);
  if (job) {
    const application = {
      id: generateId(),
      userId: currentUser.email,
      userName: currentUser.name,
      jobId: jobId,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied'
    };
    
    appData.jobApplications.push(application);
    alert(`Successfully applied for ${job.title} at ${job.company}!`);
    updateAlumniDashboard();
  }
}

function loadAlumniFundraising() {
  console.log('Alumni Fundraising view loaded');
}

function loadAlumniCommunications() {
  renderAlumniChat();
  setupAlumniChat();
}

function renderAlumniChat() {
  const container = qs('#alumni-chat-messages');
  if (!container || !currentUser) return;
  
  const messages = appData.messages.filter(m => 
    (m.from === 'admin' && (m.to === currentUser.email || m.to === 'all')) || 
    (m.from === currentUser.email && m.to === 'admin')
  );
  
  container.innerHTML = messages.map(msg => `
    <div class="chat-message ${msg.from === currentUser.email ? 'sent' : 'received'}">
      <div class="message-content">${msg.message}</div>
      <div class="message-meta">${msg.timestamp}</div>
    </div>
  `).join('');
  
  container.scrollTop = container.scrollHeight;
}

function setupAlumniChat() {
  const input = qs('#alumni-chat-input');
  const sendBtn = qs('#alumni-send-btn');
  
  if (sendBtn) {
    sendBtn.addEventListener('click', sendAlumniMessage);
  }
  
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendAlumniMessage();
      }
    });
  }
}

function sendAlumniMessage() {
  const input = qs('#alumni-chat-input');
  if (!input || !currentUser) return;
  
  const message = input.value.trim();
  
  if (!message) return;
  
  addMessage(currentUser.email, 'admin', message);
  input.value = '';
  renderAlumniChat();
  
  // Simulate admin reply
  setTimeout(() => {
    const autoReplies = [
      'Thank you for your message! I\'ll get back to you shortly.',
      'I\'ve received your message. Let me check on that for you.',
      'Thanks for reaching out! I\'ll review your request.',
      'Got it! I\'ll process your request and update you soon.'
    ];
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    addMessage('admin', currentUser.email, randomReply);
    renderAlumniChat();
  }, 2000);
}

function loadAlumniAI() {
  setupAIChat();
}

function setupAIChat() {
  const input = qs('#ai-chat-input');
  const sendBtn = qs('#ai-send-message');
  
  if (sendBtn) {
    sendBtn.addEventListener('click', sendAIMessage);
  }
  
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendAIMessage();
      }
    });
  }
}

function sendAIMessage() {
  const input = qs('#ai-chat-input');
  if (!input) return;
  
  const question = input.value.trim();
  
  if (!question) return;
  
  // Add user message
  addAIMessage('user', question);
  input.value = '';
  
  // Simulate AI thinking
  setTimeout(() => {
    const response = getAIResponse(question);
    addAIMessage('bot', response);
  }, 1000);
}

function addAIMessage(type, text) {
  const container = qs('#ai-chat-messages');
  if (!container) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${type}`;
  
  messageDiv.innerHTML = `
    <div class="ai-avatar">${type === 'bot' ? '🤖' : '👤'}</div>
    <div class="ai-message-content">
      ${type === 'bot' ? '<strong>JIT AI Assistant</strong>' : ''}
      <p>${text}</p>
    </div>
  `;
  
  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

function getAIResponse(question) {
  const lowerQ = question.toLowerCase();
  
  // Check for exact matches first
  for (const [key, response] of Object.entries(appData.chatbotResponses)) {
    if (lowerQ.includes(key.toLowerCase())) {
      return response;
    }
  }
  
  // Check for keywords
  if (lowerQ.includes('upload') || lowerQ.includes('document')) {
    return appData.chatbotResponses["How do I upload documents?"];
  }
  
  if (lowerQ.includes('file') || lowerQ.includes('format') || lowerQ.includes('type')) {
    return appData.chatbotResponses["What file types are supported?"];
  }
  
  if (lowerQ.includes('status') || lowerQ.includes('approval')) {
    return appData.chatbotResponses["How do I check document approval status?"];
  }
  
  if (lowerQ.includes('download') || lowerQ.includes('certificate')) {
    return appData.chatbotResponses["Where can I find my certificates?"];
  }
  
  if (lowerQ.includes('contact') || lowerQ.includes('admin') || lowerQ.includes('help')) {
    return "You can contact the admin through the Communication section using our messaging system.";
  }
  
  // Default response
  return "I'm sorry, I didn't quite understand that. You can ask me about document uploads, file types, approval status, downloading certificates, or contacting the admin. Try clicking one of the suggestion buttons above!";
}

/***********************************
 * 8. GLOBAL FUNCTIONS             *
 ***********************************/
// Make functions available globally
window.askAI = function(question) {
  const input = qs('#ai-chat-input');
  if (input) {
    input.value = question;
    sendAIMessage();
  }
};

window.selectDocument = selectDocument;
window.approveDocument = approveDocument;
window.rejectDocument = rejectDocument;
window.selectAdminChat = selectAdminChat;
window.registerForEvent = registerForEvent;
window.applyForJob = applyForJob;

/***********************************
 * 9. MESSAGING SYSTEM             *
 ***********************************/
function addMessage(from, to, message) {
  const newMessage = {
    id: Date.now(),
    from: from,
    to: to,
    message: message,
    timestamp: new Date().toLocaleTimeString(),
    status: 'delivered',
    isRead: false
  };
  
  appData.messages.push(newMessage);
}

/***********************************
 * 10. APPLICATION INITIALIZATION  *
 ***********************************/
document.addEventListener('DOMContentLoaded', function() {
  console.log('JIT Alumni Management Portal - Separate Pages System Loaded');
  
  // Initialize authentication
  initAuth();
  
  // Show landing page (ONLY this page visible)
  showPage('landing-page');
});
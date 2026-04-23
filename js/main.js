const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = document.getElementById('theme-icon');
const langBtn = document.getElementById('lang-btn');
const langOptions = document.querySelectorAll('.lang-option');
const logoutBtn = document.getElementById('logout-btn');

const createBtn = document.getElementById('create-btn');
const appsGrid = document.getElementById('apps-grid');
const emptyState = document.getElementById('empty-state');

const appModal = document.getElementById('app-modal');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');
const appNameInput = document.getElementById('app-name');
const appImageInput = document.getElementById('app-image');
const previewImg = document.getElementById('preview-img');

const deleteModal = document.getElementById('delete-modal');
const deleteClose = document.getElementById('delete-close');
const deleteCancel = document.getElementById('delete-cancel');
const deleteConfirm = document.getElementById('delete-confirm');

const sunIcon = `
<circle cx="12" cy="12" r="5"></circle>
<line x1="12" y1="1" x2="12" y2="3"></line>
<line x1="12" y1="21" x2="12" y2="23"></line>
<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
<line x1="1" y1="12" x2="3" y2="12"></line>
<line x1="21" y1="12" x2="23" y2="12"></line>
<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
`;

const moonIcon = `
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
`;

let apps = [];
let currentEditApp = null;
let currentDeleteApp = null;
let isCopyMode = false;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    themeIcon.innerHTML = theme === 'light' ? moonIcon : sunIcon;
}

themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-theme');
    const theme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.dataset.lang;
        const text = option.textContent;
        langBtn.textContent = text;
        localStorage.setItem('language', lang);
    });
});

const savedLang = localStorage.getItem('language');
if (savedLang) {
    const option = document.querySelector(`.lang-option[data-lang="${savedLang}"]`);
    if (option) {
        langBtn.textContent = option.textContent;
    }
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

function loadApps() {
    const saved = localStorage.getItem('apps');
    if (saved) {
        apps = JSON.parse(saved);
    } else {
        apps = [
            { id: '1', name: '三维场景编辑器', image: 'images/3d.png', createdAt: new Date().toISOString() },
            { id: '2', name: '全景图查看器', image: 'images/3d.png', createdAt: new Date().toISOString() }
        ];
        saveApps();
    }
    renderApps();
}

function saveApps() {
    localStorage.setItem('apps', JSON.stringify(apps));
}

function renderApps() {
    appsGrid.innerHTML = '';
    
    if (apps.length === 0) {
        appsGrid.appendChild(emptyState);
        return;
    }
    
    apps.forEach(app => {
        const card = createAppCard(app);
        appsGrid.appendChild(card);
    });
}

function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.dataset.id = app.id;
    
    card.innerHTML = `
        <img src="${app.image}" alt="${app.name}" class="app-card-image" onerror="this.src='images/3d.png'">
        <div class="app-card-content">
            <h3 class="app-card-name">${app.name}</h3>
            <div class="app-card-actions">
                <button class="action-btn edit" data-id="${app.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                    编辑
                </button>
                <button class="action-btn copy" data-id="${app.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    复制
                </button>
                <button class="action-btn delete" data-id="${app.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    删除
                </button>
            </div>
        </div>
    `;
    
    const editBtn = card.querySelector('.action-btn.edit');
    const copyBtn = card.querySelector('.action-btn.copy');
    const deleteBtn = card.querySelector('.action-btn.delete');
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn')) {
            localStorage.setItem('currentApp', JSON.stringify(app));
            window.location.href = `app-detail.html?id=${app.id}`;
        }
    });
    
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(app);
    });
    
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openCopyModal(app);
    });
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDeleteModal(app);
    });
    
    return card;
}

function openCreateModal() {
    isCopyMode = false;
    currentEditApp = null;
    modalTitle.textContent = '新建应用';
    appNameInput.value = '';
    previewImg.src = 'images/3d.png';
    appImageInput.value = '';
    appModal.classList.add('show');
}

function openEditModal(app) {
    isCopyMode = false;
    currentEditApp = app;
    modalTitle.textContent = '编辑应用';
    appNameInput.value = app.name;
    previewImg.src = app.image;
    appImageInput.value = '';
    appModal.classList.add('show');
}

function openCopyModal(app) {
    isCopyMode = true;
    currentEditApp = app;
    modalTitle.textContent = '复制应用';
    appNameInput.value = app.name + ' (副本)';
    previewImg.src = app.image;
    appImageInput.value = '';
    appModal.classList.add('show');
}

function openDeleteModal(app) {
    currentDeleteApp = app;
    deleteModal.classList.add('show');
}

function closeAppModal() {
    appModal.classList.remove('show');
    appNameInput.value = '';
    previewImg.src = 'images/3d.png';
    appImageInput.value = '';
    currentEditApp = null;
}

function closeDeleteModal() {
    deleteModal.classList.remove('show');
    currentDeleteApp = null;
}

function handleAppSubmit() {
    const name = appNameInput.value.trim();
    if (!name) {
        alert('请输入应用名称');
        return;
    }
    
    const image = previewImg.src;
    
    if (isCopyMode && currentEditApp) {
        const newApp = {
            id: Date.now().toString(),
            name: name,
            image: image,
            createdAt: new Date().toISOString()
        };
        apps.push(newApp);
        saveApps();
        renderApps();
        closeAppModal();
    } else if (currentEditApp && !isCopyMode) {
        const index = apps.findIndex(app => app.id === currentEditApp.id);
        if (index !== -1) {
            apps[index] = {
                ...apps[index],
                name: name,
                image: image
            };
            saveApps();
            renderApps();
            closeAppModal();
        }
    } else {
        const newApp = {
            id: Date.now().toString(),
            name: name,
            image: image,
            createdAt: new Date().toISOString()
        };
        apps.push(newApp);
        saveApps();
        renderApps();
        closeAppModal();
    }
}

function handleDelete() {
    if (currentDeleteApp) {
        apps = apps.filter(app => app.id !== currentDeleteApp.id);
        saveApps();
        renderApps();
        closeDeleteModal();
    }
}

previewImg.onerror = function() {
    this.src = 'images/3d.png';
};

appImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            previewImg.src = event.target.result;
            const selectedIcon = document.querySelector('.icon-option.selected');
            if (selectedIcon) {
                selectedIcon.classList.remove('selected');
            }
        };
        reader.readAsDataURL(file);
    }
});

const iconGrid = document.getElementById('icon-grid');
if (iconGrid) {
    iconGrid.addEventListener('click', (e) => {
        const iconOption = e.target.closest('.icon-option');
        if (iconOption) {
            const iconUrl = iconOption.dataset.icon;
            previewImg.src = iconUrl;
            appImageInput.value = '';
            
            document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
            iconOption.classList.add('selected');
        }
    });
}

createBtn.addEventListener('click', openCreateModal);
modalClose.addEventListener('click', closeAppModal);
modalCancel.addEventListener('click', closeAppModal);
modalConfirm.addEventListener('click', handleAppSubmit);

deleteClose.addEventListener('click', closeDeleteModal);
deleteCancel.addEventListener('click', closeDeleteModal);
deleteConfirm.addEventListener('click', handleDelete);

appModal.addEventListener('click', (e) => {
    if (e.target === appModal) {
        closeAppModal();
    }
});

deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        closeDeleteModal();
    }
});

initTheme();
loadApps();
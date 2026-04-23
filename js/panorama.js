const panoramaView = document.getElementById('panorama-view');
const panoramaImage = document.getElementById('panorama-image');
const floorPlanFloating = document.getElementById('floor-plan-floating');
const closeFloorPlanBtn = document.getElementById('close-floor-plan');
const roomInfo = document.getElementById('room-info');
const roomName = document.getElementById('room-name');
const roomDesc = document.getElementById('room-desc');
const logoutBtn = document.getElementById('logout-btn');
const vrBtn = document.getElementById('vr-btn');

const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomLevel = document.getElementById('zoom-level');

const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const upBtn = document.getElementById('up-btn');
const downBtn = document.getElementById('down-btn');

let currentX = 0;
let currentY = 0;
let currentScale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let floorPlanDragging = false;
let floorPlanStartX = 0;
let floorPlanStartY = 0;
let floorPlanCurrentX = 0;
let floorPlanCurrentY = 0;

const roomData = {
    living: { name: '客厅', desc: '宽敞明亮的客厅，采光良好，视野开阔' },
    bedroom: { name: '主卧', desc: '温馨舒适的主卧，配备独立卫生间' },
    kitchen: { name: '厨房', desc: '现代化厨房，设备齐全' },
    bathroom: { name: '卫生间', desc: '干湿分离的卫生间，通风良好' }
};

function updatePanorama() {
    panoramaView.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
}

function updateZoom() {
    zoomLevel.textContent = Math.round(currentScale * 100) + '%';
}

function clampPanoramaPosition() {
    const scaledWidth = panoramaImage.offsetWidth * currentScale;
    const scaledHeight = panoramaImage.offsetHeight * currentScale;
    
    const maxX = Math.max(0, (scaledWidth - window.innerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - window.innerHeight) / 2);
    
    currentX = Math.max(-maxX, Math.min(maxX, currentX));
    currentY = Math.max(-maxY, Math.min(maxY, currentY));
}

panoramaView.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        
        clampPanoramaPosition();
        
        updatePanorama();
    }
    
    if (floorPlanDragging) {
        floorPlanCurrentX = e.clientX - floorPlanStartX;
        floorPlanCurrentY = e.clientY - floorPlanStartY;
        
        floorPlanCurrentX = Math.max(0, Math.min(window.innerWidth - floorPlanFloating.offsetWidth, floorPlanCurrentX));
        floorPlanCurrentY = Math.max(70, Math.min(window.innerHeight - floorPlanFloating.offsetHeight, floorPlanCurrentY));
        
        floorPlanFloating.style.left = floorPlanCurrentX + 'px';
        floorPlanFloating.style.top = floorPlanCurrentY + 'px';
        floorPlanFloating.style.right = 'auto';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    floorPlanDragging = false;
});

floorPlanFloating.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('drag-handle') || e.target.classList.contains('floor-plan-header')) {
        floorPlanDragging = true;
        floorPlanStartX = e.clientX - floorPlanFloating.offsetLeft;
        floorPlanStartY = e.clientY - floorPlanFloating.offsetTop;
        floorPlanFloating.classList.add('dragging');
    }
});

closeFloorPlanBtn.addEventListener('click', () => {
    floorPlanFloating.style.display = 'none';
});

const markers = document.querySelectorAll('.marker');
markers.forEach(marker => {
    marker.addEventListener('click', (e) => {
        e.stopPropagation();
        const room = e.target.dataset.room;
        if (roomData[room]) {
            roomName.textContent = roomData[room].name;
            roomDesc.textContent = roomData[room].desc;
            roomInfo.classList.add('show');
            
            setTimeout(() => {
                roomInfo.classList.remove('show');
            }, 3000);
        }
    });
});

zoomInBtn.addEventListener('click', () => {
    if (currentScale < 3) {
        currentScale += 0.25;
        clampPanoramaPosition();
        updatePanorama();
        updateZoom();
    }
});

zoomOutBtn.addEventListener('click', () => {
    if (currentScale > 0.5) {
        currentScale -= 0.25;
        clampPanoramaPosition();
        updatePanorama();
        updateZoom();
    }
});

const moveSpeed = 50;

leftBtn.addEventListener('click', () => {
    currentX += moveSpeed;
    clampPanoramaPosition();
    updatePanorama();
});

rightBtn.addEventListener('click', () => {
    currentX -= moveSpeed;
    clampPanoramaPosition();
    updatePanorama();
});

upBtn.addEventListener('click', () => {
    currentY += moveSpeed;
    clampPanoramaPosition();
    updatePanorama();
});

downBtn.addEventListener('click', () => {
    currentY -= moveSpeed;
    clampPanoramaPosition();
    updatePanorama();
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

vrBtn.addEventListener('click', () => {
    alert('VR视图功能正在开发中，敬请期待！');
});

updatePanorama();
updateZoom();
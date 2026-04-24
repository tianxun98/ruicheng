const chatInput = document.getElementById('chat-input');
const submitBtn = document.getElementById('submit-btn');
const uploadFile = document.getElementById('upload-file');
const uploadPreview = document.getElementById('upload-preview');
const previewImg = document.getElementById('preview-img');
const galleryGrid = document.getElementById('gallery-grid');
const designCount = document.getElementById('design-count');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');

let uploadedFile = null;
let designs = [];

function goBack() {
    window.location.href = 'main.html';
}

function clearUpload(event) {
    event.stopPropagation();
    previewImg.src = '';
    uploadPreview.classList.remove('show');
    uploadedFile = null;
    uploadFile.value = '';
    const toolBtn = document.querySelector('.tool-btn');
    if (toolBtn) {
        toolBtn.classList.remove('active');
    }
}

function loadDesigns() {
    const saved = localStorage.getItem('designs');
    if (saved) {
        designs = JSON.parse(saved);
        renderGallery();
    }
}

function saveDesigns() {
    localStorage.setItem('designs', JSON.stringify(designs));
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            uploadPreview.classList.add('show');
            const toolBtn = document.querySelector('.tool-btn');
            toolBtn.classList.add('active');
        };
        reader.readAsDataURL(file);
    }
}

function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        submitRequest();
    }
}

async function submitRequest() {
    const prompt = chatInput.value.trim();
    
    if (!prompt && !uploadedFile) {
        alert('请输入设计要求或上传户型图');
        return;
    }

    chatInput.value = '';
    uploadFile.value = '';
    uploadedFile = null;
    
    uploadPreview.classList.remove('show');
    previewImg.src = '';
    
    const toolBtn = document.querySelector('.tool-btn');
    if (toolBtn) {
        toolBtn.classList.remove('active');
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const imageUrl = await generateDesignImage(prompt);
    
    if (imageUrl) {
        const newDesign = {
            id: Date.now().toString(),
            prompt: prompt || 'AI生成设计',
            image: imageUrl,
            liked: false,
            disliked: false,
            createdAt: new Date().toISOString()
        };
        designs.push(newDesign);
        saveDesigns();
        renderGallery();
    } else {
        alert('抱歉，生成图片时出现问题，请稍后重试。');
    }

    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
}

async function generateDesignImage(prompt) {
    return 'images/2d-test.jpg';
}

function renderGallery() {
    if (designs.length === 0) {
        galleryGrid.innerHTML = `
            <div class="empty-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <h3>暂无设计方案</h3>
                <p>在下方对话框中输入设计要求，<br>我将为您生成专业的室内设计方案</p>
            </div>
        `;
        designCount.textContent = '0';
        return;
    }

    galleryGrid.innerHTML = designs.map(design => `
        <div class="design-card">
            <div class="design-image-wrapper">
                <img src="${design.image}" alt="${design.prompt}" class="design-image" onclick="openModal('${design.image}')">
                <div class="design-overlay">
                    <button class="overlay-btn" onclick="deleteDesign('${design.id}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="design-info">
                <p class="design-prompt">${design.prompt}</p>
                <div class="design-footer">
                    <div class="rating-buttons">
                        <button class="rating-btn ${design.liked ? 'liked' : ''}" onclick="toggleLike('${design.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="${design.liked ? 'like-icon' : ''}">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                        <button class="rating-btn ${design.disliked ? 'disliked' : ''}" onclick="toggleDislike('${design.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="${design.disliked ? 'dislike-icon' : ''}">
                                <path d="M20.84 16.61a5.5 5.5 0 0 1-7.78 0L12 15.67l-1.06 1.06a5.5 5.5 0 0 1-7.78-7.78l1.06-1.06L12 2.77l7.78 7.78 1.06 1.06a5.5 5.5 0 0 1 0 7.78z"/>
                            </svg>
                        </button>
                    </div>
                    <button class="use-btn" onclick="useDesign('${design.id}')">生成场景</button>
                    <button class="download-btn" onclick="downloadDesign('${design.id}')">下载设计</button>
                </div>
            </div>
        </div>
    `).join('');

    designCount.textContent = designs.length.toString();
}

function deleteDesign(id) {
    if (confirm('确定要删除这个设计吗？')) {
        designs = designs.filter(d => d.id !== id);
        saveDesigns();
        renderGallery();
    }
}

function toggleLike(id) {
    const design = designs.find(d => d.id === id);
    if (design) {
        design.liked = !design.liked;
        design.disliked = false;
        saveDesigns();
        renderGallery();
    }
}

function toggleDislike(id) {
    const design = designs.find(d => d.id === id);
    if (design) {
        design.disliked = !design.disliked;
        design.liked = false;
        saveDesigns();
        renderGallery();
    }
}

function useDesign(id) {
    const design = designs.find(d => d.id === id);
    if (design) {
        localStorage.setItem('selectedDesign', JSON.stringify(design));
        window.location.href = '3d-scene.html';
    }
}

async function downloadDesign(id) {
    const design = designs.find(d => d.id === id);
    if (design) {
        try {
            const response = await fetch(design.image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `design-${design.id}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            alert('图片已下载！');
        } catch (error) {
            console.error('下载失败:', error);
            alert('下载失败，请稍后重试。');
        }
    }
}

function addQuickPrompt(prompt) {
    chatInput.value = prompt;
    chatInput.focus();
}

function openModal(imageUrl) {
    modalImage.src = imageUrl;
    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    imageModal.classList.remove('show');
    document.body.style.overflow = '';
}

uploadPreview.addEventListener('click', function() {
    if (previewImg.src) {
        openModal(previewImg.src);
    }
});

imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadDesigns();
});
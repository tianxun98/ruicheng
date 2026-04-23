document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back-btn');
    const saveBtn = document.getElementById('save-btn');
    const patternGrid = document.getElementById('pattern-grid');
    const floorGrid = document.getElementById('floor-grid');
    const floorArea = document.getElementById('floor-area');
    const gapSlider = document.getElementById('gap-slider');
    const gapValue = document.getElementById('gap-value');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const viewBtns = document.querySelectorAll('.view-btn');
    const directionBtns = document.querySelectorAll('.direction-btn');
    const specSelect = document.querySelector('.spec-select');

    backBtn.addEventListener('click', () => {
        window.location.href = '3d-scene.html';
    });

    saveBtn.addEventListener('click', () => {
        alert('地板铺贴方案已保存！');
        window.location.href = '3d-scene.html';
    });

    const patternItems = patternGrid.querySelectorAll('.pattern-item');
    patternItems.forEach(item => {
        item.addEventListener('click', () => {
            patternItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const pattern = item.dataset.pattern;
            updateFloorPattern(pattern);
        });
    });

    function updateFloorPattern(pattern) {
        const patternColors = {
            'wood-1': { bg: '#d4a574', tile: '#c4966a' },
            'wood-2': { bg: '#5c4033', tile: '#4a3428' },
            'wood-3': { bg: '#a87d5a', tile: '#966b4c' },
            'wood-4': { bg: '#c9a962', tile: '#b89852' },
            'wood-5': { bg: '#e8c89a', tile: '#d7b889' },
            'wood-6': { bg: '#2d1f15', tile: '#1d120b' }
        };

        const colors = patternColors[pattern] || patternColors['wood-1'];
        floorArea.style.background = colors.bg;
        
        const tiles = floorGrid.querySelectorAll('.floor-tile');
        tiles.forEach(tile => {
            tile.style.background = `linear-gradient(135deg, ${colors.bg} 0%, ${colors.tile} 100%)`;
        });
    }

    gapSlider.addEventListener('input', () => {
        gapValue.textContent = gapSlider.value;
        floorGrid.style.gap = `${gapSlider.value}px`;
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            loadCategoryPatterns(category);
        });
    });

    function loadCategoryPatterns(category) {
        const patterns = {
            'wood': [
                { id: 'wood-1', name: '原木色', preview: 'linear-gradient(90deg, #d4a574 0%, #c4966a 50%, #d4a574 100%)' },
                { id: 'wood-2', name: '胡桃木', preview: 'linear-gradient(90deg, #5c4033 0%, #4a3428 50%, #5c4033 100%)' },
                { id: 'wood-3', name: '橡木', preview: 'linear-gradient(90deg, #a87d5a 0%, #966b4c 50%, #a87d5a 100%)' },
                { id: 'wood-4', name: '柚木', preview: 'linear-gradient(90deg, #c9a962 0%, #b89852 50%, #c9a962 100%)' },
                { id: 'wood-5', name: '松木', preview: 'linear-gradient(90deg, #e8c89a 0%, #d7b889 50%, #e8c89a 100%)' },
                { id: 'wood-6', name: '檀木', preview: 'linear-gradient(90deg, #2d1f15 0%, #1d120b 50%, #2d1f15 100%)' }
            ],
            'marble': [
                { id: 'marble-1', name: '雅士白', preview: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)' },
                { id: 'marble-2', name: '爵士白', preview: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e8e8e8 100%)' },
                { id: 'marble-3', name: '黑白根', preview: 'linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%)' },
                { id: 'marble-4', name: '金丝米黄', preview: 'linear-gradient(135deg, #f5deb3 0%, #deb887 50%, #f5deb3 100%)' },
                { id: 'marble-5', name: '啡网纹', preview: 'linear-gradient(135deg, #8b4513 0%, #654321 50%, #8b4513 100%)' },
                { id: 'marble-6', name: '大花白', preview: 'linear-gradient(135deg, #fffaf0 0%, #f5f5dc 50%, #fffaf0 100%)' }
            ],
            'tile': [
                { id: 'tile-1', name: '抛光砖', preview: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)' },
                { id: 'tile-2', name: '仿古砖', preview: 'linear-gradient(135deg, #d2b48c 0%, #bc9a6a 100%)' },
                { id: 'tile-3', name: '防滑砖', preview: 'linear-gradient(135deg, #a0a0a0 0%, #808080 100%)' },
                { id: 'tile-4', name: '微晶石', preview: 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)' },
                { id: 'tile-5', name: '玻化砖', preview: 'linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 100%)' },
                { id: 'tile-6', name: '文化砖', preview: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)' }
            ],
            'carpet': [
                { id: 'carpet-1', name: '纯色', preview: 'linear-gradient(135deg, #8b7355 0%, #6b5344 100%)' },
                { id: 'carpet-2', name: '条纹', preview: 'repeating-linear-gradient(90deg, #708090 0px, #708090 20px, #5f6e7e 20px, #5f6e7e 25px)' },
                { id: 'carpet-3', name: '格子', preview: 'linear-gradient(45deg, #8b7355 25%, transparent 25%), linear-gradient(-45deg, #8b7355 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #8b7355 75%), linear-gradient(-45deg, transparent 75%, #a08060 75%)' },
                { id: 'carpet-4', name: '几何', preview: 'linear-gradient(135deg, #5c4033 0%, #4a3428 100%)' },
                { id: 'carpet-5', name: '碎花', preview: 'linear-gradient(135deg, #d2b48c 0%, #bc9a6a 100%)' },
                { id: 'carpet-6', name: '简约', preview: 'linear-gradient(135deg, #a9a9a9 0%, #8a8a8a 100%)' }
            ]
        };

        const categoryPatterns = patterns[category] || patterns['wood'];
        patternGrid.innerHTML = '';
        
        categoryPatterns.forEach(pattern => {
            const item = document.createElement('div');
            item.className = 'pattern-item';
            item.dataset.pattern = pattern.id;
            item.innerHTML = `
                <div class="pattern-preview" style="background: ${pattern.preview};"></div>
                <span class="pattern-name">${pattern.name}</span>
            `;
            patternGrid.appendChild(item);
        });

        const newItems = patternGrid.querySelectorAll('.pattern-item');
        newItems.forEach(item => {
            item.addEventListener('click', () => {
                newItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                updateFloorPattern(item.dataset.pattern);
            });
        });

        if (newItems.length > 0) {
            newItems[0].click();
        }
    }

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === '3d') {
                alert('已切换到3D视图模式');
            }
        });
    });

    directionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            directionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const direction = btn.dataset.direction;
            updateTileDirection(direction);
        });
    });

    function updateTileDirection(direction) {
        const tiles = floorGrid.querySelectorAll('.floor-tile');
        
        if (direction === 'vertical') {
            floorGrid.style.gridTemplateColumns = 'repeat(6, 1fr)';
            floorGrid.style.gridTemplateRows = 'repeat(8, 1fr)';
        } else if (direction === 'diagonal') {
            tiles.forEach(tile => {
                tile.style.transform = 'rotate(45deg)';
                tile.style.margin = '-10%';
            });
        } else {
            floorGrid.style.gridTemplateColumns = 'repeat(8, 1fr)';
            floorGrid.style.gridTemplateRows = 'repeat(6, 1fr)';
            tiles.forEach(tile => {
                tile.style.transform = 'rotate(0deg)';
                tile.style.margin = '0';
            });
        }
    }

    specSelect.addEventListener('change', () => {
        const spec = specSelect.value;
        const [width, height] = spec.split('x').map(Number);
        
        const cols = Math.floor(400 / width);
        const rows = Math.floor(300 / height);
        
        floorGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        floorGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    });

    function initFloorGrid() {
        for (let i = 0; i < 48; i++) {
            const tile = document.createElement('div');
            tile.className = 'floor-tile';
            floorGrid.appendChild(tile);
        }
    }

    initFloorGrid();

    if (patternItems.length > 0) {
        patternItems[0].click();
    }
});
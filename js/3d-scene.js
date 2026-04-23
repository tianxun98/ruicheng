document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');
    const logoutBtn = document.getElementById('logout-btn');
    const backBtn = document.getElementById('back-btn');
    const modelImage = document.getElementById('model-image');
    
    const saveBtn = document.getElementById('save-btn');
    const clearBtn = document.getElementById('clear-btn');
    const aiRenderBtn = document.getElementById('ai-render-btn');
    const drawingBtn = document.getElementById('drawing-btn');

    const objectBtns = document.querySelectorAll('.object-btn');
    const objectName = document.getElementById('object-name');
    const distanceSlider = document.getElementById('distance-slider');
    const distanceValue = document.getElementById('distance-value');
    const viewBtns = document.querySelectorAll('.view-btn');

    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        if (pageContent) pageContent.classList.add('visible');
    }, 1000);

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'app-detail.html';
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('保存成功！设计方案已保存到本地。');
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('确定要清空当前场景吗？')) {
                modelImage.style.opacity = '0';
                setTimeout(() => {
                    modelImage.src = 'images/3d-scene.png';
                    modelImage.style.opacity = '1';
                }, 300);
                alert('场景已清空，恢复到初始状态。');
            }
        });
    }

    if (aiRenderBtn) {
        aiRenderBtn.addEventListener('click', () => {
            const loadingText = ['正在分析场景...', 'AI正在渲染...', '即将完成...'];
            let currentIndex = 0;
            
            aiRenderBtn.disabled = true;
            aiRenderBtn.style.opacity = '0.7';
            
            const loadingInterval = setInterval(() => {
                aiRenderBtn.querySelector('span').textContent = loadingText[currentIndex];
                currentIndex = (currentIndex + 1) % loadingText.length;
            }, 800);

            setTimeout(() => {
                clearInterval(loadingInterval);
                aiRenderBtn.querySelector('span').textContent = 'AI渲染';
                aiRenderBtn.disabled = false;
                aiRenderBtn.style.opacity = '1';
                alert('AI渲染完成！场景已更新。');
            }, 3000);
        });
    }

    if (drawingBtn) {
        drawingBtn.addEventListener('click', () => {
            alert('图纸功能已打开！\n\n可导出的图纸类型：\n- 建筑平面图\n- 立面图\n- 剖面图\n- 效果图');
        });
    }

    const objectInfo = {
        'floor': { name: '地板', length: 400, width: 300, height: 2 },
        'bed': { name: '床', length: 200, width: 180, height: 50 },
        'cabinet': { name: '柜子', length: 180, width: 60, height: 220 },
        'sofa': { name: '沙发', length: 220, width: 90, height: 85 }
    };

    objectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            objectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const objectType = btn.dataset.object;
            const info = objectInfo[objectType];
            
            if (info) {
                objectName.textContent = info.name;
                
                document.getElementById('dim-length').value = info.length;
                document.getElementById('dim-width').value = info.width;
                document.getElementById('dim-height').value = info.height;
                
                if (objectType === 'floor') {
                    window.location.href = 'floor-pattern.html';
                }
            }
        });
    });

    if (distanceSlider && distanceValue) {
        distanceSlider.addEventListener('input', () => {
            distanceValue.textContent = distanceSlider.value;
        });
    }

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const viewType = btn.dataset.view;
            let viewName = '';
            switch(viewType) {
                case 'top': viewName = '俯视图'; break;
                case 'front': viewName = '正视图'; break;
                case 'side': viewName = '侧视图'; break;
            }
            alert(`已切换到${viewName}视图`);
        });
    });

    const treeNodes = document.querySelectorAll('.tree-node');
    treeNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const expandIcon = node.querySelector('.expand-icon');
            const children = node.nextElementSibling;
            
            if (expandIcon && children && children.classList.contains('tree-children')) {
                expandIcon.classList.toggle('expanded');
                children.classList.toggle('expanded');
            }
        });
    });

    const treeItems = document.querySelectorAll('.tree-item');
    treeItems.forEach(item => {
        const spans = item.querySelectorAll('span:not(.expand-icon):not(.node-icon)');
        spans.forEach(span => {
            span.addEventListener('click', (e) => {
                e.stopPropagation();
                
                treeItems.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                
                const label = span.textContent.trim();
                if (label) {
                    objectName.textContent = label;
                    
                    if (label === '地板') {
                        window.location.href = 'floor-pattern.html';
                        return;
                    }
                    
                    const dims = getObjectDimensions(label);
                    if (dims) {
                        document.getElementById('dim-length').value = dims.length;
                        document.getElementById('dim-width').value = dims.width;
                        document.getElementById('dim-height').value = dims.height;
                    }
                }
            });
        });
    });

    function getObjectDimensions(name) {
        const dimMap = {
            '地板': { length: 400, width: 300, height: 2 },
            '瓷砖': { length: 60, width: 60, height: 0.8 },
            '墙面': { length: 400, width: 280, height: 1 },
            '吊顶': { length: 400, width: 300, height: 10 },
            '木门': { length: 90, width: 4, height: 210 },
            '防盗门': { length: 95, width: 8, height: 220 },
            '窗户': { length: 150, width: 120, height: 4 },
            '床': { length: 200, width: 180, height: 50 },
            '衣柜': { length: 200, width: 60, height: 220 },
            '床头柜': { length: 50, width: 40, height: 55 },
            '沙发': { length: 220, width: 90, height: 85 },
            '茶几': { length: 120, width: 60, height: 45 },
            '电视柜': { length: 180, width: 40, height: 50 },
            '橱柜': { length: 300, width: 60, height: 85 },
            '吊柜': { length: 150, width: 35, height: 70 },
            '餐柜': { length: 120, width: 45, height: 80 },
            '马桶': { length: 70, width: 40, height: 75 },
            '浴室柜': { length: 100, width: 50, height: 85 },
            '花洒': { length: 20, width: 20, height: 25 },
            '窗帘': { length: 300, width: 250, height: 5 },
            '地毯': { length: 200, width: 140, height: 1 },
            '装饰品': { length: 30, width: 30, height: 40 },
            '灯具': { length: 40, width: 40, height: 20 },
            '厨房电器': { length: 60, width: 60, height: 60 },
            '卫浴电器': { length: 50, width: 50, height: 80 },
            '生活电器': { length: 40, width: 40, height: 50 },
            '植物': { length: 50, width: 50, height: 120 },
            '户外家具': { length: 150, width: 80, height: 75 },
            '水景': { length: 200, width: 100, height: 50 }
        };
        return dimMap[name];
    }
});
## 实现计划：添加返回按钮功能

### 需求分析
用户要求在app-detail.html页面：
1. 点击缩略图打开大图（已实现）
2. 右上角添加返回图标按钮（close-btn已存在）
3. 鼠标悬停显示"返回上一级"文字（需修改）
4. 点击返回main.html页面（需修改）

### 修改内容

#### 1. 修改HTML样式（app-detail.html）
- 将 `.close-btn::after` 的 content 从 "返回上一层" 修改为 "返回上一级"

#### 2. 修改JavaScript逻辑（js/app-detail.js）
- 修改 `closeModal()` 函数，使其跳转到 main.html 页面

### 步骤
1. 修改 app-detail.html 中的提示文字
2. 修改 js/app-detail.js 中的 closeModal 函数
3. 测试功能是否正常工作

### 风险评估
- 低风险：修改仅涉及关闭模态框的行为
- 需要确保用户体验良好，点击后能正确跳转

### 文件修改列表
- e:\cad-to-3d\app-detail.html
- e:\cad-to-3d\js\app-detail.js
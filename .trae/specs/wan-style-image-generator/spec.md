# 通义万相风格图片生成器 - 产品需求文档

## Overview
- **Summary**: 创建一个参考阿里云通义万相图片生成页面风格的AI设计助手页面，包含简洁的头部导航、中间图片展示区和底部固定的对话框。
- **Purpose**: 提供一个现代化、直观的AI图片生成交互界面，提升用户体验。
- **Target Users**: 需要使用AI生成设计图的用户，包括设计师、开发者和普通用户。

## Goals
- 实现类似通义万相的页面布局结构
- 提供直观的图片生成交互体验
- 保持与现有项目的深色主题风格一致

## Non-Goals (Out of Scope)
- 不实现真实的阿里云万相API集成
- 不实现用户注册/登录功能
- 不实现高级图片编辑功能

## Background & Context
- 当前项目已有app-detail.html页面作为AI设计助手
- 需要将其重构为类似通义万相的布局风格
- 保持项目现有的深色主题配色

## Functional Requirements
- **FR-1**: 简洁头部导航，左侧无logo，右侧显示个人信息
- **FR-2**: 中间区域展示生成的图片
- **FR-3**: AI对话框固定悬浮在页面底部
- **FR-4**: 支持输入文字提示词生成图片
- **FR-5**: 支持上传参考图片
- **FR-6**: 支持对生成的图片进行操作（删除、点赞、应用）

## Non-Functional Requirements
- **NFR-1**: 响应式设计，适配不同屏幕尺寸
- **NFR-2**: 流畅的动画和过渡效果
- **NFR-3**: 符合现代UI设计标准

## Constraints
- **Technical**: 使用HTML/CSS/JavaScript，不引入新框架
- **Dependencies**: 使用现有的项目资源和样式变量

## Assumptions
- 用户已经登录，个人信息可用
- 图片生成API可用（使用现有方案）

## Acceptance Criteria

### AC-1: 头部导航布局
- **Given**: 用户访问页面
- **When**: 页面加载完成
- **Then**: 头部左侧无logo，右侧显示用户头像和名称
- **Verification**: `human-judgment`

### AC-2: 图片展示区域
- **Given**: 用户已生成图片
- **When**: 页面加载完成
- **Then**: 生成的图片以网格形式展示在中间区域
- **Verification**: `human-judgment`

### AC-3: 底部固定对话框
- **Given**: 用户访问页面
- **When**: 页面加载完成
- **Then**: AI对话框固定悬浮在页面底部，包含输入框和发送按钮
- **Verification**: `human-judgment`

### AC-4: 提示词输入
- **Given**: 用户在对话框中输入提示词
- **When**: 点击发送按钮
- **Then**: 系统生成图片并展示
- **Verification**: `programmatic`

### AC-5: 图片操作功能
- **Given**: 图片已生成并展示
- **When**: 用户点击操作按钮
- **Then**: 可以删除、点赞或应用该图片
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要保留现有的消息聊天记录展示？
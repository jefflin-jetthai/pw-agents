# 測試失敗時的螢幕截圖 - 快速指南

## ✅ 已啟用功能

此專案已成功配置**自動失敗時截圖**功能。

### 配置位置

- **全局配置**: `playwright.config.ts`
  - `screenshot: 'only-on-failure'` - 自動截圖失敗的測試
  - `screenshotDir: 'test-results/screenshots'` - 截圖保存目錄

- **測試代碼**: `tests/login_success_cases/*.spec.ts`
  - 每個測試都有 try-catch 塊
  - 失敗時額外生成手動截圖（含時間戳）

## 🎯 運行命令

### 運行全部登入測試
```bash
npx playwright test tests/login_success_cases/ --project=chromium
```

### 運行特定測試
```bash
npx playwright test tests/login_success_cases/valid_email_login_success.spec.ts
```

### 查看詳細報告
```bash
npx playwright show-report
```

### 只運行失敗的測試
```bash
npx playwright test --last-failed
```

## 📸 截圖位置

- **Playwright 自動截圖**: `test-results/screenshots/`
- **測試代碼手動截圖**: `test-results/screenshots/`
- **HTML 報告**: `test-results/index.html`

## 📊 測試狀態

目前所有 4 個登入測試都**通過** ✅：

1. ✅ `login_form_elements_visibility.spec.ts` - 登入表單元素驗證
2. ✅ `valid_email_login_success.spec.ts` - 有效電郵登入
3. ✅ `login_user_experience.spec.ts` - 登入用戶體驗
4. ✅ `game_lobby_after_login.spec.ts` - 遊戲大廳驗證

## 🔍 失敗時會發生什麼？

當測試失敗時，會自動執行：

1. **Playwright 框架**自動截圖（保存至 `test-results/screenshots/`）
2. **測試代碼**中的 try-catch 捕捉失敗
3. **手動截圖**（帶時間戳，便於區分多次失敗）
4. **HTML 報告**包含所有失敗的截圖和詳細信息

## 💡 使用場景

### 場景 1: 快速診斷登入失敗
```bash
# 運行測試
npx playwright test tests/login_success_cases/valid_email_login_success.spec.ts

# 如果失敗，查看報告
npx playwright show-report

# 在報告中查看失敗測試的截圖
```

### 場景 2: CI/CD 集成
```bash
# 在 CI 環境中運行
CI=true npx playwright test tests/login_success_cases/

# 失敗的截圖會自動保存，用於調查
```

### 場景 3: 性能和可見性問題診斷
- **頁面加載失敗**: 截圖顯示實際頁面狀態
- **元素不可見**: 截圖顯示佈局和 CSS 問題
- **導航問題**: 截圖顯示實際頁面 URL

## 📝 相關文件

- **完整文檔**: [TESTING_SCREENSHOTS.md](./TESTING_SCREENSHOTS.md)
- **測試配置**: [playwright.config.ts](./playwright.config.ts)
- **測試文件**: [tests/login_success_cases/](./tests/login_success_cases/)

## 🚀 下一步

建議：
1. 在本地運行一次測試確保環境正確
2. 修改測試以故意失敗，驗證截圖功能
3. 檢查 HTML 報告以確認截圖出現
4. 在 CI/CD 中配置失敗時的截圖上傳

## 常見命令

| 命令 | 功能 |
|------|------|
| `npx playwright test` | 運行所有測試 |
| `npx playwright test --debug` | 以調試模式運行 |
| `npx playwright show-report` | 打開 HTML 報告 |
| `npx playwright test --headed` | 有界面運行 |
| `npx playwright test --workers=1` | 單工作進程 |

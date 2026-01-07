# AI Agents 快速開始指南

5 分鐘快速上手 Playwright AI Agents！

---

## 🚀 快速開始

### 前提條件檢查

在開始前，請確認：

```bash
# 1. 檢查 Node.js 版本（需要 18+）
node --version

# 2. 檢查 Playwright 是否安裝
npx playwright --version

# 3. 安裝瀏覽器（如果還沒安裝）
npx playwright install

# 4. 確認 agents 檔案存在
ls -la .github/agents/
```

**必須有 GitHub Copilot 訂閱才能使用 agents！**

---

## 📝 第一個範例：建立登入測試

### 步驟 1：規劃測試（2 分鐘）

開啟 VS Code 的 Copilot Chat，輸入：

```
@playwright-test-planner 請為 https://demo.playwright.dev/todomvc 建立測試計劃
```

**Agent 會做什麼**：
1. ✅ 自動開啟網站
2. ✅ 探索所有功能
3. ✅ 識別測試場景
4. ✅ 生成測試計劃文件

**等待時間**：約 30-60 秒

**結果**：在 `specs/` 目錄會產生測試計劃檔案

---

### 步驟 2：生成測試程式碼（2 分鐘）

當 planner 完成後，繼續在 Copilot Chat 輸入：

```
@playwright-test-generator 根據剛才生成的測試計劃，生成所有測試程式碼
```

**Agent 會做什麼**：
1. ✅ 讀取測試計劃
2. ✅ 實際執行每個步驟
3. ✅ 記錄所有操作
4. ✅ 生成 TypeScript 測試檔案

**等待時間**：約 1-2 分鐘

**結果**：在 `tests/` 目錄會產生 `.spec.ts` 檔案

---

### 步驟 3：執行測試（1 分鐘）

```bash
# 執行剛生成的測試
npx playwright test

# 查看測試報告
npx playwright show-report
```

---

### 步驟 4：修復失敗的測試（如果有）

如果有測試失敗，在 Copilot Chat 輸入：

```
@playwright-test-healer 請修復剛才失敗的測試
```

**Agent 會做什麼**：
1. ✅ 執行測試找出失敗點
2. ✅ 分析錯誤原因
3. ✅ 自動修改程式碼
4. ✅ 重新執行驗證

**等待時間**：約 1-2 分鐘

---

## 🎯 實戰範例：測試現有網站

### 範例 1：測試電商網站

```
@playwright-test-planner 請為 https://demo.evershop.io 建立測試計劃，
重點測試：
1. 商品搜尋
2. 加入購物車
3. 查看購物車
請包含正常流程和錯誤處理
```

等待計劃完成後：

```
@playwright-test-generator 根據 specs/evershop-test-plan.md 生成測試，
請確保使用穩定的選擇器
```

---

### 範例 2：測試表單驗證

```
@playwright-test-planner 請為 https://www.uitestingplayground.com/sampleapp
建立測試計劃，重點測試：
1. 成功登入
2. 錯誤的使用者名稱
3. 錯誤的密碼
4. 空白欄位驗證
```

---

### 範例 3：測試動態內容

```
@playwright-test-planner 請為 https://www.uitestingplayground.com/ajax
建立測試計劃，測試 AJAX 載入的內容顯示
```

---

## 💡 常用指令速查

### Planner 指令模板

```
# 基本模板
@playwright-test-planner 請為 [URL] 建立測試計劃

# 指定功能
@playwright-test-planner 請為 [URL] 的 [功能名稱] 建立測試計劃

# 詳細需求
@playwright-test-planner 請為 [URL] 建立測試計劃，包含：
1. [場景1]
2. [場景2]
3. [場景3]
```

### Generator 指令模板

```
# 生成所有測試
@playwright-test-generator 根據 specs/[檔名].md 生成測試

# 指定輸出位置
@playwright-test-generator 根據 specs/[檔名].md 生成測試，
儲存到 tests/[路徑]/[檔名].spec.ts

# 只生成特定場景
@playwright-test-generator 只生成 specs/[檔名].md 中
「[場景名稱]」的測試
```

### Healer 指令模板

```
# 修復所有失敗測試
@playwright-test-healer 請修復 tests/[檔名].spec.ts 中的失敗測試

# 修復特定測試
@playwright-test-healer 請修復 tests/[檔名].spec.ts 中的
「[測試名稱]」測試

# 分析後再修復
@playwright-test-healer 請先分析 tests/[檔名].spec.ts 失敗的原因，
然後提供修復建議
```

---

## 🔧 常見問題快速解決

### Q1: 找不到 agents？

**檢查步驟**：
1. 確認 GitHub Copilot 已啟用（查看 VS Code 右下角）
2. 重新載入 VS Code：`Ctrl/Cmd + Shift + P` → "Reload Window"
3. 確認在專案根目錄打開 VS Code

---

### Q2: Agent 沒有回應？

**解決方法**：
1. 檢查網路連線
2. 等待更長時間（複雜任務可能需要 2-3 分鐘）
3. 簡化請求（一次做一件事）
4. 重新提交請求

---

### Q3: 生成的測試無法執行？

**修復步驟**：
```bash
# 1. 查看錯誤訊息
npx playwright test tests/[檔名].spec.ts

# 2. 使用 healer 修復
```

然後在 Copilot Chat 中：
```
@playwright-test-healer 請修復 tests/[檔名].spec.ts
```

---

### Q4: 測試選擇器不穩定？

**請 Healer 優化**：
```
@playwright-test-healer 請優化 tests/[檔名].spec.ts 中的選擇器，
使用更穩定的 getByRole 和 getByLabel
```

---

## 📚 下一步

完成快速開始後，建議：

1. **閱讀完整指南**
   - 📖 [AI-AGENTS-GUIDE.md](./AI-AGENTS-GUIDE.md) - 完整使用說明
   - 📖 [ARCHITECTURE.md](./ARCHITECTURE.md) - 專案架構

2. **實踐練習**
   - 🎯 為你的專案網站建立測試
   - 🎯 嘗試修復現有的失敗測試
   - 🎯 優化測試程式碼

3. **進階學習**
   - 🔧 自訂 agent 行為
   - 🔧 整合 CI/CD
   - 🔧 測試資料管理

---

## 🎓 實用技巧

### 技巧 1：分批處理

不要一次請求太多，分批更容易管理：

```
# ❌ 不好
@playwright-test-planner 請為整個網站建立所有測試

# ✅ 好
@playwright-test-planner 請為登入功能建立測試
（完成後再處理下一個功能）
```

---

### 技巧 2：提供上下文

給 agent 更多資訊會得到更好的結果：

```
# ❌ 不好
@playwright-test-generator 生成測試

# ✅ 好
@playwright-test-generator 根據 specs/login-test-plan.md 生成測試，
網站使用 Material-UI 元件，請使用 aria-label 選擇器
```

---

### 技巧 3：驗證結果

永遠驗證 agent 的輸出：

```bash
# 1. 檢視生成的程式碼
cat tests/[檔名].spec.ts

# 2. 執行測試
npx playwright test tests/[檔名].spec.ts --headed

# 3. 查看差異
git diff tests/[檔名].spec.ts
```

---

### 技巧 4：漸進式改進

從簡單開始，逐步完善：

**第一輪**：基本功能測試
```
@playwright-test-planner 請為登入功能建立基本測試計劃
```

**第二輪**：加入邊界條件
```
@playwright-test-planner 請在現有的登入測試計劃中，
加入錯誤處理和邊界條件場景
```

**第三輪**：優化和完善
```
@playwright-test-healer 請優化所有登入測試，
確保選擇器穩定且測試可靠
```

---

## 📊 效能對比

### 手動 vs 使用 Agents

| 任務 | 手動時間 | 使用 Agents | 節省 |
|------|---------|------------|------|
| 測試計劃 | 1-2 小時 | 2-5 分鐘 | 95% |
| 測試程式碼 | 2-4 小時 | 5-10 分鐘 | 90% |
| 除錯修復 | 30-60 分鐘 | 2-5 分鐘 | 90% |
| **總計** | **4-7 小時** | **10-20 分鐘** | **~95%** |

---

## ✅ 檢查清單

使用 agents 前，確認：

- [ ] ✅ GitHub Copilot 已啟用
- [ ] ✅ 在專案根目錄開啟 VS Code
- [ ] ✅ `.github/agents/` 目錄存在且有 3 個 agent 檔案
- [ ] ✅ Playwright 已安裝且瀏覽器已下載
- [ ] ✅ 網路連線正常

使用 agents 後，驗證：

- [ ] ✅ 測試計劃清晰且完整
- [ ] ✅ 測試程式碼可執行
- [ ] ✅ 選擇器穩定且語意化
- [ ] ✅ 測試獨立且可重複執行
- [ ] ✅ 有適當的等待和斷言

---

## 🎉 開始使用

現在你已經準備好了！打開 VS Code 的 Copilot Chat，輸入：

```
@playwright-test-planner 請為 https://demo.playwright.dev/todomvc 建立測試計劃
```

然後跟隨 agent 的指引，開始你的自動化測試之旅！

---

**需要更多協助？**
- 📖 查看 [AI-AGENTS-GUIDE.md](./AI-AGENTS-GUIDE.md)
- 🔍 搜尋 [Playwright 文件](https://playwright.dev/)
- 💬 在專案中建立 issue

**祝你測試愉快！** 🚀

# 註冊功能完整測試計劃

## Application Overview

Rakuplay 遊戲平台的電子郵件註冊功能測試計劃。該計劃涵蓋電子郵件註冊流程、表單驗證、註冊成功後的自動登入以及進入遊戲大廳等重要場景。測試使用隨機生成的電子郵件地址（格式：qa_yyyyMMdd_HHmmss）來避免帳號重複註冊。

## Test Scenarios

### 1. 註冊表單驗證

**Seed:** `tests/seed.spec.ts`

#### 1.1. 註冊表單元素可見性驗證

**File:** `tests/register/form_visibility.spec.ts`

**Steps:**
  1. 導航到註冊頁面 https://testssr.jteam.dev/register
  2. 驗證電子郵件輸入欄位存在
  3. 驗證密碼輸入欄位存在
  4. 驗證密碼顯示/隱藏切換按鈕存在
  5. 驗證用戶協議勾選框存在
  6. 驗證註冊按鈕存在
  7. 驗證登入連結存在

**Expected Results:**
  - 電子郵件輸入欄位可接受輸入
  - 密碼欄位顯示提示文字 'At least 6 characters'
  - 密碼切換按鈕可見
  - 用戶協議文本顯示 'I agree to the User Agreement & confirm I am at least 18 years old'
  - 註冊按鈕為藍色且可點擊
  - 登入連結文字為 'Already have an account?Login'

#### 1.2. 電子郵件輸入驗證

**File:** `tests/register/email_validation.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 在電子郵件欄位輸入有效的電子郵件地址 (例: qa_20260108_143025@test.com)
  3. 驗證欄位接受輸入
  4. 清空電子郵件欄位
  5. 嘗試不填電子郵件直接點擊註冊
  6. 輸入無效的電子郵件格式 (例: notanemail、test@、@test.com)
  7. 驗證欄位行為

**Expected Results:**
  - 有效電子郵件地址被接受
  - 空的電子郵件欄位應顯示錯誤提示或阻止提交
  - 無效格式的電子郵件應被拒絕或顯示錯誤提示
  - 欄位應驗證電子郵件格式

#### 1.3. 密碼欄位驗證

**File:** `tests/register/password_validation.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 輸入少於 6 個字符的密碼 (例: '12345')
  3. 嘗試點擊註冊按鈕
  4. 驗證是否顯示錯誤提示
  5. 輸入 6 個字符的密碼
  6. 輸入複雜密碼 (包含大小寫、數字、特殊字符)
  7. 點擊密碼顯示/隱藏按鈕
  8. 驗證密碼是否正確隱藏/顯示

**Expected Results:**
  - 少於 6 字符的密碼應顯示錯誤提示
  - 6 個字符的密碼應被接受
  - 複雜密碼應被接受
  - 點擊切換按鈕時密碼文本應在明文和隱文間切換
  - 隱藏狀態應顯示圓點或星號

#### 1.4. 用戶協議勾選驗證

**File:** `tests/register/agreement_validation.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 驗證用戶協議勾選框初始狀態 (未勾選)
  3. 不勾選協議直接點擊註冊
  4. 驗證是否阻止提交
  5. 點擊勾選框勾選協議
  6. 驗證勾選狀態
  7. 點擊 'User Agreement' 連結
  8. 驗證協議內容是否在新視窗或模態框中打開

**Expected Results:**
  - 勾選框初始為未勾選狀態
  - 未勾選時提交應被阻止
  - 勾選框可以被點擊並改變狀態
  - 勾選後應顯示勾選標記
  - 點擊協議連結應打開完整協議文本

### 2. 註冊完整流程

**Seed:** `tests/seed.spec.ts`

#### 2.1. 使用電子郵件成功註冊

**File:** `tests/register/successful_registration_email.spec.ts`

**Steps:**
  1. 導航到註冊頁面 https://testssr.jteam.dev/register
  2. 輸入隨機生成的電子郵件地址 (格式: qa_yyyyMMdd_HHmmss@test.com，例: qa_20260108_143025@test.com)
  3. 在密碼欄位輸入有效密碼 (至少 6 個字符) (例: TestPass123)
  4. 點擊用戶協議勾選框進行勾選
  5. 驗證勾選框已勾選
  6. 點擊 'Register' 按鈕
  7. 等待頁面重定向
  8. 驗證是否自動登入
  9. 驗證是否進入遊戲大廳畫面 (Lobby/Games 頁面)
  10. 驗證使用者帳戶信息是否顯示

**Expected Results:**
  - 電子郵件地址被接受
  - 密碼欄位接受有效密碼
  - 勾選框狀態改變
  - 註冊按鈕可點擊
  - 頁面成功提交
  - 自動登入成功
  - 頁面重定向到遊戲大廳
  - 顯示個人使用者信息 (例如帳戶名稱或餘額)
  - 未要求再次手動登入

#### 2.2. 註冊後自動登入驗證

**File:** `tests/register/auto_login_verification.spec.ts`

**Steps:**
  1. 進行成功的註冊流程 (輸入電子郵件、密碼、勾選協議、點擊註冊)
  2. 監控頁面導航
  3. 驗證不出現登入頁面提示
  4. 驗證直接進入已授權頁面
  5. 檢查瀏覽器 cookie/session 存儲
  6. 驗證授權 token 存在
  7. 打開開發者工具檢查 localStorage/sessionStorage
  8. 驗證會話信息存在

**Expected Results:**
  - 註冊後自動跳轉，無需再次登入
  - 會話 cookie 被設置
  - 授權 token 存在於存儲中
  - 使用者可直接訪問受保護的資源 (遊戲大廳)
  - 頁面 URL 不是登入頁面

#### 2.3. 註冊完成後遊戲大廳訪問驗證

**File:** `tests/register/lobby_access_verification.spec.ts`

**Steps:**
  1. 完成成功的註冊並自動登入
  2. 驗證當前頁面 URL 包含遊戲大廳相關路徑 (例: /lobby, /games, /home)
  3. 驗證頁面標題包含遊戲相關內容
  4. 驗證遊戲列表或卡片可見
  5. 驗證使用者帳戶信息區域存在
  6. 驗證登出按鈕存在 (表示已登入)
  7. 驗證導航菜單可見且可操作
  8. 嘗試導航到不同的遊戲或頁面
  9. 驗證使用者權限有效

**Expected Results:**
  - 成功進入遊戲大廳頁面
  - 頁面顯示遊戲列表或推薦遊戲
  - 使用者帳戶信息正常顯示
  - 可見登出或帳戶設置選項
  - 所有互動元素可用
  - 使用者可以瀏覽和選擇遊戲

#### 2.4. 重複註冊相同電子郵件驗證

**File:** `tests/register/duplicate_registration.spec.ts`

**Steps:**
  1. 導航到登入頁面
  2. 使用已註冊的帳戶登入 (例: 已知存在的電子郵件)
  3. 登出或在新標籤頁打開註冊頁面
  4. 導航到註冊頁面
  5. 輸入相同的電子郵件
  6. 輸入新密碼
  7. 勾選用戶協議
  8. 點擊 'Register' 按鈕
  9. 等待伺服器回應
  10. 驗證錯誤提示

**Expected Results:**
  - 重複電子郵件應被拒絕
  - 顯示錯誤提示 (例: 'Email already registered' 或類似)
  - 表單不提交
  - 使用者停留在註冊頁面
  - 錯誤消息清晰且可理解

#### 2.5. 使用隨機電子郵件註冊多個帳戶

**File:** `tests/register/random_email_registration.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 生成隨機電子郵件地址 (格式: qa_yyyyMMdd_HHmmss@test.com)
  3. 輸入生成的隨機電子郵件 (例: qa_20260108_153045@test.com)
  4. 輸入密碼
  5. 勾選用戶協議
  6. 點擊 'Register'
  7. 驗證註冊成功
  8. 進行第二次測試，使用不同的隨機電子郵件 (例: qa_20260108_153055@test.com)
  9. 再次完成註冊流程
  10. 驗證兩次都成功

**Expected Results:**
  - 隨機電子郵件格式被接受
  - 第一次註冊成功
  - 第二次使用不同電子郵件也成功
  - 兩個帳戶都可獨立使用
  - 避免重複帳號衝突

### 3. 邊界和錯誤情況

**Seed:** `tests/seed.spec.ts`

#### 3.1. 空表單提交

**File:** `tests/register/empty_form_submission.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 不填寫任何欄位
  3. 不勾選用戶協議
  4. 直接點擊 'Register' 按鈕
  5. 觀察回應

**Expected Results:**
  - 表單提交應被阻止
  - 應顯示驗證錯誤 (電子郵件必填、密碼必填、協議必須勾選)
  - 使用者停留在註冊表單

#### 3.2. 無效的電子郵件格式

**File:** `tests/register/invalid_email_format.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 輸入無效的電子郵件格式 (例: 空白、不含@、缺少域名)
  3. 輸入有效密碼
  4. 勾選協議
  5. 點擊 'Register'
  6. 觀察驗證結果

**Expected Results:**
  - 無效格式應被拒絕或顯示錯誤
  - 應顯示特定的驗證提示 (例如 'Please enter a valid email address')
  - 表單不提交

#### 3.3. 超長輸入測試

**File:** `tests/register/long_input_test.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 在電子郵件欄位輸入超長字符串 (例如: 256+ 字符的電子郵件)
  3. 在密碼欄位輸入超長密碼 (例如: 1000+ 字符)
  4. 點擊 'Register'
  5. 驗證系統行為

**Expected Results:**
  - 系統應有最大長度限制
  - 超長輸入應被截斷或拒絕
  - 不應導致頁面崩潰或當機

#### 3.4. 網路連接失敗時的註冊

**File:** `tests/register/network_failure.spec.ts`

**Steps:**
  1. 導航到註冊頁面
  2. 開啟開發者工具網路限流 (例: 離線模式)
  3. 填寫完整的註冊表單
  4. 點擊 'Register'
  5. 觀察錯誤處理
  6. 恢復網路連接
  7. 重新嘗試註冊

**Expected Results:**
  - 網路連接失敗時應顯示錯誤提示
  - 不應出現 500 錯誤或未處理的異常
  - 使用者可以看到清晰的錯誤消息
  - 網路恢復後可重新提交

#### 3.5. 並發註冊請求

**File:** `tests/register/concurrent_registration.spec.ts`

**Steps:**
  1. 打開兩個瀏覽器標籤頁
  2. 在兩個標籤頁中都導航到註冊頁面
  3. 使用相同的電子郵件在兩個標籤中都填寫表單
  4. 幾乎同時點擊兩個 'Register' 按鈕
  5. 觀察伺服器回應

**Expected Results:**
  - 只有一個註冊應成功
  - 另一個應收到重複帳號錯誤
  - 不應導致數據不一致

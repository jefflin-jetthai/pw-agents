# Rakuplay 登入測試計劃

## Application Overview

針對 Rakuplay 線上遊戲平台 (https://testssr.jteam.dev/login) 的登入功能測試，驗證使用電子郵件帳號進行成功登入，以及登入後進入遊戲大廳的流程。

## Test Scenarios

### 1. 登入功能測試

**Seed:** `tests/login_seed.spec.ts`

#### 1.1. 成功登入 - 使用有效的電子郵件和密碼

**File:** `tests/login_success_cases/valid_email_login_success.spec.ts`

**Steps:**
  1. 導航至登入頁面 https://testssr.jteam.dev/login
  2. 等待登入表單加載完成
  3. 驗證登入表單顯示「Phone Number / Email Address / User Account」輸入欄位
  4. 驗證登入表單顯示「Password」輸入欄位
  5. 點擊帳號輸入框
  6. 輸入電子郵件帳號 qa.test@gmail.com
  7. 點擊密碼輸入框
  8. 輸入密碼 Aa123456
  9. 點擊「Login」按鈕提交登入表單
  10. 等待頁面導向且加載完成（預期 3-5 秒）
  11. 驗證是否成功導向至遊戲大廳頁面
  12. 驗證頁面標題或導航中顯示用戶已登入的標記（如用戶名稱、帳戶餘額等）

**Expected Results:**
  - 登入表單正確顯示所有必填欄位（帳號、密碼）
  - 帳號和密碼成功被輸入到對應的輸入框
  - 點擊 Login 按鈕後，系統接受登入請求
  - 頁面成功導向至遊戲大廳或主遊戲頁面
  - 用戶登入狀態被正確識別，頁面顯示已登入用戶的相關資訊
  - 未顯示任何登入錯誤訊息或警告

#### 1.2. 登入頁面元素驗證

**File:** `tests/login_success_cases/login_form_elements_visibility.spec.ts`

**Steps:**
  1. 導航至登入頁面 https://testssr.jteam.dev/login
  2. 等待頁面完全加載
  3. 驗證「Phone Number / Email Address / User Account」標籤可見
  4. 驗證帳號輸入框可見且可點擊
  5. 驗證「Password」標籤可見
  6. 驗證密碼輸入框可見且可點擊
  7. 驗證「Forget Password?」鏈接可見
  8. 驗證「Login」按鈕可見且可點擊
  9. 驗證「Don't have an account? Register」註冊鏈接可見
  10. 驗證社交登入按鈕（如 Facebook、Google 等）可見

**Expected Results:**
  - 所有登入表單元素都正確顯示在頁面上
  - 帳號和密碼輸入框都可以接收用戶輸入
  - Login 按鈕處於可點擊狀態
  - 頁面佈局清晰，所有元素排列正確
  - 沒有任何元素被遮擋或隱藏

#### 1.3. 登入過程中的用戶體驗驗證

**File:** `tests/login_success_cases/login_user_experience.spec.ts`

**Steps:**
  1. 導航至登入頁面 https://testssr.jteam.dev/login
  2. 驗證頁面標題為「Rakuplay｜Most popular online slot games in Malaysia.」
  3. 驗證 Rakuplay logo 在頁面上可見
  4. 驗證登入表單背景或設計與首頁保持一致
  5. 點擊帳號輸入框，輸入 qa.test@gmail.com
  6. 驗證輸入框獲得焦點（顯示光標或邊框變化）
  7. 按 Tab 鍵移動到密碼輸入框
  8. 驗證焦點轉移到密碼輸入框
  9. 輸入密碼 Aa123456
  10. 驗證密碼輸入框顯示掩蓋字符（而非明文密碼）
  11. 點擊 Login 按鈕
  12. 驗證登入過程中是否有加載指示器（如旋轉圖標）
  13. 確認登入完成後頁面成功切換到遊戲大廳

**Expected Results:**
  - 頁面標題正確顯示
  - logo 和設計保持品牌一致性
  - 輸入框焦點變化正常
  - 密碼以掩蓋字符顯示（安全性驗證）
  - 登入過程有適當的視覺反饋
  - 登入完成後頁面正確轉向遊戲大廳
  - 整體用戶體驗流暢，無卡頓或錯誤

#### 1.4. 登入成功後的遊戲大廳驗證

**File:** `tests/login_success_cases/game_lobby_after_login.spec.ts`

**Steps:**
  1. 使用有效認證 (qa.test@gmail.com / Aa123456) 成功登入
  2. 等待遊戲大廳頁面完全加載（預期 3-5 秒內）
  3. 驗證頁面 URL 已更改（不再是 /login）
  4. 驗證頁面標題或頁面內容已更新
  5. 驗證顯示用戶帳號或用戶名稱的資訊區
  6. 驗證遊戲大廳中是否顯示遊戲列表或遊戲卡片
  7. 驗證導航欄或菜單中顯示已登入用戶的選項（如帳戶、登出等）
  8. 驗證頁面上顯示帳戶餘額或信用點數（如有）
  9. 驗證遊戲大廳中的各類遊戲分類是否可見（如 Vip Card Pro、specify_bets 1 等）
  10. 驗證可以點擊某個遊戲進行遊玩

**Expected Results:**
  - 成功登入後頁面 URL 和內容已改變
  - 用戶登入狀態被正確顯示和識別
  - 遊戲大廳界面正確加載，顯示可用遊戲
  - 所有登入後應顯示的元素都正確呈現
  - 用戶可以與遊戲大廳中的元素進行互動（如點擊遊戲）
  - 沒有顯示任何錯誤訊息或異常提示
  - 登入狀態在後續頁面導航中保持有效

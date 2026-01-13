# Copilot / AI Agent Instructions for pw-agents

目的：讓編碼代理（Copilot / AI agents）快速上手這個 Playwright 測試專案，提供可執行命令、重要檔案位置、專案慣例與常見調試 / CI 注意事項。

- **快速命令**
  - 安裝相依套件：
    ```bash
    npm install
    ```
  - 安裝 Playwright 瀏覽器（必要時）：
    ```bash
    npx playwright install
    ```
  - 執行所有測試：
    ```bash
    npx playwright test
    ```
  - 執行單一檔案：
    ```bash
    npx playwright test tests/example.spec.ts
    ```
  - 只在 `chromium` 上執行：
    ```bash
    npx playwright test --project=chromium
    ```
  - 開啟 HTML report：
    ```bash
    npx playwright show-report
    ```
  - 本地互動調試（headed）：
    ```bash
    PWDEBUG=1 npx playwright test --headed
    ```

- **這個專案的要點（Big Picture）**
  - 測試框架：使用 `@playwright/test`。核心設定檔為 [playwright.config.ts](playwright.config.ts#L1-L200)。
  - 測試位置：所有測試放在 [tests/](tests)（`testDir` 在設定檔中）。測試規劃置於 [specs/README.md](specs/README.md)。
  - CI 安全性：`playwright.config.ts` 已設定 `forbidOnly: !!process.env.CI`、retries 與 workers，CI 行為依 `CI` 環境變數決定。

- **可觀察的專案慣例與程式碼模式**
  - 匯入與斷言：測試檔皆使用 `import { test, expect } from '@playwright/test'`（例如 [tests/example.spec.ts](tests/example.spec.ts#L1-L20)）。
  - 選擇器偏好：範例使用 `getByRole(...)`（可見於 [tests/example.spec.ts](tests/example.spec.ts#L6-L14)），代表優先使用可及性選擇器而非脆弱的 CSS 路徑。
  - 組織：使用 `test.describe` 封裝測試組（見 [tests/seed.spec.ts](tests/seed.spec.ts#L1-L20)）。
  - config 備註：`trace: 'on-first-retry'`（在重試時會收集 trace），reporter 設為 `'html'`。

- **修改 / 擴充建議（agent 可直接執行的操作）**
  - 若要新增 NPM script，推薦加到 [package.json](package.json#L1-L50)：
    ```json
    "scripts": {
      "test": "playwright test",
      "test:report": "playwright show-report"
    }
    ```
  - 新增測試時：把檔案放在 `tests/`，命名以 `.spec.ts` 結尾，使用 `test()` 或 `test.describe()`。

- **調試與日誌**
  - 本地互動：`PWDEBUG=1 npx playwright test --headed`，會在失敗時停在瀏覽器供手動檢查。
  - 追蹤（trace）：重試第一輪會自動收集；也可用 CLI 強制開啟 `--trace on`。

- **CI 注意事項**
  - CI 應先執行 `npm ci` 或 `npm install`，再 `npx playwright install`，最後 `npx playwright test`。
  - config 已根據 `CI` env 調整重試與 worker 行為，避免在 CI 上並行造成不穩定。

- **關鍵檔案（閱讀優先順序）**
  - [playwright.config.ts](playwright.config.ts#L1-L200) — 測試配置（testDir、reporter、projects、trace、CI 行為）。
  - [package.json](package.json#L1-L50) — 目前沒有 scripts（agent 可以提議新增 script）。
  - [tests/example.spec.ts](tests/example.spec.ts#L1-L20) — 範例測試，示範 `getByRole` 與 `expect` 用法。
  - [tests/seed.spec.ts](tests/seed.spec.ts#L1-L20) — 專案保留的 seed/generation 測試位置。
  - [specs/README.md](specs/README.md) — 測試計畫描述位置（目前內容簡短）。

- **禁止與風險點（agents 應注意）**
  - 不要把 `test.only` 留在 code（CI 設定會 fail build）。
  - 由於 `package.json` 無 scripts，請不要假設有 `npm test`；使用 `npx playwright test` 或先補 scripts。

若內容有遺漏或專案有其他自動化/CI 文件，請提供或告訴我要額外納入哪些檔案，我會再更新此檔案。

---
請檢視並告訴我是否要補上範例 `package.json` scripts、或針對 CI 類型（GitHub Actions / other）加入範例 workflow。

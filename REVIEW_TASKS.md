# 程式碼庫巡檢任務建議

以下是針對目前 `wukong` 程式碼庫巡檢後提出的 4 個可執行任務，每個任務對應一個類型：拼字、錯誤修正、註解/文件落差、測試改進。

## 1) 拼字錯誤修正任務
**問題**：目前 README 只有極簡描述，後續若擴充時容易混入不一致的英文詞彙（例如 `multi agent`/`multi-agent`、`doppelganger`/`doppelgänger`）。

**任務**：建立一份「專案用詞與拼字規範」並在 README 套用。

**建議做法**：
- 在 README 新增一小節 `Terminology`，固定使用：
  - `multi-agent`（含連字號）
  - `doppelgänger`（使用變音符）
- 新增拼字檢查工具（例如 cspell）設定檔，納入 CI（若之後有 workflow）。

**完成標準**：
- README 出現一致用詞。
- cspell 可在本地通過並可擴充到 CI。

## 2) 錯誤修正任務
**問題**：README 未提供任何安裝或執行步驟，對使用者而言屬於功能性缺陷（無法成功上手）。

**任務**：補齊最小可執行流程，修正「無法依文件啟動」問題。

**建議做法**：
- README 增加 `Prerequisites`、`Quick Start`、`Troubleshooting`。
- 若專案尚未有可執行程式，先建立最小 CLI 或範例腳本，確保指令可跑。

**完成標準**：
- 新使用者可依 README 在乾淨環境完成至少一次啟動流程。
- 文件中每個指令都可被驗證執行。

## 3) 註解/文件落差修正任務
**問題**：README 宣稱可「effortlessly create a multi-agent collaborative application」，但缺少功能範圍、限制與示例，存在敘述與實際可驗證內容的落差。

**任務**：將 README 的產品宣告改為可驗證、可追蹤的文件內容。

**建議做法**：
- 新增 `Current Capabilities` 與 `Roadmap`。
- 為每個能力列出狀態（Implemented / In Progress / Planned）。
- 加上最小示例或連結到 examples 目錄。

**完成標準**：
- 每項宣告都能對應到程式碼、範例或 issue。
- README 不再只有行銷式描述。

## 4) 測試改進任務
**問題**：目前倉庫內沒有可見測試框架或測試案例，無法驗證核心宣告。

**任務**：建立基礎測試骨架與最小 smoke test。

**建議做法**：
- 依專案語言選定測試框架（例如 Python 用 pytest、Node.js 用 vitest/jest）。
- 新增至少 1 個 smoke test：驗證專案主流程可成功啟動或輸出預期訊息。
- 在 README 增加 `Testing` 小節。

**完成標準**：
- `test` 指令可執行且回傳成功。
- 任何後續 PR 都可在此基礎上擴充測試。

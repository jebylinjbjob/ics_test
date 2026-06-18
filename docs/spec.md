這專案是拿來測試ICS 行事曆的網站

測試情境一:下載ICS

測試情境二:訂閱ICS 需要後端?

> 訂閱情境需要一個可公開存取的 HTTP URL 持續提供 ICS，SvelteKit `+server.ts` 即可，不一定要獨立後端。

## TODO

### 基礎建設

- [ ] 建立 ICS 產生模組（`src/lib/ics.ts`）
  - 範例事件資料（標題、開始/結束時間、地點、描述）
  - 正確格式：`VCALENDAR`、`VEVENT`、`UID`、`DTSTAMP`、`DTSTART`、`DTEND`
- [ ] 實作 `/calendar.ics` API route（`src/routes/calendar.ics/+server.ts`）
  - `Content-Type: text/calendar; charset=utf-8`
  - 下載模式：`Content-Disposition: attachment; filename="calendar.ics"`
  - 訂閱模式：同一 URL，不加 attachment（行事曆 App 定期 GET）

### 測試頁面

- [ ] 改寫首頁（`src/routes/+page.svelte`）為 ICS 測試頁
  - **情境一**：下載 ICS 按鈕（`<a href="/calendar.ics?download=1" download>`）
  - **情境二**：顯示訂閱 URL（`https://...` 與 `webcal://...`）
  - 一鍵複製訂閱連結
  - 簡短操作說明（如何匯入 / 如何訂閱）

### 驗證

- [ ] **情境一**：下載 `.ics` 檔，匯入 Google / Outlook / Apple 行事曆，確認事件顯示正確
- [ ] **情境二**：以訂閱 URL 加入行事曆，確認能讀取事件
- [ ] 修改 ICS 內容後，訂閱端是否在下次同步時更新（驗證動態內容）

### 部署

- [ ] 部署至公開環境（Vercel 等），取得可外網存取的網域
- [ ] 用正式網域 URL 重新測試訂閱（`localhost` 無法被外部行事曆服務訂閱）

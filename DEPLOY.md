# WETOP 上線說明

此專案可部署到任何支援靜態網站的平台（GitHub Pages、Netlify、Vercel），
諮詢表單使用 FormSubmit 收件。

## 本機測試

1. npm install
2. npm run dev
3. npm run build

## FormSubmit 設定

1. 到 FormSubmit 啟用你的收件信箱。
2. 在部署平台設定環境變數（擇一即可）：
	- `VITE_FORMSUBMIT_EMAIL=<你的收件信箱>`
	- `VITE_FORMSUBMIT_ENDPOINT=https://formsubmit.co/<你的收件信箱>`
3. 重新部署網站。
4. 到正式站送出一次「預約健康設計諮詢」測試，確認信箱可收到通知。

## GitHub + 靜態託管部署

1. 將整個專案推到 GitHub。
2. 在你使用的平台（GitHub Pages / Netlify / Vercel）連接此 repo。
3. Build command 使用 `npm run build`。
4. Publish directory 使用 `dist`。

## 目前表單行為

- 若未設定 `VITE_FORMSUBMIT_EMAIL` 或 `VITE_FORMSUBMIT_ENDPOINT`，送出時會提示尚未設定。
- 設定完成後，前端會直接把資料送到 FormSubmit 並寄到你設定的信箱。
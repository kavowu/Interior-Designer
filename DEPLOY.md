# WETOP 上線說明

此專案已整理成可直接部署到 Netlify 的單頁網站。

## 本機測試

1. npm install
2. npm run dev
3. npm run build

## Netlify 部署

1. 將整個專案推到 GitHub。
2. 在 Netlify 建立新站並連接該 repo。
3. Build command 使用 `npm run build`。
4. Publish directory 使用 `dist`。
5. 首次部署後，到 Netlify 後台的 Forms / Submissions 查看諮詢名單。

## 目前表單行為

- 本機開發模式會模擬成功送出，方便預覽。
- 正式站部署到 Netlify 後，諮詢表單會進入 Netlify Forms submissions。
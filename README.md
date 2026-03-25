# CITY VOICE - 市民嘆願フォーム
市民の声をAIが要約・自動仕分けして担当部署へ届けるWebアプリです。

## デモ
https://petition-app-six.vercel.app

## 機能
- 市民がフォームから意見を送信
- ジャンル選択（道路・子育て・防災など）で入力をサポート
- Gemini AIが内容を分析・要約し、適切な担当部署へ自動振り分け
- スパム・誹謗中傷を自動検出し別アドレスへ振り分け
- 担当部署のメールアドレスへ自動送信（本番運用時は各部署の実際のメアドを設定）

## 技術スタック
- フロント: React / Vite / Chakra UI
- バックエンド: Node.js / Express
- AI: Google Gemini API（gemini-2.5-flash-lite）
- メール: Resend
- デプロイ: Vercel（フロント）/ Render（バックエンド）

## バックエンドリポジトリ
https://github.com/Rio-ui-wq/petition-backend

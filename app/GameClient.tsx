'use client'

import { useEffect, useRef } from 'react'

export default function GameClient() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!iframeRef.current) return

    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document
    if (!iframeDoc) return

    // Write the HTML structure to iframe
    iframeDoc.open()
    iframeDoc.write(`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Đoán Đồ Vật Qua Gợi Ý</title>
  <style>${getStyles()}</style>
</head>
<body>
<div id="laptop-shell">
  <div id="laptop-screen">
    <div id="laptop-inner">

      <!-- ===== INTRO ===== -->
      <div id="screen-intro" class="screen active">
        <div class="intro-box">
          <div class="intro-icon">🤖</div>
          <h1>Đoán Đồ Vật Qua Gợi Ý</h1>
          <p class="intro-desc">Chọn chế độ chơi của bạn!</p>
          <div class="mode-grid">
            <button class="mode-btn easy-btn" onclick="selectMode('easy')">
              <span class="mode-icon">🟢</span>
              <span class="mode-name">Dễ</span>
              <span class="mode-desc">40s · Không event · AI chậm</span>
              <span class="mode-levels">5 câu → Boss AI</span>
            </button>
            <button class="mode-btn medium-btn" onclick="selectMode('medium')">
              <span class="mode-icon">🟡</span>
              <span class="mode-name">Trung Bình</span>
              <span class="mode-desc">30s · Random events · AI vừa</span>
              <span class="mode-levels">5 câu → Boss AI</span>
            </button>
            <button class="mode-btn hard-btn" onclick="selectMode('hard')">
              <span class="mode-icon">🔴</span>
              <span class="mode-name">Khó</span>
              <span class="mode-desc">20s · Nhiều event · AI siêu nhanh</span>
              <span class="mode-levels">5 câu → Boss AI</span>
            </button>
            <button class="mode-btn predict-btn" onclick="selectMode('predict')">
              <span class="mode-icon">🧠</span>
              <span class="mode-name">Đoán Ý AI</span>
              <span class="mode-desc">Đoán AI sẽ chọn đáp án nào</span>
              <span class="mode-levels">5 câu · Không Boss</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ===== GAME ===== -->
      <div id="screen-game" class="screen">
        <div id="top-bar">
          <div id="mode-badge"></div>
          <div id="phase-badge"></div>
          <button id="btn-quit" onclick="showScreen('screen-intro')">✕ Thoát</button>
        </div>
        <div id="header">
          <div class="score-box ai-side">
            <span class="label" id="ai-label">🤖 AI</span>
            <span id="score-ai" class="score">0</span>
          </div>
          <div id="center-header">
            <div id="timer-box">
              <svg id="timer-svg" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="26" class="timer-bg"/>
                <circle cx="30" cy="30" r="26" class="timer-ring" id="timer-ring"/>
              </svg>
              <span id="timer-text">40</span>
            </div>
            <div id="round-info">Câu <span id="round-num">1</span> / <span id="round-total">5</span></div>
          </div>
          <div class="score-box player-side">
            <span class="label">👤 Bạn</span>
            <span id="score-player" class="score">0</span>
          </div>
        </div>
        <div id="event-banner" class="hidden"></div>
        <div id="game-body">
          <div id="ai-panel" class="side-panel">
            <div class="avatar" id="ai-avatar">🤖</div>
            <div class="panel-label" id="ai-panel-label">AI</div>
            <div id="ai-bubble" class="speech-bubble hidden"></div>
            <div id="ai-thinking" class="thinking-box">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
            <div id="ai-answer" class="answer-badge hidden"></div>
          </div>
          <div id="center-panel">
            <div id="predict-mode-box" class="hidden">
              <div class="predict-title">🧠 AI đang suy luận... Bạn đoán AI sẽ chọn gì?</div>
              <div id="predict-choices-main"></div>
              <div id="predict-result-msg" class="hidden"></div>
            </div>
            <div id="normal-mode-box">
              <div id="hints-box">
                <div id="hints-header">
                  <h3>🔍 Gợi ý:</h3>
                  <div id="hint-count-badge"></div>
                </div>
                <ul id="hints-list"></ul>
              </div>
              <div id="predict-event-box" class="hidden">
                <div class="predict-label">🧠 Đoán xem AI sẽ chọn gì? <span class="predict-bonus">+1 điểm thưởng!</span></div>
                <div id="predict-event-choices"></div>
              </div>
              <div id="choices-box">
                <button class="choice-btn" onclick="playerChoose(0)"></button>
                <button class="choice-btn" onclick="playerChoose(1)"></button>
                <button class="choice-btn" onclick="playerChoose(2)"></button>
                <button class="choice-btn" onclick="playerChoose(3)"></button>
              </div>
              <div id="powerup-bar">
                <div class="pu-bar-label">⚡ Kỹ năng:</div>
                <div id="powerup-slots"></div>
              </div>
            </div>
            <div id="round-result" class="hidden"></div>
          </div>
          <div id="player-panel" class="side-panel">
            <div class="avatar">👤</div>
            <div class="panel-label">Bạn</div>
            <div id="player-status" class="thinking-box">Đang chờ...</div>
            <div id="player-answer" class="answer-badge hidden"></div>
          </div>
        </div>
      </div>

      <!-- ===== BOSS TRANSITION ===== -->
      <div id="screen-boss-transition" class="screen">
        <div class="boss-transition-box">
          <div id="bt-phase-result"></div>
          <div class="bt-vs">🔥</div>
          <div class="bt-title">BOSS AI XUẤT HIỆN!</div>
          <div class="bt-desc">AI phản ứng cực nhanh · Dùng kỹ năng để cản!</div>
          <div id="bt-score-preview"></div>
          <div id="bt-powerups-preview" class="bt-powerups"></div>
          <button class="btn-primary" onclick="startBossPhase()">Chiến thôi!</button>
        </div>
      </div>

      <!-- ===== RESULT ===== -->
      <div id="screen-result" class="screen">
        <div class="result-box">
          <div id="result-icon" class="result-icon"></div>
          <h2 id="result-title"></h2>
          <div id="result-scores" class="result-scores"></div>
          <div id="result-history" class="result-history"></div>
          <div class="result-actions">
            <button onclick="showScreen('screen-intro')">🏠 Menu</button>
            <button onclick="replayGame()">🔄 Chơi lại</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</body>
</html>
    `)
    iframeDoc.close()

    // Load the game script after document is ready
    setTimeout(() => {
      const script = iframeDoc.createElement('script')
      script.src = '/game.js'
      iframeDoc.body.appendChild(script)
    }, 100)

    return () => {
      if (iframeRef.current && iframeDoc.body.lastChild?.tagName === 'SCRIPT') {
        iframeDoc.body.removeChild(iframeDoc.body.lastChild)
      }
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        background: '#0f0f0f'
      }}
      title="Game Doan Do Vat"
      sandbox="allow-same-origin allow-scripts"
    />
  )
}

function getStyles(): string {
  return `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  color: #fff;
  overflow: hidden;
}

#laptop-shell {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  position: relative;
}

#laptop-screen {
  width: 90vw;
  max-width: 900px;
  height: 90vh;
  max-height: 800px;
  background: #222;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

#laptop-inner {
  flex: 1;
  display: flex;
  position: relative;
}

.screen {
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
}

.screen.active {
  display: flex;
  position: relative;
  z-index: 10;
}

.intro-box {
  text-align: center;
  padding: 40px 20px;
  animation: slideInUp 0.6s ease-out;
}

.intro-icon {
  font-size: 80px;
  margin-bottom: 20px;
  display: block;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.intro-box h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #fff;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.intro-desc {
  font-size: 1.1em;
  color: #aaa;
  margin-bottom: 30px;
}

.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  max-width: 900px;
}

.mode-btn {
  padding: 20px 15px;
  border: 2px solid transparent;
  border-radius: 15px;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 0.95em;
}

.mode-btn:hover {
  background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
  border-color: #00d4ff;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
}

.easy-btn { border-color: #00ff00; }
.medium-btn { border-color: #ffaa00; }
.hard-btn { border-color: #ff3333; }
.predict-btn { border-color: #aa00ff; }

.mode-icon {
  font-size: 2em;
}

.mode-name {
  font-weight: 700;
  font-size: 1.2em;
}

.mode-desc {
  font-size: 0.85em;
  color: #888;
}

.mode-levels {
  font-size: 0.8em;
  color: #666;
}

#top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(30, 30, 30, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

#mode-badge, #phase-badge {
  padding: 8px 15px;
  background: rgba(100, 100, 100, 0.5);
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
}

#btn-quit {
  background: rgba(255, 50, 50, 0.2);
  border: 1px solid rgba(255, 50, 50, 0.5);
  color: #ff6666;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

#btn-quit:hover {
  background: rgba(255, 50, 50, 0.4);
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 20px;
}

.score-box {
  flex: 1;
  text-align: center;
}

.score-box .label {
  display: block;
  font-size: 0.9em;
  color: #aaa;
  margin-bottom: 5px;
}

.score-box .score {
  display: block;
  font-size: 2em;
  font-weight: 700;
  color: #00ff00;
}

.ai-side .score { color: #00d4ff; }
.player-side .score { color: #ffaa00; }

#center-header {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

#timer-box {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#timer-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.timer-bg {
  fill: none;
  stroke: rgba(100, 100, 100, 0.3);
  stroke-width: 2;
}

.timer-ring {
  fill: none;
  stroke: #00ff00;
  stroke-width: 2;
  stroke-dasharray: 163.36;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.1s linear;
}

#timer-text {
  position: absolute;
  font-size: 1.8em;
  font-weight: 700;
  color: #00ff00;
}

#round-info {
  font-size: 0.95em;
  color: #aaa;
}

#game-body {
  flex: 1;
  display: flex;
  gap: 15px;
  padding: 15px;
  overflow: hidden;
}

.side-panel {
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(40, 40, 40, 0.5);
  border-radius: 15px;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.avatar {
  font-size: 3em;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.panel-label {
  font-size: 0.9em;
  color: #888;
  font-weight: 600;
}

.thinking-box {
  text-align: center;
  font-size: 0.85em;
  color: #666;
}

.thinking-box .dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #666;
  margin: 0 3px;
  animation: blink 1.4s ease-in-out infinite;
}

.thinking-box .dot:nth-child(1) { animation-delay: -0.32s; }
.thinking-box .dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes blink {
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
}

.speech-bubble {
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.5);
  padding: 10px;
  border-radius: 10px;
  font-size: 0.85em;
  color: #00d4ff;
  text-align: center;
  max-width: 150px;
  word-wrap: break-word;
}

.answer-badge {
  background: rgba(0, 255, 0, 0.2);
  border: 1px solid rgba(0, 255, 0, 0.5);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.85em;
  font-weight: 600;
  color: #00ff00;
  text-align: center;
}

#center-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  padding-right: 10px;
}

#hints-box {
  background: rgba(40, 40, 40, 0.5);
  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 12px;
  padding: 15px;
}

#hints-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

#hints-header h3 {
  font-size: 1em;
  color: #fff;
}

#hint-count-badge {
  background: rgba(255, 170, 0, 0.2);
  border: 1px solid rgba(255, 170, 0, 0.5);
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.8em;
  color: #ffaa00;
  font-weight: 600;
}

#hints-list {
  list-style: none;
  padding: 0;
}

#hints-list li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  font-size: 0.9em;
  color: #bbb;
}

#hints-list li:last-child {
  border-bottom: none;
}

#choices-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.choice-btn {
  padding: 15px;
  background: linear-gradient(135deg, #2a4a6a 0%, #1a2a4a 100%);
  border: 2px solid rgba(0, 212, 255, 0.3);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9em;
  font-weight: 600;
  text-align: center;
}

.choice-btn:hover {
  background: linear-gradient(135deg, #3a5a7a 0%, #2a3a5a 100%);
  border-color: #00d4ff;
  box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
}

.choice-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.choice-btn.correct {
  background: linear-gradient(135deg, #00aa00 0%, #006600 100%);
  border-color: #00ff00;
  color: #fff;
}

.choice-btn.wrong {
  background: linear-gradient(135deg, #aa0000 0%, #660000 100%);
  border-color: #ff6666;
  color: #fff;
}

#powerup-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(40, 40, 40, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.pu-bar-label {
  font-size: 0.85em;
  color: #888;
  font-weight: 600;
  white-space: nowrap;
}

#powerup-slots {
  display: flex;
  gap: 8px;
  flex: 1;
}

.powerup-slot {
  width: 40px;
  height: 40px;
  background: rgba(100, 100, 100, 0.3);
  border: 1px solid rgba(100, 100, 100, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.2s;
}

.powerup-slot:hover:not(.empty) {
  background: rgba(255, 170, 0, 0.3);
  border-color: rgba(255, 170, 0, 0.7);
  transform: scale(1.1);
}

.powerup-slot.empty {
  opacity: 0.3;
}

#round-result {
  background: rgba(40, 80, 40, 0.5);
  border: 2px solid rgba(0, 255, 0, 0.3);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  color: #00ff00;
  font-weight: 600;
}

.hidden {
  display: none !important;
}

.boss-transition-box {
  text-align: center;
  padding: 40px 20px;
  animation: slideInUp 0.6s ease-out;
}

#bt-phase-result {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #ffaa00;
}

.bt-vs {
  font-size: 3em;
  margin: 20px 0;
}

.bt-title {
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 10px;
  color: #ff3333;
  text-shadow: 0 0 20px rgba(255, 50, 50, 0.5);
}

.bt-desc {
  font-size: 1em;
  color: #aaa;
  margin-bottom: 20px;
}

#bt-score-preview {
  font-size: 1.1em;
  margin-bottom: 20px;
  color: #bbb;
}

.btn-primary {
  padding: 15px 40px;
  background: linear-gradient(135deg, #00aa00 0%, #006600 100%);
  border: 2px solid #00ff00;
  color: #fff;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 255, 0, 0.3);
}

.result-box {
  text-align: center;
  padding: 40px 20px;
}

.result-icon {
  font-size: 5em;
  margin-bottom: 20px;
}

#result-title {
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: 700;
}

.result-scores {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.result-history {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(40, 40, 40, 0.5);
  border-radius: 10px;
}

.result-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.result-actions button {
  padding: 12px 25px;
  background: linear-gradient(135deg, #2a4a6a 0%, #1a2a4a 100%);
  border: 2px solid rgba(0, 212, 255, 0.3);
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95em;
  font-weight: 600;
}

.result-actions button:hover {
  background: linear-gradient(135deg, #3a5a7a 0%, #2a3a5a 100%);
  border-color: #00d4ff;
  box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
  transform: translateY(-2px);
}

#predict-mode-box {
  background: rgba(40, 40, 40, 0.5);
  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
}

.predict-title {
  font-size: 1em;
  color: #fff;
  margin-bottom: 15px;
}

#predict-choices-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.predict-choice-btn {
  padding: 12px;
  background: linear-gradient(135deg, #3a4a6a 0%, #2a3a4a 100%);
  border: 1px solid rgba(170, 0, 255, 0.3);
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9em;
}

.predict-choice-btn:hover {
  border-color: rgba(170, 0, 255, 0.7);
  background: linear-gradient(135deg, #4a5a7a 0%, #3a4a5a 100%);
}

#predict-event-choices {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.predict-event-choice {
  padding: 10px;
  background: rgba(170, 0, 255, 0.1);
  border: 1px solid rgba(170, 0, 255, 0.3);
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.85em;
  text-align: center;
}

.predict-event-choice:hover {
  background: rgba(170, 0, 255, 0.2);
  border-color: rgba(170, 0, 255, 0.6);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .intro-box h1 {
    font-size: 1.8em;
  }

  .mode-grid {
    grid-template-columns: 1fr 1fr;
  }

  #game-body {
    flex-direction: column;
  }

  .side-panel {
    flex: 0 0 auto;
  }

  #choices-box {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  #laptop-shell {
    padding: 0;
  }

  #laptop-screen {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
  }

  .intro-box h1 {
    font-size: 1.5em;
  }

  .mode-grid {
    grid-template-columns: 1fr;
  }

  #choices-box {
    grid-template-columns: 1fr;
  }
}
  `
}

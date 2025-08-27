<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 4/6：实施跟踪与动态调整</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <!-- 核心目标说明 -->
      <div class="objective-section">
        <div class="objective-icon">🎯</div>
        <div class="objective-content">
          <h3>全流程支持干预落地</h3>
          <p>实时响应干预过程中的突发问题，避免"方案僵化"，提供动态调整方案</p>
        </div>
      </div>

      <!-- 智能对话区域 -->
      <div class="chat-container">
        <div class="chat-header">
          <div class="chat-title">
            <el-icon><ChatDotRound /></el-icon>
            <span>智能跟踪助手</span>
          </div>
          <div class="chat-status">
            <span class="status-dot"></span>
            <span>在线支持</span>
          </div>
        </div>

        <div class="chat-messages" ref="chatMessages">
          <!-- AI消息 -->
          <div class="message-item ai-message">
            <div class="message-avatar">
              <div class="ai-avatar">🤖</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text">
                  您好！我是您的智能跟踪助手。让我们开始今天的干预跟踪吧。<br><br>
                  今天尝试"优势强化法"时，学生的反应是怎样的？
                </div>
                <div class="message-options">
                  <el-button size="small" type="success" @click="selectOption('positive')">
                    积极配合，主动参与
                  </el-button>
                  <el-button size="small" type="warning" @click="selectOption('reluctant')">
                    有些抗拒，但愿意尝试
                  </el-button>
                  <el-button size="small" type="danger" @click="selectOption('refuse')">
                    拒绝记录，敷衍应对
                  </el-button>
                </div>
              </div>
              <div class="message-time">09:00</div>
            </div>
          </div>

          <!-- 用户回复消息（动态显示） -->
          <div v-if="userResponse" class="message-item user-message">
            <div class="message-avatar">
              <div class="user-avatar">👨‍🏫</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text">{{ userResponse }}</div>
              </div>
              <div class="message-time">{{ currentTime }}</div>
            </div>
          </div>

          <!-- AI回复消息（动态显示） -->
          <div v-if="aiResponse" class="message-item ai-message">
            <div class="message-avatar">
              <div class="ai-avatar">🤖</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text" v-html="aiResponse"></div>
                <div v-if="showAdjustmentSuggestion" class="adjustment-suggestion">
                  <div class="suggestion-header">
                    <el-icon><Lightbulb /></el-icon>
                    <span>调整建议</span>
                  </div>
                  <div class="suggestion-content">
                    <h4>调整策略：改为"您帮他记录，再读给他听"</h4>
                    <div class="step-list">
                      <div class="step-item">
                        <span class="step-number">1</span>
                        <span>观察学生当天的积极表现，您来记录</span>
                      </div>
                      <div class="step-item">
                        <span class="step-number">2</span>
                        <span>在课后谈心时，读给学生听</span>
                      </div>
                      <div class="step-item">
                        <span class="step-number">3</span>
                        <span>询问学生感受，引导认同</span>
                      </div>
                      <div class="step-item">
                        <span class="step-number">4</span>
                        <span>逐步引导学生参与记录</span>
                      </div>
                    </div>
                  </div>
                  <el-button size="small" type="success" @click="applySuggestion">
                    <el-icon><Check /></el-icon>
                    应用此建议
                  </el-button>
                </div>
                <div v-if="showNextQuestion" class="next-question">
                  <p>与家长沟通后，家长的态度如何？</p>
                  <div class="message-options">
                    <el-button size="small" type="success" @click="selectParentAttitude('cooperative')">
                      积极配合，愿意尝试建议
                    </el-button>
                    <el-button size="small" type="warning" @click="selectParentAttitude('doubtful')">
                      对学校方法有质疑
                    </el-button>
                    <el-button size="small" type="danger" @click="selectParentAttitude('avoidant')">
                      回避责任，推卸问题
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="message-time">{{ currentTime }}</div>
            </div>
          </div>

          <!-- 家长沟通回复 -->
          <div v-if="parentResponse" class="message-item user-message">
            <div class="message-avatar">
              <div class="user-avatar">👨‍🏫</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text">{{ parentResponse }}</div>
              </div>
              <div class="message-time">{{ currentTime }}</div>
            </div>
          </div>

          <!-- 家长沟通AI回复 -->
          <div v-if="parentAiResponse" class="message-item ai-message">
            <div class="message-avatar">
              <div class="ai-avatar">🤖</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text" v-html="parentAiResponse"></div>
                <div v-if="showCommunicationScript" class="communication-script">
                  <div class="script-header">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>应对质疑话术模板</span>
                  </div>
                  <div class="script-content">
                    "我理解您的担心。比如上周三数学课上，孩子因为题目难度大表现出焦虑情绪，当时他说'我肯定做不对'。我们想和您一起帮他建立更积极的自我对话方式。这些方法都是基于教育心理学研究的，我们可以先试行一周，您观察孩子的变化。"
                  </div>
                  <div class="script-tips">
                    <div class="tip-item">✓ 用具体事例说明问题</div>
                    <div class="tip-item">✓ 强调合作而非指责</div>
                    <div class="tip-item">✓ 提供试行期和调整机制</div>
                  </div>
                  <el-button size="small" type="primary" @click="copyScript">
                    <el-icon><CopyDocument /></el-icon>
                    复制话术
                  </el-button>
                </div>
                <div v-if="showSubjectQuestion" class="next-question">
                  <p>学生的情绪问题在特定学科课堂更明显吗？</p>
                  <div class="message-options">
                    <el-button size="small" type="warning" @click="selectSubject('math')">
                      数学课：计算焦虑明显
                    </el-button>
                    <el-button size="small" type="warning" @click="selectSubject('chinese')">
                      语文课：不愿表达
                    </el-button>
                    <el-button size="small" type="success" @click="selectSubject('none')">
                      没有特定学科问题
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="message-time">{{ currentTime }}</div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="chat-input">
          <el-input
            v-model="inputMessage"
            placeholder="描述您遇到的情况或问题..."
            @keyup.enter="sendMessage"
          >
            <template #append>
              <el-button @click="sendMessage" :disabled="!inputMessage.trim()">
                <el-icon><Promotion /></el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>

      <!-- 跟踪记录摘要 -->
      <div class="tracking-summary">
        <div class="summary-header">
          <el-icon><Document /></el-icon>
          <span>今日跟踪记录</span>
        </div>
        <div class="summary-content">
          <div class="summary-item" v-for="record in trackingRecords" :key="record.id">
            <div class="record-time">{{ record.time }}</div>
            <div class="record-content">{{ record.content }}</div>
            <div class="record-status" :class="record.status">{{ record.statusText }}</div>
          </div>
        </div>
      </div>

      <div class="button-group">
        <el-button @click="prevStep">上一步</el-button>
        <el-button @click="exportTracking">导出跟踪记录</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentorStep4',
  data() {
    return {
      inputMessage: '',
      userResponse: '',
      aiResponse: '',
      parentResponse: '',
      parentAiResponse: '',
      showAdjustmentSuggestion: false,
      showNextQuestion: false,
      showCommunicationScript: false,
      showSubjectQuestion: false,
      currentTime: '',
      trackingRecords: [
        {
          id: 1,
          time: '09:15',
          content: '优势强化法实施 - 学生拒绝记录',
          status: 'adjusted',
          statusText: '已调整'
        },
        {
          id: 2,
          time: '10:30',
          content: '家长沟通 - 家长质疑学校方法',
          status: 'resolved',
          statusText: '已解决'
        }
      ]
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    getCurrentTime() {
      return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    },
    selectOption(option) {
      this.currentTime = this.getCurrentTime()
      
      switch(option) {
        case 'positive':
          this.userResponse = '积极配合，主动参与'
          this.aiResponse = '太好了！学生的配合度很高，这说明方法选择得当。继续保持现有策略，可以逐步增加记录的深度。'
          this.showNextQuestion = true
          break
        case 'reluctant':
          this.userResponse = '有些抗拒，但愿意尝试'
          this.aiResponse = '这是正常的反应。建议您可以先降低要求，让学生从简单的记录开始，比如只记录一个优点。'
          this.showNextQuestion = true
          break
        case 'refuse':
          this.userResponse = '拒绝记录，敷衍应对'
          this.aiResponse = '遇到抗拒是常见情况，不用担心。'
          this.showAdjustmentSuggestion = true
          this.showNextQuestion = true
          break
      }
      
      this.scrollToBottom()
    },
    selectParentAttitude(attitude) {
      this.currentTime = this.getCurrentTime()
      
      switch(attitude) {
        case 'cooperative':
          this.parentResponse = '积极配合，愿意尝试建议'
          this.parentAiResponse = '家长的积极配合是成功的关键！这为后续工作奠定了良好基础。'
          this.showSubjectQuestion = true
          break
        case 'doubtful':
          this.parentResponse = '对学校方法有质疑'
          this.parentAiResponse = '家长的质疑是可以理解的，我们需要用具体事例来说明。'
          this.showCommunicationScript = true
          this.showSubjectQuestion = true
          break
        case 'avoidant':
          this.parentResponse = '回避责任，推卸问题'
          this.parentAiResponse = '遇到回避型家长需要调整沟通策略。建议改为微信沟通，发送孩子的小进步，逐步建立信任关系。'
          this.showSubjectQuestion = true
          break
      }
      
      this.scrollToBottom()
    },
    selectSubject(subject) {
      this.currentTime = this.getCurrentTime()
      
      if (subject === 'math') {
        this.$message.info('已记录数学课问题，建议联合数学老师制定课堂支持策略')
      } else if (subject === 'chinese') {
        this.$message.info('已记录语文课问题，建议提供更多表达机会和鼓励')
      } else {
        this.$message.success('很好，学生在各学科表现相对均衡')
      }
    },
    applySuggestion() {
      this.$message.success('调整建议已应用，请在实施中观察效果')
      this.trackingRecords.push({
        id: this.trackingRecords.length + 1,
        time: this.getCurrentTime(),
        content: '应用调整建议 - 优势强化法策略调整',
        status: 'applied',
        statusText: '已应用'
      })
    },
    copyScript() {
      this.$message.success('话术已复制到剪贴板')
    },
    sendMessage() {
      if (!this.inputMessage.trim()) return
      
      this.$message.info('消息已发送，AI正在分析...')
      this.inputMessage = ''
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight
        }
      })
    },
    exportTracking() {
      this.$message.success('跟踪记录导出中...')
    },
    prevStep() {
      this.$router.push('/mentor/step3')
    },
    nextStep() {
      this.$router.push('/mentor/step5')
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.step-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 20px 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-info {
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.objective-section {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.objective-icon {
  font-size: 2.5rem;
  margin-right: 20px;
}

.objective-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.objective-content p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
  line-height: 1.5;
}

.chat-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  border: 2px solid #e8e8e8;
  overflow: hidden;
  margin-bottom: 30px;
}

.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.chat-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #28a745;
  box-shadow: 0 0 8px rgba(40, 167, 69, 0.6);
}

.chat-messages {
  height: 500px;
  overflow-y: auto;
  padding: 20px;
  background: #fafafa;
}

.message-item {
  display: flex;
  margin-bottom: 20px;
  gap: 12px;
}

.message-item.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.ai-avatar, .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.ai-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-avatar {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.message-content {
  flex: 1;
  max-width: 70%;
}

.message-item.user-message .message-content {
  text-align: right;
}

.message-bubble {
  background: white;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e8e8;
}

.message-item.user-message .message-bubble {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.message-text {
  line-height: 1.6;
  margin-bottom: 10px;
}

.message-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
}

.message-options .el-button {
  border-radius: 20px;
  font-size: 0.9rem;
}

.adjustment-suggestion, .communication-script {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 2px solid #f39c12;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
}

.suggestion-header, .script-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #856404;
}

.suggestion-content h4 {
  margin: 0 0 10px 0;
  color: #856404;
}

.step-list {
  margin: 10px 0;
}

.step-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 10px;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #f39c12;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.script-content {
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-style: italic;
  line-height: 1.5;
  color: #856404;
}

.script-tips {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.tip-item {
  font-size: 0.9rem;
  color: #856404;
}

.next-question {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e8e8e8;
}

.next-question p {
  margin: 0 0 10px 0;
  font-weight: 600;
}

.message-time {
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
}

.message-item.user-message .message-time {
  text-align: right;
}

.chat-input {
  padding: 15px 20px;
  background: white;
  border-top: 1px solid #e8e8e8;
}

.tracking-summary {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 20px;
  border: 2px solid #e8e8e8;
  margin-bottom: 30px;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
}

.record-time {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.record-content {
  flex: 1;
  margin: 0 15px;
  color: #2c3e50;
}

.record-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.record-status.adjusted {
  background: #fff3cd;
  color: #856404;
}

.record-status.resolved {
  background: #d4edda;
  color: #155724;
}

.record-status.applied {
  background: #d1ecf1;
  color: #0c5460;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

@media (max-width: 768px) {
  .chat-messages {
    height: 400px;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .message-options {
    flex-direction: column;
  }
}
</style>

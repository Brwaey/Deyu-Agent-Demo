<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 6/6：长期成长跟踪</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <!-- 核心目标说明 -->
      <div class="objective-section">
        <div class="objective-icon">🌱</div>
        <div class="objective-content">
          <h3>构建持续跟踪机制</h3>
          <p>从"单次干预"升级为"长期成长陪伴"，关注学生社会情感能力的动态变化</p>
        </div>
      </div>

      <!-- 回访设置区域 -->
      <div class="visit-settings">
        <div class="settings-header">
          <el-icon><Calendar /></el-icon>
          <span>定期回访设置</span>
        </div>
        <div class="settings-content">
          <div class="setting-row">
            <div class="setting-item">
              <label>回访周期：</label>
              <el-radio-group v-model="visitSettings.frequency" @change="updateVisitSchedule">
                <el-radio label="weekly">每周一次</el-radio>
                <el-radio label="biweekly">每两周一次</el-radio>
                <el-radio label="monthly">每月一次</el-radio>
                <el-radio label="custom">自定义</el-radio>
              </el-radio-group>
            </div>
            <div class="setting-item" v-if="visitSettings.frequency === 'custom'">
              <label>自定义间隔：</label>
              <el-input-number v-model="visitSettings.customDays" :min="1" :max="90" /> 天
            </div>
          </div>
          <div class="setting-row">
            <div class="setting-item">
              <label>下次回访日期：</label>
              <el-date-picker
                v-model="visitSettings.nextVisitDate"
                type="date"
                placeholder="选择日期"
                :disabled-date="disabledDate"
              />
            </div>
            <div class="setting-item">
              <label>提醒方式：</label>
              <el-checkbox-group v-model="visitSettings.reminderMethods">
                <el-checkbox label="system">系统通知</el-checkbox>
                <el-checkbox label="email">邮件提醒</el-checkbox>
                <el-checkbox label="wechat">微信提醒</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="setting-actions">
            <el-button type="primary" @click="saveVisitSettings">
              <el-icon><Check /></el-icon>
              保存设置
            </el-button>
          </div>
        </div>
      </div>

      <!-- 智能对话区域 -->
      <div class="chat-container">
        <div class="chat-header">
          <div class="chat-title">
            <el-icon><ChatDotRound /></el-icon>
            <span>长期成长顾问</span>
          </div>
          <div class="chat-status">
            <span class="status-dot"></span>
            <span>持续关注中</span>
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
                  您好！我是您的长期成长顾问。让我们来回顾一下学生近期的表现。<br><br>
                  近1个月，学生的社会情感状态是否稳定？
                </div>
                <div class="message-options">
                  <el-button size="small" type="success" @click="selectStability('stable')">
                    状态稳定，持续改善
                  </el-button>
                  <el-button size="small" type="warning" @click="selectStability('fluctuating')">
                    基本稳定，偶有波动
                  </el-button>
                  <el-button size="small" type="danger" @click="selectStability('unstable')">
                    不太稳定，需要关注
                  </el-button>
                </div>
              </div>
              <div class="message-time">14:00</div>
            </div>
          </div>

          <!-- 用户回复消息（动态显示） -->
          <div v-if="stabilityResponse" class="message-item user-message">
            <div class="message-avatar">
              <div class="user-avatar">👨‍🏫</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text">{{ stabilityResponse }}</div>
              </div>
              <div class="message-time">{{ currentTime }}</div>
            </div>
          </div>

          <!-- AI回复消息（动态显示） -->
          <div v-if="stabilityAiResponse" class="message-item ai-message">
            <div class="message-avatar">
              <div class="ai-avatar">🤖</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text" v-html="stabilityAiResponse"></div>
                <div v-if="showPreventionQuestion" class="next-question">
                  <p>随着年级升高，学生可能面临新的挑战。需要提前准备预防策略吗？</p>
                  <div class="message-options">
                    <el-button size="small" type="primary" @click="selectPrevention('need')">
                      需要，制定预防策略
                    </el-button>
                    <el-button size="small" type="info" @click="selectPrevention('no_need')">
                      暂时不需要
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="message-time">{{ currentTime }}</div>
            </div>
          </div>

          <!-- 预防策略回复 -->
          <div v-if="preventionResponse" class="message-item user-message">
            <div class="message-avatar">
              <div class="user-avatar">👨‍🏫</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text">{{ preventionResponse }}</div>
              </div>
              <div class="message-time">{{ currentTime }}</div>
            </div>
          </div>

          <!-- 预防策略AI回复 -->
          <div v-if="preventionAiResponse" class="message-item ai-message">
            <div class="message-avatar">
              <div class="ai-avatar">🤖</div>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text" v-html="preventionAiResponse"></div>
                <div v-if="showPreventionStrategies" class="prevention-strategies">
                  <div class="strategies-header">
                    <el-icon><Star /></el-icon>
                    <span>预防策略建议</span>
                  </div>
                  <div class="strategies-content">
                    <h4>升学压力应对策略：</h4>
                    <div class="strategy-item">🎯 建立合理期望：帮助学生设定可达成的目标</div>
                    <div class="strategy-item">🧘 压力管理技巧：教授深呼吸和放松方法</div>
                    <div class="strategy-item">📅 时间管理训练：制定学习和休息的平衡计划</div>
                    
                    <h4>人际关系维护策略：</h4>
                    <div class="strategy-item">🤝 社交技能强化：练习主动交流和合作</div>
                    <div class="strategy-item">💬 冲突解决方法：学习理性沟通和妥协</div>
                    <div class="strategy-item">👥 支持网络建立：鼓励多元化的友谊关系</div>
                  </div>
                  <el-button size="small" type="success" @click="addToToolkit">
                    <el-icon><Plus /></el-icon>
                    添加到工具库
                  </el-button>
                </div>
                <div v-if="showSELTips" class="sel-tips">
                  <div class="tips-header">
                    <el-icon><Star /></el-icon>
                    <span>SEL培养小贴士</span>
                  </div>
                  <div class="tips-content">
                    <h4>本周推荐：如何在日常谈话中提升学生自我效能感</h4>
                    <div class="tip-item">💡 使用"你是如何做到的？"代替"你真棒"</div>
                    <div class="tip-item">💡 关注过程而非结果："我看到你很努力地思考"</div>
                    <div class="tip-item">💡 引导反思："这次的经验对你有什么启发？"</div>
                    <div class="tip-item">💡 建立成长思维："这次没成功，下次可以怎么改进？"</div>
                    
                    <h4>不同年龄段学生的情感需求差异：</h4>
                    <div class="age-group">
                      <strong>低年级(1-2年级)：</strong>需要更多安全感和归属感的建立
                    </div>
                    <div class="age-group">
                      <strong>中年级(3-4年级)：</strong>开始关注同伴认可和自我价值感
                    </div>
                    <div class="age-group">
                      <strong>高年级(5-6年级)：</strong>更注重独立性和自主决策能力
                    </div>
                  </div>
                  <div class="tips-actions">
                    <el-button size="small" @click="subscribeTips">
                      <el-icon><Bell /></el-icon>
                      订阅更多贴士
                    </el-button>
                    <el-button size="small" type="primary" @click="shareExperience">
                      <el-icon><Share /></el-icon>
                      分享经验
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
            placeholder="分享学生近期的表现或您的观察..."
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

      <!-- 成长档案摘要 -->
      <div class="growth-profile">
        <div class="profile-header">
          <el-icon><User /></el-icon>
          <span>学生成长档案</span>
        </div>
        <div class="profile-content">
          <div class="profile-timeline">
            <div class="timeline-item" v-for="record in growthRecords" :key="record.id">
              <div class="timeline-date">{{ record.date }}</div>
              <div class="timeline-content">
                <div class="timeline-title">{{ record.title }}</div>
                <div class="timeline-desc">{{ record.description }}</div>
                <div class="timeline-status" :class="record.status">{{ record.statusText }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="button-group">
        <el-button @click="prevStep">上一步</el-button>
        <el-button @click="generateGrowthReport">生成成长报告</el-button>
        <el-button type="success" @click="finishTracking">完成跟踪</el-button>
      </div>
    </div>

    <!-- 完成确认弹窗 -->
    <el-dialog v-model="finishVisible" title="长期跟踪设置完成" width="600px">
      <div class="finish-content">
        <div class="finish-success">
          <div class="success-icon">🎉</div>
          <h3>恭喜！长期跟踪机制已建立</h3>
          <p>系统将按照您的设置持续关注学生成长</p>
        </div>
        
        <div class="finish-summary">
          <div class="summary-item">
            <div class="summary-label">回访周期</div>
            <div class="summary-value">{{ getFrequencyText() }}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">下次回访</div>
            <div class="summary-value">{{ formatDate(visitSettings.nextVisitDate) }}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">提醒方式</div>
            <div class="summary-value">{{ visitSettings.reminderMethods.length }}种</div>
          </div>
        </div>
        
        <div class="finish-note">
          <el-icon><InfoFilled /></el-icon>
          <span>系统将在设定时间自动提醒您进行回访，并提供个性化的成长建议</span>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmFinish">
            <el-icon><Check /></el-icon>
            确认完成
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MentorStep6',
  data() {
    return {
      visitSettings: {
        frequency: 'monthly',
        customDays: 30,
        nextVisitDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        reminderMethods: ['system']
      },
      inputMessage: '',
      stabilityResponse: '',
      stabilityAiResponse: '',
      preventionResponse: '',
      preventionAiResponse: '',
      showPreventionQuestion: false,
      showPreventionStrategies: false,
      showSELTips: false,
      currentTime: '',
      finishVisible: false,
      growthRecords: [
        {
          id: 1,
          date: '2024-01-15',
          title: '干预方案启动',
          description: '开始实施优势强化法和情绪调节训练',
          status: 'completed',
          statusText: '已完成'
        },
        {
          id: 2,
          date: '2024-01-22',
          title: '第一周评估',
          description: '学生情绪调节能力有所提升，积极变化3项',
          status: 'positive',
          statusText: '积极进展'
        },
        {
          id: 3,
          date: '2024-01-29',
          title: '家校协作加强',
          description: '家长配合度提升，建立家庭情绪管理机制',
          status: 'positive',
          statusText: '协作良好'
        }
      ]
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    disabledDate(time) {
      return time.getTime() < Date.now() - 8.64e7 // 不能选择过去的日期
    },
    updateVisitSchedule() {
      const now = new Date()
      let nextDate = new Date(now)
      
      switch (this.visitSettings.frequency) {
        case 'weekly':
          nextDate.setDate(now.getDate() + 7)
          break
        case 'biweekly':
          nextDate.setDate(now.getDate() + 14)
          break
        case 'monthly':
          nextDate.setMonth(now.getMonth() + 1)
          break
        case 'custom':
          nextDate.setDate(now.getDate() + this.visitSettings.customDays)
          break
      }
      
      this.visitSettings.nextVisitDate = nextDate
    },
    saveVisitSettings() {
      this.$message.success('回访设置已保存')
    },
    getFrequencyText() {
      const texts = {
        weekly: '每周一次',
        biweekly: '每两周一次',
        monthly: '每月一次',
        custom: `每${this.visitSettings.customDays}天一次`
      }
      return texts[this.visitSettings.frequency] || '自定义'
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('zh-CN')
    },
    getCurrentTime() {
      return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    },
    selectStability(stability) {
      this.currentTime = this.getCurrentTime()
      
      switch(stability) {
        case 'stable':
          this.stabilityResponse = '状态稳定，持续改善'
          this.stabilityAiResponse = '太好了！学生状态稳定说明干预效果持续。让我们为未来可能的挑战做好准备。'
          this.showPreventionQuestion = true
          break
        case 'fluctuating':
          this.stabilityResponse = '基本稳定，偶有波动'
          this.stabilityAiResponse = '整体不错，偶有波动是正常的。我们需要识别波动的原因并制定应对策略。'
          this.showPreventionQuestion = true
          break
        case 'unstable':
          this.stabilityResponse = '不太稳定，需要关注'
          this.stabilityAiResponse = '需要重点关注。让我们分析不稳定的具体表现，调整支持策略。'
          this.showPreventionQuestion = true
          break
      }
      
      this.scrollToBottom()
    },
    selectPrevention(prevention) {
      this.currentTime = this.getCurrentTime()
      
      if (prevention === 'need') {
        this.preventionResponse = '需要，制定预防策略'
        this.preventionAiResponse = '基于学生当前情况，我为您准备了以下预防策略：'
        this.showPreventionStrategies = true
        this.showSELTips = true
      } else {
        this.preventionResponse = '暂时不需要'
        this.preventionAiResponse = '好的，我们将继续关注学生的发展情况。如果后续有需要，随时可以制定预防策略。'
        this.showSELTips = true
      }
      
      this.scrollToBottom()
    },
    addToToolkit() {
      this.$message.success('策略已添加到您的工具库')
    },
    subscribeTips() {
      this.$message.success('已订阅SEL培养小贴士，将定期为您推送')
    },
    shareExperience() {
      this.$message.info('是否需要将该学生的干预经验纳入"班级共性问题解决方案"？')
    },
    sendMessage() {
      if (!this.inputMessage.trim()) return
      
      this.$message.info('感谢您的分享，我正在分析...')
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
    generateGrowthReport() {
      this.$message.success('学生成长报告生成中...')
    },
    prevStep() {
      this.$router.push('/mentor/step5')
    },
    finishTracking() {
      this.finishVisible = true
    },
    confirmFinish() {
      this.finishVisible = false
      this.$message.success('长期跟踪设置完成！感谢使用共育小管家，期待为您提供持续支持。')
      localStorage.removeItem('mentorFormData')
      this.$router.push('/')
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
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
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

.visit-settings {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e8e8e8;
  margin-bottom: 30px;
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-row {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  min-width: 300px;
}

.setting-item label {
  font-weight: 600;
  color: #2c3e50;
  min-width: 120px;
}

.setting-actions {
  display: flex;
  justify-content: flex-start;
}

.chat-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  border: 2px solid #e8e8e8;
  overflow: hidden;
  margin-bottom: 30px;
}

.chat-header {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
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
  background: #ffc107;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.6);
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
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.user-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.prevention-strategies, .sel-tips {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 2px solid #28a745;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
}

.strategies-header, .tips-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #155724;
}

.strategies-content, .tips-content {
  margin-bottom: 15px;
  color: #155724;
}

.strategies-content h4, .tips-content h4 {
  margin: 0 0 10px 0;
  color: #155724;
}

.strategy-item, .tip-item {
  margin-bottom: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
}

.age-group {
  margin-bottom: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  line-height: 1.4;
}

.tips-actions {
  display: flex;
  gap: 10px;
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

.growth-profile {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e8e8e8;
  margin-bottom: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.profile-content {
  background: white;
  border-radius: 10px;
  padding: 25px;
  border: 1px solid #e8e8e8;
}

.profile-timeline {
  position: relative;
  padding-left: 50px;
}

.profile-timeline::before {
  content: '';
  position: absolute;
  left: 25px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 20px;
}

.timeline-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -35px;
  top: 12px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #28a745;
  border: 4px solid white;
  box-shadow: 0 0 0 3px #28a745;
  z-index: 2;
}

.timeline-date {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-block;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.timeline-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e8e8e8;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: #28a745;
}

.timeline-title {
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.timeline-title::before {
  content: '📋';
  font-size: 1rem;
}

.timeline-desc {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 12px;
  padding: 10px;
  background: rgba(40, 167, 69, 0.05);
  border-radius: 8px;
  border-left: 3px solid #28a745;
}

.timeline-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  gap: 6px;
}

.timeline-status::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.timeline-status.completed {
  background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.timeline-status.completed::before {
  background: #17a2b8;
}

.timeline-status.positive {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  border: 1px solid #c3e6cb;
}

.timeline-status.positive::before {
  background: #28a745;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .profile-timeline {
    padding-left: 30px;
  }
  
  .profile-timeline::before {
    left: 15px;
    width: 2px;
  }
  
  .timeline-item::before {
    left: -25px;
    width: 12px;
    height: 12px;
    border: 3px solid white;
    box-shadow: 0 0 0 2px #28a745;
  }
  
  .timeline-content {
    padding: 15px;
  }
  
  .timeline-title {
    font-size: 1rem;
  }
  
  .timeline-desc {
    font-size: 0.9rem;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .profile-content {
    padding: 15px;
  }
  
  .profile-timeline {
    padding-left: 25px;
  }
  
  .profile-timeline::before {
    left: 12px;
  }
  
  .timeline-item::before {
    left: -22px;
    width: 10px;
    height: 10px;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #28a745;
  }
  
  .timeline-date {
    font-size: 0.8rem;
    padding: 3px 8px;
  }
  
  .timeline-content {
    padding: 12px;
  }
  
  .timeline-title {
    font-size: 0.95rem;
  }
  
  .timeline-desc {
    font-size: 0.85rem;
  }
  
  .timeline-status {
    font-size: 0.8rem;
    padding: 4px 12px;
  }
}
</style>

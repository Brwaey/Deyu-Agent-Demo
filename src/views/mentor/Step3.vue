<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 3/6：干预方案设计</div>
      <el-button @click="goHome" class="home-btn">
        <el-icon><HomeFilled /></el-icon>
        返回首页
      </el-button>
    </div>

    <div class="content-card">
      <div class="design-intro">
        <div class="intro-card">
          <div class="intro-icon">🎯</div>
          <div class="intro-content">
            <h3>个性化干预方案</h3>
            <p>基于学生具体情况，为您量身定制多维度干预策略</p>
          </div>
        </div>
      </div>

      <el-row :gutter="30" class="main-content">
        <!-- 导师干预模块 -->
        <el-col :span="12">
          <div class="intervention-module">
            <div class="module-header">
              <div class="header-icon">👨‍🏫</div>
              <div class="header-content">
                <h3>导师干预策略</h3>
                <p>针对'情绪调节能力不足'的专业方法</p>
              </div>
            </div>
            
            <div class="methods-container">
              <div class="method-item" :class="{ 'expanded': showDetails.method1 }">
                <div class="method-header" @click="toggleDetails('method1')">
                  <div class="method-info">
                    <div class="method-icon">⭐</div>
                    <div class="method-title">
                      <h4>优势强化法</h4>
                      <span class="method-subtitle">每天记录1件学生做得好的事</span>
                    </div>
                  </div>
                  <el-button size="small" type="text" class="expand-btn">
                    <el-icon>
                      <ArrowDown v-if="!showDetails.method1" />
                      <ArrowUp v-else />
                    </el-icon>
                  </el-button>
                </div>
                <el-collapse-transition>
                  <div v-show="showDetails.method1" class="method-details">
                    <div class="detail-section">
                      <div class="detail-label">实施时段</div>
                      <div class="detail-content">班会 / 课后谈心</div>
                    </div>
                    <div class="detail-section">
                      <div class="detail-label">具体步骤</div>
                      <div class="detail-content">
                        <div class="step-list">
                          <div class="step-item">
                            <span class="step-number">1</span>
                            <span>引导学生回忆当天的积极表现</span>
                          </div>
                          <div class="step-item">
                            <span class="step-number">2</span>
                            <span>用便签记录具体行为和感受</span>
                          </div>
                          <div class="step-item">
                            <span class="step-number">3</span>
                            <span>每周整理成"成长小册子"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="detail-section">
                      <div class="detail-label">预期效果</div>
                      <div class="detail-content">
                        <el-tag type="success" size="small">提升自信心</el-tag>
                        <el-tag type="info" size="small">增强自我认知</el-tag>
                      </div>
                    </div>
                  </div>
                </el-collapse-transition>
              </div>

              <div class="method-item" :class="{ 'expanded': showDetails.method2 }">
                <div class="method-header" @click="toggleDetails('method2')">
                  <div class="method-info">
                    <div class="method-icon">🧘</div>
                    <div class="method-title">
                      <h4>情绪调节训练</h4>
                      <span class="method-subtitle">1分钟深呼吸法</span>
                    </div>
                  </div>
                  <el-button size="small" type="text" class="expand-btn">
                    <el-icon>
                      <ArrowDown v-if="!showDetails.method2" />
                      <ArrowUp v-else />
                    </el-icon>
                  </el-button>
                </div>
                <el-collapse-transition>
                  <div v-show="showDetails.method2" class="method-details">
                    <div class="detail-section">
                      <div class="detail-label">话术模板</div>
                      <div class="script-template">
                        <div class="script-icon">💬</div>
                        <div class="script-text">
                          "当你感到生气时，试着慢慢数到5，深深吸一口气，然后慢慢呼出来。想象把不开心的情绪都呼出去了。"
                        </div>
                        <el-button size="small" type="primary" @click="copyScript">复制</el-button>
                      </div>
                    </div>
                    <div class="detail-section">
                      <div class="detail-label">练习频率</div>
                      <div class="detail-content">每天课前3分钟</div>
                    </div>
                  </div>
                </el-collapse-transition>
              </div>

              <div class="method-item" :class="{ 'expanded': showDetails.method3 }">
                <div class="method-header" @click="toggleDetails('method3')">
                  <div class="method-info">
                    <div class="method-icon">🤝</div>
                    <div class="method-title">
                      <h4>社交技能训练</h4>
                      <span class="method-subtitle">同理心练习</span>
                    </div>
                  </div>
                  <el-button size="small" type="text" class="expand-btn">
                    <el-icon>
                      <ArrowDown v-if="!showDetails.method3" />
                      <ArrowUp v-else />
                    </el-icon>
                  </el-button>
                </div>
                <el-collapse-transition>
                  <div v-show="showDetails.method3" class="method-details">
                    <div class="detail-section">
                      <div class="detail-label">活动设计</div>
                      <div class="detail-content">角色互换游戏</div>
                    </div>
                    <div class="detail-section">
                      <div class="detail-label">实施方法</div>
                      <div class="detail-content">让学生体验不同角色的感受</div>
                    </div>
                    <div class="detail-section">
                      <div class="detail-label">评估标准</div>
                      <div class="detail-content">能说出对方的感受</div>
                    </div>
                  </div>
                </el-collapse-transition>
              </div>
            </div>

            <div class="cooperation-section">
              <div class="cooperation-header">
                <div class="cooperation-icon">👥</div>
                <div class="cooperation-title">协作支持</div>
              </div>
              <div class="cooperation-content">
                <p class="cooperation-question">干预活动需要其他老师配合吗？</p>
                <el-checkbox-group v-model="interventionData.cooperation" class="cooperation-options">
                  <el-checkbox label="班主任" class="cooperation-option">
                    <span class="option-text">班主任</span>
                    <span class="option-desc">日常行为观察</span>
                  </el-checkbox>
                  <el-checkbox label="心理老师" class="cooperation-option">
                    <span class="option-text">心理老师</span>
                    <span class="option-desc">专业技术支持</span>
                  </el-checkbox>
                  <el-checkbox label="学科老师" class="cooperation-option">
                    <span class="option-text">学科老师</span>
                    <span class="option-desc">课堂环境配合</span>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 家校沟通模块 -->
        <el-col :span="12">
          <div class="communication-module">
            <div class="module-header">
              <div class="header-icon">🏠</div>
              <div class="header-content">
                <h3>家校协同策略</h3>
                <p>构建家校一体化支持体系</p>
              </div>
            </div>
            
            <div class="communication-sections">
              <div class="comm-section">
                <div class="section-header">
                  <div class="section-icon">💬</div>
                  <h4>沟通话术模板</h4>
                </div>
                <div class="script-template enhanced">
                  <div class="script-header">
                    <span class="script-label">切入点</span>
                    <span class="script-strategy">先分享进步</span>
                  </div>
                  <div class="script-content">
                    "XX妈妈，最近发现孩子在情绪管理方面有进步，比如昨天遇到困难时能主动深呼吸调节了。我想和您分享一些在家也能用的方法..."
                  </div>
                  <div class="script-actions">
                    <el-button size="small" type="primary" @click="copyScript">
                      <el-icon><CopyDocument /></el-icon>
                      复制话术
                    </el-button>
                    <el-button size="small" @click="previewScript">
                      <el-icon><View /></el-icon>
                      预览效果
                    </el-button>
                  </div>
                </div>
              </div>

              <div class="comm-section">
                <div class="section-header">
                  <div class="section-icon">📞</div>
                  <h4>沟通方式选择</h4>
                </div>
                <div class="communication-methods">
                  <el-radio-group v-model="interventionData.communicationMethod" class="method-group">
                    <div class="method-option">
                      <el-radio label="phone" class="method-radio">
                        <div class="method-content">
                          <div class="method-icon">📞</div>
                          <div class="method-info">
                            <span class="method-name">电话沟通</span>
                            <span class="method-desc">即时性强，情感传达好</span>
                          </div>
                        </div>
                      </el-radio>
                    </div>
                    <div class="method-option">
                      <el-radio label="wechat" class="method-radio">
                        <div class="method-content">
                          <div class="method-icon">💬</div>
                          <div class="method-info">
                            <span class="method-name">微信交流</span>
                            <span class="method-desc">便捷高效，可发送资料</span>
                          </div>
                        </div>
                      </el-radio>
                    </div>
                    <div class="method-option">
                      <el-radio label="meeting" class="method-radio">
                        <div class="method-content">
                          <div class="method-icon">👥</div>
                          <div class="method-info">
                            <span class="method-name">面谈交流</span>
                            <span class="method-desc">深度沟通，建立信任</span>
                          </div>
                        </div>
                      </el-radio>
                    </div>
                    <div class="method-option">
                      <el-radio label="home-visit" class="method-radio">
                        <div class="method-content">
                          <div class="method-icon">🏠</div>
                          <div class="method-info">
                            <span class="method-name">家访交流</span>
                            <span class="method-desc">了解家庭环境，全面支持</span>
                          </div>
                        </div>
                      </el-radio>
                    </div>
                  </el-radio-group>
                </div>
              </div>

              <div class="comm-section">
                <div class="section-header">
                  <div class="section-icon">🎯</div>
                  <h4>家庭配合策略</h4>
                </div>
                <div class="strategy-grid">
                  <div class="strategy-card">
                    <div class="strategy-icon">⏰</div>
                    <div class="strategy-content">
                      <h5>情绪表达时间</h5>
                      <p>每天晚饭后15分钟</p>
                    </div>
                  </div>
                  <div class="strategy-card">
                    <div class="strategy-icon">🌡️</div>
                    <div class="strategy-content">
                      <h5>情绪温度计</h5>
                      <p>用颜色表示情绪状态</p>
                    </div>
                  </div>
                  <div class="strategy-card">
                    <div class="strategy-icon">🎒</div>
                    <div class="strategy-content">
                      <h5>情绪急救包</h5>
                      <p>准备安抚物品和活动</p>
                    </div>
                  </div>
                  <div class="strategy-card">
                    <div class="strategy-icon">🏆</div>
                    <div class="strategy-content">
                      <h5>奖励机制</h5>
                      <p>情绪管理好时积极反馈</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="comm-section">
                <div class="section-header">
                  <div class="section-icon">📋</div>
                  <h4>家长指导要点</h4>
                </div>
                <div class="guidance-tips">
                  <div class="tip-item tip-success">
                    <div class="tip-icon">✅</div>
                    <span>接纳孩子的情绪</span>
                  </div>
                  <div class="tip-item tip-info">
                    <div class="tip-icon">💡</div>
                    <span>避免立即讲道理</span>
                  </div>
                  <div class="tip-item tip-warning">
                    <div class="tip-icon">👨‍👩‍👧‍👦</div>
                    <span>示范正确的情绪表达</span>
                  </div>
                  <div class="tip-item tip-default">
                    <div class="tip-icon">⏳</div>
                    <span>保持耐心和一致性</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="action-section">
        <div class="action-summary">
          <div class="summary-icon">📊</div>
          <div class="summary-content">
            <h4>方案概览</h4>
            <p>已为您设计 <strong>3项干预方法</strong> + <strong>4种家庭策略</strong>，预计实施周期 <strong>2-4周</strong></p>
          </div>
        </div>
        <div class="button-group">
          <el-button @click="prevStep" size="large">
            <el-icon><ArrowLeft /></el-icon>
            上一步
          </el-button>
          <el-button type="primary" @click="generatePlan" size="large">
            <el-icon><Document /></el-icon>
            生成完整方案
          </el-button>
        </div>
      </div>
    </div>

    <!-- 方案生成确认弹窗 -->
    <el-dialog v-model="planVisible" title="完整干预方案已生成" width="600px" class="plan-dialog">
      <div class="plan-content">
        <div class="plan-success">
          <div class="success-icon">🎉</div>
          <h3>恭喜！干预方案生成成功</h3>
          <p>已为您生成完整的个性化干预方案</p>
        </div>
        
        <div class="plan-items">
          <div class="plan-item">
            <div class="item-icon">📋</div>
            <span>详细干预步骤和时间安排</span>
          </div>
          <div class="plan-item">
            <div class="item-icon">💬</div>
            <span>完整的沟通话术模板</span>
          </div>
          <div class="plan-item">
            <div class="item-icon">👥</div>
            <span>各方配合分工表</span>
          </div>
          <div class="plan-item">
            <div class="item-icon">📊</div>
            <span>效果评估量表</span>
          </div>
          <div class="plan-item">
            <div class="item-icon">📝</div>
            <span>实施记录表格</span>
          </div>
        </div>
        
        <div class="plan-note">
          <el-icon><InfoFilled /></el-icon>
          <span>方案将以PDF格式提供下载，方便您打印和分享</span>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="planVisible = false">稍后下载</el-button>
          <el-button type="primary" @click="downloadPlan">
            <el-icon><Download /></el-icon>
            立即下载
          </el-button>
          <el-button type="success" @click="nextStep">
            <el-icon><Right /></el-icon>
            进入实施跟踪
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { 
  HomeFilled, 
  ArrowDown, 
  ArrowUp, 
  CopyDocument, 
  View, 
  ArrowLeft, 
  Document, 
  InfoFilled, 
  Download, 
  Right 
} from '@element-plus/icons-vue'

export default {
  name: 'MentorStep3',
  components: {
    HomeFilled,
    ArrowDown,
    ArrowUp,
    CopyDocument,
    View,
    ArrowLeft,
    Document,
    InfoFilled,
    Download,
    Right
  },
  data() {
    return {
      showDetails: {
        method1: false,
        method2: false,
        method3: false
      },
      interventionData: {
        cooperation: [],
        communicationMethod: ''
      },
      planVisible: false
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    toggleDetails(method) {
      this.showDetails[method] = !this.showDetails[method]
    },
    copyScript() {
      this.$message.success('话术已复制到剪贴板')
    },
    previewScript() {
      this.$message.info('话术预览功能开发中...')
    },
    prevStep() {
      this.$router.push('/mentor/step2')
    },
    generatePlan() {
      this.planVisible = true
    },
    downloadPlan() {
      this.$message.success('方案下载中...')
      this.planVisible = false
    },
    nextStep() {
      this.planVisible = false
      this.$router.push('/mentor/step4')
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
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

.home-btn {
  border-radius: 10px;
  font-weight: 600;
}

.content-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.design-intro {
  margin-bottom: 30px;
}

.intro-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.intro-icon {
  font-size: 2.5rem;
  margin-right: 20px;
}

.intro-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.intro-content p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
}

.main-content {
  margin-bottom: 30px;
}

.intervention-module,
.communication-module {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 25px;
  height: 100%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 2px solid #e8e8e8;
}

.module-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.header-icon {
  font-size: 2rem;
  margin-right: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-content h3 {
  margin: 0 0 5px 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.header-content p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.methods-container {
  margin-bottom: 25px;
}

.method-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 15px;
  margin-bottom: 15px;
  border: 2px solid #e8e8e8;
  transition: all 0.3s ease;
  overflow: hidden;
}

.method-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.method-item.expanded {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
}

.method-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.method-icon {
  font-size: 1.8rem;
  margin-right: 15px;
}

.method-title h4 {
  margin: 0 0 5px 0;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
}

.method-subtitle {
  margin: 0 0 5px 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.expand-btn {
  color: #667eea;
}

.method-details {
  padding: 0 20px 20px 20px;
  border-top: 1px solid #f0f0f0;
}

.detail-section {
  margin-bottom: 15px;
}

.detail-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.detail-content {
  color: #555;
  line-height: 1.6;
}

.step-list {
  margin-top: 10px;
}

.step-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 0;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
}

.script-template {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 12px;
  padding: 15px;
  border-left: 4px solid #667eea;
  display: flex;
  align-items: center;
  gap: 12px;
}

.script-icon {
  font-size: 1.2rem;
}

.script-text {
  flex: 1;
  font-style: italic;
  color: #2c3e50;
  line-height: 1.5;
}

.cooperation-section {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
}

.cooperation-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.cooperation-icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

.cooperation-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.cooperation-question {
  margin-bottom: 15px;
  color: #555;
  font-weight: 500;
}

.cooperation-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cooperation-option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.option-text {
  font-weight: 600;
  color: #2c3e50;
}

.option-desc {
  font-size: 0.85rem;
  color: #666;
  margin-top: 2px;
}

.communication-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comm-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e8e8e8;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.section-icon {
  font-size: 1.3rem;
  margin-right: 10px;
}

.section-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.script-template.enhanced {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-left: 4px solid #667eea;
  padding: 20px;
  border-radius: 12px;
  display: block;
}

.script-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
}

.script-label {
  font-weight: 600;
  color: #2c3e50;
}

.script-strategy {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

.script-content {
  font-style: italic;
  color: #2c3e50;
  line-height: 1.6;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
}

.script-actions {
  display: flex;
  gap: 10px;
}

.communication-methods {
  margin-top: 10px;
}

.method-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.method-option {
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;
}

.method-option:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.method-radio {
  width: 100%;
}

.method-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.method-content .method-icon {
  font-size: 1.5rem;
}

.method-info {
  display: flex;
  flex-direction: column;
}

.method-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
}

.method-desc {
  font-size: 0.85rem;
  color: #666;
}

.strategy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
}

.strategy-card {
  display: flex;
  align-items: center;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;
}

.strategy-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.strategy-icon {
  font-size: 1.5rem;
  margin-right: 12px;
}

.strategy-content h5 {
  margin: 0 0 4px 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
}

.strategy-content p {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}

.guidance-tips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.tip-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  gap: 8px;
}

.tip-success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  border: 1px solid #c3e6cb;
}

.tip-info {
  background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.tip-warning {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  color: #856404;
  border: 1px solid #ffeaa7;
}

.tip-default {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #495057;
  border: 1px solid #e9ecef;
}

.tip-icon {
  font-size: 1rem;
}

.action-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 2px solid #f0f0f0;
}

.action-summary {
  display: flex;
  align-items: center;
  gap: 15px;
}

.summary-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.summary-content h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.summary-content p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.button-group {
  display: flex;
  gap: 15px;
}

.plan-dialog .el-dialog__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px 20px 0 0;
  padding: 20px 30px;
}

.plan-content {
  padding: 20px 0;
}

.plan-success {
  text-align: center;
  margin-bottom: 30px;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.plan-success h3 {
  margin: 0 0 10px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
}

.plan-success p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.plan-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.plan-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  gap: 12px;
}

.item-icon {
  font-size: 1.2rem;
}

.plan-note {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 10px;
  border-left: 4px solid #667eea;
  color: #2c3e50;
  font-size: 0.9rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .strategy-grid {
    grid-template-columns: 1fr;
  }
  
  .action-section {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .button-group {
    width: 100%;
    justify-content: center;
  }
}
</style>

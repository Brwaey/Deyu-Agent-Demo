<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 5/6：评估迭代与经验沉淀</div>
      <el-button @click="goHome" class="home-btn">
        <el-icon><HomeFilled /></el-icon>
        返回首页
      </el-button>
    </div>

    <div class="content-card">
      <!-- 核心目标说明 -->
      <div class="objective-card">
        <div class="objective-icon">📊</div>
        <div class="objective-content">
          <h3>沉淀干预经验与优化方向</h3>
          <p>通过效果评估，将单次干预转化为"可复用的经验"，为后续长期支持提供依据</p>
        </div>
      </div>

      <!-- 量化评估区 -->
      <div class="form-section">
        <div class="section-title">
          <el-icon><TrendCharts /></el-icon>
          问题发生频率变化分析
        </div>
        
        <div class="frequency-analysis">
          <div class="analysis-question">
            <div class="ai-prompt">
              <p>经过1周的干预，学生问题的发生频率是否有变化？</p>
            </div>
            <el-radio-group v-model="evaluationData.frequencyChange" @change="handleFrequencyChange">
              <div class="frequency-option">
                <el-radio label="reduced">
                  <div class="option-content">
                    <div class="option-icon success">📉</div>
                    <div class="option-text">
                      <span class="option-title">明显减少</span>
                      <span class="option-desc">问题发生频率下降50%以上</span>
                    </div>
                  </div>
                </el-radio>
              </div>
              <div class="frequency-option">
                <el-radio label="slightly-reduced">
                  <div class="option-content">
                    <div class="option-icon warning">📊</div>
                    <div class="option-text">
                      <span class="option-title">略有减少</span>
                      <span class="option-desc">问题发生频率下降20-50%</span>
                    </div>
                  </div>
                </el-radio>
              </div>
              <div class="frequency-option">
                <el-radio label="unchanged">
                  <div class="option-content">
                    <div class="option-icon info">➖</div>
                    <div class="option-text">
                      <span class="option-title">基本不变</span>
                      <span class="option-desc">问题发生频率变化不大</span>
                    </div>
                  </div>
                </el-radio>
              </div>
              <div class="frequency-option">
                <el-radio label="increased">
                  <div class="option-content">
                    <div class="option-icon danger">📈</div>
                    <div class="option-text">
                      <span class="option-title">有所加剧</span>
                      <span class="option-desc">问题发生频率有所上升</span>
                    </div>
                  </div>
                </el-radio>
              </div>
            </el-radio-group>
          </div>

          <el-collapse-transition>
            <div v-show="evaluationData.frequencyChange" class="frequency-details">
              <div class="chart-container">
                <div class="chart-header">
                  <h4>频率变化趋势图</h4>
                  <span class="chart-subtitle">（横轴：日期，纵轴：问题发生次数）</span>
                </div>
                <div class="chart-content">
                  <div class="trend-visualization">
                    <div class="trend-week" v-for="(week, index) in trendData" :key="index">
                      <div class="week-label">第{{ index + 1 }}周</div>
                      <div class="week-bar">
                        <div 
                          class="bar-fill" 
                          :style="{ height: `${week.percentage}%`, backgroundColor: week.color }"
                        ></div>
                        <div class="bar-value">{{ week.count }}次</div>
                      </div>
                    </div>
                  </div>
                  <div class="trend-summary">
                    <div class="summary-item" v-for="item in trendSummary" :key="item.label">
                      <el-tag :type="item.type" size="small">{{ item.label }}</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>

        <div class="method-effectiveness">
          <div class="ai-prompt">
            <p>哪些干预方法效果更明显？</p>
          </div>
          <div class="effectiveness-grid">
            <div class="method-card" v-for="method in methodEffectiveness" :key="method.name">
              <div class="method-header">
                <div class="method-icon">{{ method.icon }}</div>
                <div class="method-name">{{ method.name }}</div>
              </div>
              <div class="method-rating">
                <el-rate 
                  v-model="method.rating" 
                  :max="5" 
                  size="small" 
                  @change="updateMethodRating(method.name, $event)"
                />
                <span class="rating-text">{{ getRatingText(method.rating) }}</span>
              </div>
              <div class="method-feedback">
                <el-input
                  v-model="method.feedback"
                  type="textarea"
                  :rows="2"
                  placeholder="记录具体效果和观察..."
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 质性评估区 -->
      <div class="form-section">
        <div class="section-title">
          <el-icon><Star /></el-icon>
          积极变化评估
        </div>
        
        <div class="positive-changes">
          <div class="ai-prompt">
            <p>学生在以下方面是否出现积极变化？请勾选观察到的变化：</p>
          </div>
          
          <div class="changes-grid">
            <div class="change-category">
              <h4 class="category-title">
                <el-icon><User /></el-icon>
                自我认知方面
              </h4>
              <el-checkbox-group v-model="evaluationData.selfAwareness" class="change-options">
                <div class="change-item">
                  <el-checkbox label="self-praise">
                    <div class="change-content">
                      <span class="change-text">主动说自己的优点</span>
                      <span class="change-desc">能够识别并表达自己的长处</span>
                    </div>
                  </el-checkbox>
                </div>
                <div class="change-item">
                  <el-checkbox label="self-reflection">
                    <div class="change-content">
                      <span class="change-text">能够反思自己的行为</span>
                      <span class="change-desc">对自己的言行有更好的觉察</span>
                    </div>
                  </el-checkbox>
                </div>
                <div class="change-item">
                  <el-checkbox label="confidence">
                    <div class="change-content">
                      <span class="change-text">自信心有所提升</span>
                      <span class="change-desc">在活动中表现更加积极主动</span>
                    </div>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>

            <div class="change-category">
              <h4 class="category-title">
                <el-icon><MagicStick /></el-icon>
                情绪调节方面
              </h4>
              <el-checkbox-group v-model="evaluationData.emotionRegulation" class="change-options">
                <div class="change-item">
                  <el-checkbox label="breathing">
                    <div class="change-content">
                      <span class="change-text">生气时会深呼吸</span>
                      <span class="change-desc">能够运用学到的调节技巧</span>
                    </div>
                  </el-checkbox>
                </div>
                <div class="change-item">
                  <el-checkbox label="expression">
                    <div class="change-content">
                      <span class="change-text">能够表达自己的感受</span>
                      <span class="change-desc">愿意用语言描述内心状态</span>
                    </div>
                  </el-checkbox>
                </div>
                <div class="change-item">
                  <el-checkbox label="control">
                    <div class="change-content">
                      <span class="change-text">情绪爆发次数减少</span>
                      <span class="change-desc">能够更好地控制情绪反应</span>
                    </div>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>

            <div class="change-category">
              <h4 class="category-title">
                <el-icon><UserFilled /></el-icon>
                人际互动方面
              </h4>
              <el-checkbox-group v-model="evaluationData.socialInteraction" class="change-options">
                <div class="change-item">
                  <el-checkbox label="participation">
                    <div class="change-content">
                      <span class="change-text">主动参与小组活动</span>
                      <span class="change-desc">在集体活动中更加积极</span>
                    </div>
                  </el-checkbox>
                </div>
                <div class="change-item">
                  <el-checkbox label="help-seeking">
                    <div class="change-content">
                      <span class="change-text">遇到困难时寻求帮助</span>
                      <span class="change-desc">愿意向老师或同学求助</span>
                    </div>
                  </el-checkbox>
                </div>
                <div class="change-item">
                  <el-checkbox label="conflict-reduction">
                    <div class="change-content">
                      <span class="change-text">与同学冲突减少</span>
                      <span class="change-desc">人际关系有所改善</span>
                    </div>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>

          <div class="changes-summary" v-if="totalPositiveChanges > 0">
            <div class="summary-header">
              <el-icon><TrophyBase /></el-icon>
              <span>积极变化总结</span>
            </div>
            <div class="summary-content">
              <p>恭喜！共观察到 <strong>{{ totalPositiveChanges }}</strong> 项积极变化</p>
              <div class="progress-indicator">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: `${(totalPositiveChanges / 9) * 100}%` }"
                  ></div>
                </div>
                <span class="progress-text">{{ Math.round((totalPositiveChanges / 9) * 100) }}% 改善</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 整体效果评分 -->
      <div class="form-section">
        <div class="section-title">
          <el-icon><Medal /></el-icon>
          整体效果评分
        </div>
        
        <div class="rating-grid">
          <div class="rating-item">
            <div class="rating-header">
              <div class="rating-icon">🧠</div>
              <div class="rating-info">
                <h4>情绪调节能力</h4>
                <p>学生管理和调节情绪的能力</p>
              </div>
            </div>
            <div class="rating-control">
              <el-rate 
                v-model="evaluationData.emotionRegulationRating" 
                :max="5" 
                show-text
                :texts="ratingTexts"
              />
            </div>
          </div>

          <div class="rating-item">
            <div class="rating-header">
              <div class="rating-icon">🤝</div>
              <div class="rating-info">
                <h4>社交技能</h4>
                <p>与他人交往和合作的能力</p>
              </div>
            </div>
            <div class="rating-control">
              <el-rate 
                v-model="evaluationData.socialSkillsRating" 
                :max="5" 
                show-text
                :texts="ratingTexts"
              />
            </div>
          </div>

          <div class="rating-item">
            <div class="rating-header">
              <div class="rating-icon">🎯</div>
              <div class="rating-info">
                <h4>自我认知</h4>
                <p>对自己的了解和认识程度</p>
              </div>
            </div>
            <div class="rating-control">
              <el-rate 
                v-model="evaluationData.selfAwarenessRating" 
                :max="5" 
                show-text
                :texts="ratingTexts"
              />
            </div>
          </div>

          <div class="rating-item">
            <div class="rating-header">
              <div class="rating-icon">💪</div>
              <div class="rating-info">
                <h4>抗挫折能力</h4>
                <p>面对困难和挫折的应对能力</p>
              </div>
            </div>
            <div class="rating-control">
              <el-rate 
                v-model="evaluationData.resilienceRating" 
                :max="5" 
                show-text
                :texts="ratingTexts"
              />
            </div>
          </div>
        </div>

        <div class="overall-rating">
          <div class="overall-header">
            <h4>综合评估</h4>
            <p>基于以上各项评分的综合表现</p>
          </div>
          <div class="overall-score">
            <div class="score-circle">
              <div class="score-value">{{ overallScore }}</div>
              <div class="score-label">综合得分</div>
            </div>
            <div class="score-description">
              <h5>{{ getOverallDescription() }}</h5>
              <p>{{ getOverallSuggestion() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 优化建议区 -->
      <div class="form-section">
        <div class="section-title">
          <el-icon><Tools /></el-icon>
          方案优化建议
        </div>
        
        <div class="optimization-section">
          <div class="ai-prompt">
            <p>您认为这次干预中，哪些环节可以优化？</p>
          </div>
          
          <div class="optimization-areas">
            <div class="optimization-item">
              <div class="item-header">
                <el-icon><ChatDotRound /></el-icon>
                <span>沟通话术优化</span>
              </div>
              <el-checkbox-group v-model="evaluationData.communicationOptimization">
                <el-checkbox label="too-formal">话术过于正式，需要更亲和</el-checkbox>
                <el-checkbox label="too-complex">表达过于复杂，需要简化</el-checkbox>
                <el-checkbox label="timing">沟通时机选择需要调整</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="optimization-item">
              <div class="item-header">
                <el-icon><Clock /></el-icon>
                <span>时间安排优化</span>
              </div>
              <el-checkbox-group v-model="evaluationData.timeOptimization">
                <el-checkbox label="too-short">活动时间太短，效果不明显</el-checkbox>
                <el-checkbox label="too-long">活动时间太长，学生注意力不集中</el-checkbox>
                <el-checkbox label="frequency">干预频率需要调整</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="optimization-item">
              <div class="item-header">
                <el-icon><Setting /></el-icon>
                <span>方法策略优化</span>
              </div>
              <el-checkbox-group v-model="evaluationData.methodOptimization">
                <el-checkbox label="individual">需要更多个性化调整</el-checkbox>
                <el-checkbox label="variety">方法单一，需要增加多样性</el-checkbox>
                <el-checkbox label="difficulty">难度设置需要调整</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="optimization-item">
              <div class="item-header">
                <el-icon><Connection /></el-icon>
                <span>协作配合优化</span>
              </div>
              <el-checkbox-group v-model="evaluationData.collaborationOptimization">
                <el-checkbox label="parent">家长配合度需要提升</el-checkbox>
                <el-checkbox label="teacher">任课老师参与度不够</el-checkbox>
                <el-checkbox label="coordination">各方协调需要加强</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>

          <div class="optimization-notes">
            <h4>详细优化建议</h4>
            <el-input
              v-model="evaluationData.optimizationNotes"
              type="textarea"
              :rows="4"
              placeholder="请详细描述您认为需要优化的具体方面和改进建议..."
            />
          </div>
        </div>
      </div>

      <!-- 成功案例记录 -->
      <div class="form-section">
        <div class="section-title">
          <el-icon><Trophy /></el-icon>
          成功案例记录
        </div>
        
        <div class="success-cases">
          <div class="ai-prompt">
            <p>记录最有效的干预方法和具体案例，便于今后参考和复用</p>
          </div>
          
          <div class="case-form">
            <div class="form-row">
              <div class="form-item">
                <label>最有效的方法</label>
                <el-select v-model="evaluationData.mostEffectiveMethod" placeholder="请选择">
                  <el-option label="优势强化法" value="优势强化法"></el-option>
                  <el-option label="情绪调节训练" value="情绪调节训练"></el-option>
                  <el-option label="社交技能训练" value="社交技能训练"></el-option>
                  <el-option label="家校沟通" value="家校沟通"></el-option>
                </el-select>
              </div>
              <div class="form-item">
                <label>关键成功因素</label>
                <el-input v-model="evaluationData.successFactor" placeholder="如：持续鼓励、家长配合等" />
              </div>
            </div>
            
            <div class="form-item full-width">
              <label>具体成功案例</label>
              <el-input
                v-model="evaluationData.successCase"
                type="textarea"
                :rows="4"
                placeholder="请详细描述一个具体的成功案例，包括情境、方法、学生反应和效果..."
              />
            </div>
            
            <div class="form-item full-width">
              <label>可复用要点</label>
              <el-input
                v-model="evaluationData.reusablePoints"
                type="textarea"
                :rows="3"
                placeholder="总结可以在类似情况下复用的关键要点和注意事项..."
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 评估报告生成 -->
      <div class="form-section">
        <div class="section-title">
          <el-icon><Document /></el-icon>
          评估报告生成
        </div>
        
        <div class="report-generation">
          <div class="report-preview">
            <div class="preview-header">
              <div class="preview-icon">📋</div>
              <div class="preview-content">
                <h4>《学生问题干预跟踪表》</h4>
                <p>包含变化曲线、有效方法总结等内容</p>
              </div>
            </div>
            <div class="preview-items">
              <div class="preview-item">
                <el-icon><TrendCharts /></el-icon>
                <span>问题频率变化曲线图</span>
              </div>
              <div class="preview-item">
                <el-icon><Star /></el-icon>
                <span>各项能力提升评分</span>
              </div>
              <div class="preview-item">
                <el-icon><Medal /></el-icon>
                <span>有效干预方法总结</span>
              </div>
              <div class="preview-item">
                <el-icon><Tools /></el-icon>
                <span>优化建议和后续计划</span>
              </div>
              <div class="preview-item">
                <el-icon><Trophy /></el-icon>
                <span>成功案例记录</span>
              </div>
            </div>
          </div>
          
          <div class="report-actions">
            <el-button type="primary" @click="generateReport" size="large">
              <el-icon><Document /></el-icon>
              生成评估报告
            </el-button>
            <el-button @click="previewReport" size="large">
              <el-icon><View /></el-icon>
              预览报告
            </el-button>
          </div>
        </div>
      </div>

      <div class="button-group">
        <el-button @click="prevStep" size="large">
          <el-icon><ArrowLeft /></el-icon>
          上一步
        </el-button>
        <el-button @click="saveEvaluation" size="large">
          <el-icon><FolderOpened /></el-icon>
          保存评估
        </el-button>
        <el-button type="primary" @click="nextStep" size="large">
          <el-icon><ArrowRight /></el-icon>
          下一步
        </el-button>
      </div>
    </div>

    <!-- 报告生成确认弹窗 -->
    <el-dialog v-model="reportVisible" title="评估报告已生成" width="600px" class="report-dialog">
      <div class="report-content">
        <div class="report-success">
          <div class="success-icon">📊</div>
          <h3>干预效果评估报告生成成功</h3>
          <p>已为您生成详细的评估分析报告</p>
        </div>
        
        <div class="report-summary">
          <div class="summary-item">
            <div class="summary-label">评估周期</div>
            <div class="summary-value">1周</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">积极变化</div>
            <div class="summary-value">{{ totalPositiveChanges }}项</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">综合得分</div>
            <div class="summary-value">{{ overallScore }}分</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">优化建议</div>
            <div class="summary-value">{{ totalOptimizations }}条</div>
          </div>
        </div>
        
        <div class="report-note">
          <el-icon><InfoFilled /></el-icon>
          <span>报告将以PDF格式提供下载，方便您存档和分享</span>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="reportVisible = false">稍后下载</el-button>
          <el-button type="primary" @click="downloadReport">
            <el-icon><Download /></el-icon>
            立即下载
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { 
  HomeFilled, 
  TrendCharts, 
  Star, 
  User, 
  MagicStick, 
  UserFilled, 
  TrophyBase, 
  Medal, 
  Tools, 
  ChatDotRound, 
  Clock, 
  Setting, 
  Connection, 
  Trophy, 
  Document, 
  View, 
  ArrowLeft, 
  FolderOpened, 
  ArrowRight, 
  InfoFilled, 
  Download 
} from '@element-plus/icons-vue'

export default {
  name: 'MentorStep5',
  components: {
    HomeFilled,
    TrendCharts,
    Star,
    User,
    MagicStick,
    UserFilled,
    TrophyBase,
    Medal,
    Tools,
    ChatDotRound,
    Clock,
    Setting,
    Connection,
    Trophy,
    Document,
    View,
    ArrowLeft,
    FolderOpened,
    ArrowRight,
    InfoFilled,
    Download
  },
  data() {
    return {
      evaluationData: {
        frequencyChange: '',
        selfAwareness: [],
        emotionRegulation: [],
        socialInteraction: [],
        emotionRegulationRating: 3,
        socialSkillsRating: 3,
        selfAwarenessRating: 3,
        resilienceRating: 3,
        communicationOptimization: [],
        timeOptimization: [],
        methodOptimization: [],
        collaborationOptimization: [],
        optimizationNotes: '',
        mostEffectiveMethod: '',
        successFactor: '',
        successCase: '',
        reusablePoints: ''
      },
      methodEffectiveness: [
        {
          name: '优势强化法',
          icon: '⭐',
          rating: 4,
          feedback: ''
        },
        {
          name: '情绪调节训练',
          icon: '🧘',
          rating: 3,
          feedback: ''
        },
        {
          name: '社交技能训练',
          icon: '🤝',
          rating: 5,
          feedback: ''
        },
        {
          name: '家校沟通',
          icon: '👨‍👩‍👧‍👦',
          rating: 4,
          feedback: ''
        }
      ],
      trendData: [
        { count: 5, percentage: 100, color: '#ff6b6b' },
        { count: 3, percentage: 60, color: '#ffa726' },
        { count: 2, percentage: 40, color: '#66bb6a' },
        { count: 1, percentage: 20, color: '#42a5f5' }
      ],
      ratingTexts: ['很差', '较差', '一般', '良好', '优秀'],
      reportVisible: false
    }
  },
  computed: {
    totalPositiveChanges() {
      return this.evaluationData.selfAwareness.length + 
             this.evaluationData.emotionRegulation.length + 
             this.evaluationData.socialInteraction.length
    },
    overallScore() {
      const ratings = [
        this.evaluationData.emotionRegulationRating,
        this.evaluationData.socialSkillsRating,
        this.evaluationData.selfAwarenessRating,
        this.evaluationData.resilienceRating
      ]
      const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      return Math.round(average * 20) // 转换为100分制
    },
    totalOptimizations() {
      return this.evaluationData.communicationOptimization.length +
             this.evaluationData.timeOptimization.length +
             this.evaluationData.methodOptimization.length +
             this.evaluationData.collaborationOptimization.length
    },
    trendSummary() {
      const summaries = []
      if (this.evaluationData.frequencyChange === 'reduced') {
        summaries.push({ label: '第1周：平均每天5次', type: 'danger' })
        summaries.push({ label: '第2周：平均每天3次', type: 'warning' })
        summaries.push({ label: '第3周：平均每天2次', type: 'success' })
        summaries.push({ label: '第4周：平均每天1次', type: 'success' })
      }
      return summaries
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    handleFrequencyChange(value) {
      if (value === 'reduced') {
        this.$message.success('太好了！干预效果显著，问题发生频率明显下降')
      } else if (value === 'slightly-reduced') {
        this.$message.info('有一定效果，建议继续观察并适当调整方案')
      } else if (value === 'unchanged') {
        this.$message.warning('效果不明显，建议重新评估干预方案')
      } else if (value === 'increased') {
        this.$message.error('需要立即调整干预策略，建议寻求专业支持')
      }
    },
    updateMethodRating(methodName, rating) {
      console.log(`${methodName} 评分更新为: ${rating}`)
    },
    getRatingText(rating) {
      return this.ratingTexts[rating - 1] || '未评分'
    },
    getOverallDescription() {
      if (this.overallScore >= 80) return '干预效果优秀'
      if (this.overallScore >= 60) return '干预效果良好'
      if (this.overallScore >= 40) return '干预效果一般'
      return '需要调整干预方案'
    },
    getOverallSuggestion() {
      if (this.overallScore >= 80) return '学生在各方面都有显著改善，建议继续保持现有方案'
      if (this.overallScore >= 60) return '学生有明显进步，可以适当调整方案以获得更好效果'
      if (this.overallScore >= 40) return '学生有一定改善，建议重新评估并优化干预策略'
      return '当前方案效果不佳，建议寻求专业指导重新制定方案'
    },
    generateReport() {
      if (this.totalPositiveChanges === 0) {
        this.$message.warning('请至少选择一项积极变化')
        return
      }
      this.reportVisible = true
    },
    previewReport() {
      this.$message.info('报告预览功能开发中...')
    },
    downloadReport() {
      this.$message.success('报告下载中...')
      this.reportVisible = false
    },
    saveEvaluation() {
      this.$message.success('评估数据已保存')
    },
    prevStep() {
      this.$router.push('/mentor/step4')
    },
    nextStep() {
      // 保存评估数据
      let formData = JSON.parse(localStorage.getItem('mentorFormData') || '{}')
      formData.evaluation = this.evaluationData
      localStorage.setItem('mentorFormData', JSON.stringify(formData))
      
      this.$router.push('/mentor/step6')
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

.objective-card {
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

.form-section {
  margin-bottom: 35px;
  padding-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  gap: 10px;
}

.frequency-analysis {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e8e8e8;
}

.analysis-question {
  margin-bottom: 20px;
}

.ai-prompt {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-left: 4px solid #667eea;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
}

.ai-prompt::before {
  content: "";/*🤖*/
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 1.1rem;
}

.frequency-option {
  margin: 15px 5px 10px 0;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 10px;
  border: 2px solid #e8e8e8;
  transition: all 0.3s ease;
}

.option-content:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
}

.option-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-icon.success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
}

.option-icon.warning {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
}

.option-icon.info {
  background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
}

.option-icon.danger {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
}

.option-text {
  flex: 1;
}

.option-title {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.option-desc {
  display: block;
  font-size: 0.9rem;
  color: #666;
}

.frequency-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
}

.chart-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e8e8e8;
}

.chart-header {
  text-align: center;
  margin-bottom: 20px;
}

.chart-header h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.chart-subtitle {
  font-size: 0.9rem;
  color: #666;
}

.trend-visualization {
  display: flex;
  justify-content: space-around;
  align-items: end;
  height: 200px;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 8px;
}

.week-label {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
}

.week-bar {
  position: relative;
  width: 60px;
  height: 120px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: end;
}

.bar-fill {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  position: relative;
}

.bar-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
}

.trend-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.method-effectiveness {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
}

.effectiveness-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.method-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e8e8e8;
  transition: all 0.3s ease;
}

.method-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.method-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
}

.method-icon {
  font-size: 1.5rem;
}

.method-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.method-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.rating-text {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.method-feedback {
  margin-top: 10px;
}

.positive-changes {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e8e8e8;
}

.changes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.change-category {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e8e8e8;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.change-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.change-item {
  padding: 12px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.change-item:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.2);
}

.change-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.change-text {
  font-weight: 600;
  color: #2c3e50;
}

.change-desc {
  font-size: 0.85rem;
  color: #666;
}

.changes-summary {
  margin-top: 25px;
  padding: 20px;
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border-radius: 12px;
  border: 2px solid #28a745;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #155724;
}

.summary-content p {
  margin: 0 0 15px 0;
  color: #155724;
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-weight: 600;
  color: #155724;
  white-space: nowrap;
}

.rating-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.rating-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e8e8e8;
  transition: all 0.3s ease;
}

.rating-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.rating-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

.rating-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
}

.rating-info h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.rating-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

.rating-control {
  text-align: center;
}

.overall-rating {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
}

.overall-header {
  text-align: center;
  margin-bottom: 20px;
}

.overall-header h4 {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.overall-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
}

.overall-score {
  display: flex;
  align-items: center;
  gap: 25px;
}

.score-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.score-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.score-label {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-top: 4px;
}

.score-description {
  flex: 1;
}

.score-description h5 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.score-description p {
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
}

.optimization-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e8e8e8;
}

.optimization-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.optimization-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 10px;
  padding: 20px;
  border: 2px solid #e8e8e8;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.optimization-notes {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
}

.optimization-notes h4 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.success-cases {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e8e8e8;
}

.case-form {
  margin-top: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item.full-width {
  grid-column: 1 / -1;
  margin-bottom: 20px;
}

.form-item label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
}

.report-generation {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e8e8e8;
}

.report-preview {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e8e8e8;
  margin-bottom: 20px;
}

.preview-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
}

.preview-icon {
  font-size: 2rem;
}

.preview-content h4 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.preview-content p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.preview-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  font-size: 0.9rem;
  color: #2c3e50;
}

.report-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 15px;
}

.report-dialog .el-dialog__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px 20px 0 0;
  padding: 20px 30px;
}

.report-content {
  padding: 20px 0;
}

.report-success {
  text-align: center;
  margin-bottom: 30px;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.report-success h3 {
  margin: 0 0 10px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
}

.report-success p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.report-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.summary-item {
  text-align: center;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 10px;
  border: 1px solid #e8e8e8;
}

.summary-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

.summary-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

.report-note {
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
  .changes-grid {
    grid-template-columns: 1fr;
  }
  
  .rating-grid {
    grid-template-columns: 1fr;
  }
  
  .effectiveness-grid {
    grid-template-columns: 1fr;
  }
  
  .optimization-areas {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .overall-score {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .report-summary {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 2/6：问题归因分析</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <div class="form-section">
        <div class="ai-prompt">
          <p>基于您的描述，初步判断问题可能集中在：</p>
        </div>
        
        <div class="tag-cloud">
          <span class="analysis-tag primary">情绪调节能力不足</span>
          <span class="analysis-tag">自我认知偏差</span>
          <span class="analysis-tag">人际问题解决能力弱</span>
          <span class="analysis-tag">抗挫折能力差</span>
          <span class="analysis-tag">注意力控制困难</span>
        </div>
      </div>

      <div class="form-section">
        <div class="section-title">细化问询</div>
        
        <div style="margin-bottom: 20px;">
          <div class="ai-prompt">
            <p>您提到学生'被批评后情绪失控'，具体表现为哪种情况？</p>
          </div>
          <el-radio-group v-model="analysisData.emotionResponse">
            <el-radio label="crying">哭泣</el-radio>
            <el-radio label="confrontation">顶撞</el-radio>
            <el-radio label="silence">沉默对抗</el-radio>
            <el-radio label="escape">逃避离开</el-radio>
          </el-radio-group>
        </div>

        <div style="margin-bottom: 20px;">
          <div class="ai-prompt">
            <p>学生对'考试失利'的反应是否定自己还是抱怨外部因素？</p>
          </div>
          <el-radio-group v-model="analysisData.failureResponse">
            <el-radio label="self-blame">否定自己</el-radio>
            <el-radio label="external-blame">抱怨外部因素</el-radio>
            <el-radio label="mixed">两者都有</el-radio>
          </el-radio-group>
        </div>

        <div style="margin-bottom: 20px;">
          <div class="ai-prompt">
            <p>在同伴交往中，学生更多表现为主动攻击还是被动退缩？</p>
          </div>
          <el-radio-group v-model="analysisData.socialBehavior">
            <el-radio label="aggressive">主动攻击</el-radio>
            <el-radio label="withdrawn">被动退缩</el-radio>
            <el-radio label="inconsistent">不一致</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="form-section">
        <div class="section-title">归因确认</div>
        <div class="ai-prompt">
          <p>您是否认同上述归因分析？如有补充可填写：</p>
        </div>
        <el-input
          v-model="analysisData.additionalAnalysis"
          type="textarea"
          :rows="4"
          placeholder="请补充您的观察和分析..."
        />
        <el-button type="primary" style="margin-top: 10px;" @click="confirmAnalysis">
          确认归因
        </el-button>
      </div>

      <div class="button-group">
        <el-button @click="prevStep">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentorStep2',
  data() {
    return {
      analysisData: {
        emotionResponse: '',
        failureResponse: '',
        socialBehavior: '',
        additionalAnalysis: ''
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    confirmAnalysis() {
      this.$message.success('归因分析已确认')
    },
    prevStep() {
      this.$router.push('/mentor/step1')
    },
    nextStep() {
      if (!this.analysisData.emotionResponse || !this.analysisData.failureResponse) {
        this.$message.error('请完成问题分析')
        return
      }
      
      let formData = JSON.parse(localStorage.getItem('mentorFormData') || '{}')
      formData.analysis = this.analysisData
      localStorage.setItem('mentorFormData', JSON.stringify(formData))
      
      this.$router.push('/mentor/step3')
    }
  }
}
</script>

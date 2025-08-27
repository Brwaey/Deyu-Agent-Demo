<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 2/4：确定情感培养点</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <div class="ai-prompt">
        <p>您希望通过这节课的社会情感培养，让学生有哪些具体改变？越具体越容易落地。</p>
        <div style="margin-top: 10px; font-size: 0.9rem; color: #666;">
          例如：能说出1个同学的观点/优点 | 遇到困难时愿意再试一次
        </div>
      </div>

      <el-input
        v-model="emotionalGoals"
        type="textarea"
        :rows="6"
        placeholder="请描述可观察的具体行为变化"
        style="margin-top: 20px;"
      />

      <div class="button-group">
        <el-button @click="prevStep">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherStep2',
  data() {
    return {
      emotionalGoals: ''
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    prevStep() {
      this.$router.push('/teacher/step1')
    },
    nextStep() {
      if (!this.emotionalGoals.trim()) {
        this.$message.error('请填写情感培养目标')
        return
      }
      
      // 保存数据
      let formData = JSON.parse(localStorage.getItem('teacherFormData') || '{}')
      formData.emotionalGoals = this.emotionalGoals
      localStorage.setItem('teacherFormData', JSON.stringify(formData))
      
      this.$router.push('/teacher/step3')
    }
  }
}
</script>

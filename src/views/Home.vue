<template>
  <div class="home-container">
    <div class="page-header">
      <h1 class="page-title">共育小管家</h1>
      <p class="page-subtitle">校家社协同育人智能助手</p>
    </div>

    <div class="identity-cards">
      <div class="identity-card teacher-card" @click="selectTeacher">
        <div class="card-icon">📚</div>
        <div class="card-title">学科老师身份</div>
        <div class="card-description">教案融合社会情感培养</div>
      </div>

      <div class="identity-card mentor-card" @click="selectMentor">
        <div class="card-icon">💬</div>
        <div class="card-title">全员导师身份</div>
        <div class="card-description">学生情感问题干预支持</div>
      </div>
    </div>

    <div class="guide-button">
      <el-button type="info" size="large" text @click="showGuide">
        <el-icon><QuestionFilled /></el-icon>
        使用指南
      </el-button>
    </div>

    <!-- 使用指南弹窗 -->
    <el-dialog v-model="guideVisible" title="使用指南" width="600px">
      <div>
        <h3>学科老师身份流程：</h3>
        <ol>
          <li><strong>需求对接：</strong>收集学科、年级、班级情况等基础信息</li>
          <li><strong>现状诊断：</strong>确定社会情感培养的具体目标</li>
          <li><strong>方案生成：</strong>生成或修改融合情感培养的教案</li>
          <li><strong>实施跟踪：</strong>提供课堂实施支持和问题解答</li>
        </ol>
        
        <h3 style="margin-top: 20px;">全员导师身份流程：</h3>
        <ol>
          <li><strong>需求对接：</strong>收集学生问题场景和基础信息</li>
          <li><strong>现状诊断：</strong>分析问题归因和根本原因</li>
          <li><strong>方案生成：</strong>设计针对性干预方案</li>
          <li><strong>实施跟踪：</strong>跟踪干预过程和效果</li>
          <li><strong>评估迭代：</strong>评估干预效果并优化方案</li>
          <li><strong>长期支持：</strong>提供长期成长跟踪和预防策略</li>
        </ol>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { QuestionFilled } from '@element-plus/icons-vue'

export default {
  name: 'Home',
  components: {
    QuestionFilled
  },
  data() {
    return {
      guideVisible: false
    }
  },
  methods: {
    selectTeacher() {
      this.$router.push('/teacher/step1')
    },
    selectMentor() {
      this.$router.push('/mentor/step1')
    },
    showGuide() {
      this.guideVisible = true
    }
  }
}
</script>

<style scoped>
.home-container {
  /* Add your styles here */
}

.page-header {
  /* Add your styles here */
}

.identity-cards {
  /* Add your styles here */
}

.identity-card {
  /* Add your styles here */
}

.teacher-card {
  /* Add your styles here */
}

.mentor-card {
  /* Add your styles here */
}

.guide-button {
  /* Add your styles here */
}
</style>

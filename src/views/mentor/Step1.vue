<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 1/6：学生问题场景收集</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基础信息" name="basic">
          <div class="ai-prompt">
            <p>请填写学生基本信息，帮助精准分析问题。</p>
          </div>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="form-item">
                <label>年级：</label>
                <el-select v-model="formData.grade" placeholder="请选择年级" style="width: 100%">
                  <el-option label="小学一年级" value="小学一年级"></el-option>
                  <el-option label="小学二年级" value="小学二年级"></el-option>
                  <el-option label="小学三年级" value="小学三年级"></el-option>
                  <el-option label="小学四年级" value="小学四年级"></el-option>
                  <el-option label="小学五年级" value="小学五年级"></el-option>
                  <el-option label="小学六年级" value="小学六年级"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="form-item">
                <label>性别：</label>
                <el-radio-group v-model="formData.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="form-item">
                <label>性格特点：</label>
                <el-checkbox-group v-model="formData.personality">
                  <el-checkbox label="内向敏感">内向敏感</el-checkbox>
                  <el-checkbox label="冲动急躁">冲动急躁</el-checkbox>
                  <el-checkbox label="活泼外向">活泼外向</el-checkbox>
                  <el-checkbox label="谨慎细心">谨慎细心</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="问题表现" name="problems">
          <div class="ai-prompt">
            <p>请描述学生近期在社会情感方面的具体表现及典型场景。</p>
          </div>
          
          <div class="form-section">
            <label class="section-title">问题类型：</label>
            <el-checkbox-group v-model="formData.problemTypes">
              <el-checkbox label="情绪失控">情绪失控</el-checkbox>
              <el-checkbox label="同伴冲突">同伴冲突</el-checkbox>
              <el-checkbox label="自我否定">自我否定</el-checkbox>
              <el-checkbox label="社交退缩">社交退缩</el-checkbox>
              <el-checkbox label="注意力问题">注意力问题</el-checkbox>
              <el-checkbox label="学习焦虑">学习焦虑</el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="form-section">
            <label class="section-title">典型场景：</label>
            <el-input
              v-model="formData.typicalScenarios"
              type="textarea"
              :rows="4"
              placeholder="例如：课堂被批评后摔书 / 小组活动时拒绝参与"
            />
          </div>

          <div class="form-section">
            <label class="section-title">发生频率：</label>
            <el-select v-model="formData.frequency" placeholder="请选择频率">
              <el-option label="每天1次" value="每天1次"></el-option>
              <el-option label="每周2-3次" value="每周2-3次"></el-option>
              <el-option label="每周1次" value="每周1次"></el-option>
              <el-option label="偶尔发生" value="偶尔发生"></el-option>
            </el-select>
          </div>

          <div class="form-section">
            <label class="section-title">触发事件：</label>
            <el-input
              v-model="formData.triggers"
              type="textarea"
              :rows="3"
              placeholder="如考试失利 / 家庭变动"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="家庭情况" name="family">
          <div class="ai-prompt">
            <p>了解家庭情况有助于分析问题根源（可选填）。</p>
          </div>
          
          <div class="form-section">
            <label class="section-title">亲子沟通模式：</label>
            <el-radio-group v-model="formData.communicationStyle">
              <el-radio label="民主平等">民主平等</el-radio>
              <el-radio label="严厉管教">严厉管教</el-radio>
              <el-radio label="溺爱放纵">溺爱放纵</el-radio>
              <el-radio label="忽视冷漠">忽视冷漠</el-radio>
            </el-radio-group>
          </div>

          <div class="form-section">
            <label class="section-title">近期家庭特殊事件：</label>
            <el-input
              v-model="formData.familyEvents"
              type="textarea"
              :rows="3"
              placeholder="如父母离异、搬家、亲人去世等"
            />
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="button-group">
        <el-button @click="saveDraft">保存草稿</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentorStep1',
  data() {
    return {
      activeTab: 'basic',
      formData: {
        grade: '',
        gender: '',
        personality: [],
        problemTypes: [],
        typicalScenarios: '',
        frequency: '',
        triggers: '',
        communicationStyle: '',
        familyEvents: ''
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    saveDraft() {
      this.$message.success('草稿已保存')
    },
    nextStep() {
      if (!this.formData.grade || !this.formData.gender || this.formData.problemTypes.length === 0) {
        this.$message.error('请填写基础信息和问题类型')
        return
      }
      
      localStorage.setItem('mentorFormData', JSON.stringify(this.formData))
      this.$router.push('/mentor/step2')
    }
  }
}
</script>

<style scoped>
.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}
</style>

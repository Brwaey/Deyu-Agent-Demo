<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 1/4：基础信息收集</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <div class="form-section">
        <div class="ai-prompt">
          <p>老师您好！为更精准帮您设计教案，请问您教的学科和年级是？</p>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-select v-model="formData.subject" placeholder="请选择学科" style="width: 100%">
              <el-option label="语文" value="语文"></el-option>
              <el-option label="数学" value="数学"></el-option>
              <el-option label="英语" value="英语"></el-option>
              <el-option label="道德与法治" value="道德与法治"></el-option>
              <el-option label="科学" value="科学"></el-option>
              <el-option label="音乐" value="音乐"></el-option>
              <el-option label="美术" value="美术"></el-option>
              <el-option label="体育" value="体育"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formData.grade" placeholder="请选择年级" style="width: 100%">
              <el-option label="小学一年级" value="小学一年级"></el-option>
              <el-option label="小学二年级" value="小学二年级"></el-option>
              <el-option label="小学三年级" value="小学三年级"></el-option>
              <el-option label="小学四年级" value="小学四年级"></el-option>
              <el-option label="小学五年级" value="小学五年级"></el-option>
              <el-option label="小学六年级" value="小学六年级"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>

      <div class="form-section">
        <div class="ai-prompt">
          <p>您班级学生目前在社会情感方面，有没有比较突出的表现？可以具体说说吗？</p>
        </div>
        <el-input
          v-model="formData.classEmotionalState"
          type="textarea"
          :rows="4"
          placeholder="例如：小组合作时经常争执 / 遇到困难容易放弃"
        />
      </div>

      <div class="form-section">
        <div class="ai-prompt">
          <p>您平时的课堂常用哪些教学形式？我会尽量让社会情感培养和这些形式结合得更自然。</p>
        </div>
        <el-checkbox-group v-model="formData.teachingMethods">
          <el-checkbox label="实验操作">实验操作</el-checkbox>
          <el-checkbox label="小组讨论">小组讨论</el-checkbox>
          <el-checkbox label="分组辩论">分组辩论</el-checkbox>
          <el-checkbox label="情景模拟">情景模拟</el-checkbox>
          <el-checkbox label="角色扮演">角色扮演</el-checkbox>
          <el-checkbox label="游戏互动">游戏互动</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="form-section">
        <div class="ai-prompt">
          <p>对于课堂中融入社会情感活动，您有时间上的顾虑吗？</p>
        </div>
        <el-radio-group v-model="formData.timeConcern">
          <el-radio label="每次活动不超过10分钟">每次活动不超过10分钟</el-radio>
          <el-radio label="放在课前/课后">放在课前/课后</el-radio>
          <el-radio label="无特殊顾虑">无特殊顾虑</el-radio>
        </el-radio-group>
      </div>

      <div class="form-section">
        <div class="ai-prompt">
          <p>班级里有没有需要特别关注的学生情况？我会在设计中做针对性调整。</p>
        </div>
        <el-input
          v-model="formData.specialStudents"
          type="textarea"
          :rows="3"
          placeholder="例如：有内向不爱发言的学生 / 转学生融入问题"
        />
      </div>

      <div class="form-section">
        <div class="ai-prompt">
          <p>您需要我重新设计一份教案还是基于已有教案进行修改？</p>
        </div>
        <el-radio-group v-model="formData.lessonPlanType">
          <el-radio label="新设计">重新设计教案</el-radio>
          <el-radio label="修改现有">修改已有教案</el-radio>
        </el-radio-group>
        <div v-if="formData.lessonPlanType === '修改现有'" style="margin-top: 15px;">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
          >
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">
              将教案文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持 doc/docx/pdf 格式文件
              </div>
            </template>
          </el-upload>
        </div>
      </div>

      <div class="button-group">
        <el-button @click="saveDraft">保存草稿</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherStep1',
  data() {
    return {
      formData: {
        subject: '',
        grade: '',
        classEmotionalState: '',
        teachingMethods: [],
        timeConcern: '',
        specialStudents: '',
        lessonPlanType: '新设计',
        uploadedFile: null
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    handleFileChange(file) {
      this.formData.uploadedFile = file
    },
    saveDraft() {
      this.$message.success('草稿已保存')
    },
    nextStep() {
      // 验证必填项
      if (!this.formData.subject || !this.formData.grade) {
        this.$message.error('请填写学科和年级信息')
        return
      }
      
      // 保存数据到本地存储
      localStorage.setItem('teacherFormData', JSON.stringify(this.formData))
      this.$router.push('/teacher/step2')
    }
  }
}
</script>

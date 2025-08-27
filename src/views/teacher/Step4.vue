<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 4/4：课堂实施支持</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <!-- 提醒模块 -->
      <el-alert
        title="待处理提醒"
        type="warning"
        :closable="false"
        style="margin-bottom: 20px;"
      >
        <template #default>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>下周需开展'同理心角色扮演'班会，是否需要同步提醒班主任？</span>
            <div>
              <el-button size="small" type="success" @click="handleReminder(true)">是</el-button>
              <el-button size="small" @click="handleReminder(false)">否</el-button>
            </div>
          </div>
        </template>
      </el-alert>

      <!-- 问题响应区 -->
      <div class="form-section">
        <div class="section-title">智能问答支持</div>
        
        <el-collapse v-model="activeQuestions">
          <el-collapse-item title="您在备课时，觉得这个'小组讨论规则'学生可能不遵守吗？需要设计示范话术吗？" name="1">
            <div style="text-align: center; margin: 20px 0;">
              <el-button type="primary" @click="needScript">需要</el-button>
              <el-button @click="noNeedScript">不需要</el-button>
            </div>
          </el-collapse-item>
          
          <el-collapse-item title="如果活动中出现学生抵触，希望提供引导话术还是替代方案？" name="2">
            <el-select v-model="resistanceHandling" placeholder="请选择处理方式" style="width: 100%;">
              <el-option label="引导话术" value="guidance"></el-option>
              <el-option label="替代方案" value="alternative"></el-option>
            </el-select>
            <div v-if="resistanceHandling" style="margin-top: 15px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
              <div v-if="resistanceHandling === 'guidance'">
                <h4>引导话术模板：</h4>
                <p>"我理解你现在可能不太想参与，这很正常。我们可以先从旁边观察，看看其他同学是怎么做的，等你准备好了再加入，好吗？"</p>
              </div>
              <div v-if="resistanceHandling === 'alternative'">
                <h4>替代方案：</h4>
                <p>1. 改为个人反思：让学生写下自己的想法</p>
                <p>2. 一对一交流：课后单独与学生沟通</p>
                <p>3. 调整角色：让学生担任观察员角色</p>
              </div>
            </div>
          </el-collapse-item>
          
          <el-collapse-item title="是否需要精简版方案（时间紧张时使用）？" name="3">
            <el-radio-group v-model="simplifiedPlan">
              <el-radio label="core">优先保留核心互动</el-radio>
              <el-radio label="summary">优先保留总结升华</el-radio>
            </el-radio-group>
            <div v-if="simplifiedPlan" style="margin-top: 15px; padding: 15px; background: #f0f9ff; border-radius: 5px;">
              <div v-if="simplifiedPlan === 'core'">
                <h4>精简方案（保留核心互动）：</h4>
                <p>• 保留小组讨论环节（10分钟）</p>
                <p>• 保留角色扮演活动（10分钟）</p>
                <p>• 简化导入和总结（各2分钟）</p>
              </div>
              <div v-if="simplifiedPlan === 'summary'">
                <h4>精简方案（保留总结升华）：</h4>
                <p>• 快速情绪识别练习（5分钟）</p>
                <p>• 重点讲解情绪管理方法（10分钟）</p>
                <p>• 完整总结和拓展环节（10分钟）</p>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <!-- 进度记录区 -->
      <div class="form-section">
        <div class="section-title">课堂实施记录</div>
        <el-input
          v-model="implementationRecord"
          type="textarea"
          :rows="4"
          placeholder="记录课堂实施情况：例如学生参与度 / 遇到的问题"
        />
        <el-button type="primary" style="margin-top: 10px;" @click="saveRecord">
          保存记录
        </el-button>
      </div>

      <div class="button-group">
        <el-button @click="goHome">返回首页</el-button>
        <el-button type="success" @click="finishProcess">结束本次流程</el-button>
      </div>
    </div>

    <!-- 话术模板弹窗 -->
    <el-dialog v-model="scriptVisible" title="示范话术模板" width="600px">
      <div>
        <h4>小组讨论规则示范话术：</h4>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <p><strong>开始前：</strong>"同学们，我们现在要进行小组讨论。请记住三个规则：一是每个人都要发言，二是要认真听别人说话，三是不同意见要礼貌表达。"</p>
          <p><strong>进行中：</strong>"我看到这个小组讨论得很热烈，记得给每个同学发言的机会哦。"</p>
          <p><strong>出现争执时：</strong>"我听到大家有不同的想法，这很好！让我们一个一个来说，先听听XX同学的观点。"</p>
        </div>
      </div>
      <template #footer>
        <el-button @click="scriptVisible = false">关闭</el-button>
        <el-button type="primary" @click="copyScript">复制话术</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TeacherStep4',
  data() {
    return {
      activeQuestions: [],
      resistanceHandling: '',
      simplifiedPlan: '',
      implementationRecord: '',
      scriptVisible: false
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    handleReminder(needRemind) {
      if (needRemind) {
        this.$message.success('已发送提醒给班主任')
      } else {
        this.$message.info('已记录，不发送提醒')
      }
    },
    needScript() {
      this.scriptVisible = true
    },
    noNeedScript() {
      this.$message.info('好的，您可以按照自己的方式进行')
    },
    copyScript() {
      this.$message.success('话术已复制到剪贴板')
      this.scriptVisible = false
    },
    saveRecord() {
      if (!this.implementationRecord.trim()) {
        this.$message.error('请输入实施记录')
        return
      }
      this.$message.success('记录已保存')
    },
    finishProcess() {
      this.$confirm('确认结束本次教案设计流程？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('流程已完成，感谢使用共育小管家！')
        this.$router.push('/')
      })
    }
  }
}
</script>

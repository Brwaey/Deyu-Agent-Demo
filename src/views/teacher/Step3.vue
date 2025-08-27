<template>
  <div class="container">
    <div class="step-header">
      <div class="step-info">步骤 3/4：教案设计与修改</div>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <div class="content-card">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="场景1：生成新教案" name="new">
          <div class="ai-prompt">
            <p>已为您生成融合社会情感培养的教案初稿，点击下方查看详情，可提出修改意见。</p>
          </div>

          <div class="lesson-plan">
            <h1>《认识情绪，学会管理》教案</h1>
            
            <h2>一、教学主题</h2>
            <p>认识情绪，学会管理</p>
            
            <h2>二、教学目标</h2>
            <ol>
              <li><strong>认知目标：</strong>学生能够说出至少3种常见的情绪类型，并描述其主要特点。</li>
              <li><strong>情感目标：</strong>学生愿意接纳自己的各种情绪，不排斥负面情绪。</li>
              <li><strong>技能目标：</strong>学生能够运用至少1种简单的方法管理自己的负面情绪。</li>
            </ol>
            
            <h2>三、教学对象</h2>
            <p>小学中年级学生（3-4年级）</p>
            
            <h2>四、教学时长</h2>
            <p>1课时（40分钟）</p>
            
            <h2>五、教学准备</h2>
            <ol>
              <li>情绪卡片：上面画有开心、难过、生气、害怕等不同情绪的表情。</li>
              <li>绘本《我的情绪小怪兽》。</li>
              <li>轻松的背景音乐。</li>
              <li>情境表演所需的简单道具。</li>
            </ol>
            
            <h2>六、教学过程</h2>
            
            <h3>（一）导入（5分钟）</h3>
            <p>教师："同学们，今天老师带来了一本有趣的绘本，叫《我的情绪小怪兽》。我们一起来看看小怪兽身上发生了什么故事吧。"（播放绘本故事片段）"故事里的小怪兽有各种各样的情绪，你们知道自己有哪些情绪吗？"</p>
            
            <h3>（二）新课讲授（15分钟）</h3>
            <h4>1. 认识情绪</h4>
            <p>教师展示情绪卡片，依次介绍开心、难过、生气、害怕等常见情绪的特点。</p>
            <p>"大家看这张卡片，这个表情是开心，开心的时候我们可能会笑，会蹦蹦跳跳。那难过的时候呢？谁来说说看？" 引导学生积极发言，描述不同情绪的表现。</p>
            
            <h4>2. 小组讨论</h4>
            <p>将学生分成小组，每组发放一套情绪卡片，让学生讨论在什么情况下会产生这些情绪。讨论结束后，每组选代表进行分享。</p>
            
            <h3>（三）巩固练习（15分钟）</h3>
            <p><strong>角色扮演：</strong>教师设置几个情境，如"玩具被同学不小心弄坏了""考试取得了好成绩""被老师批评了"等，让学生分组进行角色扮演，运用本节课所学的情绪知识，表现出相应的情绪，并尝试运用简单的方法管理负面情绪，如深呼吸、向他人倾诉等。其他同学观察并进行评价。</p>
            
            <h3>（四）总结拓展（5分钟）</h3>
            <ol>
              <li><strong>总结：</strong>教师引导学生回顾本节课学习的情绪类型和情绪管理方法，强调要接纳自己的各种情绪，学会管理负面情绪。</li>
              <li><strong>拓展：</strong>"同学们，今天我们学习了很多关于情绪的知识，希望大家在生活中能留意自己的情绪，试着用今天学到的方法管理它。课后大家可以和爸爸妈妈分享一下自己今天的情绪哦。"</li>
            </ol>
            
            <h2>七、教学评估</h2>
            <ol>
              <li>观察学生在小组讨论和角色扮演中的表现，看是否能准确识别和表达情绪。</li>
              <li>让学生完成简单的情绪管理任务，如"当你生气时，你会怎么做？"，了解学生对情绪管理方法的掌握情况。</li>
            </ol>
            
            <h2>八、教学延伸</h2>
            <ol>
              <li>建议学生在家庭中与父母分享自己的情绪，每天记录一件让自己产生情绪的事情及当时的感受和处理方式。</li>
              <li>开展"情绪小管家"主题班会，让学生分享自己在生活中管理情绪的成功案例。</li>
            </ol>
            
            <h2>九、注意事项</h2>
            <ol>
              <li>关注学生的个体差异，对于情绪表达较为困难的学生，要耐心引导和鼓励。</li>
              <li>尊重学生的情绪表达，不评判、不指责学生的情绪。</li>
              <li>营造轻松、安全的课堂氛围，让学生敢于表达自己的真实情绪。</li>
            </ol>
          </div>

          <div style="margin-top: 20px;">
            <el-input
              v-model="modificationSuggestion"
              type="textarea"
              :rows="3"
              placeholder="例如：希望将情感活动放在课堂导入部分 / 增加小组互动次数"
            />
            <el-button type="primary" style="margin-top: 10px;" @click="submitModification">
              提交修改意见
            </el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="场景2：修改现有教案" name="modify">
          <div class="ai-prompt">
            <p>以下是您上传的教案内容，黄色高亮部分为建议添加情感培养的位置：</p>
          </div>

          <div class="lesson-plan">
            <h2>《背影》教学设计</h2>
            <p>一、教学目标</p>
            <p>1. 理解课文内容，体会父子深情</p>
            <p style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 10px; border-radius: 8px; border-left: 4px solid #f39c12; margin: 10px 0;">
              💡 建议在此处添加：让学生能够表达对父母的感谢之情
            </p>
            <p>2. 学习文章的写作手法</p>
            
            <p>二、教学过程</p>
            <p>1. 导入新课</p>
            <p>2. 整体感知</p>
            <p>3. 重点分析父亲买橘子的片段</p>
            <p style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 10px; border-radius: 8px; border-left: 4px solid #f39c12; margin: 10px 0;">
              💡 建议在此处添加：分享环节 - 学生讲述父母关爱自己的具体事例
            </p>
            <p>4. 总结升华</p>
          </div>

          <div style="margin-top: 20px;">
            <p><strong>交互操作：</strong></p>
            <el-button type="success" size="small" @click="acceptSuggestion">接受建议</el-button>
            <el-button type="warning" size="small" @click="adjustSuggestion">调整建议</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="button-group">
        <el-button @click="prevStep">上一步</el-button>
        <el-button type="primary" @click="generateFinalPlan">生成终稿</el-button>
      </div>
    </div>

    <!-- 配套工具包弹窗 -->
    <el-dialog v-model="toolkitVisible" title="配套工具包已生成" width="500px">
      <div>
        <p>恭喜！您的教案已生成完成，同时为您准备了以下配套资源：</p>
        <ul style="margin: 20px 0;">
          <li><el-link type="primary">📄 教案终稿下载</el-link></li>
          <li><el-link type="primary">📋 教具清单</el-link></li>
          <li><el-link type="primary">🎨 PPT模板</el-link></li>
        </ul>
      </div>
      <template #footer>
        <el-button @click="toolkitVisible = false">关闭</el-button>
        <el-button type="primary" @click="nextStep">进入实施跟踪</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TeacherStep3',
  data() {
    return {
      activeTab: 'new',
      modificationSuggestion: '',
      toolkitVisible: false
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    handleTabClick(tab) {
      console.log('切换到标签页:', tab.name)
    },
    submitModification() {
      if (!this.modificationSuggestion.trim()) {
        this.$message.error('请输入修改意见')
        return
      }
      this.$message.success('修改意见已提交，正在重新生成教案...')
    },
    acceptSuggestion() {
      this.$message.success('已接受建议，正在更新教案...')
    },
    adjustSuggestion() {
      this.$prompt('请输入具体的调整需求', '调整建议', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message.success(`调整需求已记录: ${value}`)
      })
    },
    prevStep() {
      this.$router.push('/teacher/step2')
    },
    generateFinalPlan() {
      this.toolkitVisible = true
    },
    nextStep() {
      this.toolkitVisible = false
      this.$router.push('/teacher/step4')
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.step-info {
  font-size: 18px;
  font-weight: bold;
}

.content-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.lesson-plan {
  margin-top: 20px;
}

.ai-prompt {
  margin-bottom: 20px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>

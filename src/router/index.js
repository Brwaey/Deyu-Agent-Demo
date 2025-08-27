import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"

// 学科老师流程页面
import TeacherStep1 from "@/views/teacher/Step1.vue"
import TeacherStep2 from "@/views/teacher/Step2.vue"
import TeacherStep3 from "@/views/teacher/Step3.vue"
import TeacherStep4 from "@/views/teacher/Step4.vue"

// 全员导师流程页面
import MentorStep1 from "@/views/mentor/Step1.vue"
import MentorStep2 from "@/views/mentor/Step2.vue"
import MentorStep3 from "@/views/mentor/Step3.vue"
import MentorStep4 from "@/views/mentor/Step4.vue"
import MentorStep5 from "@/views/mentor/Step5.vue"
import MentorStep6 from "@/views/mentor/Step6.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // 学科老师路由
  {
    path: "/teacher/step1",
    name: "TeacherStep1",
    component: TeacherStep1,
  },
  {
    path: "/teacher/step2",
    name: "TeacherStep2",
    component: TeacherStep2,
  },
  {
    path: "/teacher/step3",
    name: "TeacherStep3",
    component: TeacherStep3,
  },
  {
    path: "/teacher/step4",
    name: "TeacherStep4",
    component: TeacherStep4,
  },
  // 全员导师路由
  {
    path: "/mentor/step1",
    name: "MentorStep1",
    component: MentorStep1,
  },
  {
    path: "/mentor/step2",
    name: "MentorStep2",
    component: MentorStep2,
  },
  {
    path: "/mentor/step3",
    name: "MentorStep3",
    component: MentorStep3,
  },
  {
    path: "/mentor/step4",
    name: "MentorStep4",
    component: MentorStep4,
  },
  {
    path: "/mentor/step5",
    name: "MentorStep5",
    component: MentorStep5,
  },
  {
    path: "/mentor/step6",
    name: "MentorStep6",
    component: MentorStep6,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

<script setup lang="ts">
useSeoMeta({ title: '实验室', description: '不用登录就能使用的小工具：JSON 格式化和专注计时器。'
})
const activeTool = ref('json')
const jsonInput = ref('{"hello":"world","things":["摄影","分享","创造"]}')
const jsonOutput = ref('')
const jsonError = ref('')
const copyStatus = ref('复制结果')
function formatJson(minify = false) {
  try {
    jsonOutput.value = JSON.stringify(JSON.parse(jsonInput.value), null, minify ? undefined : 2)
    jsonError.value = ''
    copyStatus.value = '复制结果'
  } catch {
    jsonError.value = '这段内容不是有效的 JSON，请检查引号、逗号和括号。'
    jsonOutput.value = ''
  }
}
async function copyResult() {
  try {
    await navigator.clipboard.writeText(jsonOutput.value)
    copyStatus.value = '已复制'
  } catch {
    copyStatus.value = '复制失败，请手动选择结果复制'
  }
}
const duration = ref(25)
const remaining = ref(25 * 60)
const running = ref(false)
const completed = ref(false)
let deadline = 0
let interval: ReturnType<typeof setInterval> | undefined
const timerText = computed(() => Math.floor(remaining.value / 60).toString().padStart(2, '0') + ':' + (remaining.value % 60).toString().padStart(2, '0'))
const progress = computed(() => 1 - remaining.value / (duration.value * 60))
function tick() {
  remaining.value = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
  if (remaining.value === 0) {
    running.value = false
    completed.value = true
    clearInterval(interval)
  }
}
function toggleTimer() {
  if (running.value) {
    tick()
    running.value = false
    clearInterval(interval)
    return
  }
  if (remaining.value === 0) remaining.value = duration.value * 60
  completed.value = false
  deadline = Date.now() + remaining.value * 1000
  running.value = true
  interval = setInterval(tick, 250)
}
function resetTimer() {
  clearInterval(interval)
  running.value = false
  completed.value = false
  remaining.value = duration.value * 60
}
watch(duration, resetTimer)
onBeforeUnmount(() => clearInterval(interval))
function switchTool(tool: string) {
  activeTool.value = tool
  document.getElementById(tool + '-tab')?.focus()
}
</script>

<template>
  <div class="inner-page">
    <PageIntro
      eyebrow="THE LITTLE LAB"
      title="让好奇心，动起来。"
      description="一些简单、实用的小东西。打开就能用，不需要登录。"
    />
    <div
      class="tool-tabs"
      role="tablist"
      aria-label="选择小工具"
    >
      <button
        id="json-tab"
        role="tab"
        aria-controls="json-panel"
        :aria-selected="activeTool === 'json'"
        :tabindex="activeTool === 'json' ? 0 : -1"
        :class="{ selected: activeTool === 'json' }"
        @click="activeTool = 'json'"
        @keydown.right="switchTool('timer')"
        @keydown.left="switchTool('timer')"
      >
        <UIcon name="i-lucide-braces" /><span>JSON 格式化<small>让数据整整齐齐</small></span><UIcon name="i-lucide-arrow-up-right" />
      </button>
      <button
        id="timer-tab"
        role="tab"
        aria-controls="timer-panel"
        :aria-selected="activeTool === 'timer'"
        :tabindex="activeTool === 'timer' ? 0 : -1"
        :class="{ selected: activeTool === 'timer' }"
        @click="activeTool = 'timer'"
        @keydown.left="switchTool('json')"
        @keydown.right="switchTool('json')"
      >
        <UIcon name="i-lucide-timer" /><span>专注计时器<small>给一件事，一段时间</small></span><UIcon name="i-lucide-arrow-up-right" />
      </button>
    </div>
    <section
      v-show="activeTool === 'json'"
      id="json-panel"
      role="tabpanel"
      aria-labelledby="json-tab"
      class="tool-panel"
    >
      <div class="tool-heading">
        <h2>JSON 格式化</h2><span><UIcon name="i-lucide-lock-keyhole" />内容只在你的浏览器中处理</span>
      </div>
      <div class="json-editors">
        <label>输入 JSON<textarea
          v-model="jsonInput"
          spellcheck="false"
          placeholder="把 JSON 粘贴到这里…"
        /></label><label>格式化结果<textarea
          :value="jsonOutput"
          readonly
          spellcheck="false"
          placeholder="点击下方按钮，结果会显示在这里。"
        /></label>
      </div>
      <p
        v-if="jsonError"
        class="form-error"
        role="alert"
      >
        {{ jsonError }}
      </p>
      <div class="tool-actions">
        <button
          class="button button-dark"
          @click="formatJson()"
        >
          格式化 <UIcon name="i-lucide-sparkles" />
        </button><button
          class="button button-outline"
          @click="formatJson(true)"
        >
          压缩
        </button><button
          class="button button-outline"
          :disabled="!jsonOutput"
          @click="copyResult"
        >
          {{ copyStatus }}
        </button><button
          class="text-link clear-button"
          @click="jsonInput = ''; jsonOutput = ''; jsonError = ''"
        >
          清空
        </button>
      </div>
    </section>
    <section
      v-show="activeTool === 'timer'"
      id="timer-panel"
      role="tabpanel"
      aria-labelledby="timer-tab"
      class="tool-panel timer-panel"
    >
      <div class="tool-heading">
        <h2>专注计时器</h2><span>关掉一点杂念，留下一点专注。</span>
      </div>
      <div class="timer-options">
        <label for="timer-duration">本次时长</label><select
          id="timer-duration"
          v-model.number="duration"
        >
          <option :value="25">
            25 分钟 · 专注
          </option><option :value="5">
            5 分钟 · 短休息
          </option><option :value="15">
            15 分钟 · 长休息
          </option>
        </select>
      </div>
      <div
        class="timer-circle"
        :style="{ '--progress': progress * 360 + 'deg' }"
      >
        <div>
          <span class="timer-label">{{ running ? '保持专注' : completed ? '完成啦' : '准备好了吗' }}</span><span
            class="timer-digits"
            role="timer"
            aria-label="剩余时间"
          >{{ timerText }}</span><span class="timer-label">ONE THING AT A TIME</span>
        </div>
      </div>
      <p
        class="timer-message"
        role="status"
      >
        {{ completed ? '这段时间完成了，起来活动一下吧。' : '计时期间请保留此页面；离开或刷新会重置。' }}
      </p>
      <div class="tool-actions centered">
        <button
          class="button button-dark"
          @click="toggleTimer"
        >
          {{ running ? '暂停' : remaining === duration * 60 ? '开始专注' : remaining === 0 ? '再来一轮' : '继续' }}<UIcon
            v-if="running"
            name="i-lucide-pause"
          /><UIcon
            v-else
            name="i-lucide-play"
          />
        </button><button
          class="button button-outline"
          @click="resetTimer"
        >
          重置 <UIcon name="i-lucide-rotate-ccw" />
        </button>
      </div>
    </section>
    <div class="quiet-note">
      <UIcon name="i-lucide-lightbulb" /><p>小实验，持续生长中。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores'
import { processClipboardContent } from '@/utils'

const store = useStore()
const { primaryColor, isDark } = storeToRefs(store)

const dialogVisible = ref(false)

async function prePost(e: Event) {
  e.preventDefault()

  try {
    // 如果是深色模式，先切换到白天模式
    const isBeforeDark = isDark.value
    if (isBeforeDark) {
      store.toggleDark()
    }

    // 使用编辑器Header中的复制逻辑
    processClipboardContent(primaryColor.value)
    const clipboardDiv = document.getElementById(`output`)!
    clipboardDiv.focus()
    window.getSelection()!.removeAllRanges()
    const range = document.createRange()
    range.setStartBefore(clipboardDiv.firstChild!)
    range.setEndAfter(clipboardDiv.lastChild!)
    window.getSelection()!.addRange(range)
    document.execCommand(`copy`)
    window.getSelection()!.removeAllRanges()

    // 恢复深色模式
    if (isBeforeDark) {
      store.toggleDark()
    }

    toast.success(`内容已复制`)

    if (window.utools) {
      window.utools.shellOpenExternal(`https://mp.weixin.qq.com/`)
    }
    else {
      window.open(`https://mp.weixin.qq.com/`, `_blank`)
    }
  }
  catch (err) {
    toast.error(`复制失败: ${err}`)
  }
}

function onUpdate(val: boolean) {
  if (!val) {
    dialogVisible.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="dialogVisible" @update:open="onUpdate">
    <DialogTrigger>
      <TooltipProvider :delay-duration="200">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" @click="prePost">
              发布
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            点击复制内容并跳转到微信公众号平台
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DialogTrigger>
  </Dialog>
</template>

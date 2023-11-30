<template>
  <div class="vp-doc">
    <h2
      id="评论"
      tabindex="-1"
    >
      评论
      <a
        class="header-anchor"
        href="#评论"
        aria-hidden="true"
      >
        #
      </a>
    </h2>
    <div ref="commentRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue"
import { Comment } from "@tomiaa/comment"
import { useRoute } from "vitepress"

const route = useRoute()
const commentRef = ref()

const client_id =
  "6abe3da43e4bda394fb34098ac54828dbc1b7ca3b93bee73ac2e37fdf96db5f5"
const client_secret = `72e321a9eb8ce7b6947f5ea3b55d9671c5bf2ed01a384a93ec4b11945e4c9455`
let inst: any

watch(
  () => route.path,
  async () => {
    await nextTick()
    inst?.getList()
  },
  {
    deep: true,
  }
)
onMounted(() => {
  inst = new Comment({
    client_id,
    client_secret,
    owner: "zhangqi212121_21_admin",
    repo: "comment",
    prefix: "[comment]",
  })
  inst.mount(commentRef.value)
})
</script>

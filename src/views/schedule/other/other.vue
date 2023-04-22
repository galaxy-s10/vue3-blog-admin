<template>
  <div>
    <div>快捷命令：</div>
    <n-space>
      <n-button
        type="primary"
        ghost
        @click="cmd = 'pm2 stop nuxt-blog-client-null-3000'"
      >
        停止博客前台
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'pm2 stop vue3-blog-server-beta-3300'"
      >
        停止博客后台（测试环境）
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'pm2 stop billd-live-server-prod-4200'"
      >
        停止直播后台
      </n-button>
    </n-space>
    <br />

    <n-space>
      <n-button
        type="primary"
        ghost
        @click="cmd = 'pm2 start nuxt-blog-client-null-3000'"
      >
        启动博客前台
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'pm2 start vue3-blog-server-beta-3300'"
      >
        启动博客后台（测试环境）
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'pm2 start billd-live-server-prod-4200'"
      >
        启动直播后台
      </n-button>
    </n-space>

    <br />
    <n-space>
      <n-button
        type="primary"
        ghost
        @click="cmd = 'pm2 list'"
      >
        查看pm2运行的应用
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'docker ps'"
      >
        查看docker运行的容器
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'docker images'"
      >
        查看docker所有镜像
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'free -h'"
      >
        查看内存占用
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'sync;echo 3 > /proc/sys/vm/drop_caches;'"
      >
        清除buff/cache命令
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'ps aux | sort -k 3 -n -r | head -n 10'"
      >
        占用cpu最多的10个进程
      </n-button>

      <n-button
        type="primary"
        ghost
        @click="cmd = 'ps aux | sort -k 4 -n -r | head -n 10'"
      >
        占用内存最多的10个进程
      </n-button>
    </n-space>

    <br />
    <br />
    <div>请输入要执行的命令：</div>
    <n-input-group>
      <n-input
        v-model:value="cmd"
        type="text"
        placeholder="如：pwd"
        autosize
        style="min-width: 50%"
        clearable
      />
      <n-button
        type="primary"
        ghost
        @click="handleClick"
      >
        执行
      </n-button>
    </n-input-group>
    <br />
    <br />
    <div>执行命令的结果：</div>
    <n-input
      v-model:value="cmdRes"
      placeholder="如：/root"
      type="textarea"
      autosize
      clearable
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { fetchExecCmd } from '@/api/backend';

const cmd = ref('');
const cmdRes = ref('');

async function handleClick() {
  try {
    if (!cmd.value.length) {
      window.$message.error('执行命令不能为空！');
      return;
    }
    const res = await fetchExecCmd(cmd.value);
    cmdRes.value = res.data;
  } catch (error) {
    console.log(error);
    window.$message.error(error);
  }
}
</script>

<style lang="scss" scoped></style>

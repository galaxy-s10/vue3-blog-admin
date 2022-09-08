<template>
  <div class="upload-wrap">
    <n-upload
      v-model:file-list="list"
      multiple
      :max="max"
      directory-dnd
      @change="handleUploadChange"
      @before-upload="beforeUpload"
    >
      <n-upload-dragger>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
      </n-upload-dragger>
    </n-upload>
    <n-button type="success" @click="startUpload"> 上传 </n-button>
  </div>
</template>

<script lang="ts">
import sparkMD5 from 'spark-md5';
import { defineComponent, ref, watch } from 'vue';

import type { UploadFileInfo } from 'naive-ui';

import { fetchUpload, fetchUploadProgress } from '@/api/qiniuData';
import { QINIU_PREFIX } from '@/constant';

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      // type: String,
      // default() {
      //   return '';
      // },
      type: Array,
      default() {
        return [];
      },
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    console.log('2222222');
    const list = ref<UploadFileInfo[]>(
      // @ts-ignore
      props.modelValue.map((item: UploadFileInfo): UploadFileInfo => {
        return {
          id: item.id,
          name: item.name,
          url: item.url,
          status: item.status,
          percentage: item.percentage,
        };
      })
    );

    watch(
      // @ts-ignore
      () => props.modelValue,
      (val) => {
        // if (val === null) list.value = [];
        console.log('props.modelValueprops.modelValue', val);
        emit('update:value', val);
      }
    );

    const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
      console.log('handleUploadChange', data.fileList);
      list.value = data.fileList;
      emit('update:value', list.value);
    };

    // 根据文件内容获取hash，同一个文件不管重命名还是改文件名后缀，hash都一样
    const getHash = (file: UploadFileInfo['file']) => {
      return new Promise<{
        hash: any;
        suffix: string;
        buffer: string | ArrayBuffer | null;
        filename: string;
      }>((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file!);
        reader.onload = (e) => {
          const spark = new sparkMD5.ArrayBuffer();
          const buffer = e.target!.result;
          spark.append(buffer);
          const hash = spark.end();
          const suffix = file!.name.split('.')[1];
          const info = { hash, suffix, buffer, filename: `${hash}.${suffix}` };
          resolve(info);
        };
      });
    };
    const upload = async (file: UploadFileInfo) => {
      let timer;
      try {
        const form = new FormData();
        const { hash } = await getHash(file.file!);
        form.append('uploadFiles', file.file!);
        form.append('hash', hash);
        form.append('prefix', QINIU_PREFIX['image/']);
        let flag = false;
        fetchUpload(form).then((res) => {
          flag = true;
          list.value.forEach((v) => {
            console.log('完成了', v, JSON.parse(JSON.stringify(v)));
            if (v.id === file.id) {
              v.status = 'finished';
              v.url = res.data.success[0].url;
              v.percentage = 50;
            }
          });
        });
        // timer = setInterval(async () => {
        //   try {
        //     const { data } = await fetchUploadProgress(hash);
        //     if (flag) {
        //       clearInterval(timer);
        //       return;
        //     }
        //     if (data) {
        //       console.log(
        //         '进度',
        //         data,
        //         (data.uploadBytes / data.totalBytes) * 100
        //       );
        //       const percentage = (data.uploadBytes / data.totalBytes) * 100;
        //       list.value.forEach((v) => {
        //         if (v.id === file.id) {
        //           v.status = percentage < 100 ? 'uploading' : 'finished';
        //           v.percentage = percentage;
        //         }
        //       });
        //     } else {
        //       console.log('进度是0');
        //       list.value.forEach((v) => {
        //         if (v.id === file.id) {
        //           v.status = 'uploading';
        //           v.percentage = 0;
        //         }
        //       });
        //     }
        //   } catch (error) {
        //     console.log(error);
        //     clearInterval(timer);
        //   }
        // }, 1000);
      } catch (error) {
        console.log(error, 2222221111);
        clearInterval(timer);
      }
    };
    const startUpload = async () => {
      const queue: any = [];
      list.value.forEach((v) => {
        queue.push(upload(v));
      });
      await Promise.all(queue);
    };
    const beforeUpload = () => {
      return true;
    };

    return {
      list,
      handleUploadChange,
      beforeUpload,
      startUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
.upload-wrap {
  display: flex;
  flex-direction: column;
}
</style>

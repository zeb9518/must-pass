<script setup lang="ts">
import { ref, reactive, toRefs, watch } from "vue";
import axios from "axios";

defineProps<{ msg: string }>();

interface Topic {
  subjectId: number; // 以数据库为准
  type: number; // 类型 1:单选 2:多选 3:简答 4:论述
  title: string;
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  E?: string;
  F?: string;
  answer?: string;
  description?: string;
}

const url = "https://apionline.xiongmaozikao.com/api/v1/getQuestions";

const qTypeMap = new Map();
qTypeMap.set(1, "单选");
qTypeMap.set(2, "多选");
qTypeMap.set(3, "简答");
// qTypeMap.set(4, "论述");

const subjectMap = new Map();
subjectMap.set(87, 1); // 设计原理
subjectMap.set(71, 2); // 设计基础
subjectMap.set(72, 3); // 设计美学
subjectMap.set(140, 4); // 英语二
subjectMap.set(52, 5); // 中国近现代史纲要
subjectMap.set(4, 6); // 马克思主义基本原理概论

const state = reactive({
  params: {
    userId: 129910,
    subjectId: 4,
    type: 1,
    language: "_zn",
    majorId: 13,
    page: 1,
    pageSize: 20,
    questionType: 1,
  },
});

const qType = ref(1); // 类型 1:单选 2:多选 3:简答 4:论述

function changeQType(type: number) {
  switch (type) {
    case 1: // 单选
      state.params.questionType = 1;
      break;
    case 2: // 多选
      state.params.questionType = 3;
      break;
    case 3: // 简答
      state.params.questionType = 2;
      break;
  }
  qType.value = type;
}

function setTopic(data: Topic[]) {
  return axios.post("/api/topic/create", data, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function handleHttpPost() {
  const { page, pageSize, subjectId } = state.params;
  axios
    .post(url, state.params, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbkluZm8iOnsidXNlcklkIjoxMjk5MTAsImlzX2ZyZWUiOjEsImludGVncmFsIjoyLCJzZXNzaW9uX2tleSI6IkI1TGtsdWtyQ0x4b3NHR0Z5R1ZWK3c9PSIsIm1vYmlsZSI6IiJ9LCJpc3MiOiJodHRwczpcL1wvYXBpLnhpb25nbWFvemlrYW8uY29tIiwiYXVkIjoieGlvbmdtYW96aWthbyIsImlhdCI6MTY3MzMzMjc1NywibmJmIjoxNjczMzMyNzU3LCJleHAiOjE2NzM1OTE5NTd9.fenYmPz50G5GVsGgcTdqP-Y-nXOVMTcj1XSBs5AAcxQ",
      },
    })
    .then((res) => {
      const { data } = res;

      let topics: Topic[] = [];
      data.data.forEach((item: any) => {
        let topic: Topic = {
          subjectId: subjectMap.get(subjectId),
          type: qType.value, // 类型 1:单选 2:多选 3:简答 4:论述
          title: item.title,
          answer: item.rightAnswer,
          description: item.description,
        };
        if (qType.value === 1 || qType.value === 2) {
          item.content.forEach((option: any) => {
            switch (option.name.toUpperCase()) {
              case "A":
                topic.A = option.value;
                break;
              case "B":
                topic.B = option.value;
                break;
              case "C":
                topic.C = option.value;
                break;
              case "D":
                topic.D = option.value;
                break;
              case "E":
                topic.E = option.value;
                break;
              case "F":
                topic.F = option.value;
                break;
            }
          });
        }
        topics.push(topic);
      });
      console.log("请求后台接口--->", qType.value, state.params.questionType, topics);
      // 请求后台接口
      setTopic(topics).then((res) => {
        setTimeout(() => {
          if (data.count > page * pageSize) {
            state.params.page = page + 1;
            handleHttpPost();
          } else if (qType.value < qTypeMap.size) {
            changeQType(qType.value + 1);
            state.params.page = 1;
            handleHttpPost();
          }
        }, 1000);
      });
    });
}
</script>

<template>
  <p>
    <text>当前题型：{{ qTypeMap.get(qType) }} </text> <text> ​ 请求次数：{{ state.params.page }} </text>
  </p>
  <button type="button" @click="handleHttpPost">发起http请求</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

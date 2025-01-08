<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const isActive = ref(true);
const hasError = ref(false);

const classObject = reactive({
  active: true,
  'text-danger': false,
});

const error = ref<{ type: string } | null>(null); // 타입 명시

const classObject2 = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal',
}));

const activeClass = ref('active');
const errorClass = ref('text-danger');
</script>

<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>

  <!--  <div class="static active"></div> 와 같음 -->

  <div :class="classObject"></div>

  <!--  <div class="active"></div> 와 같음 -->

  <div :class="[activeClass, errorClass]"></div>
  <!-- <div class="active text-danger"></div> -->

  <!-- 삼항으로 조건부여     -->
  <div :class="[isActive ? activeClass : '', errorClass]"></div>

  <div :style="{ display: 'flex, -webkit-box, -ms-flexbox' }"></div>
</template>

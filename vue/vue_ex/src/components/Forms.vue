<script setup lang="ts">
import { ref } from 'vue';
const text = ref<string>('');
const message = ref<string>('');
const checked = ref<boolean>(false);

const checkedNames = ref([]);
const picked = ref('One');

const selected = ref('1');

const options = ref([
  { text: '하나', value: '1' },
  { text: '둘', value: '2' },
  { text: '셋', value: '3' },
]);

const msg = ref<string>('');

console.log('리렌더링확인');
</script>

<template>
  <div>
    <input
      :value="text"
      @input="(event: Event) => { text = (event.target as HTMLInputElement).value }"
    />
    <p>메세지: {{ text }}</p>
    <input v-model="text" placeholder="메세지 입력하기" />
  </div>

  <div>
    <span>여러 줄 메세지:</span>
    <p style="white-space: pre-line">{{ message }}</p>
    <textarea v-model="message" placeholder="여러 줄을 추가해보세요"></textarea>

    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
  </div>
  <div>
    <div>체크된 이름: {{ checkedNames }}</div>

    <input type="checkbox" id="jack" value="젝" v-model="checkedNames" />
    <label for="jack">젝</label>

    <input type="checkbox" id="john" value="존" v-model="checkedNames" />
    <label for="john">존</label>

    <input type="checkbox" id="mike" value="마이크" v-model="checkedNames" />
    <label for="mike">마이크</label>
  </div>
  <div>
    <div>선택한 것: {{ picked }}</div>

    <input type="radio" id="one" value="하나" v-model="picked" />
    <label for="one">하나</label>

    <input type="radio" id="two" value="둘" v-model="picked" />
    <label for="two">둘</label>
  </div>
  <div>
    <select v-model="selected">
      <option v-for="option in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <div>선택됨: {{ selected }}</div>
  </div>

  <div>
    lazy :
    {{ msg }}
    <input v-model.lazy="msg" />
  </div>
</template>

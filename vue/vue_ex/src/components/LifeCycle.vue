<script>
//https://ko.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram
import { onMounted } from 'vue';

export default {
  setup() {
    // onMounted() 훅은 setup 함수 내에서 사용하는 경우에만
    // 마치 외부의 함수를 호출한 것처럼 작성할 수 있습니다.
    //
    // 이렇게 작성된 onMounted() 훅은
    // 컴포넌트가 마운트 된 이후 콜백 함수를 실행하지만
    // `this`를 통해 컴포넌트 인스턴스에 접근할 수 없습니다.
    onMounted(function () {
      // `this`를 통해 컴포넌트 인스턴스에 접근할 수 없습니다.
      console.log('onMounted가 호출 되었습니다:', this);
    });
  },

  // 컴포넌트가 마운트 된 후,
  // 옵션 API 방식의 mounted() 훅을 실행.
  mounted() {
    // `this`를 통해 컴포넌트 인스턴스에 접근할 수 있습니다.
    console.log('mounted()가 호출 되었습니다:', this);
  },
};

console.log('하이'); //1

console.log('하이2'); // 3
</script>

<template>
  <div></div>
</template>

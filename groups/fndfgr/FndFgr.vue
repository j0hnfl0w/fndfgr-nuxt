<template>
  <div class="flex flex-col w-full h-screen">
    <span>{{ x }}, {{ y }}</span>
    <span>{{ xy }}</span>
    <span>{{ width }}, {{ height }}</span>
    <span>{{ xyText }}</span>
    <!-- <small>{{ $io }}</small> -->
    <pre>{{ state }}</pre>
    <div class="fixed w-full h-full top-0 left-0 right-0 bottom-0 z-100">
      <div class="relative w-full h-full">
        <div
          v-for="(s, skey) in state"
          :key="skey"
          class="h-10px w-10px rounded-2xl bg-red-400 absolute"
          :style="{ top: s.y * 100 + '%', left: s.x * 100 + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $io } = useNuxtApp();

$io.on('connect', () => {
  console.log(':connect');
});
$io.on('disconnect', () => {
  console.log(':disconnect');
});

const { x, y } = useMouse();
const { width, height } = useWindowSize();
const xy = computed(() => {
  return {
    x: x.value / width.value,
    y: y.value / height.value,
  };
});
const xyText = computed(() => `${x.value}-${y.value}`);
const state = ref({});
watch(
  () => xyText.value,
  (to) => {
    // console.log(':to', to);
    $io.emit('move', { x: xy.value.x, y: xy.value.y });
  }
);
$io.on('state', (e) => {
  // console.log(':state', e);
  state.value = e;
});
onMounted(() => {
  console.log(':onMounted');
  console.log(Object.keys($io.ids));
});
</script>

<style>
.br {
  outline: 1px solid red;
}
</style>

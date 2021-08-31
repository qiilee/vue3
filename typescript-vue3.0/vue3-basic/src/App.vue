<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>1===============</p>
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increase">👍+1</button><br />

    <p>2===============</p>
    <h1>{{ greetings }}</h1>
    <button @click="updateGreeting">Update Title</button>

    <p>3===============</p>
    <p>{{ error }}</p>

    <p>4===============</p>
    <h1 v-if="loading">Loading!...</h1>
    <img v-if="loaded" :src="result[0].url" />
    <h1>X: {{ x }}, Y: {{ y }}</h1>

    <p>5===============</p>
    <button @click="openModal">Open Modal</button><br />
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose">
      My Modal !!!!</modal
    >
    <p>6===============</p>
    <Suspense>
      <template #default>
        <div>
          <async-show />
          <dog-show />
        </div>
      </template>
      <template #fallback>
        <h1>Loading !...</h1>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, watch, onErrorCaptured } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default {
  name: "App",
  components: {
    Modal,
    AsyncShow,
    DogShow,
  },
  setup() {
    // 1
    const data: DataProps = reactive({
      count: 12,
      increase: () => {
        data.count += 2;
      },
      double: computed(() => data.count * 3),
    });
    // 2
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello! ";
    };
    // 3
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
      return true;
    });
    // 4
    const { x, y } = useMousePosition();
    const { result, loading, loaded } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log("value", result.value[0].url);
      }
    });

    const refData = toRefs(data);
    // 5
    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };
    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      error,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 5rem;
}
button {
  font-size: 3rem;
}
</style>

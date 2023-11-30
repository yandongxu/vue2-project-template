import { defineComponent } from 'vue';

const Null = defineComponent({
  functional: true,
  render() {
    const clip = window.navigator.clipboard;
    console.log(clip);

    return null;
  },
});

export default Null;

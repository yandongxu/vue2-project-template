import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router/composables';
import styles from './styles.module.less';

const HomePage = defineComponent({
  name: 'HomePage',
  setup() {
    const route = useRoute();
    onMounted(() => {
      console.log(route);
    });
  },
  render() {
    return (
      <div class={styles.container}>
        <h1>HomePage</h1>
        <pre>{window.__NODE_ENV__}</pre>
      </div>
    );
  },
});

export default HomePage;

import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';

// Mock the HomeView component
jest.mock('@/views/HomeView.vue', () => ({
  template: '<div>HomeView</div>',
}));

describe('Vue Router', () => {
  let router;

  beforeEach(() => {
    // Create a new router instance for each test
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
      ],
    });
  });

  it('renders the HomeView component for the root path', async () => {
    // Navigate to the root path
    await router.push('/');
    await router.isReady();

    // Mount the app with the router
    const wrapper = mount({
      template: '<router-view />',
    }, {
      global: {
        plugins: [router],
      },
    });

    // Check if the HomeView component is rendered
    expect(wrapper.html()).toContain('HomeView');
  });
});

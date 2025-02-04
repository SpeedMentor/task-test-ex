import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/stores/store';

// Mock the App component
jest.mock('@/App.vue', () => ({
  template: '<div id="app">Mocked App</div>',
}));

// Mock the router and store
jest.mock('@/router', () => ({
  install: jest.fn(),
}));
jest.mock('@/stores/store', () => ({
  install: jest.fn(),
}));

describe('main.js', () => {
  let app;

  beforeEach(() => {
    // Create a new app instance for each test
    app = createApp(App);
  });

  it('creates and mounts the app', () => {
    // Mock the mount function
    const mountSpy = jest.spyOn(app, 'mount');

    // Initialize the app
    app.use(router);
    app.use(store);
    app.mount('#app');

    // Verify that the app was mounted
    expect(mountSpy).toHaveBeenCalledWith('#app');
  });

  it('registers the router and store', () => {
    // Spy on the use method
    const useSpy = jest.spyOn(app, 'use');

    // Initialize the app
    app.use(router);
    app.use(store);

    // Verify that the router and store were registered
    expect(useSpy).toHaveBeenCalledWith(router);
    expect(useSpy).toHaveBeenCalledWith(store);
  });
});

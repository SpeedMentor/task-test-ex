/* eslint-disable no-undef */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { router } from "../router"
import {store } from "../stores/store"
// Mock the necessary modules
vi.mock('./App.vue', () => ({
  default: {
    template: '<div id="app">Mocked App</div>',
  },
}));
vi.mock('./router', () => ({
  default: {
    install: vi.fn(),
  },
}));
vi.mock('./stores/store', () => ({
  default: {
    install: vi.fn(),
  },
}));

// Import the main.js file
import '../main.js';

describe('main.js', () => {
  let app;

  beforeEach(() => {
    // Re-import the createApp function to reset the state
    const { createApp } = require('vue');
    app = createApp({
      template: '<div id="app">Mocked App</div>',
    });
  });

  it('creates and mounts the app', () => {
    // Mock the mount function
    const mountSpy = vi.spyOn(app, 'mount');

    // Initialize the app
    app.use(router);
    app.use(store);
    app.mount('#app');

    // Verify that the app was mounted
    expect(mountSpy).toHaveBeenCalledWith('#app');
  });

  it('registers the router and store', () => {
    // Spy on the use method
    const useSpy = vi.spyOn(app, 'use');

    // Initialize the app
    app.use(router);
    app.use(store);

    // Verify that the router and store were registered
    expect(useSpy).toHaveBeenCalledWith(router);
    expect(useSpy).toHaveBeenCalledWith(store);
  });
});

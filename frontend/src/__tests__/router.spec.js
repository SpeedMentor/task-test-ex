// src/__tests__/router.spec.js
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

// Mock the HomeView component
vi.mock('../views/HomeView.vue', () => ({
  default: {
    template: '<div>Mocked HomeView</div>',
  },
}));

describe('router', () => {
  let router;

  beforeEach(() => {
    // Import the mocked HomeView after mocking it
    const MockedHomeView = HomeView

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: MockedHomeView,
        },
      ],
    });
  });

  it('should create a router instance', () => {
    expect(router).toBeTruthy();
  });

  it('should have a home route', () => {

    const homeRoute = router.getRoutes().find(route => route.name === 'home');
    expect(homeRoute).toBeTruthy();
    expect(homeRoute.name).toBe('home');
    expect(homeRoute.path).toBe('/');

  });
});

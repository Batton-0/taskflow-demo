<template>
  <f7-page name="home">
    <f7-navbar title="TaskFlow" />
    <main class="app-content">
      <header class="welcome-block">
        <h1>Мої завдання</h1>
        <p>Керуйте завданнями та відстежуйте їх виконання.</p>
      </header>
      <section class="summary-card" aria-label="Прогрес виконання завдань">
        <div>
          <span class="summary-label">Виконано завдань</span>
          <div class="summary-value">{{ completedCount }} / {{ tasks.length }}</div>
        </div>
        <div class="summary-icon" aria-hidden="true">✓</div>
      </section>
      <div class="section-header">
        <h2 id="task-list-title">Список завдань</h2>
        <span>{{ tasks.length }} завдання</span>
      </div>
      <section class="task-list" aria-labelledby="task-list-title">
        <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
      </section>
      <f7-button fill large href="/about/" class="about-button">Про застосунок</f7-button>
    </main>
  </f7-page>
</template>

<script setup>
import { computed, ref } from 'vue';
import TaskCard from '../components/TaskCard.vue';
import { tasks as initialTasks } from '../data/tasks.js';

const tasks = ref(initialTasks);
const completedCount = computed(() => tasks.value.filter(task => task.status === 'done').length);
</script>

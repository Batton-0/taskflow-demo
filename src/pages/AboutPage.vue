<template>
  <f7-page name="about">
    <f7-navbar title="Про TaskFlow" back-link="Назад" />
    <main class="app-content">
      <header class="welcome-block">
        <h1>TaskFlow</h1>
        <p>PWA-застосунок для управління завданнями.</p>
      </header>
      <section class="info-card">
        <h2>Використані технології</h2>
        <p><strong>Vue 3</strong> — реактивний інтерфейс</p>
        <p><strong>Framework7</strong> — мобільні компоненти</p>
        <p><strong>Vite</strong> — середовище розробки</p>
        <p><strong>PWA</strong> — встановлення та офлайн-режим</p>
      </section>
      <f7-button large fill href="/" :reload-all="true">На головну</f7-button>
    </main>
  </f7-page>
</template>

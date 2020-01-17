<template>
  <div>
    <header class="l-header siimple-navbar">
      <h1>Nuxt Project</h1>
      <ul class="l-header-nav siimple--float-right">
        <li class="siimple-navbar-item"><a href="" class="siimple-navbar-item">プロジェクトA</a></li>
          <li class="siimple-navbar-item"><a href="" class="siimple-navbar-item">「山崎」でログイン中</a></li>
      </ul>
    </header>
    <div class="l-contents">
      <div class="l-side">
        <ul class="l-side-menu">
          <li><a href="">タスク</a></li>
          <li><a href="">Wiki</a></li>
          <li><a href="">チャット</a></li>
          <li><a href="">ファイル</a></li>
        </ul>
      </div>
      <main class="l-main">
        <nuxt />
      </main>
    </div>
  </div>
</template>

<style>
</style>

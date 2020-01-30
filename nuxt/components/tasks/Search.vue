<template>
    <div class="page-tasks-search">
        <h2 style="">検索条件</h2>
        <div class="page-tasks-search-contents">
            <div class="page-tasks-search-status">
                <h3>ステータス</h3>
                <ul>
                    <li v-for="(status, key) in statuses">
                        <div class="siimple-checkbox">
                            <input type="checkbox" :id="'status' + key">
                            <label :for="'status' + key"></label>
                        </div>
                        <label :for="'status' + key" class="page-tasks-search-status-name">{{ status.name }}</label>
                    </li>
                </ul>
            </div>
            <div class="page-tasks-search-keyword">
                <h3>キーワード</h3>
                <input type="text" class="siimple-input" placeholder="タスクのタイトルやコメントなどで検索できます">
            </div>
            <div class="page-tasks-search-member">
                <h3>メンバー</h3>
                <ul>
                    <li>
                        <div class="siimple-checkbox">
                            <input type="checkbox" id="myCheckbox">
                            <label for="myCheckbox"></label>
                        </div>
                        <label for="myCheckbox" class="page-tasks-search-member-name">山崎 旭</label>
                    </li>
                    <li>
                        <div class="siimple-checkbox">
                            <input type="checkbox" id="myCheckbox2">
                            <label for="myCheckbox2"></label>
                        </div>
                        <label for="myCheckbox2" class="page-tasks-search-member-name">木村 達也</label>
                    </li>
                    <li>
                        <div class="siimple-checkbox">
                            <input type="checkbox" id="myCheckbox3">
                            <label for="myCheckbox3"></label>
                        </div>
                        <label for="myCheckbox3" class="page-tasks-search-member-name">川口 春馬</label>
                    </li>
                </ul>
            </div>
            <div class="page-tasks-search-deadline">
                <h3>期限</h3>
                <div>
                    <input type="text" class="siimple-input"><span>まで</span>
                </div>
            </div>
            <div class="page-tasks-search-created">
                <h3>作成日</h3>
                <div><input type="text" class="siimple-input"><span class="page-tasks-search-created-tilde">〜</span><input type="text" class="siimple-input"></div>
            </div>
            <div class="page-tasks-search-tag">
                <h3>タグ</h3>
                <input type="text" class="siimple-input" placeholder="タグで検索">
            </div>
        </div>

        <div class="page-tasks-search-submit">
            <input type="submit" value="この条件で検索" class="siimple-btn siimple-btn--primary">
            <input type="reset" value="検索条件をクリア" class="siimple-btn">
            <input type="reset" value="閉じる" class="siimple-btn">
        </div>
    </div>
</template>

<script>
  export default {
    computed: {
      statuses () {
        return this.$store.state.statuses.list
      }
    },
  }
</script>
<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tasks')->insert([
            'id' => 1,
            'project_id' => 1,
            'status_id' => 1,
            'order' => 1,
            'name' => 'バリデーションの作成',
        ]);

        DB::table('tasks')->insert([
            'id' => 2,
            'project_id' => 1,
            'status_id' => 2,
            'order' => 2,
            'name' => 'モーダルの作成',
        ]);

        DB::table('tasks')->insert([
            'id' => 3,
            'project_id' => 1,
            'status_id' => 3,
            'parent_id' => 2,
            'order' => 1,
            'name' => 'コメント機能の作成',
        ]);

        DB::table('tasks')->insert([
            'id' => 4,
            'project_id' => 1,
            'status_id' => 2,
            'parent_id' => 2,
            'order' => 2,
            'name' => 'アップデート機能の作成',
        ]);

        DB::table('tasks')->insert([
            'id' => 5,
            'project_id' => 1,
            'status_id' => 2,
            'parent_id' => 4,
            'order' => 2,
            'name' => 'ステートアップデート',
        ]);

        DB::table('tasks')->insert([
            'id' => 6,
            'project_id' => 1,
            'status_id' => 1,
            'parent_id' => 1,
            'order' => 3,
            'name' => '親タスクを登録できるようにする',
        ]);

        DB::table('tasks')->insert([
            'id' => 7,
            'project_id' => 1,
            'status_id' => 3,
            'order' => 3,
            'name' => '認証機能',
        ]);

        DB::table('tasks')->insert([
            'id' => 8,
            'project_id' => 1,
            'status_id' => 4,
            'order' => 3,
            'name' => 'タスク一覧の作成',
        ]);

		DB::table('tasks')->insert([
			'id' => 9,
			'project_id' => 2,
			'status_id' => 1,
			'order' => 1,
			'name' => 'ProjectBのタスク',
		]);
    }
}

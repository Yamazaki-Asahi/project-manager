<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		DB::table('comments')->insert([
			'id' => 1,
			'task_id' => 1,
			'user_id' => 1,
			'body' => 'コメントです。コメントです。コメントです。コメントです。コメントです。コメントです。コメントです。',
			'created_at' => Carbon::now()
		]);
		DB::table('comments')->insert([
			'id' => 2,
			'task_id' => 1,
			'user_id' => 1,
			'body' => 'コメント2です。コメント2です。コメント2です。コメント2です。コメント2です。コメント2です。コメント2です。',
			'created_at' => Carbon::now()
		]);
    }
}

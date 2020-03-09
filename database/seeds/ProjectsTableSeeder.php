<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert([
            'id' => 1,
            'name' => 'プロジェクト管理ツール',
        ]);

		DB::table('projects')->insert([
			'id' => 2,
			'name' => 'プロジェクトB',
		]);
    }
}

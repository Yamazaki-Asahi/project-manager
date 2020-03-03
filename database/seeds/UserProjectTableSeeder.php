<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserProjectTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_project')->insert([
            'id' => 1,
            'user_id' => 1,
            'project_id' => 1,
            'is_owner' => 1
        ]);

        DB::table('user_project')->insert([
            'id' => 2,
            'user_id' => 2,
            'project_id' => 1,
        ]);
    }
}

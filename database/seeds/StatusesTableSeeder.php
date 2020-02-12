<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statuses')->insert([
            'id' => 1,
            'name' => '未着手',
            'slug' => 'new',
            'color' => 'rgb(255, 255, 255)',
        ]);

        DB::table('statuses')->insert([
            'id' => 2,
            'name' => '保留',
            'slug' => 'pending',
            'color' => 'rgb(255, 230, 230)',
        ]);

        DB::table('statuses')->insert([
            'id' => 3,
            'name' => '作業中',
            'slug' => 'doing',
            'color' => 'rgb(206, 255, 206)',
        ]);

        DB::table('statuses')->insert([
            'id' => 4,
            'name' => '確認中',
            'slug' => 'checking',
            'color' => 'rgb(221, 229, 238)',
        ]);

        DB::table('statuses')->insert([
            'id' => 5,
            'name' => '終了',
            'slug' => 'done',
            'color' => 'rgb(173, 173, 173)',
        ]);
    }
}

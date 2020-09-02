<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Project::class, function (Faker $faker) {
    return [
    	'id' => 1,
        'name' => 'プロジェクト管理ツール'
    ];
});

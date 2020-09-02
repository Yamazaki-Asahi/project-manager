<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\Task::class, function (Faker $faker) {
	return [
		'project_id' => 1,
		'parent_id' => 1,
		'status_id' => 1,
		'order' => 1,
		'name' => 'バリデーションの作成',
	];
});

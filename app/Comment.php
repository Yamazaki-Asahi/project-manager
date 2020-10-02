<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
	protected $fillable = ['body'];
	protected $casts = [
		'id' => 'int',
		'task_id' => 'int',
		'user_id' => 'int',
	];

	public function user()
	{
		return $this->belongsTo('App\User');
	}

	public function task()
	{
		return $this->belongsTo('App\Task');
	}
}

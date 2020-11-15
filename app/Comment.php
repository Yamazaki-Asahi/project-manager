<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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

	public function isOwnComment() {
		//自分のコメントじゃなかったらエラーをはく
		if (!$this->user === Auth::user()) {
			abort(403, '権限がありません');
		}
		return true;
	}
}

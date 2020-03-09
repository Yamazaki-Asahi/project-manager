<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{
	protected $fillable = ['name'];

	public function tasks () {
		return $this->hasMany('App\Task');
	}

	public function isJoinedProject() {
		//ログイン中ユーザーが参加しているプロジェクトの一覧を取得
		$projects = Auth::user()
			->projects()
			->get()
			->toArray();
		//$projectsからIDのみを抜き出す。
		$project_ids = array_map(function ($project) {
			return $project['id'];
		}, $projects);
		if (in_array($this->id, $project_ids)) {
			return true;
		}
		abort(403, '権限がありません');
	}
}

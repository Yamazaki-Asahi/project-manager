<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];
    protected $fillable = ['name', 'project_id', 'task_id', 'status_id'];
	protected $casts = [
		'id' => 'int',
		'status_id' => 'int',
	];

    public function project()
	{
		return $this->belongsTo('App\Project');
	}

	public function childTasks()
	{
		return $this->hasMany('App\Task', 'parent_id', 'id');
	}

	public function parent_task()
	{
		return $this->belongsTo('App\Task', 'parent_id', 'id');
	}
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];
    protected $fillable = ['name'];

	public function childTasks()
	{
		return $this->hasMany('App\Task', 'parent_id', 'id');
	}
}

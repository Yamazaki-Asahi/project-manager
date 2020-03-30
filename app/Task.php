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

	public function parentTask()
	{
		return $this->belongsTo('App\Task', 'parent_id', 'id');
	}

    public function getParentTaskIds() {
        $parent_task_ids = [];
        $parent_task = $this->parentTask;
        // 親の階層を追跡する。
        while($parent_task) {
            array_unshift($parent_task_ids, $parent_task->id);
            if ($parent_task->parentTask) {
                $parent_task = $parent_task->parentTask;
            } else {
                $parent_task = null;
            }
        }
        return $parent_task_ids;
    }
}

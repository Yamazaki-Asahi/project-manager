<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;
use App\Project;

class TasksController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public static function index (Request $request) {
    	$tasks = Project::where('id', $request->input('project_id'))
			->first()
			->tasks()
			->where('parent_id', null)
			->get();
    	foreach ($tasks as $task) {
    		$task->children = $task->childTasks()->get();
		}
    	return $tasks;
	}

	public static function show ($id) {
		$task = Task::find($id);
		$task->children = $task->childTasks()->get();
		return $task;
	}

	public static function store (Request $request) {
		$task = new Task;
		$task->fill($request->all());
		$task->status_id = 1;
		if ($task->parent_id) {
			$task->order = Task::where('parent_id', $task->parent_id)
					->get()
					->count() + 1;
		} else {
			$task->order = Task::doesntHave('parent_task')
					->get()
					->count() + 1;
		}
		$task->save();
		return $task;
	}

	public static function destroy ($id) {
		$task = Task::find($id);
		$task->delete();
	}
}

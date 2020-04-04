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
		$project = Project::find($request->input('project_id'));
		$parent_id = $request->input('parent_id') ? intval($request->input('parent_id')) : null;
		$project->isJoinedProject(); // 現在ログインしているユーザーがプロジェクトに参加しているか
    	$tasks = Project::where('id', $project->id)
			->first()
			->tasks()
			->where('parent_id', $parent_id)
			->get();
    	foreach ($tasks as $task) {
    		if ($task->childTasks()->get()->count() > 0) {
    			$task->hasChildren = true;
			} else {
				$task->hasChildren = false;
			}
		}
        $parent_task_ids = [];
    	if ($parent_id) {
            $parent_task_ids = Task::find($parent_id)->getParentTaskIds();
        }
    	return response()->json([
    	    'tasks' => $tasks,
            'parentTaskIds' => $parent_task_ids
        ]);
	}

	public static function show ($id) {
		$task = Task::find($id);
		$project = $task->project;
		$project->isJoinedProject();
		$task->children = $task->childTasks()->get();
		return $task;
	}

	public static function store (Request $request) {
		$task = new Task;
		$project = Project::find($request->input('project_id'));
		if ($project->isJoinedProject()) { // 現在ログインしているユーザーがプロジェクトに参加しているか
			$task->fill($request->all());
		}
		$task->status_id = 1;
		if ($task->parent_id) {
			$task->order = Task::where('parent_id', $task->parent_id)
					->get()
					->count() + 1;
		} else {
			$task->order = Task::doesntHave('parentTask')
					->get()
					->count() + 1;
		}
		$task->save();
		return $task;
	}

	public static function update($id, Request $request) {
		$task = Task::find($id);
		$project = $task->project;
		if ($project->isJoinedProject()) {
			$task->fill($request->all());
			$task->update();
			$task->hasChildren = $task->childTasks()->get()->count() ? true : false;
            $parent_task_ids = $task->getParentTaskIds();
            return response()->json([
                'task' => $task,
                'parentTaskIds' => $parent_task_ids
            ]);
		}
	}

	public static function destroy ($id) {
		$task = Task::find($id);
        $parent_task_ids = $task->getParentTaskIds();
		if ($task->project->isJoinedProject()) {
			$task->delete();
            return response()->json([
                'parentTaskIds' => $parent_task_ids
            ]);
		}
	}
}

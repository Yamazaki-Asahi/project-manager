<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;

class TasksController extends Controller
{
    public static function index () {
    	$tasks = Task::where('parent_id', null)->get();
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
		$tasks = Task::all();
		$task = new Task;
		$task->fill($request->all());
		$task->status_id = 1;
		$task->order = $tasks->count() + 1;
		$task->save();
		return $task;
	}

	public static function destroy ($id) {
		$task = Task::find($id);
		$task->delete();
//		return response()->json($task.name.'を削除しました。');
	}
}

<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;

class TasksController extends Controller
{
    public static function index () {
    	$tasks = Task::all();
    	return $tasks;
	}

	public static function show ($id) {
		$task = Task::find($id);
		return $task;
	}
}

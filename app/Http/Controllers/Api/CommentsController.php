<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Comment;
use App\Task;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api');
	}

    public function store(Request $request)
    {
		$task = Task::find($request->input('task_id'));
		$project = $task->project;
		if ($project->isJoinedProject()) {
			$comment = new Comment;
			$comment->fill($request->all());
			$comment->task_id = $task->id;
			$comment->user_id = Auth::user()->id;
			$comment->save();
			$task->comments = $task->comments()->get();
			return $task->comments;
		}
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
